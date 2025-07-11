import api from '@/lib/api'
import { useEffect, useState } from 'react'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { FinancesType, PriceBy } from '../static-Values'
import { Separator } from '../ui/separator'

const HeaderTab = () => {
  const [warehouse, setWarehouse] = useState([])

  useEffect(() => {
    const fetchWarehouse = async () => {
      const response = await api.get(`/where-houses?limit=100`)
      if (response.status === 200) {
        const modifyProjectData = response?.data?.data.map(item => {
          return {
            label: item.name,
            value: String(item.id)
          }
        })
        setWarehouse(modifyProjectData)
      }
    }
    fetchWarehouse()
  }, [])
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center gap-2'>
          <label className='w-40 text-sm font-medium text-gray-700'>
            Warehouse:
          </label>
          <FormSelectField
            className='w-72'
            name='headerTab.warehouse'
            options={warehouse}
          />
        </div>
      </div>
      <Separator className='mt-6' />

      {/* FINANCES Section */}
      <div className='mt-6'>
        <h2 className='mb-2 text-lg font-semibold text-gray-800'>Finances</h2>
        <div className='grid grid-cols-1 gap-4'>
      

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Terms Code:
            </label>
            <FormInputField className='w-72' name='headerTab.termsCode' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Tax Code:
            </label>
            <FormInputField className='w-72' name='headerTab.taxCode' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Price By:
            </label>
            <FormSelectField
              className='w-72'
              name='headerTab.priceBy'
              options={PriceBy}
            />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Sales 1:
            </label>
            <FormInputField className='w-72' name='headerTab.sales1' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-40 text-sm font-medium text-gray-700'>
              Finances Type:
            </label>
            <FormSelectField
              className='w-72'
              name='headerTab.financesType'
              options={FinancesType}
            />
          </div>
        </div>
      </div>

      <Separator className='mt-6' />

      {/* CONTACT Section */}
      <div className='mt-6'>
        <h2 className='mb-2 text-lg font-semibold text-gray-800'>Contact</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className='mt-3 flex items-center gap-4'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Order By:
              </label>
              <FormInputField className='w-72' name='headerTab.orderBy' />
            </div>

            <div className='mt-3 flex items-center gap-4'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Phone:
              </label>
              <FormInputField className='w-72' name='headerTab.phone' />
            </div>

            <div className='mt-3 flex items-center gap-4'>
              <label className='w-40 text-sm font-medium text-gray-700'>
                Email:
              </label>
              <FormInputField className='w-72' name='headerTab.email' />
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <Separator className='mt-6' />
    </>
  )
}

export default HeaderTab
