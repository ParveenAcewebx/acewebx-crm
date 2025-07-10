export const budgetTableHeader = [
  'SILL PLATE',
  'TIEDOWNS',
  'SW MISC',
  'UPLIFT',
  'ROOF',
  'CORRIDORS',
  'DECKS',
  'STAIRWELLS',
  'BEAMS',
  'POSTS',
  'CMU',
  'STL',
  'MISC',
  'RTU',
  'TOTALS',
  'SILL PLATE',
  'SW TIEDOWNS',
  'MISC HARDWARE',
  'UPLIFT',
  'TOTALS',
  'SILL PLATE',
  'SW TIEDOWNS',
  'MISC HARDWARE',
  'UPLIFT',
  'TOTALS',
  'SILL PLATE',
  'SW TIEDOWNS',
  'MISC HARDWARE',
  'UPLIFT',
  'TOTALS',

  'SILL PLATE',
  'SW TIEDOWNS',
  'MISC HARDWARE',
  'UPLIFT',
  'TOTALS',

  'SILL PLATE',
  'SW TIEDOWNS',
  'MISC HARDWARE',
  'UPLIFT',
  'TOTALS'
]

export const budgetHeader = [
  'SILL PLATE',
  'TIEDOWNS',
  'SW MISC',
  'UPLIFT',
  'ROOF',
  'CORRIDOR',
  'DECKS',
  'STAIRWELLS',
  'BEAMS',
  'POSTS',
  'CMU',
  'STL',
  'MISCELLANEOUS',
  'RTU',
  'TOTALS'
]

export const budgetKeys = [
  'sill_plate',
  'tie_down',
  'sw_misc',
  'up_lift',
  'roof',
  'coridor',
  'deck',
  'stair_wells',
  'beam',
  'posts',
  'smu',
  'stl',
  'misc',
  'rtu',
  'budget_total'
]
export const costBldgKeys = [
  'cost_sill_plate',
  'cost_sw_tiedown',
  'cost_misc_hardware',
  'cost_up_lift',
  'cost_roof',
  'cost_coridor',
  'cost_deck',
  'cost_stair_wells',
  'cost_beam',
  'cost_posts',
  'cost_smu',
  'cost_stl',
  'cost_misc',
  'cost_rtu',
  'total'
]
export const priceBldgKeys = [
  'price_sill_plate',
  'price_sw_tiedown',
  'price_misc_hardware',
  'price_up_lift',
  'price_roof',
  'price_coridor',
  'price_deck',
  'price_stair_wells',
  'price_beam',
  'price_posts',
  'price_smu',
  'price_stl',
  'price_misc',
  'price_rtu',
  'price_total'
]

export const costBldgTypeKeys = [
  'costType_sill_plate',
  'costType_sw_tiedown',
  'costType_misc_hardware',
  'costType_up_lift',
  'costType_roof',
  'costType_coridor',
  'costType_deck',
  'costType_stair_wells',
  'costType_beam',
  'costType_posts',
  'costType_smu',
  'costType_stl',
  'costType_misc',
  'costType_rtu',
  'costType_Total'
]
export const priceBldgTypeKeys = [
  'priceType_sill_plate',
  'priceType_sw_tiedown',
  'priceType_misc_hardware',
  'priceType_up_lift',
  'priceType_roof',
  'priceType_coridor',
  'priceType_deck',
  'priceType_stair_wells',
  'priceType_beam',
  'priceType_posts',
  'priceType_smu',
  'priceType_stl',
  'priceType_misc',
  'priceType_rtu',
  'priceType_total'
]

export const sumFields = [
  'sill_plate',
  'tie_down',
  'sw_misc',
  'up_lift',
  'roof',
  'coridor',
  'deck',
  'stair_wells',
  'beam',
  'posts',
  'smu',
  'stl',
  'misc',
  'rtu'
]
export const fixedFields = [
  'cost_sw_tiedown',
  'cost_up_lift',
  'cost_sill_plate',
  'cost_misc_hardware',
  'total'
]

export const mirrorMap = {
  sill_plate: 'sqft_sill_plate',
  tie_down: 'sqft_sw_tiedown',
  up_lift: 'sqft_up_lift'
}

