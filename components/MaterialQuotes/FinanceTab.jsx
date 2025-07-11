import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { FinancesType, PriceBy } from '../static-Values'

const FinanceTab = () => {
  return (
    <>
      {' '}
      <div className='mt-6 grid grid-cols-2 gap-4'>
        {/* <div className='grid grid-cols-2 gap-3'> */}
        <div>
          <div  className='flex items-center gap-4'>

            <label className='w-40 font-medium text-sm text-gray-700'>Terms Code:</label>
            <FormInputField className="w-72" name='financesTab.termsCode' />
          </div>

          <div  className='flex items-center gap-4 mt-3'>
            <label className='w-40 font-medium text-sm text-gray-700'>Tax Code:</label>
            <FormInputField className="w-72" name='financesTab.taxCode' />
          </div>

          <div  className='flex items-center gap-4 mt-3'>
            <label className='w-40 font-medium text-sm text-gray-700'>Price By:</label>
            <FormSelectField className="w-72" name='financesTab.priceBy' options={PriceBy} />
          </div>
          <div  className='flex items-center gap-4 mt-3'>
            <label className='w-40 font-medium text-sm text-gray-700'>Sales 1:</label>
            <FormInputField className="w-72"  name='financesTab.sales1' />
          </div>

          <div  className='flex items-center gap-4 mt-3'>
            <label className='w-40 font-medium text-sm text-gray-700'>Finances Type:</label>
            <FormSelectField
            className="w-72"
              name='financesTab.financesType'
              options={FinancesType}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default FinanceTab
