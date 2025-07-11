'use client'
import api from '@/lib/api'
import TeamServices from '@/services/Crm/team'
import PipelineStatusServices from '@/services/Pipeline/pipeline'
import { UsersServices } from '@/services/Settings/UserSetting'
import { Plus, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import BudgetBooksServices from '../../services/BudgetBook/budgetBook'
import EngineerServices from '../../services/Leads/engineer'
import LeadsServices from '../../services/Leads/lead'
import { LeadFormDialog } from '../modal/lead-form-modal'
import SalesPersonSheet from '../modal/salePerson-sheet'
import FormCheckBox from '../share/form/CheckBox'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import FormSelectField from '../share/form/FormSelect'
import SelectFilter from '../share/form/SelectFilter'
import { DealConfidenceScore } from '../static-Values'
import { errorMessage } from '../ToasterMessage'
import { Button } from '../ui/button'

const AddLeadForm = ({ form, dashBoard, editId }) => {
  
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formType, setFormType] = useState(null)
  const [companyData, setCompanyData] = useState([])
  const [teamData, setTeamData] = useState([])
  const [pipelineData, setPipelineData] = useState([])
  const [engineerData, setEngineerData] = useState([])
  const [salePerson, setSalePerson] = useState([])
  const [budgetBook, setBudgetBook] = useState([])
  const [contact, setContact] = useState([])
  const [assignTeam, setAssignTeam] = useState([])
  const [leadStatus, setLeadStatus] = useState([])
  const [allProject, setAllProject] = useState([])
  const [teamMember, setTemMember] = useState([])
  const [tag, setTag] = useState([])
  const { watch, setValue } = form
  const selectCompany = watch('company_id')
  const selectDepartment = watch('leadTeamId')

  const priorityOption = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ]

  /// get project
  const getInteractionType = async () => {
    try {
      const response = await LeadsServices.interactionType()
      if (response.status === 200) {
        const modifyProjectData = response?.data?.data.map(item => {
          return {
            label: item.name,
            value: item.name
          }
        })
        setAllProject(modifyProjectData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getInteractionType()
  }, [])

  // Get department data to assign a team
  const getDepartmentData = async () => {
    try {
      const response = await TeamServices.getAllTeam()
      if (response.status === 200) {
        setTeamData(response?.data?.data?.data)
      }
    } catch (error) {
      console.log(error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }
  useEffect(() => {
    getDepartmentData()
  }, [])

  const getPipeline = async () => {
    try {
      const response = await PipelineStatusServices.getPipelineStatus()
      if (response.status === 200) {
        setPipelineData(response?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getPipeline()
  }, [])

  const selectedPipeline = watch('pipelineType')
  const pipelineStatu = useMemo(() => {
    if (!selectedPipeline) return []

    const selected = pipelineData.find(p => p.id == String(selectedPipeline))
    // if (!editId) {
    //   form.setValue(
    //     'pipelineStatus',
    //     selected?.statusGroup?.pipelineStatus[0]?.id
    //   )
    // }
    return (
      selected?.statusGroup?.pipelineStatus?.map(status => ({
        label: status.status,
        value: String(status.id)
      })) || []
    )
  }, [selectedPipeline, pipelineData])

  useEffect(() => {
    // setValue('pipelineStatus', '')
  }, [selectedPipeline, setValue])

  const getCompanies = async () => {
    try {
      const response = await LeadsServices.companies()
      if (response.status === 200) {
        setCompanyData(response?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getCompanies()
  }, [])

  const getBudgetBooks = async () => {
    try {
      const response = await BudgetBooksServices.budgetBooks()
      if (response.status === 200) {
        setBudgetBook(response?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getBudgetBooks()
  }, [])

  const getEngineer = async () => {
    try {
      const response = await EngineerServices.engineers()
      if (response.status === 200) {
        setEngineerData(response?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getEngineer()
  }, [])

  const getUsers = async () => {
    try {
      const response = await UsersServices.users()
      if (response.status === 200) {
        setSalePerson(response?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // fetch data contact by Company
  const fetchContactsByCompany = async () => {
    if (!selectCompany) {
      setContact([])
      return
    }
    try {
      const response = await LeadsServices.companyContact(selectCompany)
      if (response.status === 200) {
        setContact(response.data?.data || [])
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    fetchContactsByCompany()
  }, [selectCompany])

  // fetch data department by team assign
  const fetchDepartmentByTeamAssign = async () => {
    if (!selectDepartment) {
      setAssignTeam([])
      return
    }
    try {
      const response = await LeadsServices.leadTeamContact(selectDepartment)
      if (response.status === 200) {
        setAssignTeam(response.data?.data.contactDetails || [])
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    fetchDepartmentByTeamAssign()
  }, [selectDepartment])

  const handleOpenDialog = type => {
    setFormType(type)
    setDialogOpen(true)
  }
  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  const handleProjectSelect = project => {
    form.setValue('project_id', String(project.id))
  }

  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [leadstatus, tagRes] = await Promise.all([
          api.get('/lead-statuses?limit=100'),
          api.get('/tags')
        ])
        if (leadstatus.status === 200) {
          const modifyProjectData = leadstatus?.data?.data.map(item => {
            return {
              label: item.title,
              value: String(item.id)
            }
          })
          if (!editId) {
            const newData = modifyProjectData?.find(
              item => item?.label.toLowerCase() == 'new'
            )
            form.setValue('lead_status_id', Number(newData?.value))
          }
          setLeadStatus(modifyProjectData)
        }

        if (tagRes.status === 200) {
          const modifyProjectData = tagRes?.data?.data.map(item => {
            return {
              label: item.title,
              value: String(item.id)
            }
          })

          setTag(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])
  const fetchTeamMembers = async () => {
    try {
      const response = await api.get(`/get-lead-team-members/${editId}`)
      setTemMember(response?.data?.data)
    } catch (error) {}
  }
  useEffect(() => {
    fetchTeamMembers()
  }, [])

  
  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormSelectField
          form={form}
          name='dcs'
          label='Deal Confidence Score'
          placeholder='Select Deal Confidence Score'
          options={DealConfidenceScore}
        />
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Project
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                  onClick={() => handleOpenDialog('project')}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 w-24 gap-1 rounded bg-cyan-400 p-2 text-slate-600 shadow-none'
                  onClick={() => handleOpenDialog('search')}
                >
                  <Search className='mr-1 h-3 w-3' /> Search
                </Button>
              </div>
            )}
          </div>
          <SelectFilter
            form={form}
            name='project_id'
            placeholder='Select Project'
            options={
              budgetBook.length > 0
                ? budgetBook.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Company
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                  onClick={() => handleOpenDialog('company')}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
              </div>
            )}
          </div>
          <SelectFilter
            form={form}
            name='company_id'
            placeholder='Select Company'
            options={
              companyData.length > 0
                ? companyData.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Contact
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                  onClick={() => handleOpenDialog('contact')}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
              </div>
            )}
          </div>
          <SelectFilter
            form={form}
            name='contact_id'
            placeholder='Select Contact'
            options={
              contact.length > 0
                ? contact.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : [{ label: 'No data available', value: '', disabled: true }]
            }
          />
        </div>

        {/* <div className='mb-4 mt-4 grid'> */}
        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Sales Person
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <SalesPersonSheet getUsers={getUsers} />
              </div>
            )}
          </div>
          <SelectFilter
            form={form}
            name='sale_person_id'
            placeholder='Select Sales Person'
            options={
              salePerson.length > 0
                ? salePerson
                .filter(data => data.status === 'active') // show only active users
                .map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Engineer
            </label>
            {!dashBoard && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  onClick={() => handleOpenDialog('engineer')}
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
              </div>
            )}
          </div>
          <SelectFilter
            form={form}
            placeholder='Select Engineer'
            name='engineer_id'
            options={
              engineerData.length > 0
                ? engineerData.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
        </div>
        <FormDatePicker form={form} name='date_record' label='Date Recieved' />
        <FormDatePicker form={form} name='due_date' label='Due Date' />
        <FormDatePicker
          form={form}
          name='nextStepDate'
          label='Next Step Date'
        />

        <FormSelectField
          form={form}
          name='nextAction'
          label='Next Step'
          placeholder='Select Next Step'
          options={allProject}
        />

        <div className='space-y-1'>
          <div className='flex items-center gap-5'>
            <label className='text-sm font-medium !text-gray-800 text-muted-foreground'>
              Select Team
            </label>
            {!dashBoard && editId && (
              <div className='flex gap-2'>
                <Button
                  type='button'
                  size='sm'
                  className='h-6 gap-1 rounded bg-primary p-2 text-white shadow-none'
                  onClick={() => handleOpenDialog('team')}
                >
                  <Plus className='mr-1 h-3 w-3' /> Add
                </Button>
              </div>
            )}
          </div>
          {editId ? (
            <>
              <FormMultiSelectField
                form={form}
                name='leadTeamMembers'
                placeholder='Select Team'
                options={
                  teamMember.length > 0
                    ? teamMember.map(data => ({
                        label: data.name,
                        value: String(data.user_id)
                      }))
                    : []
                }
              />
            </>
          ) : (
            <>
              {' '}
              <SelectFilter
                form={form}
                name='leadTeamId'
                placeholder='Select Team'
                options={
                  teamData.length > 0
                    ? teamData
                        .filter(data => data.status === 'active') // show only active users
                        .map(data => ({
                          label: data.name,
                          value: String(data.id)
                        }))
                    : []
                }
              />
            </>
          )}
        </div>

        {/* <FormMultiSelectField
          form={form}
          name='defaultAssignTeam'
          options={
            assignTeam?.length > 0
              ? assignTeam.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : [{ label: 'No data available' }]
          }
        /> */}
        <SelectFilter
          form={form}
          name='defaultAssignTeam'
          label='Default Assign Team Member'
          placeholder='Select Default Assign Team Member'
          options={
            assignTeam.length > 0
              ? assignTeam.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        <FormMultiSelectField
          form={form}
          placeholder='Select Tags'
          name='leadTags'
          label='Tags'
          options={tag}
        />
        {editId ? (
          <>
            <FormSelectField
              form={form}
              name='lead_status_id'
              placeholder='Select Lead Status'
              label='Lead Status'
              options={leadStatus}
            />
            <FormInputField
              placeholder='Enter Lead Amount'
              form={form}
              name='amount'
              label='Lead Amount'
              type='number'
            />
          </>
        ) : (
          ''
        )}

        <FormSelectField
          form={form}
          name='priority'
          placeholder='Select Priority'
          options={priorityOption}
          label='Priority'
        />

        <SelectFilter
          form={form}
          name='pipelineType'
          placeholder='Select Pipeline'
          options={
            pipelineData.length > 0
              ? pipelineData.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
          label='Pipeline'
        />
        <FormMultiSelectField
          form={form}
          placeholder='Select Secondary Emails'
          name='secondary_contact'
          label='Secondary Contact'
          options={
            salePerson.length > 0
              ? salePerson
              .filter(data => data.status === 'active') // show only active users
              .map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        {editId ? (
          <SelectFilter
            form={form}
            name='pipelineStatus'
            placeholder='Select Status'
            options={pipelineStatu}
            label='Pipeline Status'
            disabled={!selectedPipeline}
          />
        ) : (
          ''
        )}
      </div>
      <div>
        <FormCheckBox
          name='isDelayed'
          // label='Delay'
          className='mx-2 my-5 !text-base'
          form={form}
          items={[
            {
              value: 'true',
              label: 'Delay Lead'
            }
          ]}
        />
      </div>
      <LeadFormDialog
        id={editId}
        getBudgetBooks={getBudgetBooks}
        fetchTeamMembers={fetchTeamMembers}
        getCompanies={getCompanies}
        fetchContactsByCompany={fetchContactsByCompany}
        getEngineer={getEngineer}
        // getUsers={getUsers}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formType={formType}
        // label={`Add ${formType?.charAt(0).toUpperCase() + formType?.slice(1)}`}
        handleCloseDialog={handleCloseDialog}
        handleProjectSelect={handleProjectSelect}
      />
    </>
  )
}

export default AddLeadForm
