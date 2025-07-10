/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts'
}

export default config
