import { Search } from 'lucide-react'
import FormInputField from '../share/form/FormInputField'
import FormDatePicker from '../share/form/datePicker'

const PurchaseSummary = ({ index, form }) => {
  return (
    <div className='grid grid-cols-3 gap-4 text-sm'>
      {/* Left Section */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Quantity:</label>
          <FormInputField
            className='h-8 w-24'
            form={form}
            name={`lineTab.${index}.quantity`}
          />
          <FormInputField
            className='h-8 w-16'
            form={form}
            name={`lineTab.${index}.unit`}
            placeholder='EA'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Unit Price:</label>
          <FormInputField
            className='h-8 w-24'
            form={form}
            name={`lineTab.${index}.unitPrice`}
          />
          <FormInputField
            className='h-8 w-16'
            form={form}
            name={`lineTab.${index}.unit2`}
            placeholder='EA'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-20'>P/O:</label>
          <FormInputField
            className='h-8 w-24'
            form={form}
            name={`lineTab.${index}.poNumber`}
          />
          <FormInputField
            className='h-8 w-16'
            form={form}
            name={`lineTab.${index}.poLine`}
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className='grid grid-cols-2 gap-4 space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='w-16'>Date:</label>
          <FormDatePicker
            className='h-8 w-[120px]'
            form={form}
            name={`lineTab.${index}.date`}
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-12'>Orig:</label>
          <FormInputField
            className='h-8 w-[120px]'
            form={form}
            name={`lineTab.${index}.origin`}
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-16'>Voucher:</label>
          <FormInputField
            className='h-8 w-[120px]'
            form={form}
            name={`lineTab.${index}.voucher`}
          />
        </div>
        <div className='flex items-center gap-2 pt-2'>
          <label className='w-36'>Last Purchase/History</label>
          <Search className='cursor-pointer text-orange-500' />
          {/* You can replace this with a button or modal trigger */}
        </div>
      </div>

      {/* Right Section */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Qty YTD:</label>
          <FormInputField
            className='h-8 w-[100px]'
            form={form}
            name={`lineTab.${index}.qtyYtd`}
          />
          <label className='w-[90px] text-right'>$ Purch YTD:</label>
          <FormInputField
            className='h-8 w-[100px]'
            form={form}
            name={`lineTab.${index}.purchYtd`}
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Qty MTD:</label>
          <FormInputField
            className='h-8 w-[100px]'
            form={form}
            name={`lineTab.${index}.qtyMtd`}
          />
          <label className='w-[90px] text-right'>$ Purch MTD:</label>
          <FormInputField
            className='h-8 w-[100px]'
            form={form}
            name={`lineTab.${index}.purchMtd`}
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Qty LYR:</label>
          <FormInputField
            className='h-8 w-[100px]'
            form={form}
            name={`lineTab.${index}.qtyLyr`}
          />
          <label className='w-[90px] text-right'>$ Purch LYR:</label>
          <FormInputField
            className='h-8 w-[100px]'
            form={form}
            name={`lineTab.${index}.purchLyr`}
          />
        </div>
      </div>
    </div>
  )
}

export default PurchaseSummary
