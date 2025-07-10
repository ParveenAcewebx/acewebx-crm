import { yupResolver } from '@hookform/resolvers/yup'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActivitiesValidation } from '../form-validations/activitiesValidation'
import LeadsServices from '../../services/Leads/lead'
import FormDatePicker from '../share/form/datePicker'
import FormSelectField from '../share/form/FormSelect'
import FormTextArea from '../share/form/TextArea'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Form } from '../ui/form'
import { Separator } from '../ui/separator'

const ActivitiesList = ({ activitiesData, editId, getActivities }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [allProject, setAllProject] = useState([])
  const [allContact, setAllContact] = useState([])

  /// get project
  const getBudgetBooks = async () => {
    try {
      const response = await LeadsServices.interactionType()
      if (response.status === 200) {
        const modifyProjectData = response?.data?.data.map(item => {
          return {
            label: item.name,
            value: String(item.id)
          }
        })
        setAllProject(modifyProjectData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBudgetBooks()
  }, [])

  useEffect(() => {
    const getContact = async () => {
      try {
        const response = await LeadsServices.contacts()
        if (response.status === 200) {
          const modifyProjectData = response?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setAllContact(modifyProjectData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getContact()
  }, [])
  const getDcs = [
    { label: '0%', value: '0%' },
    { label: '10%', value: '10%' },
    { label: '20%', value: '20%' },
    { label: '30%', value: '30%' },
    { label: '40%', value: '40%' },
    { label: '50%', value: '50%' },
    { label: '60%', value: '60%' },
    { label: '70%', value: '70%' },
    { label: '80%', value: '80%' },
    { label: '90%', value: '90%' },
    { label: '100%', value: '100%' }
  ]
  const form = useForm({ resolver: yupResolver(ActivitiesValidation) })
  const handleAddActivities = () => {
    setOpenDialog(true)
  }
  function formatDateForMySQL(date) {
    const d = new Date(date)
    const pad = n => (n < 10 ? '0' + n : n)
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }
  const onSubmit = async data => {
    const formData = new FormData()
    console.log('datadatadatadata', data)
    formData.append('date', formatDateForMySQL(data.date))
    formData.append('interaction_type_id', Number(data.interaction_type_id))
    formData.append('contact_id', Number(data.contact_id))
    formData.append('notes', data.notes || '')
    formData.append('dcs', data.dcs || '')
    formData.append('lead_id', editId)
    try {
      const response = await LeadsServices.AddinteractionType(formData)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        setOpenDialog(false)
        getActivities()
        form.reset()
      }
    } catch (error) {}
  }
  return (
    <>
      <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
        <CardTitle className='flex justify-between'>
          <div className='!text-lg'>Customer Notes and Activities</div>
          <Button
            onClick={handleAddActivities}
            className='h-8 w-8 rounded-full'
          >
            <Plus className='text-white h-5 w-5' />
          </Button>
        </CardTitle>
      </CardHeader>
      <div className='h-96 overflow-auto p-4'>
        <Card className='w-full rounded-none shadow-none'>
          {activitiesData?.map(item => (
            <>
              <Card className='inner flex grid-cols-2 gap-2 shadow-none'>
                <div className='flex'>
                  <Card className='relative shadow-none'>
                    <div
                      style={{ backgroundColor: '#04aee1' }}
                      className='relative z-10 flex h-3 w-3 items-center justify-center rounded-full'
                    ></div>
                    <Separator
                      className='line absolute ml-1.5'
                      orientation='vertical'
                    />
                  </Card>
                </div>
                <CardContent className='pl-3 pr-0'>
                  <CardDescription className='text-color text-[12px]'>
                    {item?.interactionType?.name}
                  </CardDescription>
                  <p className='text-gray font-[600]'>{item?.notes}</p>
                  <p className='text-sm text-black'>
                    {item?.contact?.name} at{' '}
                    {new Date(item?.created_at).toISOString().slice(0, 10) +
                      ' -' +
                      new Date(item?.created_at).toTimeString().slice(0, 8)}
                  </p>
                  <span className='right-2 top-2 text-xs font-medium text-gray-400'></span>
                </CardContent>
              </Card>
            </>
          ))}
        </Card>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className='max-h-[90vh] overflow-y-auto transition-all duration-300'>
            <DialogHeader>
              <DialogTitle>Add Activity</DialogTitle>
              <DialogDescription>
                Add notes or interactions related to this customer.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormSelectField
                  form={form}
                  name='interaction_type_id'
                  label='Interaction Type'
                  placeholder='Select Interaction Type'
                  options={allProject}
                />
                <div className='mt-3'>
                <FormSelectField
                  form={form}
                  name='contact_id'
                  label='Contact'
                  placeholder='Select Contact'
                  options={allContact}
                />
                </div>
                <div className='mt-3'>
                <FormDatePicker form={form} name='date' label=' Date' />
                </div>
                <div className='mt-3'>
                <FormTextArea
                  form={form}
                  name='notes'
                  label='Notes'
                  type='text'
                  className='rounded-6 !min-h-12 bg-white !pr-7 pt-3 !shadow-[0_0_15px_-13px_black] shadow-slate-100'
                />
                </div>
                <div className='mt-3'>
                <FormSelectField
                  name='dcs'
                  label='dcs'
                  placeholder='Select dcs'
                  options={getDcs}
                />
                </div>
                <div className='mt-4 flex justify-end'>
                  <Button type='submit' className='site-button'>Submit</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default ActivitiesList
