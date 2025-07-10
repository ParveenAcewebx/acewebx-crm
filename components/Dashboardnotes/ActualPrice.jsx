'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Edit, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LeadsServices from '../../services/Leads/lead'
import { ProjectCostValidation } from '../form-validations/ProjectCostValidation'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import CostFormfield from './CostFormfield'

const ActualPrice = ({ editId }) => {
  const [priceData, setPriceData] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [priceEditId, setPriceEditId] = useState(null)
  const form = useForm({ resolver: yupResolver(ProjectCostValidation) })
  const getPriceData = async () => {
    try {
      const res = await LeadsServices.projectPrice(editId)
      if (res?.status === 200) {
        setPriceData(res?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    getPriceData()
  }, [])

  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('cmu', data.cmu)
    formData.append('id', priceEditId)
    formData.append('co', data.co)
    formData.append('dk', data.dk)
    formData.append('dm', data.dm)
    formData.append('mc', data.mc)
    formData.append('po', data.po)
    formData.append('rf', data.rf)
    formData.append('rtu', data.rtu)
    formData.append('sp', data.sp)
    formData.append('st', data.st)
    formData.append('stl', data.stl)
    formData.append('swm', data.swm)
    formData.append('td', data.td)
    formData.append('type', 'price')
    formData.append('up', data.up)
    formData.append('lead_id', editId)
    try {
      const response = await LeadsServices.addCost(formData)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        setOpenDialog(false)
        setPriceEditId(null)
        getPriceData()
        form.reset()
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const handleEditCost = priceData => {
    setPriceEditId(priceData?.id)
    form.reset(priceData)
    setOpenDialog(true)
  }

  const handleAddActivities = () => {
    setOpenDialog(true)
  }
  return (
    <>
      <CardHeader className='theme-bg-light-rgba min-h-14 !p-0'>
        <CardTitle className='border-color-grey flex justify-between gap-4 border-b p-3'>
          <div className='!text-lg'>Actual Project Price/SQFT </div>
          <div className='flex justify-between gap-4'>
            <Button
              onClick={handleAddActivities}
              className='hidden h-8 w-8 rounded-full'
            >
              <PlusCircle className='h-5 w-5 text-white' />
            </Button>
            <Button
              onClick={() => handleEditCost(priceData)}
              className='hidden h-8 w-8 rounded-full'
            >
              <Edit className='h-5 w-5 text-white' />
            </Button>
          </div>
        </CardTitle>
        <div className='border-color-grey !m-0 flex justify-between border-b bg-white px-3 py-2'>
          <p className='font-medium'>Segment</p>
          <p className='font-medium'>Price/Sqft</p>
        </div>
      </CardHeader>
      <div className='h-96 overflow-auto p-0'>
        <Card className='w-full overflow-auto rounded-none shadow-none'>
          <CardContent className='p-0'>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>SP</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.sp}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>TD</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.td}</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>SWM</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p>{priceData?.swm}</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>UP</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.up}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>RF</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.rf}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>CO</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.co}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>DK</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.dk}$</p>
              </CardContent>
            </div>{' '}
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>ST</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.st}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>DM</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.dm}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>PO</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.po}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>CMU</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p>{priceData?.cmu}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>STL</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.stl}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>MC</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p>{priceData?.mc}$</p>
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>RTU</CardDescription>
              <CardContent className='text-dark-color grid grid-cols-2 gap-3 p-0 text-sm font-medium'>
                <p> {priceData?.rtu}$</p>
              </CardContent>
            </div>
          </CardContent>
        </Card>

        <Dialog
          open={openDialog}
          onOpenChange={isOpen => {
            setOpenDialog(isOpen)
            if (!isOpen) {
              setPriceEditId(null)
            }
          }}
        >
          <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
            <DialogHeader>
              <DialogTitle>
                {priceEditId !== null
                  ? ' Project Price SQFT / Category'
                  : ' Project Price SQFT / Category'}
              </DialogTitle>
            </DialogHeader>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CostFormfield form={form} />
                <div className='mt-4 flex justify-end'>
                  <Button type='submit' className='site-button'>
                    {priceEditId !== null ? 'Update' : 'Submit'}{' '}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default ActualPrice
