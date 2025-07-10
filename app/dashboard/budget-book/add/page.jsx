'use client'

import FormBugetBook from '@/components/BudgetBook/FormBugetBook'
import {
  fixedFields,
  mirrorMap
} from '@/components/BudgetBook/table/budgetTable'
import { BudgetBookDefaultValues } from '@/components/DefaultValues/BudgetBook'
import { BudgetBookValidation } from '@/components/form-validations/budgetBook'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import api from '@/lib/api'
import BudgetBookService from '@/services/BudgetBook/budget-book-api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

const AddBudgetBook = () => {
  const [imageUpload, setImageUpload] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [files, setFiles] = useState([])
  const [fileNotes, setFileNotes] = useState({})
  const [fileTypes, setFileTypes] = useState({})
  const searchParams = useSearchParams()
  const revisionId = searchParams.get('revId')
  const leadId = searchParams.get('leadId')
  console.log('leadIdleadId', leadId)

  const router = useRouter()
  //defaultValue merge localStorage (if present)
  const mergedDefaults =
    typeof window !== 'undefined'
      ? {
          ...BudgetBookDefaultValues,
          ...JSON.parse(localStorage.getItem('budgetForm') || '{}')
        }
      : BudgetBookDefaultValues
  const methods = useForm({
    defaultValues: mergedDefaults,
    resolver: yupResolver(BudgetBookValidation)
  })

  // Show validation errors in a toast notification
  const validationError = methods.formState.errors

  Object.entries(validationError).forEach(([key, error]) => {
    errorMessage({
      description: `${error?.message}`
    })
  })

  // fetch budget category data for budget tab
  const getBudgetCategory = async () => {
    const response = await api.get('/budget-category')
    if (response.status === 200) {
      const allData = response?.data.map(item => item.budgetCategory.cat_value)
      setAllCategory(allData)
      console.log('total category', allData)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getBudgetCategory()
    }, 3000)
  }, [])
  const convertBooleansToNumbers = array =>
    array.map(item => {
      const transformed = {}
      for (const key in item) {
        transformed[key] =
          typeof item[key] === 'boolean' ? (item[key] ? 1 : 0) : item[key]
      }
      return transformed
    })

  const { control, setValue, watch, getValues } = methods

  //revision id
  const fetchRevisionDataById = async () => {
    try {
      const response =
        await BudgetBookService.GetProjectsRevisionData(revisionId)

      if (response?.status === 200) {
        const RevisionData = response.data.data.data

        // Build scope values from project scopes
        // const scopeValues = {}
        // budgetData?.projectScopes?.forEach(item => {
        //   if (item?.budget_Cat_Id !== undefined) {
        //     scopeValues[`scope[${item.budget_Cat_Id}]`] = true
        //   }
        // })
        // console.log('scopeValues', scopeValues)

        const projectScopeData = RevisionData?.projectScopes || []

        const scopeValues = {}

        projectScopeData.forEach(scopeItem => {
          const siteId =
            scopeItem?.categories?.[0]?.groups?.[0]?.sagments?.[0]?.site_id // Assuming one site_id per scope
          const categories = scopeItem.categories || []

          categories.forEach(cat => {
            cat.groups?.forEach(group => {
              group.sagments?.forEach(segment => {
                const keyPrefix = `scopes.${segment.budgetIndex}.${segment.site_id}_${scopeItem.scope_id}_${segment.scopeSagment.id}`
                scopeValues[`${keyPrefix}.notes`] = segment.notes
                scopeValues[`${keyPrefix}.is_include`] = segment.is_include
                scopeValues[`${keyPrefix}.pricePerSqft`] = segment.price_sqft
                scopeValues[`${keyPrefix}.additional`] = segment.additionals
                scopeValues[`${keyPrefix}.condition`] = segment.condition
                scopeValues[`${keyPrefix}.priceWithAdditional`] =
                  segment.price_w_additional
                scopeValues[`${keyPrefix}.cost`] = segment.cost
              })
            })
          })
        })
        // setLeadName(RevisionData?.lead)
        // Pre-fill form values
        const formattedData = {
          ...RevisionData,
          // ...scopeValues, // <-- Include scopeValues here
          projectType: JSON.parse(RevisionData?.projectType),
          lead_project_id: RevisionData?.lead?.id?.toString(),
          projectScopeIncludes: RevisionData?.projectScopeIncludes?.map(
            item => ({
              budget_category_id: item?.budget_category_id,
              is_include: item?.is_include === 0 ? false : true
            })
          ),
          projectScopes: RevisionData.projectScopes,
          budget_book_id: RevisionData.budgetBook?.id?.toString() || '',
          customer_id: RevisionData.customer?.id?.toString() || '',
          contact_id: RevisionData.contact?.id?.toString() || '',
          job_no: RevisionData.job_no?.toString() || '',
          date_record: RevisionData.quote_date
            ? new Date(RevisionData.quote_date)
            : null,
          zip_id: RevisionData?.zip?.id?.toString() || '',
          engineer_id: RevisionData?.engineer?.id?.toString() || ''
        }

        methods.reset({
          ...formattedData,
          ...scopeValues
        })
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (revisionId) {
      fetchRevisionDataById()
    }
  }, [revisionId])
  console.log('imageUpload', imageUpload)
  // on submit handler
  // const onSubmit = async data => {
  //   console.log('datadata', data)
  //   const formData = {
  //     ...data,
  //     uploadDocument: imageUpload,
  //     quote_date: formatDateForMySQL(data.quote_date),
  //     plan_date: formatDateForMySQL(data.plan_date),
  //     // Transform each relevant field
  //     projectContracts: convertBooleansToNumbers(data.projectContracts || []),
  //     projectKeyAreas: convertBooleansToNumbers(data.projectKeyAreas || []),
  //     lead_project_id: leadId ? leadId : data?.lead_project_id,
  //     projectSubmittals: convertBooleansToNumbers(data.projectSubmittals || [])
  //   }

  //   // // Keep image logic as-is
  //   // if (imageUpload && Array.isArray(imageUpload)) {
  //   //   imageUpload.forEach((file, index) => {
  //   //     formData.append(`uploadDocument[${index}]`, file)
  //   //   })
  //   // }

  //   // console.log("formDataformDataformData",formData)
  //   try {
  //     const response = await BudgetBookService.AddBudgetBook(formData)

  //     if (response.status === 200) {
  //       successMessage({ description: 'Submit the record successfully' })
  //       setTimeout(() => {
  //         router.push(`/dashboard/budget-book`)
  //       }, 2000)
  //       localStorage.removeItem('budgetForm')
  //     }
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  const onSubmit = async data => {
    console.log('datawwwwwwwwww', data)

    const formData = new FormData()

    // 1. Append uploadDocument[]
    if (Array.isArray(imageUpload)) {
      imageUpload.forEach((doc, index) => {
        const file = doc.file?.originFileObj || doc.file // depends on your uploader
        if (file) {
          formData.append(`uploadDocument[${index}][file]`, file)
        }
        formData.append(`uploadDocument[${index}][note]`, doc.note || '')
        formData.append(`uploadDocument[${index}][type]`, doc.type || '')
        formData.append(
          `uploadDocument[${index}][displayToCustomer]`,
          doc.displayToCustomer ?? 0
        )
      })
    }

    // 2. Append the rest of the form as JSON
    const restData = {
      ...data,
      uploadDocument: undefined, // exclude file array from JSON payload
      quote_date: formatDateForMySQL(data.quote_date),
      plan_date: formatDateForMySQL(data.plan_date),
      projectContracts: convertBooleansToNumbers(data.projectContracts || []),
      projectKeyAreas: convertBooleansToNumbers(data.projectKeyAreas || []),
      projectSubmittals: convertBooleansToNumbers(data.projectSubmittals || []),
      lead_project_id: leadId || data?.lead_project_id
    }

    formData.append('form', JSON.stringify(restData))

    try {
      const response = await BudgetBookService.AddBudgetBook(formData)

      if (response.status === 200) {
        successMessage({ description: 'Submit the record successfully' })
        setTimeout(() => router.push('/dashboard/budget-book'), 2000)
        localStorage.removeItem('budgetForm')
      }
    } catch (error) {
      console.error('Submission error', error)
    }
  }

  const watchedSites = useWatch({
    control,
    name: 'sites'
  })
  const watchedSitesPlan = useWatch({
    control,
    name: 'sitePlan'
  })
  const watchedSitesPlan2 = useWatch({
    control,
    name: 'sitePlan2'
  })
  const budgetFields = useWatch({
    control,
    name: 'budgets'
  })
  const design = useWatch({
    control,
    name: 'design'
  })
  const total = useWatch({
    control,
    name: 'total'
  })
  const engineering = useWatch({
    control,
    name: 'engineering'
  })
  const budget = useWatch({
    control,
    name: 'budget'
  })

  const shipping = useWatch({
    control,
    name: 'shipping'
  })
  const total_calculate = useWatch({
    control,
    name: 'total_calculate'
  })
  const engineering_seal = useWatch({
    control,
    name: 'engineering_seal'
  })
  const per_sqft = useWatch({
    control,
    name: 'per_sqft'
  })
  const budget_total = useWatch({
    control,
    name: 'budget_total'
  })
  const design_hr = useWatch({
    control,
    name: 'design_hr'
  })
  const budget_hr = useWatch({
    control,
    name: 'budget_hr'
  })
  const design_total = useWatch({
    control,
    name: 'design_total'
  })
  const engineering_total = useWatch({
    control,
    name: 'engineering_total'
  })

  const shipping_total = useWatch({
    control,
    name: 'shipping_total'
  })
  const shipping_ship = useWatch({
    control,
    name: 'shipping_ship'
  })
  const commission = useWatch({
    control,
    name: 'commission'
  })
  const commission_rate = useWatch({
    control,
    name: 'commission_rate'
  })
  const projectContracts = useWatch({
    control,
    name: 'projectContracts'
  })
  const bldg_gsqft = useWatch({
    control,
    name: 'bldg_gsqft'
  })
  const gs_qft = useWatch({
    control,
    name: 'gs_qft'
  })
  const bldgprice = useWatch({
    control,
    name: 'price'
  })
  const projectScopes = useWatch({
    control,
    name: 'projectScopes'
  })
  const projectSubmittals = useWatch({
    control,
    name: 'projectSubmittals'
  })

  function getConditionScopes(arr) {
    const hasSW = arr.some(item => item.short_title === 'SW')
    const hasUP = arr.some(item => item.short_title === 'UP')

    if (hasSW && hasUP) return 2
    if (hasSW || hasUP) return 1
    return 0
  }

  const siteName = watch('sites')

  const watchedswMargin = useWatch({ control, name: 'sw_margin' })
  const watchedUpMargin = useWatch({ control, name: 'up_margin' })
  const watchedSpMargin = useWatch({ control, name: 'sp_margin' })
  const watchedMcMargin = useWatch({ control, name: 'mc_margin' })

  //GENERAL TABS
  // Update bldg_count
  useEffect(() => {
    const totalQty = watchedSites.reduce(
      (acc, site) => acc + Number(site.qty || 0),
      0
    )
    setValue('bldg_count', totalQty.toFixed(0))
  }, [watchedSites, setValue])

  // Update bldg_gsqft
  useEffect(() => {
    const totalSqft = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.ts_qft || '0'),
      0
    )
    setValue('bldg_gsqft', totalSqft.toFixed(0))
  }, [watchedSites, setValue])

  // Update bldg_cost
  useEffect(() => {
    const totalCost = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.c_total || '0'),
      0
    )
    setValue('bldg_cost', totalCost.toFixed(4))
  }, [watchedSites, setValue])

  // Calculate bldg_sqft (cost per sqft)
  useEffect(() => {
    const price = parseFloat(getValues('bldg_cost'))
    const sqft = parseFloat(getValues('bldg_gsqft'))

    if (!isNaN(price) && !isNaN(sqft) && sqft !== 0) {
      const costPerSqft = (price / sqft).toFixed(5)
      setValue('bldg_sqft', costPerSqft)
    } else {
      setValue('bldg_sqft', '0')
    }
  }, [watchedSites, setValue, getValues])

  // Pricing data
  useEffect(() => {
    const sw_tiedown = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_sw?.toString() || '0'),
      0
    )
    const up_lift = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_up?.toString() || '0'),
      0
    )
    const misc = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_mc?.toString() || '0'),
      0
    )
    const anchorage = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.p_sp?.toString() || '0'),
      0
    )
    const sw_tiedownG = sw_tiedown / bldg_gsqft
    const up_liftG = up_lift / bldg_gsqft
    const miscG = misc / bldg_gsqft
    const anchorageG = anchorage / bldg_gsqft

    const totalG = sw_tiedownG + anchorageG + up_liftG + miscG
    const totalG_price_sqft = parseFloat(totalG) + parseFloat(per_sqft)
    const total = [
      parseFloat(sw_tiedown || '0'),
      parseFloat(up_lift || '0'),
      parseFloat(misc || '0'),
      parseFloat(anchorage || '0')
    ].reduce((acc, val) => acc + val, 0)
    const total_price_sqft = parseFloat(total) + parseFloat(total_calculate)

    if (
      isNaN(sw_tiedown) ||
      isNaN(up_lift) ||
      isNaN(misc) ||
      isNaN(anchorage)
    ) {
      setValue('sw_tiedown', '')
      setValue('up_lift', '')
      setValue('misc', '')
      setValue('anchorage', '')
    } else {
      setValue('sw_tiedown', sw_tiedown.toFixed(4))
      setValue('sw_tiedownG', sw_tiedownG.toFixed(4))
      setValue('up_lift', up_lift.toFixed(4))
      setValue('up_liftG', up_liftG.toFixed(4))
      setValue('misc', misc.toFixed(4))
      setValue('miscG', miscG.toFixed(4))
      setValue('anchorage', anchorage.toFixed(4))
      setValue('anchorageG', anchorageG.toFixed(4))
      setValue('total', total.toFixed(4))
      setValue('total_price_sqft', total_price_sqft.toFixed(4))
      setValue('totalG', totalG.toFixed(4))
      setValue('totalG_price_sqft', totalG_price_sqft.toFixed(4))
    }
  })

  //budget & site tab tab
  // SET site_name, total, mirrored fields, misc hardware, and reset fixed fields
  useEffect(() => {
    if (!budgetFields?.length || !siteName?.length) return

    budgetFields.forEach((row, index) => {
      const nameFromSite = siteName[index]?.name || ''
      const qtyFromSite = siteName[index]?.qty || ''
      const tsqftFromSite = siteName[index]?.ts_qft || ''

      const currentSiteName = watch(`budgets.${index}.site_name`)
      if (currentSiteName !== nameFromSite) {
        setValue(`budgets.${index}.site_name`, nameFromSite, {
          shouldValidate: false,
          shouldDirty: false
        })
      }

      // setValue(`sitePlan.${index}.site_ts_qft`, tsqftFromSite, {
      //   shouldValidate: false,
      //   shouldDirty: false
      // })

      // 1. Calculate budget_total
      const total = allCategory?.reduce((acc, field) => {
        const val = parseFloat(row?.[field] || '0')
        return acc + (isNaN(val) ? 0 : val)
      }, 0)
      const currentTotal = parseFloat(
        watch(`budgets.${index}.budget_total`) || '0'
      )
      if (currentTotal !== total) {
        setValue(`budgets.${index}.budget_total`, total.toFixed(4), {
          shouldValidate: false,
          shouldDirty: false
        })
      }

      // 2. Mirror fields
      Object.entries(mirrorMap).forEach(([src, target]) => {
        const value = row?.[src] || ''
        const currentValue = watch(`budgets.${index}.${target}`)
        if (currentValue !== value) {
          setValue(`budgets.${index}.${target}`, value, {
            shouldValidate: false,
            shouldDirty: false
          })
        }
      })

      // 3. Calculate sqft_misc_hardware
      const tieDown = parseFloat(row?.tie_down || '0')
      const uplift = parseFloat(row?.up_lift || '0')
      const sill = parseFloat(row?.sill_plate || '0')
      const miscHardware = total - (tieDown + uplift + sill)
      const currentMiscHardware = parseFloat(
        watch(`budgets.${index}.sqft_misc_hardware`) || '0'
      )
      if (currentMiscHardware !== miscHardware) {
        setValue(
          `budgets.${index}.sqft_misc_hardware`,
          miscHardware >= 0 ? miscHardware.toFixed(4) : '0.0000',
          {
            shouldValidate: false,
            shouldDirty: false
          }
        )
      }

      // 4. Reset fixed fields
      fixedFields.forEach(field => {
        const currentValue = watch(`budgets.${index}.${field}`)
        if (currentValue !== '0.00') {
          setValue(`budgets.${index}.${field}`, '0.00', {
            shouldValidate: false,
            shouldDirty: false
          })
        }
      })
    })
  }, [JSON.stringify(budgetFields), JSON.stringify(siteName)])

  //site budget tab calculation
  useEffect(() => {
    if (!budgetFields?.length || !watchedSites?.length) return

    budgetFields.forEach((budget, index) => {
      const site = watchedSites[index]
      if (!site) return
      const tie_down = parseFloat(budget.tie_down || '0')
      const gs_qft = parseFloat(site.gs_qft || '0')
      const budgetTotal = parseFloat(budget.budget_total || '0')
      const sill_plate = parseFloat(budget.sill_plate || '0')
      const sw_misc = parseFloat(budget.sw_misc || '0')
      const up_lift = parseFloat(budget.up_lift || '0')
      const roof = parseFloat(budget.roof || '0')
      const coridor = parseFloat(budget.coridor || '0')
      const deck = parseFloat(budget.deck || '0')
      const stair_wells = parseFloat(budget.stair_wells || '0')
      const beam = parseFloat(budget.beam || '0')
      const posts = parseFloat(budget.posts || '0')
      const smu = parseFloat(budget.smu || '0')
      const stl = parseFloat(budget.stl || '0')
      const misc = parseFloat(budget.misc || '0')
      const rtu = parseFloat(budget.rtu || '0')

      const sqft_misc_hardware = parseFloat(budget.sqft_misc_hardware || '0')
      const c_sw = tie_down * gs_qft
      const c_sp = sill_plate * gs_qft
      const c_up = up_lift * gs_qft
      const c_mc = sqft_misc_hardware * gs_qft
      const cost_sill_plate = sill_plate * gs_qft
      const cost_sw_tiedown = tie_down * gs_qft
      const cost_up_lift = up_lift * gs_qft
      const cost_misc_hardware = sw_misc * gs_qft
      const cost_roof = roof * gs_qft
      const cost_coridor = coridor * gs_qft
      const cost_deck = deck * gs_qft
      const cost_stair_wells = stair_wells * gs_qft
      const cost_beam = beam * gs_qft
      const cost_posts = posts * gs_qft
      const cost_smu = smu * gs_qft

      const cost_stl = stl * gs_qft
      const cost_misc = misc * gs_qft
      const cost_rtu = rtu * gs_qft

      const total = (c_sp + c_sw + c_up + c_mc).toFixed(4)
      const qty = parseFloat(site.qty || '0')
      const cost = (c_sp + c_sw + c_up + c_mc).toFixed(4)
      const c_total = (qty * parseFloat(cost)).toFixed(4)
      const cs_qft = budgetTotal
      const ts_qft = Math.round(qty * gs_qft)
      let pb_sw = 0
      let p_sw = 0
      const swMarginDivide = Number(watchedswMargin) / 100
      const swMarginMinus = 1 - swMarginDivide
      if (c_sw !== 0 && swMarginMinus !== 0) {
        pb_sw = parseFloat((c_sw / swMarginMinus).toFixed(4))
        p_sw = parseFloat((pb_sw * qty).toFixed(4))
      }

      let p_up = 0
      let pb_up = 0
      const upMarginDivide = Number(watchedUpMargin) / 100
      const upMarginMinus = 1 - upMarginDivide
      if (c_up !== 0 && upMarginMinus !== 0) {
        pb_up = parseFloat((c_up / upMarginMinus).toFixed(4))
        p_up = parseFloat((pb_up * qty).toFixed(4))
      }

      let p_sp = 0
      let pb_sp = 0
      const spMarginDivide = Number(watchedSpMargin) / 100
      const spMarginMinus = 1 - spMarginDivide
      if (c_sp !== 0 && spMarginMinus !== 0) {
        pb_sp = parseFloat((c_sp / spMarginMinus).toFixed(4))
        p_sp = parseFloat((pb_sp * qty).toFixed(4))
      }

      let p_mc = 0
      let pb_mc = 0
      const mcMarginDivide = Number(watchedMcMargin) / 100
      const mcMarginMinus = 1 - mcMarginDivide
      if (c_mc !== 0 && mcMarginMinus !== 0) {
        pb_mc = parseFloat((c_mc / mcMarginMinus).toFixed(4))
        p_mc = parseFloat((pb_mc * qty).toFixed(4))
      }
      const pb_tot = (
        Number(pb_sw) +
        Number(pb_up) +
        Number(pb_sp) +
        Number(pb_mc)
      ).toFixed(4)

      let ps_qft = ''
      if (!isNaN(pb_tot) && !isNaN(gs_qft) && gs_qft !== 0) {
        ps_qft = (pb_tot / gs_qft).toFixed(4)
      }
      const p_tot = (parseFloat(pb_tot) * qty).toFixed(4)
      setValue(`sites.${index}.ts_qft`, ts_qft.toFixed(4), {
        shouldValidate: false
      })
      // COST/BLDG
      setValue(`budgets.${index}.cost_sw_tiedown`, cost_sw_tiedown.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_sill_plate`, cost_sill_plate.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_up_lift`, cost_up_lift.toFixed(4), {
        shouldValidate: false
      })
      setValue(
        `budgets.${index}.cost_misc_hardware`,
        cost_misc_hardware.toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(`budgets.${index}.cost_roof`, cost_roof.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_coridor`, cost_coridor.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_deck`, cost_deck.toFixed(4), {
        shouldValidate: false
      })
      setValue(
        `budgets.${index}.cost_stair_wells`,
        cost_stair_wells.toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(`budgets.${index}.cost_beam`, cost_beam.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_posts`, cost_posts.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_smu`, cost_smu.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_stl`, cost_stl.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_misc`, cost_misc.toFixed(4), {
        shouldValidate: false
      })
      setValue(`budgets.${index}.cost_rtu`, cost_rtu.toFixed(4), {
        shouldValidate: false
      })

      //  COST/BLDG TYPE
      const costType_sw_tiedown = (cost_sw_tiedown * qty).toFixed(4)
      setValue(`budgets.${index}.costType_sw_tiedown`, costType_sw_tiedown, {
        shouldValidate: false
      })

      const costType_sill_plate = (cost_sill_plate * qty).toFixed(4)
      setValue(`budgets.${index}.costType_sill_plate`, costType_sill_plate, {
        shouldValidate: false
      })

      const costType_up_lift = (cost_up_lift * qty).toFixed(4)
      setValue(`budgets.${index}.costType_up_lift`, costType_up_lift, {
        shouldValidate: false
      })

      const costType_misc_hardware = (cost_misc_hardware * qty).toFixed(4)
      setValue(
        `budgets.${index}.costType_misc_hardware`,
        costType_misc_hardware,
        {
          shouldValidate: false
        }
      )
      const costType_roof = (cost_roof * qty).toFixed(4)
      setValue(`budgets.${index}.costType_roof`, costType_roof, {
        shouldValidate: false
      })
      const costType_coridor = (cost_coridor * qty).toFixed(4)
      setValue(`budgets.${index}.costType_coridor`, costType_coridor, {
        shouldValidate: false
      })
      const costType_deck = (cost_deck * qty).toFixed(4)
      setValue(`budgets.${index}.costType_deck`, costType_deck, {
        shouldValidate: false
      })
      const costType_stair_wells = (cost_stair_wells * qty).toFixed(4)
      setValue(`budgets.${index}.costType_stair_wells`, costType_stair_wells, {
        shouldValidate: false
      })
      const costType_beam = (cost_beam * qty).toFixed(4)
      setValue(`budgets.${index}.costType_beam`, costType_beam, {
        shouldValidate: false
      })
      const costType_posts = (cost_posts * qty).toFixed(4)
      setValue(`budgets.${index}.costType_posts`, costType_posts, {
        shouldValidate: false
      })
      const costType_smu = (cost_smu * qty).toFixed(4)
      setValue(`budgets.${index}.costType_smu`, costType_smu, {
        shouldValidate: false
      })
      const costType_stl = (cost_stl * qty).toFixed(4)
      setValue(`budgets.${index}.costType_stl`, costType_stl, {
        shouldValidate: false
      })
      const costType_misc = (cost_misc * qty).toFixed(4)
      setValue(`budgets.${index}.costType_misc`, costType_misc, {
        shouldValidate: false
      })
      const costType_rtu = (cost_rtu * qty).toFixed(4)
      setValue(`budgets.${index}.costType_rtu`, costType_rtu, {
        shouldValidate: false
      })

      setValue(`budgets.${index}.total`, total, { shouldValidate: false })

      // PRICE/BLDG

      setValue(
        `budgets.${index}.price_sill_plate`,
        (cost_sill_plate / spMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )

      setValue(
        `budgets.${index}.price_sw_tiedown`,
        (cost_sw_tiedown / swMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )

      setValue(
        `budgets.${index}.price_up_lift`,
        (cost_up_lift / upMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )

      setValue(
        `budgets.${index}.price_misc_hardware`,
        (cost_misc_hardware / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )

      setValue(
        `budgets.${index}.price_roof`,
        (cost_roof / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_coridor`,
        (cost_coridor / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_deck`,
        (cost_deck / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_stair_wells`,
        (cost_stair_wells / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_beam`,
        (cost_beam / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_posts`,
        (cost_posts / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_smu`,
        (cost_smu / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_stl`,
        (cost_stl / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_misc`,
        (cost_misc / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(
        `budgets.${index}.price_rtu`,
        (cost_rtu / mcMarginMinus).toFixed(4),
        {
          shouldValidate: false
        }
      )
      // PRICE/BLDG TYPE
      const priceType_sill_plate = (cost_sill_plate / spMarginMinus) * qty
      setValue(
        `budgets.${index}.priceType_sill_plate`,
        priceType_sill_plate.toFixed(4),
        {
          shouldValidate: false
        }
      )
      const priceType_sw_tiedown = (cost_sw_tiedown / swMarginMinus) * qty
      setValue(
        `budgets.${index}.priceType_sw_tiedown`,
        priceType_sw_tiedown.toFixed(4),
        {
          shouldValidate: false
        }
      )

      const priceType_up_lift = (cost_up_lift / upMarginMinus) * qty
      setValue(
        `budgets.${index}.priceType_up_lift`,
        priceType_up_lift.toFixed(4),
        {
          shouldValidate: false
        }
      )

      const priceType_misc_hardware = (cost_misc_hardware / mcMarginMinus) * qty
      setValue(
        `budgets.${index}.priceType_misc_hardware`,
        priceType_misc_hardware.toFixed(4),
        {
          shouldValidate: false
        }
      )

      const priceType_roof = (cost_roof / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_roof`, priceType_roof.toFixed(4), {
        shouldValidate: false
      })
      const priceType_coridor = (cost_coridor / mcMarginMinus) * qty
      setValue(
        `budgets.${index}.priceType_coridor`,
        priceType_coridor.toFixed(4),
        {
          shouldValidate: false
        }
      )
      const priceType_deck = (cost_deck / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_deck`, priceType_deck.toFixed(4), {
        shouldValidate: false
      })
      const priceType_stair_wells = (cost_stair_wells / mcMarginMinus) * qty
      setValue(
        `budgets.${index}.priceType_stair_wells`,
        priceType_stair_wells.toFixed(4),
        {
          shouldValidate: false
        }
      )
      const priceType_beam = (cost_beam / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_beam`, priceType_beam.toFixed(4), {
        shouldValidate: false
      })
      const priceType_posts = (cost_posts / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_posts`, priceType_posts.toFixed(4), {
        shouldValidate: false
      })
      const priceType_smu = (cost_smu / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_smu`, priceType_smu.toFixed(4), {
        shouldValidate: false
      })
      const priceType_stl = (cost_stl / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_stl`, priceType_stl.toFixed(4), {
        shouldValidate: false
      })
      const priceType_misc = (cost_misc / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_misc`, priceType_misc.toFixed(4), {
        shouldValidate: false
      })
      const priceType_rtu = (cost_rtu / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_rtu`, priceType_rtu.toFixed(4), {
        shouldValidate: false
      })
      const costType_Total =
        parseFloat(costType_sill_plate) +
        parseFloat(costType_sw_tiedown) +
        parseFloat(costType_misc_hardware) +
        parseFloat(costType_up_lift) +
        parseFloat(costType_roof) +
        parseFloat(costType_coridor) +
        parseFloat(costType_deck) +
        parseFloat(costType_stair_wells) +
        parseFloat(costType_beam) +
        parseFloat(costType_posts) +
        parseFloat(costType_smu) +
        parseFloat(costType_stl) +
        parseFloat(costType_misc) +
        parseFloat(costType_rtu)

      setValue(`budgets.${index}.costType_Total`, costType_Total.toFixed(4), {
        shouldValidate: false
      })

      const price_total =
        c_sp / spMarginMinus +
        c_sw / swMarginMinus +
        c_up / upMarginMinus +
        c_mc / mcMarginMinus
      setValue(`budgets.${index}.price_total`, price_total.toFixed(4), {
        shouldValidate: false
      })
      const priceType_total =
        (c_sp / spMarginMinus) * qty +
        (c_sw / swMarginMinus) * qty +
        (c_up / upMarginMinus) * qty +
        (c_mc / mcMarginMinus) * qty
      setValue(`budgets.${index}.priceType_total`, priceType_total.toFixed(4), {
        shouldValidate: false
      })

      setValue(`sites.${index}.cs_qft`, cs_qft.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.ps_qft`, ps_qft, { shouldValidate: false })

      setValue(`sites.${index}.cost`, cost, { shouldValidate: false })
      setValue(`sites.${index}.c_total`, c_total, { shouldValidate: false })
      setValue(`sites.${index}.c_sw`, c_sw.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.c_sp`, c_sp.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.c_up`, c_up.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.c_mc`, c_mc.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_sw`, pb_sw.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_sp`, pb_sp.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_up`, pb_up.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_mc`, pb_mc.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.pb_tot`, pb_tot, { shouldValidate: false })
      setValue(`sites.${index}.p_tot`, p_tot, { shouldValidate: false })
      setValue(`sites.${index}.p_sw`, p_sw.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.p_up`, p_up.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.p_sp`, p_sp.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.p_mc`, p_mc.toFixed(4), {
        shouldValidate: false
      })
    })
  }, [
    JSON.stringify(budgetFields),
    JSON.stringify(watchedSites),
    watchedswMargin,
    watchedUpMargin,
    watchedSpMargin,
    watchedMcMargin
  ])

  //ADDERS PER COMPONENT
  const firstTwoContracts = projectContracts?.slice(0, 2)

  const yourDesignvalue = (() => {
    const value = parseFloat(design) || 0
    const count = firstTwoContracts?.length || 1
    return value / count
  })()

  const yourEngineeringvalue = (() => {
    const value = parseFloat(engineering) || 0
    const count = firstTwoContracts?.length || 1
    return value / count
  })()

  const yourBudgetvalue = (() => {
    const value = parseFloat(budget) || 0
    const count = projectContracts?.length || 1
    return value / count
  })()

  const yourShippingvalue = (() => {
    const value = parseFloat(shipping) || 0
    const count = projectContracts.length || 1
    return value / count
  })()

  const sumOfDesign = (() => {
    const sum =
      yourDesignvalue +
      yourEngineeringvalue +
      yourBudgetvalue +
      yourShippingvalue
    return sum.toFixed(4)
  })()

  const multipliedDesign = (() => {
    const result = (Number(sumOfDesign) / 100) * (parseFloat(total) || 0)
    return result.toFixed(4)
  })()

  const sumOfEngineering = (() => {
    const sum =
      yourDesignvalue +
      yourEngineeringvalue +
      yourBudgetvalue +
      yourShippingvalue
    return sum.toFixed(4)
  })()

  const multipliedEngineer = (() => {
    const result = (Number(sumOfEngineering) / 100) * (parseFloat(total) || 0)
    return result.toFixed(4)
  })()

  const sumOfBudget = (() => {
    const budgetValue = isFinite(yourBudgetvalue) ? yourBudgetvalue : 0
    const shippingValue = isFinite(yourShippingvalue) ? yourShippingvalue : 0
    return (budgetValue + shippingValue).toFixed(4)
  })()

  const multipliedBudget = (() => {
    const result = (Number(sumOfBudget) / 100) * (parseFloat(total) || 0)
    return result.toFixed(4)
  })()

  const sumOfShipping = (() => {
    const budgetValue = isFinite(yourBudgetvalue) ? yourBudgetvalue : 0
    const shippingValue = isFinite(yourShippingvalue) ? yourShippingvalue : 0
    return (budgetValue + shippingValue).toFixed(4)
  })()

  const multipliedShipping = (() => {
    const result = (Number(sumOfShipping) / 100) * (parseFloat(total) || 0)
    return result.toFixed(4)
  })()

  const sumOfShippingNext = (() => {
    const budgetValue = isFinite(yourBudgetvalue) ? yourBudgetvalue : 0
    const shippingValue = isFinite(yourShippingvalue) ? yourShippingvalue : 0
    return (budgetValue + shippingValue).toFixed(4)
  })()

  const multipliedShippingNext = (() => {
    const result = (Number(sumOfShippingNext) / 100) * (parseFloat(total) || 0)
    return result.toFixed(4)
  })()

  const totalSum = (() => {
    const sum =
      Number(sumOfDesign) +
      Number(sumOfEngineering) +
      Number(sumOfBudget) +
      Number(sumOfShipping) +
      Number(sumOfShippingNext)
    return sum.toFixed(4)
  })()

  const totalMultiplied = (() => {
    const sum =
      Number(multipliedDesign) +
      Number(multipliedEngineer) +
      Number(multipliedBudget) +
      Number(multipliedShipping) +
      Number(multipliedShippingNext)
    return sum.toFixed(4)
  })()

  // Total BLDG Calculation
  const totalBLDG = (() => {
    const sum =
      (Number(total) || 0) +
      (Number(totalMultiplied) || 0) +
      (Number(commission_rate) || 0)
    return isNaN(sum) ? '0.00' : sum.toFixed(4)
  })()

  //commission_Rate
  const totalCOMMISION = (() => {
    const sumValue = (Number(total) || 0) + (Number(totalMultiplied) || 0)
    const discount = Number(commission) / 100 || 0
    const computedValue = sumValue * discount
    return isNaN(computedValue) ? '0.00' : computedValue.toFixed(4)
  })()

  //ADDERS  COMPONENT
  useEffect(() => {
    const sqft = total
    const designcost = design / 100
    const engineeringcost = engineering / 100
    const budgetcost = budget / 100
    const shippingcost = shipping / 100
    const design_total = (designcost * sqft).toFixed(4)
    const engineering_total = (engineeringcost * sqft).toFixed(4)
    const budget_total = (budgetcost * sqft).toFixed(4)
    const shipping_total = (shippingcost * sqft).toFixed(4)
    const design_hrs2 = (design_total / bldg_gsqft).toFixed(4)
    const engineering_seals2 = (engineering_total / bldg_gsqft).toFixed(4)
    const budget_hrs2 = (budget_total / bldg_gsqft).toFixed(4)
    const shipping_shipment2 = (shipping_total / bldg_gsqft).toFixed(4)
    const total2 =
      parseFloat(design_hrs2) +
      parseFloat(engineering_seals2) +
      parseFloat(budget_hrs2) +
      parseFloat(shipping_shipment2)
    setValue(`design_total`, design_total, {
      shouldValidate: false
    })
    setValue(`engineering_seals2`, engineering_seals2, {
      shouldValidate: false
    })

    setValue(`budget_hrs2`, budget_hrs2, {
      shouldValidate: false
    })
    setValue(`shipping_shipment2`, shipping_shipment2, {
      shouldValidate: false
    })
    setValue(`design_hrs2`, design_hrs2, {
      shouldValidate: false
    })
    setValue(`shipping_total`, shipping_total, {
      shouldValidate: false
    })
    setValue(`budget_total`, budget_total, {
      shouldValidate: false
    })
    setValue(`total2`, total2.toFixed(4), {
      shouldValidate: false
    })
    setValue(`engineering_total`, engineering_total, {
      shouldValidate: false
    })

    const design1 = Number(design)
    const engineering1 = Number(engineering)
    const budget1 = Number(budget)
    const shipping1 = Number(shipping)
    const total_adders = design1 + engineering1 + budget1 + shipping1
    const design_total1 = Number(design_total)
    const engineering_total1 = Number(engineering_total)
    const budget_total1 = Number(budget_total)
    const shipping_total1 = Number(shipping_total)
    const total_calculate = (
      design_total1 +
      engineering_total1 +
      budget_total1 +
      shipping_total1
    ).toFixed(4)

    setValue(`total_calculate`, total_calculate, {
      shouldValidate: false
    })
    const totalSqft = watchedSites.reduce(
      (acc, site) => acc + parseFloat(site.ts_qft || '0'),
      0
    )
    const total_calculate1 = total_calculate
    const totalSqft1 = totalSqft

    if (!isNaN(total_calculate1) && !isNaN(totalSqft1) && totalSqft1 !== 0) {
      const per_sqft = (total_calculate1 / totalSqft1).toFixed(4)
      setValue(`per_sqft`, per_sqft, {
        shouldValidate: false
      })
    }

    const budgettotal = budget_total
    const budgetsqft = budget_hr
    const designtotal = design_total
    const designsqft = design_hr
    const engineeringtotal = engineering_total
    const engineeringsqft = engineering_seal
    const shippingtotal = shipping_total
    const shippingsqft = shipping_ship

    const shipping_shipment = (shippingtotal / shippingsqft).toFixed(4)
    const design_hrs = (designtotal / designsqft).toFixed(4)
    const engineering_seals = (engineeringtotal / engineeringsqft).toFixed(4)
    const budget_hrs = (budgettotal / budgetsqft).toFixed(4)
    const price = totalBLDG
    const bldggsqft = bldg_gsqft
    const bldg_price = (price / bldggsqft).toFixed(4)

    setValue(`bldg_price`, bldg_price, {
      shouldValidate: false
    })
    setValue(`design_hrs`, design_hrs, {
      shouldValidate: false
    })
    setValue(`shipping_shipment`, shipping_shipment, {
      shouldValidate: false
    })
    setValue(`budget_hrs`, budget_hrs, {
      shouldValidate: false
    })
    setValue(`engineering_seals`, engineering_seals, {
      shouldValidate: false
    })
    setValue(`total_adders`, total_adders.toFixed(4), {
      shouldValidate: false
    })
    setValue(`price`, totalBLDG, {
      shouldValidate: false
    })
    setValue(`commission_rate`, totalCOMMISION, {
      shouldValidate: false
    })
    setValue(`sumOfDesign`, sumOfDesign, {
      shouldValidate: false
    })
    setValue(`multipliedDesign`, multipliedDesign, {
      shouldValidate: false
    })
    setValue(`sumOfEngineering`, sumOfEngineering, {
      shouldValidate: false
    })
    setValue(`multipliedEngineer`, multipliedEngineer, {
      shouldValidate: false
    })
    setValue(`sumOfBudget`, sumOfBudget, {
      shouldValidate: false
    })
    setValue(`multipliedBudget`, multipliedBudget, {
      shouldValidate: false
    })
    setValue(`sumOfShipping`, sumOfShipping, {
      shouldValidate: false
    })
    setValue(`multipliedShipping`, multipliedShipping, {
      shouldValidate: false
    })
    setValue(`sumOfShippingNext`, sumOfShippingNext, {
      shouldValidate: false
    })
    setValue(`multipliedShippingNext`, multipliedShippingNext, {
      shouldValidate: false
    })
    setValue(`totalSum`, totalSum, {
      shouldValidate: false
    })

    setValue(`totalMultiplied`, totalMultiplied, {
      shouldValidate: false
    })

    const deseng = parseFloat(design_total) + parseFloat(engineering_total)
    const price_des_eng = parseFloat(bldgprice) - parseFloat(deseng)
    setValue(`price_des_eng`, price_des_eng.toFixed(4), {
      shouldValidate: false
    })
    setValue(`inc_exc_scope`, getConditionScopes(projectScopes), {
      shouldValidate: false
    })
    setValue(`des_eng`, deseng.toFixed(4), {
      shouldValidate: false
    })
    setValue(`deseng_price`, (deseng / parseFloat(bldgprice)).toFixed(4), {
      shouldValidate: false
    })
    const deseng_inc_exc_scope = deseng / getConditionScopes(projectScopes)

    setValue(`deseng_inc_exc_scope`, deseng_inc_exc_scope.toFixed(4), {
      shouldValidate: false
    })
    setValue(
      `deseng_inc_exc_scope_price`,
      (deseng_inc_exc_scope / parseFloat(bldgprice)).toFixed(4),
      {
        shouldValidate: false
      }
    )
  })

  useEffect(() => {
    watchedSites.forEach((site, index) => {
      const gs_qft = parseFloat(site.gs_qft || '0')
      const ts_qft = parseFloat(site.ts_qft || '0')
      const project_bldg =
        parseFloat(gs_qft) && parseFloat(bldg_gsqft)
          ? (parseFloat(gs_qft) / parseFloat(bldg_gsqft)) * 100
          : 0

      const project_bldg_type =
        parseFloat(ts_qft) && parseFloat(bldg_gsqft)
          ? (parseFloat(ts_qft) / parseFloat(bldg_gsqft)) * 100
          : 0
      setValue(`sites.${index}.project_bldg`, `${project_bldg.toFixed(4)} %`, {
        shouldValidate: false
      })
      setValue(
        `sites.${index}.project_bldg_type`,
        `${project_bldg_type.toFixed(4)} %`,
        {
          shouldValidate: false
        }
      )
    })
  }, [JSON.stringify(watchedSites), bldg_gsqft])

  //sites adders/bldg /types
  useEffect(() => {
    if (
      !watchedSites?.length ||
      !watchedSitesPlan?.length ||
      !watchedSitesPlan2?.length
    )
      return

    watchedSites.forEach((site, index) => {
      const sitePlan = watchedSitesPlan[index]
      const sitePlan2 = watchedSitesPlan2[index]
      if (!sitePlan) return
      const qty = parseFloat(site.qty || '0')

      const nameFromSite = watchedSites[index]?.name || ''
      const gs_qft = parseFloat(site.gs_qft || '0')

      const project_bldg =
        parseFloat(gs_qft) && parseFloat(bldg_gsqft)
          ? parseFloat(gs_qft) / parseFloat(bldg_gsqft)
          : 0

      const pb_sp = parseFloat(site.pb_sp || '0')
      const pb_sw = parseFloat(site.pb_sw || '0')
      const pb_up = parseFloat(site.pb_up || '0')
      const pb_mc = parseFloat(site.pb_mc || '0')
      const sov_qa = sitePlan2?.sov_qa || ''
      const site_design = project_bldg * design_total
      const site_engineering = project_bldg * engineering_total
      const site_budget = project_bldg * budget_total
      const site_shipping = project_bldg * shipping_total
      const site_design_type = site_design * qty
      const site_engineering_type = site_engineering * qty
      const site_budget_type = site_budget * qty
      const site_shipping_type = site_shipping * qty
      const sitePlan_name2 = sitePlan2?.sitePlan_name2 || ''
      const site_qty = sitePlan2?.site_qty || ''
      const sov_qr = site_qty - sov_qa
      const includes = projectSubmittals
        .filter(item => item.submittal_id === 1 || item.submittal_id === 2)
        .map(item => item.is_include === true)

      // Count how many are true
      const count = includes.filter(Boolean).length

      const site_design_sw = includes[0]
        ? (site_design / count).toFixed(4)
        : '0.000'
      const site_design_up = includes[1]
        ? (site_design / count).toFixed(4)
        : '0.000'
      const site_engineering_sw = includes[0]
        ? (site_engineering / count).toFixed(4)
        : '0.00'
      const site_engineering_up = includes[1]
        ? (site_engineering / count).toFixed(4)
        : '0.00'

      const includes_contract = projectContracts
        .filter(
          item =>
            item.contract_component_id === 1 ||
            item.contract_component_id === 2 ||
            item.contract_component_id === 4 ||
            item.contract_component_id === 5
        )
        .map(item => item.is_include === true)

      // Count how many are true
      const contract_count = includes_contract.filter(Boolean).length
      const site_budget_sp = includes_contract[3]
        ? (site_budget / contract_count).toFixed(4)
        : '0.00'
      const site_budget_sw = includes_contract[0]
        ? (site_budget / contract_count).toFixed(4)
        : '0.00'
      const site_budget_up = includes_contract[1]
        ? (site_budget / contract_count).toFixed(4)
        : '0.00'
      const site_budget_mc = includes_contract[2]
        ? (site_budget / contract_count).toFixed(4)
        : '0.00'

      const site_shipping_sp = includes_contract[3]
        ? (site_shipping / contract_count).toFixed(4)
        : '0.00'

      const site_shipping_sw = includes_contract[0]
        ? (site_shipping / contract_count).toFixed(4)
        : '0.00'
      const site_shipping_up = includes_contract[1]
        ? (site_shipping / contract_count).toFixed(4)
        : '0.00'
      const site_shipping_mc = includes_contract[2]
        ? (site_shipping / contract_count).toFixed(4)
        : '0.00'

      const sov_sp = (
        parseFloat(pb_sp) +
        parseFloat(site_budget_sp) +
        parseFloat(site_shipping_sp)
      ).toFixed(4)
      const sov_td = (
        parseFloat(pb_sw) +
        parseFloat(site_design_sw) +
        parseFloat(site_engineering_sw) +
        parseFloat(site_budget_sw) +
        parseFloat(site_shipping_sw)
      ).toFixed(4)
      const sov_up = (
        parseFloat(pb_up) +
        parseFloat(site_design_up) +
        parseFloat(site_engineering_up) +
        parseFloat(site_budget_up) +
        parseFloat(site_shipping_up)
      ).toFixed(4)
      const sov_mc = (
        parseFloat(pb_mc) +
        parseFloat(site_budget_mc) +
        parseFloat(site_shipping_mc)
      ).toFixed(4)

      const sov_total =
        parseFloat(sov_sp) +
        parseFloat(sov_td) +
        parseFloat(sov_up) +
        parseFloat(sov_mc)

      setValue(`sites.${index}.site_design`, site_design.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_design_sw`, site_design_sw, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_design_up`, site_design_up, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_engineering`, site_engineering.toFixed(4), {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_engineering_sw`, site_engineering_sw, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_engineering_up`, site_engineering_up, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_budget`, site_budget.toFixed(4), {
        shouldValidate: false
      })

      setValue(`sites.${index}.site_budget_sp`, site_budget_sp, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_budget_sw`, site_budget_sw, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_budget_up`, site_budget_up, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_budget_mc`, site_budget_mc, {
        shouldValidate: false
      })

      setValue(`sites.${index}.site_shipping`, site_shipping.toFixed(4), {
        shouldValidate: false
      })

      setValue(`sites.${index}.site_shipping_sp`, site_shipping_sp, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_shipping_sw`, site_shipping_sw, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_shipping_up`, site_shipping_up, {
        shouldValidate: false
      })
      setValue(`sites.${index}.site_shipping_mc`, site_shipping_mc, {
        shouldValidate: false
      })

      setValue(`sites.${index}.site_design_type`, site_design_type.toFixed(4), {
        shouldValidate: false
      })
      setValue(
        `sites.${index}.site_engineering_type`,
        site_engineering_type.toFixed(4),
        {
          shouldValidate: false
        }
      )
      setValue(`sites.${index}.site_budget_type`, site_budget_type.toFixed(4), {
        shouldValidate: false
      })
      setValue(
        `sites.${index}.site_shipping_type`,
        site_shipping_type.toFixed(4),
        {
          shouldValidate: false
        }
      )

      setValue(`sitePlan.${index}.sitePlan_name`, nameFromSite, {
        shouldValidate: false,
        shouldDirty: false
      })
      setValue(`sitePlan2.${index}.sitePlan_name2`, nameFromSite, {
        shouldValidate: false,
        shouldDirty: false
      })
      setValue(`sitePlan2.${index}.site_qty`, qty, {
        shouldValidate: false,
        shouldDirty: false
      })
      setValue(`sitePlan.${index}.sov_sp`, sov_sp, {
        shouldValidate: false
      })
      setValue(`sitePlan.${index}.sov_td`, sov_td, {
        shouldValidate: false
      })
      setValue(`sitePlan.${index}.sov_up`, sov_up, {
        shouldValidate: false
      })
      setValue(`sitePlan.${index}.sov_mc`, sov_mc, {
        shouldValidate: false
      })
      setValue(`sitePlan.${index}.sov_total`, sov_total.toFixed(4), {
        shouldValidate: false
      })
      if (sitePlan_name2 !== '') {
        setValue(`sitePlan2.${index}.sov_qa`, site_qty, {
          shouldValidate: false
        })
      } else {
        setValue(`sitePlan2.${index}.sov_qa`, '', {
          shouldValidate: false
        })
      }
      setValue(`sitePlan2.${index}.sov_qr`, sov_qr, {
        shouldValidate: false
      })
    })
  }, [
    JSON.stringify(watchedSitesPlan),
    JSON.stringify(watchedSites),
    design_total,
    engineering_total,
    budget_total,
    projectSubmittals,
    projectContracts,
    shipping_total,
    bldg_gsqft
  ])

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        {/* <LayoutHeader pageTitle='All Budget Book' /> */}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4'>
          <FormBugetBook
            setImageUpload={setImageUpload}
            form={methods}
            pageTitle='Add Budget Book'
            leadId={leadId}
            setFiles={setFiles}
            files={files}
            setFileNotes={setFileNotes}
            fileNotes={fileNotes}
            setFileTypes={setFileTypes}
            fileTypes={fileTypes}
          />
        </form>
      </FormProvider>
    </>
  )
}

export default AddBudgetBook
