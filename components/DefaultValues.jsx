export const inventoyItemsDefaultValues = {
  id: null,
  sku: '',
  short_description: '',
  description: '',
  website_id: '',
  freeform: '',
  meta: '',
  title_tag: '',
  brand_id: '',
  meta_description: '',
  image: '',
  itemVendors: [
    {
      vendor_name: ' ',
      item: '  ',
      cost: '',
      uom: '',
      cost_per_each: '',
      comment: ' ',
      is_stocked: ''
    }
  ],
  itemUnits: [
    {
      unit_id: '',
      qty: '',
      per_unit_id: '',
      upc: '',
      height: '',
      weight: '',
      length: '',
      width: ''
    }
  ],
  itemWebs: [
    {
      category: '',
      description: ' ',
      sequence: ''
    }
  ],
  itemTags: [],
  itemCategories: [],
  itemImages: [],
  vendor: [
    {
      vendor: '',
      vendorComments: ' ',
      vendorCost: '',
      vendorCostPerUom: '',
      vendorItem: '',
      vendorUom: ''
    }
  ],
  wareHouse: [
    {
      average: '',
      costPer: '',
      lastCost: '',
      lastLand: '',
      listGrossMargin: '',
      name: '',
      retailGrossMargin: '',
      retailPrice: '',
      stdCost: ''
    }
  ]
}

