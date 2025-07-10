import FormInputField from '../share/form/FormInputField'

const PurchaseOrderTable = ({ form }) => {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-400 text-left text-sm'>
          <thead className='font-semibold'>
            <tr className='border border-gray-400'>
              <th className='px-3 py-2'>LN#</th>
              <th className='px-3 py-2'>Item Number</th>
              <th className='px-3 py-2'>Received Seq</th>
              <th className='px-3 py-2'>Quantity Received</th>
              <th className='px-3 py-2'>Quantity Invoiced</th>
              <th className='px-3 py-2'>U/M</th>
              <th className='px-3 py-2'>Received Unit Cost</th>
              <th className='px-3 py-2'>Invoiced Unit Cost</th>
              <th className='px-3 py-2'>Cost Per</th>
              <th className='px-3 py-2'>Invoiced Extension</th>
              <th className='px-3 py-2'>Commodity</th>
            </tr>
          </thead>
          <tbody className=''>
            <tr>
              <td className='px-3 py-2'>0001</td>
              <td className='px-3 py-2'>HAF12211</td>
              <td className='px-3 py-2'>002</td>
              <td className='px-3 py-2'>96</td>
              <td className='px-3 py-2'>96</td>
              <td className='px-3 py-2'>EA</td>
              <td className='px-3 py-2'>43.0000</td>
              <td className='px-3 py-2'>43.0000</td>
              <td className='px-3 py-2'>EA</td>
              <td className='px-3 py-2'>4128.00</td>
              <td className='px-3 py-2'>Commodity</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='mt-4 flex gap-20'>
        <div>
          <p className='mb-1 text-sm'>COIL 15o &nbsp; 2-3/8X113 BASIC RS5M</p>
          <p className='mb-3 text-sm'>2 pallet</p>
        </div>

        <div className='flex gap-8'>
          <div>
            <FormInputField
              name='poCostAddAmount'
              placeholder='0.00'
              label=' PO Cost add on Amount'
            />
          </div>
          <div>
            <FormInputField
              name='invoicedGross'
              placeholder='4128.00'
              label='Invoiced Grosst'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PurchaseOrderTable