export const bldgDataTable = [
  { label: 'BLDG COUNT', name: 'bldg_count' },
  { label: 'TSQFT', name: 'bldg_gsqft' },
  { label: 'COST/SQFT', name: 'bldg_sqft' },
  { label: 'COST', name: 'bldg_cost' },
  { label: 'PRICE/SQFT', name: 'bldg_price' },
  { label: 'PRICE', name: 'price' }
]

export const pricingDataTable = [
  {
    name: 'sw_tiedown',
    label: 'SW TIEDOWNS'
  },
  {
    name: 'up_lift',
    label: 'UPLIFT RESTRAINT'
  },
  {
    name: 'misc',
    label: 'MISC HARDWARE'
  },
  {
    name: 'anchorage',
    label: 'ANCHORAGE'
  },
  {
    name: 'total',
    label: 'TOTAL'
  },
  {
    name: 'total_price_sqft',
    label: 'TOTAL PRICE/SQFT'
  }
]
export const pricingGDataTable = [
  { label: '$', name: 'sw_tiedownG' },
  { label: '$', name: 'up_liftG' },
  { label: '$', name: 'miscG' },
  { label: '$', name: 'anchorageG' },
  {
    label: '$',
    name: 'totalG'
  },
  {
    label: '$',
    name: 'totalG_price_sqft'
  }
]
export const addersDesignField = [
  { name: 'design', label: 'DESIGN' },
  { name: 'engineering', label: 'ENGINEERING' },
  { name: 'budget', label: 'BUDGET' },
  { name: 'shipping', label: 'SHIPPING' }
]

export const hrSealfieldData = [
  { name: 'design_hr', label: 'HR' },
  { name: 'engineering_seal', label: 'SEAL' },
  { name: 'budget_hr', label: 'HR' },
  { name: 'shipping_ship', label: 'SHIP' }
]
export const hrsSealsfieldData = [
  { name: 'design_hrs', label: 'HRS' },
  { name: 'engineering_seals', label: 'SEALS' },
  { name: 'budget_hrs', label: 'HRS' },
  { name: 'shipping_shipment', label: 'SHIPMENT' }
]

export const hrsSeals2fieldData = [
  { label: '$', name: 'design_hrs2' },
  { label: '$', name: 'engineering_seals2' },
  { label: '$', name: 'budget_hrs2' },
  { label: '$', name: 'shipping_shipment2' },
  { label: '$', name: 'total2' }
]
export const totalFields = [
  { name: 'design_total' },
  { name: 'engineering_total' },
  { name: 'budget_total' },
  { name: 'shipping_total' },
  { name: 'total_calculate' }
]
export const commissionFields = [
  {
    label: 'COMMISSION',
    name: 'commission'
  },
  {
    label: 'COMMISSIONS',
    name: 'commission_rate'
  }
]
export const sumOfDebs = [
  { name: 'sumOfDesign' },
  { name: 'sumOfEngineering' },
  { name: 'sumOfBudget' },
  { name: 'sumOfShipping' },
  { name: 'sumOfShippingNext' },
  { name: 'totalSum' }
]
export const multipliedDebs = [
  { name: 'multipliedDesign' },
  { name: 'multipliedEngineer' },
  { name: 'multipliedBudget' },
  { name: 'multipliedShipping' },
  { name: 'multipliedShippingNext' },
  { name: 'totalMultiplied' }
]
export const limitsArray = [
  { label: 'SHIPMENT LIMIT', name: 'shipment_limit' },
  { label: 'FILL IN LIMIT', name: 'fill_in_limit' },
  { label: 'SEALS LIMIT', name: 'seal_limit' },
  { label: 'LIMIT NOTES', name: 'limit_notes' }
]
export const SovCheck = [
  { label: 'PRICE W/O D & E', name: 'price_des_eng' },
  { label: 'D & E DIVISOR', name: 'inc_exc_scope' },
  { label: 'D & E', name: 'des_eng' },
  { label: 'D & E %', name: 'deseng_price' },
  { label: 'D & E SPLIT', name: 'deseng_inc_exc_scope' },
  { label: 'D & E SPLIT %', name: 'deseng_inc_exc_scope_price' }
]