export const BudgetdefaultValues = {
  engineer_id: '',
  zip_id: '',
  site_plans: '',
  budget_book_id: '',
  address: '',
  city: '',
  state: '',
  customer_id: 3,
  contact_id: 2,
  tax: '',
  quote_date: new Date(),
  job_no: '',
  is_pricing: false,
  is_budget_only: false,
  up_margin: '',
  sp_margin: '',
  mc_margin: '',
  sw_margin: '',
  plan_date: new Date(),
  plan_status: '',
  plan_info: '',
  plan_note: '',
  terms: '',
  zip: '',
  design: '',
  design_total: '0',
  design_hr: '',
  design_hrs: '0',
  design_hrs2: '0',
  budget_hrs2: '0',
  shipping_shipment2: '0',
  engineering_seals2: '0',
  total2: '0.0000',
  engineering: '',
  engineering_total: '0',
  engineering_seal: '',
  engineering_seals: '0',
  budget: '',
  budget_total: '0',
  budget_hr: '',
  budget_hrs: '0',
  shipping: '',
  shipping_total: '0',
  shipping_ship: '',
  shipping_shipment: '0',
  total_adders: '',
  total_calculate: '',
  per_sqft: '0',
  bldg_count: '0',
  bldg_gsqft: '0',
  bldg_cost: '',
  bldg_sqft: '0',
  bldg_price: '0',
  price: '',
  sw_tiedown: '',
  up_lift: '',
  misc: '',
  anchorage: '',

  total: '0.00',
  total_price_sqft: '0.00',
  totalG_price_sqft: '0.00',
  sw_tiedownG: '',
  up_liftG: '',
  miscG: '',
  anchorageG: '',
  totalG: '',

  commission: '',
  commission_rate: '',
  shipment_limit: '',
  fill_in_limit: '',
  seal_limit: '',
  limit_notes: '',

  price_des_eng: '',
  inc_exc_scope: '',
  des_eng: '',
  deseng_price: '',
  deseng_inc_exc_scope: '',
  deseng_inc_exc_scope_price: '',
  projectScopeIncludes: [
    { budget_category_id: 1, is_include: false },
    { budget_category_id: 2, is_include: false },
    { budget_category_id: 3, is_include: false },
    { budget_category_id: 4, is_include: false },
    { budget_category_id: 5, is_include: false },
    { budget_category_id: 6, is_include: false },
    { budget_category_id: 7, is_include: false },
    { budget_category_id: 8, is_include: false },
    { budget_category_id: 9, is_include: false },
    { budget_category_id: 10, is_include: false },
    { budget_category_id: 11, is_include: false },
    { budget_category_id: 12, is_include: false }
  ],
  projectSubmittals: [
    { submittal_id: 1, is_include: 0 },
    { submittal_id: 2, is_include: 0 },
    { submittal_id: 3, is_include: 0 },
    { submittal_id: 4, is_include: 0 },
    { submittal_id: 5, is_include: 0 }
  ],
  projectKeyAreas: [
    { key_area_id: 1, is_include: 0 },
    { key_area_id: 2, is_include: 0 },
    { key_area_id: 3, is_include: 0 },
    { key_area_id: 4, is_include: 0 },
    { key_area_id: 5, is_include: 0 }
  ],
  projectContracts: [
    { contract_component_id: 1, is_include: 0 },
    { contract_component_id: 2, is_include: 0 },
    { contract_component_id: 3, is_include: 0 },
    { contract_component_id: 4, is_include: 0 },
    { contract_component_id: 5, is_include: 0 }
  ],
  sites: [
    {
      name: '',
      qty: '',
      gs_qft: '',
      ts_qft: '',
      cs_qft: '0.0000',
      ps_qft: '0.00',
      cost: '0.00',
      c_total: '0.00',
      c_sw: '0.00',
      c_up: '0.00',
      c_sp: '0.00',
      c_mc: '0.00',
      pb_sw: '0.00',
      pb_up: '0.00',
      pb_sp: '0.00',
      pb_mc: '0.00',
      pb_tot: '0.00',
      p_tot: '0.00',
      p_sw: '0.00',
      p_up: '0.00',
      p_sp: '0.00',
      p_mc: '0.00',
      project_bldg: '0.00',
      project_bldg_type: '0.00',
      site_design: '0.00',
      site_design_sw: '0.00',
      site_design_up: '0.00',
      site_engineering: '0.00',
      site_engineering_sw: '0.00',
      site_engineering_up: '0.00',
      site_budget: '0.00',
      site_budget_sp: '0.00',
      site_budget_sw: '0.00',
      site_budget_up: '0.00',
      site_budget_mc: '0.00',
      site_shipping: '0.00',
      site_shipping_sp: '0.00',
      site_shipping_sw: '0.00',
      site_shipping_up: '0.00',
      site_shipping_mc: '0.00',
      site_design_type: '0.00',
      site_engineering_type: '0.00',
      site_budget_type: '0.00',
      site_shipping_type: '0.00'
    }
  ],
  budgets: [
    {
      site_name: '',
      misc: '',
      posts: '',
      sill_plate: '',
      tie_down: '',
      sw_misc: '',
      up_lift: '',
      roof: '',
      coridor: '',
      deck: '',
      stair_wells: '',
      beam: '',
      smu: '',
      stl: '',
      rtu: '',
      budget_total: '0.0000',
      sqft_sw_tiedown: '',
      sqft_up_lift: '',
      sqft_sill_plate: '',
      sqft_misc_hardware: '0.0000',
      cost_sw_tiedown: '0.00',
      cost_up_lift: '0.00',
      cost_sill_plate: '0.00',
      cost_misc_hardware: '0.00',
      total: '0.00',

      price_sill_plate: '0.0000',
      price_sw_tiedown: '0.0000',
      price_up_lift: '0.0000',
      price_misc_hardware: '0.0000',
      price_total: '0.0000',

      costType_sw_tiedown: '0.00',
      costType_up_lift: '0.00',
      costType_sill_plate: '0.00',
      costType_misc_hardware: '0.00',
      costType_Total: '0.00',

      priceType_sw_tiedown: '0.00',
      priceType_up_lift: '0.00',
      priceType_sill_plate: '0.00',
      priceType_misc_hardware: '0.00',
      priceType_total: '0.00'
    }
  ],
  sitePlan: [
    {
      site_index: '',
      sitePlan_name: '',

      // site_ts_qft: '',
      sov_sp: '0.00',
      sov_td: '0.00',
      sov_up: '0.00',
      sov_mc: '0.00',
      sov_total: '0.0000'
    }
  ],
  sitePlan2: [
    {
      sitePlan_name2: '',
      site_qty: '',
      sov_qa: '',
      sov_qr: ''
    }
  ],
  projectScopes: [],
  covers: [
    {
      rev: '',
      date: '',
      plan_date: '',
      description: '',
      scope: '',
      quote: ''
    }
  ],
  veOptions: [
    {
      subject: '',
      amount: '',
      description: ''
    }
  ],
  optionPackages: [
    {
      subject: '',
      amount: '',
      description: ''
    }
  ]
}
