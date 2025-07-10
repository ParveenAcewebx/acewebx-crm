import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import SelectFilter from '../share/form/SelectFilter'
import { Separator } from '../ui/separator'

const Header = ({ form, wareHouse, orderType, termsCode }) => {
  const PriceBy = []
  const FinancesType = []
  console.log('orderType', orderType)

  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Primary Att :
              </label>
              <FormInputField
                className='w-72'
                name='headerTab.primaryAtt'
                options={wareHouse}
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                WareHouse:
              </label>
              <FormSelectField
                className='w-72'
                name='headerTab.warehouse'
                options={wareHouse}
                disabled={orderType === 'Dropship'}
              />
            </div>

            <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Terms Code:
              </label>
              <SelectFilter
                form={form}
                className='w-72'
                name='headerTab.termsCode'
                placeholder='Select Terms '
                options={termsCode}
              />
              {/* <FormInputField className='w-72' name='headerTab.termsCode' /> */}
            </div>

            <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Vendor Contact:
              </label>
              <FormInputField className='w-72' name='headerTab.vendorContact' />
            </div>

            {/* <div className='flex items-center gap-2'>
                <label className='w-40 text-sm font-medium text-gray-700'>
                  Vendor Order:
                </label>
                <FormInputField className='w-72' name='headerTab.vendorOrder' />
              </div> */}
            <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Phone:
              </label>
              <FormInputField className='w-72' name='headerTab.phone' />
            </div>

            <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Fax:
              </label>
              <FormInputField className='w-72' name='headerTab.fax' />
            </div>
            <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Vendor Email :
              </label>
              <FormInputField
                className='w-72'
                name='headerTab.vendorEmail'
                options={wareHouse}
              />
            </div>
            {/* <div className='flex items-center gap-2'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Price By:
              </label>
              <FormSelectField
                className='w-72'
                name='headerTab.priceBy'
                options={PriceBy}
              />
            </div> */}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4'>
          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Receipt Date:
            </label>
            <FormDatePicker className='w-72' name='headerTab.receiptDate' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Last Change:
            </label>
            <FormDatePicker className='w-72' name='headerTab.lastChange' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Shipped:
            </label>
            <FormDatePicker className='w-72' name='headerTab.shipped' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Follow Up Date:
            </label>
            <FormDatePicker className='w-72' name='headerTab.followUpDate' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Date Expected:
            </label>
            <FormDatePicker className='w-72' name='headerTab.dateExpected' />
          </div>
          <div className='flex items-center gap-2'>
          <label className='w-40 text-sm font-medium text-gray-700'>Minimum Buy Amt:</label>
            <FormInputField
              name='headerTab.minBuyAmt'
              type='number'
            />
          </div>
        </div>
      </div>

      <Separator className='mt-6' />
    </>
  )
}

export default Header
