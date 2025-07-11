'use client'

export default function BreakDown({ editData }) {
  // Early return if editData is empty or not an array
  if (!Array.isArray(editData) || editData.length === 0) {
    return (
      <div
        style={{
          border: '2px solid #4b5e7a',
          padding: '16px',
          borderRadius: '4px'
        }}
      >
        <div className='!border-gray-700 p-4 text-center'>
          No Breakdown Data
        </div>
      </div>
    )
  }

  // First, collect all site_ids globally
  const allSiteIds = new Set()
  editData.forEach(scope => {
    const categories = scope.categories || []
    categories.forEach(category => {
      ;(category.groups || []).forEach(group => {
        ;(group.sagments || []).forEach(segment => {
          allSiteIds.add(segment.site_id)
        })
      })
    })
  })

  const siteIdArray = Array.from(allSiteIds)

  // Group scopes by budget_Cat_Id and site_id with global indexing
  const groupedByBudget = editData.reduce((acc, scope) => {
    if (!scope || !scope.budget_Cat_Id) return acc

    const budgetId = scope.budget_Cat_Id
    if (!acc[budgetId]) {
      acc[budgetId] = {
        budgetCatName: scope.budgetCatName || 'Unnamed Category',
        scopeGroups: {}
      }
    }

    const categories = scope.categories || []
    const siteIdMap = {}

    // Group categories by site_id
    categories.forEach(category => {
      ;(category.groups || []).forEach(group => {
        ;(group.sagments || []).forEach(segment => {
          const siteId = segment.site_id
          if (!siteIdMap[siteId]) {
            siteIdMap[siteId] = []
          }
          siteIdMap[siteId].push({
            category: {
              ...category,
              groups: [{ ...group, sagments: [segment] }]
            }
          })
        })
      })
    })

    // Use global site_id index for numbering and add siteName or siteId
    siteIdArray.forEach((siteId, globalSiteIdx) => {
      if (siteIdMap[siteId]) {
        const uniqueScopeId = `${budgetId}_${siteId}`
        if (!acc[budgetId].scopeGroups[uniqueScopeId]) {
          acc[budgetId].scopeGroups[uniqueScopeId] = {
            title: `${scope.title || 'Untitled'}`, // Single title
            categories: []
          }
        }

        // Add categories with numbering and siteName/siteId
        siteIdMap[siteId].forEach(({ category }) => {
          const firstSegment = category.groups[0].sagments[0]
          console.log('firstSegment', firstSegment)

          const siteName = firstSegment.siteName || firstSegment.site_id
          acc[budgetId].scopeGroups[uniqueScopeId].categories.push({
            ...category,
            title: `${category.title || 'Untitled Category'} - (${siteName})`
          })
        })
      }
    })

    return acc
  }, {})

  // Convert grouped data to array for rendering
  const dynamicData = Object.entries(groupedByBudget).map(
    ([budgetId, { budgetCatName, scopeGroups }], idx) => {
      const hasExterior = Object.values(scopeGroups).some(group =>
        group.categories.some(category =>
          category.groups?.some(group =>
            group.sagments?.some(segment => segment.title.includes('Exterior'))
          )
        )
      )

      return {
        section: `${budgetCatName}`,
        extSillPlateByOthers: hasExterior,
        scopeGroups: Object.entries(scopeGroups).map(
          ([scopeId, { title, categories }]) => ({
            scopeTitle: title,
            scopeId: scopeId,
            categories: categories.reduce((acc, category) => {
              const existingCat = acc.find(c => c.title === category.title)
              if (existingCat) {
                existingCat.segments.push(
                  ...(category.groups || [])
                    .flatMap(group => group.sagments || [])
                    .map(segment => ({
                      title: segment?.title || `Untitled Segment`,
                      inc: segment?.is_include === 'inc' ? ['inc'] : [],
                      exc: segment?.is_include === 'exc' ? ['exc'] : [],
                      na: segment?.is_include === 'na' ? ['na'] : [],
                      option:
                        segment?.is_include === 'option' ? ['option'] : [],
                      notes: segment?.notes || '',
                      client_notes: segment?.client_notes || '',
                      condition: segment?.condition || []
                    }))
                )
              } else {
                acc.push({
                  title: category.title,
                  segments: (category.groups || [])
                    .flatMap(group => group.sagments || [])
                    .map(segment => ({
                      title: segment?.title || `Untitled Segment`,
                      inc: segment?.is_include === 'inc' ? ['inc'] : [],
                      exc: segment?.is_include === 'exc' ? ['exc'] : [],
                      na: segment?.is_include === 'na' ? ['na'] : [],
                      option:
                        segment?.is_include === 'option' ? ['option'] : [],
                      notes: segment?.notes || '',
                      client_notes: segment?.client_notes || '',
                      condition: segment?.condition || []
                    }))
                })
              }
              return acc
            }, [])
          })
        )
      }
    }
  )

  return (
    <div className=''>
      {dynamicData.length === 0 ? (
        <div>No budget categories available</div>
      ) : (
        dynamicData.map((section, sIdx) => (
          <div key={sIdx} className='mb-6 border border-[#00b1de]'>
            {/* Single header for the section */}
            <div className='flex items-center justify-between bg-[#00b1de] px-4 py-2 font-bold text-white'>
              <div>{section.section.toLocaleUpperCase()}</div>
              <div className='flex gap-6'></div>
              <div className='flex gap-4'>{/* <span>CLIENT</span> */}</div>
            </div>

            {section.scopeGroups.map((scopeGroup, sgIdx) => (
              <div key={sgIdx} className='mb-2'>
                {scopeGroup.categories.map((cat, cIdx) => (
                  <div key={cIdx} className='border-t'>
                    <div className='bg-gray-200 px-3 py-1 font-semibold'>
                      {cat.title}
                    </div>

                    <table className='w-full border text-sm'>
                      <thead>
                        <tr className='bg-[#a3cfe7]'>
                          <th className='w-24 border p-1 text-center'>Item</th>
                          <th className='w-4 border p-1 text-center'>INC</th>
                          <th className='w-4 border p-1 text-center'>EXC</th>
                          <th className='w-4 border p-1 text-center'>NA</th>
                          <th className='w-2 border p-1 text-center'>OPTION</th>
                          <th className='w-20 border p-1 text-center'>
                            CONDITION
                          </th>
                          <th className='w-28 border p-1 text-center'>NOTES</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.segments.map((segment, segIdx) => (
                          <tr key={segIdx}>
                            <td className='border p-1'>{segment.title}</td>
                            <td className='border p-1 text-center'>
                              {segment.inc.length > 0 ? '✖️' : ''}
                            </td>
                            <td className='border p-1 text-center'>
                              {segment.exc.length > 0 ? '✖️' : ''}
                            </td>
                            <td className='border p-1 text-center'>
                              {segment.na.length > 0 ? '✖️' : ''}
                            </td>
                            <td className='border p-1 text-center'>
                              {segment.option.length > 0 ? '✖️' : ''}
                            </td>
                            <td className='border p-1'>
                              {segment.condition.join(', ') || ''}
                            </td>
                            <td className='border p-1'>{segment.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}
