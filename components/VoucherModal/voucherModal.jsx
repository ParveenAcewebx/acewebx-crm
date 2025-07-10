'use clinet'
import { TermsCodesServices } from '@/services/Settings/TermsCodes'
import { CircleArrowLeft, CirclePlus, Save, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import FormCheckBox from '../share/form/CheckBox'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import PurchaseOrderTable from './purchaseOrderTable'

const VoucherModal = ({ form, setIsVoucherModal, isVoucherModalOpen }) => {
  const page = 0
  const length = 10
  const [termsCode, setTermsCode] = useState([])

  // fetch list  termscode data
  const getTermsCodeList = async () => {
    try {
      const res = await TermsCodesServices.GetAllTermsCodes(page, length)
      if (res?.status === 200) {
        setTermsCode(res?.data?.data?.records)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    getTermsCodeList()
  }, [page, length])

  return (
    <Dialog
      open={isVoucherModalOpen}
      onOpenChange={open => setIsVoucherModal(open)}
    >
      <DialogContent className='max-h-screen w-[80vw] max-w-[80vw] overflow-y-auto scrollbar-thin'>
        <FormProvider {...form}>
          <div className='mt-4 flex gap-10 rounded-md border p-2'  style={{ backgroundColor: "rgb(235, 239, 255)" }}>
            <div className='flex gap-2'>
              <CircleArrowLeft />
              <div className='text-xl font-semibold'>Voucher Entry</div>
            </div>
            <div className='flex gap-2'>
              <CirclePlus />
              <Save />
              <Trash />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='relative overflow-hidden rounded-md '>
              <img src='/images/left.png' className='z-0 h-auto w-full' />
            </div>

            <div className='rounded-md border p-2'  style={{ backgroundColor: "rgb(235, 239, 255)" }}>
              <div className='rounded-md border bg-white p-10'>
                <div className='text-xl font-semibold text-gray-600'>Terms</div>
                <div className='mt-2 grid grid-cols-2 gap-4'>
                  <FormSelectField
                    name='termsCode'
                    placeholder='Select Terms Code'
                    options={
                      termsCode?.length > 0
                        ? termsCode?.map(data => ({
                            label: data.code,
                            value: String(data.id)
                          }))
                        : []
                    }
                    label='Terms Code'
                  />
                  <FormDatePicker
                    name='dueDate'
                    placeholder='Choose date'
                    label='Due Date'
                  />
                </div>
              </div>
              <div className='mt-4 rounded-md border bg-white p-10'>
                <div className='text-xl font-semibold text-gray-600'>
                  Currency
                </div>
                <div className='mt-2 text-sm'>Account</div>
                <div className='grid grid-cols-2 gap-4'>
                  <FormInputField
                    name='currency'
                    placeholder='USD'
                    label='Currency'
                  />
                  <FormInputField
                    name='exchangeRate'
                    placeholder='1.00000'
                    label='Exchange Rate'
                  />
                </div>
                <FormCheckBox
                  name='foreignCurrency'
                  className='mt-2 !text-base'
                  form={form}
                  items={[
                    {
                      value: 'true',
                      label: 'Foreign Currency?'
                    }
                  ]}
                />
              </div>
            </div>
          </div>
          <div className='rounded-md border  p-5'  style={{ backgroundColor: "rgb(235, 239, 255)" }}>
            <h2 className='mb-4 text-xl font-semibold'>Purchase Order</h2>
            <PurchaseOrderTable form={form} />
          </div>
          <div className='flex justify-center'>
            <Button className='w-40' onClick={() => setIsVoucherModal(false)}>
              Close
            </Button>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default VoucherModal
