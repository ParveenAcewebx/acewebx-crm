import InventoryServices from '@/services/Inventory/Inventory'
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import SelectFilter from '../share/form/SelectFilter'

const ItemTab = ({ index, form }) => {
  const { control, setValue, getValues, watch } = form
  // State to hold the list of warehouses
  const [warehouses, setWarehouses] = useState([])
  const materialItems = useWatch({
    control,
    name: 'lineTab'
  })
  const hedWarehouse = watch('warehouse')
  const filterwareHouse = warehouses?.find(item => item?.id == hedWarehouse)
  const reqDate = watch('wanted')
  const excepted = watch('dateOrdered')
  useEffect(() => {
    materialItems?.forEach((item, index) => {
      if (reqDate) {
        if (getValues(`lineTab.${index}.reqDate`) !== reqDate) {
          setValue(`lineTab.${index}.reqDate`, reqDate)
        }
      }
      if (excepted) {
        if (getValues(`lineTab.${index}.exptDate`) !== excepted) {
          setValue(`lineTab.${index}.exptDate`, excepted)
        }
      }
      if (filterwareHouse) {
        if (getValues(`lineTab.${index}.wareHouse`) !== filterwareHouse?.name) {
          setValue(`lineTab.${index}.wareHouse`, filterwareHouse?.name)
        }
      }
    })
  }, [reqDate, excepted, filterwareHouse])
  // Fetch warehouses once on mount
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await InventoryServices.AllWarehouse()
        if (response?.status == 200) {
          setWarehouses(response?.data?.data || [])
        }
      } catch (error) {
        console.error('Error fetching Warehouses:', error)
      }
    }
    fetchWarehouses()
  }, [])
  return (
    <div className='grid grid-cols-6 gap-2 text-sm'>
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.onOrder`}
        placeholder='On Order'
        label='On Order'
      />
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.bo`}
        placeholder='B/O'
        label='B/O'
      />
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.other`}
        placeholder=''
        label='Other'
      />
      <FormDatePicker
        className='m-0 h-8'
        form={form}
        placeholder='Requested Date'
        label='Requested Date'
        name={`lineTab.${index}.reqDate`}
      />
      {/* <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.orderTotal`}
        placeholder='Order Total'
        label='Order Total'
      /> */}

      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.wareHouse`}
        placeholder='Warehouse'
        label='Warehouse'
        disable
      />
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.costPer`}
        placeholder='Cost Per'
        label='Cost Per'
      />
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.other1`}
        placeholder=''
        label='Other'
      />
      <FormDatePicker
        className='m-0 h-8'
        form={form}
        name={`lineTab.${index}.exptDate`}
        placeholder='Excepted Date'
        label='Excepted Date'
      />
      <FormDatePicker
        className='h-8'
        form={form}
        name={`lineTab.${index}.receToDate`}
        placeholder='Received To Date'
        label='Received To Date'
      />

      <div className='col-span-2 flex items-center'>BX = 100 EA</div>
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.other2`}
        placeholder=''
        label='other'
      />
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.openTotal`}
        placeholder='Open Total'
        label='Open Total'
      />
   
      {/* <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.oeLinked`}
        placeholder='OE Linked'
      /> */}

      <SelectFilter
        className='h-8'
        form={form}
        name={`lineTab.${index}.transfer`}
        label='Transfer To Warehouse'
        placeholder='Transfer To Warehouse'
        options={warehouses.map(ware => ({
          value: String(ware.id),
          label: ware.name
        }))}
      />
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.origin`}
        placeholder='Origin'
        label='Origin'
      />
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.other3`}
        placeholder=''
        label='Other'
      />
      {/* <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.vessel`}
        placeholder='Vessel'
      /> */}
      <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.discpt`}
        placeholder='Dis PCT'
        label='Dis PCT'
      />

      {/* <FormInputField
        className='h-8'
        form={form}
        name={`lineTab.${index}.term`}
        placeholder='Terms'
        label='Terms'
      /> */}
      <div className='col-span-4'>
        {/* <div className='flex gap-4'>
          <FormCheckBox
            name={`lineTab.${index}.isActive`}
            form={form}
            items={[
              { label: 'Discrepancy?', value: 'discrepeancy' },
              { label: 'Discrepancy Open?', value: 'discrepeancyOpen' },
              { label: 'Ovrd Header Ltd', value: 'ovrdHeader' }
            ]}
            direction='row'
          />
        </div> */}
      </div>
    </div>
  )
}

export default ItemTab
