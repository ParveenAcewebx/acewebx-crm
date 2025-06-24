/**
 * This is an advanced example for creating icon bundles for Iconify SVG Framework.
 */

import { promises as fs } from 'node:fs'
import { createRequire } from 'node:module'

// Iconify Tools
import { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } from '@iconify/tools'
import { getIcons, getIconsCSS, stringToIcon } from '@iconify/utils'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const require = createRequire(import.meta.url)

// ✅ Resolve icon JSON files using CommonJS-compatible require
const sources = {
  json: [
    // Iconify JSON file
    require.resolve('@iconify/json/json/ri.json'),

    // Custom file with only selected icons
    {
      filename: require.resolve('@iconify/json/json/line-md.json'),
      icons: ['home-twotone-alt', 'github', 'document-list', 'document-code', 'image-twotone']
    }

    // You can add more custom JSON files here if needed
  ],
  icons: ['bx-basket', 'bi-airplane-engines', 'tabler-anchor', 'uit-adobe-alt', 'twemoji-auto-rickshaw'],
  svg: [
    /* Example of adding custom SVG icon folders:
    {
      dir: 'src/assets/iconify-icons/svg',
      monotone: false,
      prefix: 'custom'
    }
    */
  ]
}

// File to save bundled CSS to
// const target = join(dirname(new URL(import.meta.url).pathname), 'generated-icons.css')
const target = join(__dirname, 'generated-icons.css')

;(async function () {
  try {
    await fs.mkdir(dirname(target), { recursive: true })
  } catch (err) {
    // Directory already exists
  }

  const allIcons = []

  /**
   * Convert sources.icons to sources.json
   */
  if (sources.icons) {
    const sourcesJSON = sources.json ?? (sources.json = [])

    const organizedList = organizeIconsList(sources.icons)

    for (const prefix in organizedList) {
      const filename = require.resolve(`@iconify/json/json/${prefix}.json`)
      sourcesJSON.push({
        filename,
        icons: organizedList[prefix]
      })
    }
  }

  /**
   * Load and filter icon JSON files
   */
  if (sources.json) {
    for (let i = 0; i < sources.json.length; i++) {
      const item = sources.json[i]
      const filename = typeof item === 'string' ? item : item.filename
      const content = JSON.parse(await fs.readFile(filename, 'utf8'))

      if (typeof item !== 'string' && item.icons?.length) {
        const filteredContent = getIcons(content, item.icons)
        if (!filteredContent) throw new Error(`Cannot find required icons in ${filename}`)
        allIcons.push(filteredContent)
      } else {
        allIcons.push(content)
      }
    }
  }

  /**
   * Load and optimize custom SVG icons (if any)
   */
  if (sources.svg) {
    for (let i = 0; i < sources.svg.length; i++) {
      const source = sources.svg[i]

      const iconSet = await importDirectory(source.dir, {
        prefix: source.prefix
      })

      await iconSet.forEach(async (name, type) => {
        if (type !== 'icon') return

        const svg = iconSet.toSVG(name)
        if (!svg) return iconSet.remove(name)

        try {
          await cleanupSVG(svg)

          if (source.monotone) {
            await parseColors(svg, {
              defaultColor: 'currentColor',
              callback: (attr, colorStr, color) => {
                return !color || isEmptyColor(color) ? colorStr : 'currentColor'
              }
            })
          }

          await runSVGO(svg)
        } catch (err) {
          console.error(`Error parsing ${name} from ${source.dir}:`, err)
          return iconSet.remove(name)
        }

        iconSet.fromSVG(name, svg)
      })

      allIcons.push(iconSet.export())
    }
  }

  /**
   * Generate and write the CSS file
   */
  const cssContent = allIcons
    .map(iconSet => getIconsCSS(iconSet, Object.keys(iconSet.icons), { iconSelector: '.{prefix}-{name}' }))
    .join('\n')

  await fs.writeFile(target, cssContent, 'utf8')
  console.log(`✅ Saved CSS to ${target}`)
})().catch(err => {
  console.error('❌ Error generating icon bundle:', err)
})

/**
 * Utility to group icons by prefix
 */
function organizeIconsList(icons) {
  const sorted = {}

  icons.forEach(icon => {
    const item = stringToIcon(icon)
    if (!item) return

    const prefix = item.prefix
    const name = item.name

    if (!sorted[prefix]) sorted[prefix] = []
    if (!sorted[prefix].includes(name)) sorted[prefix].push(name)
  })

  return sorted
}