import FormDatePicker from '@/components/share/form/datePicker'
import FormInputField from '@/components/share/form/FormInputField'
import FormRadioButton from '@/components/share/form/FormInputRadioButtom'
import FormInputSwitch from '@/components/share/form/FormInputSwitch'
import FormInputSwitchGroup from '@/components/share/form/FormInputSwitchGroup'
import FormScopeToggle from '@/components/share/form/FormInputSwitchMultipleScop'
import FormSelectField from '@/components/share/form/FormSelect'
import FormTextArea from '@/components/share/form/TextArea'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import BudgetBookService from '@/services/BudgetBook/budget-book-api'
import BudgetBooksServices from '@/services/BudgetBook/budgetBook'
import CustomerService from '@/services/BudgetBook/customer-api'
import { ContactServices } from '@/services/Crm/project'
import LeadsServices from '@/services/Leads/lead'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import {
  addersDesignField,
  bldgDataTable,
  commissionFields,
  hrSealfieldData,
  hrsSeals2fieldData,
  hrsSealsfieldData,
  limitsArray,
  pricingDataTable,
  pricingGDataTable,
  totalFields
} from '../../table/budgetTable'

function BudgetGeneralTab({ form, budgetId, leadIds }) {
  console.log('leadIds', leadIds)

  const [allProject, setAllProject] = useState([])
  const [allContacts, setAllContacts] = useState([])
  const [allScop, setAllScop] = useState([])
  const [customer, setCustomer] = useState([])
  const [enginer, setEnginer] = useState([])
  const [contractor, setContractor] = useState([])
  const [drawing, setDarwing] = useState([])
  const [keyArea, setKeyArea] = useState([])
  const [zipCode, setZipCode] = useState([])
  const [zipData, setZipData] = useState([])
  const [leadProject, setLeadProject] = useState([])
  const [leadData, setLeadData] = useState([])

  const { control, setValue, getValues } = form
  const searchParams = useSearchParams()
  const leadId = searchParams.get('leadId')

  // Set initial lead project ID if leadId exists
  useEffect(() => {
    if (leadId) {
      form.setValue('lead_project_id', leadId)
    }
  }, [leadId, form])

  const selectedLeadId = useWatch({
    control,
    name: 'lead_project_id'
  })
  const selectedProject = useWatch({
    control,
    name: 'budget_book_id'
  })
  const sites = useWatch({
    control,
    name: 'sites'
  })

  const projectId = form.watch('budget_book_id')
  const taxableNot = useWatch({ name: 'tax' })
  const getZipRate = useWatch({ name: 'zip_id' })

  useEffect(() => {
    const data = zipData?.filter(item => item.id == getZipRate)
    setValue('taxRate', data?.map(item => item?.rate)[0] || 0)
  }, [getZipRate, zipData, setValue])

  // Populate budget_book_id based on leadIds
  useEffect(() => {
    console.log('useEffect for budget_book_id triggered', {
      selectedLeadId,
      leadData,
      leadIds
    })
    if (leadIds && leadData.length > 0) {
      const selectedLead = leadData.find(lead => lead.id === parseInt(leadIds))
      if (selectedLead) {
        console.log(
          'selectedLead for budget_book_id:',
          selectedLead?.project?.id
        )
        setValue('budget_book_id', String(selectedLead?.project?.id) || '')
      }
    }
  }, [setValue, leadData, leadIds])

  // Original useEffect for other fields
  useEffect(() => {
    console.log('useEffect for other fields triggered', {
      selectedLeadId,
      leadData
    })
    if (selectedLeadId && leadData.length > 0) {
      const selectedLead = leadData.find(
        lead => lead.id === parseInt(selectedLeadId)
      )
      if (selectedLead) {
        console.log('selectedLead for other fields:', selectedLead)
        setValue('address', selectedLead.project?.address || '')
        setValue('city', selectedLead.project?.city || '')
        setValue('state', selectedLead.project?.state || '')
        setValue('zip_id', selectedLead.project?.zip || '')
        setValue('customer_id', selectedLead.company?.id || '')
        setValue('contact_id', selectedLead.contact?.name || '')
        setValue('contact_email', selectedLead.contact?.email || '')
      }
    }
  }, [selectedLeadId, leadData, setValue])

  useEffect(() => {
    if (selectedProject && allProject.length > 0) {
      setValue('job_no', selectedProject || '')
    }
  }, [selectedProject, allProject, setValue])

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          zipCodeRes,
          areaRes,
          submRes,
          contractorRes,
          engRes,
          customerRes,
          budgetScopeRes,
          contactRes,
          budgetRes,
          leadProjectRes
        ] = await Promise.all([
          api.get('taxes?limit=100'),
          api.get('budget-key-areas'),
          api.get('/submittals?limit=100'),
          ContactServices.ContractorComponents(),
          CustomerService.GetEngineers(),
          CustomerService.GetCustomer(),
          api.get('/budget-category'),
          BudgetBookService.GetContacts(),
          BudgetBooksServices.budgetBooks(),
          LeadsServices.getleads()
        ])

        if (zipCodeRes.status === 200) {
          setZipData(zipCodeRes?.data?.data)
          const modifyProjectData = zipCodeRes?.data?.data.map(item => ({
            label: `${item.zipcode}`,
            value: String(item.id)
          }))
          setZipCode(modifyProjectData)
        }
        if (areaRes.status === 200) setKeyArea(areaRes.data.data)
        if (submRes.status === 200) setDarwing(submRes.data.data)
        if (contractorRes.status === 200)
          setContractor(contractorRes?.data?.data)
        if (engRes.status === 200) {
          const modifyProjectData = engRes?.data?.data.map(item => ({
            label: item.name,
            value: String(item.id)
          }))
          setEnginer(modifyProjectData)
        }
        if (customerRes.status === 200) {
          const modifyProjectData = customerRes?.data?.data.map(item => ({
            label: item.name,
            value: String(item.id)
          }))
          setCustomer(modifyProjectData)
        }
        if (budgetScopeRes.status === 200) setAllScop(budgetScopeRes?.data)
        if (contactRes.status === 200) {
          const modifyProjectData = contactRes?.data?.data.map(item => ({
            label: item.name,
            value: String(item.id)
          }))
          setAllContacts(modifyProjectData)
        }
        if (budgetRes.status === 200) {
          const modifyProjectData = budgetRes?.data?.data.map(item => ({
            label: item.name,
            value: String(item.id)
          }))
          setAllProject(modifyProjectData)
        }
        if (leadProjectRes?.status === 200) {
          setLeadData(leadProjectRes?.data?.data)
          const modifyProjectData = leadProjectRes?.data?.data.map(item => ({
            label: item?.project?.name,
            value: String(item.id)
          }))
          setLeadProject(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  // Set value for the Engineer field based on projectId
  useEffect(() => {
    const setEngineerField = async () => {
      if (projectId) {
        const response = await api.get(`/get-projects-engineer/${projectId}`)
        if (response?.status === 200) {
          const data = response?.data?.data
          setValue('engineer', data?.name)
          setValue('engineer_id', data?.id)
        }
      }
    }
    setEngineerField()
  }, [projectId])

  // Set value for the Address, City, State, and ZIP fields
  useEffect(() => {
    const setAddressField = async () => {
      const response = await BudgetBooksServices.budgetBooks()
      if (response?.status === 200) {
        const data = response?.data?.data
        const filteredData = data?.filter(item => item.id == projectId)
        const setData = filteredData?.map(item => {
          setValue('address', item?.address)
          setValue('city', item?.city)
          setValue('state', item?.state)
          setValue('zip_id', item?.zip)
        })
      }
    }
    setAddressField()
  }, [projectId])

  return (
    <div className='general-tab'>
      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormSelectField
          name='budget_book_id'
          form={form}
          placeholder='Select Project'
          label='Enter the project'
          options={allProject}
        />
        {leadId || leadIds || budgetId ? (
          <></>
        ) : (
          <FormSelectField
            name='lead_project_id'
            form={form}
            placeholder='Select Lead Assign'
            label='Lead Assign'
            options={leadProject}
          />
        )}
        <FormSelectField
          name='customer_id'
          form={form}
          placeholder=''
          label='Customer'
          options={customer}
        />

        <FormInputField
          name='contact_id'
          form={form}
          placeholder=''
          label='Contact'
          type='text'
          readOnly
        />

        <FormInputField
          name='contact_email'
          form={form}
          placeholder=''
          label='Contact Email'
          type='text'
          readOnly
        />
      </div>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormDatePicker form={form} name='quote_date' label='Quote Date' />
        <FormInputField
          placeholder=''
          form={form}
          name='job_no'
          label='Job #'
          type='number'
        />
      </div>

      <fieldset className='border-color-grey mt-2 rounded border border-solid border-gray-300 py-4 pe-4 ps-4'>
        <legend>Address Details:</legend>
        <div className='mt-4 grid grid-cols-4 gap-4'>
          <FormInputField
            placeholder='Address'
            form={form}
            name='address'
            label='Address'
            type='text'
            readOnly={true}
          />
          <FormInputField
            placeholder='City'
            form={form}
            name='city'
            label='City'
            type='text'
            readOnly={true}
          />
          <FormInputField
            placeholder='State'
            form={form}
            name='state'
            label='State'
            type='text'
            readOnly={true}
          />
          <FormSelectField
            name='zip_id'
            form={form}
            placeholder=''
            label='Zip Code'
            options={zipCode}
            disabled
          />
        </div>
      </fieldset>

      <div className='pricing-data mt-8'>
        <h5 className='text-dark-color text-lg font-semibold'>Pricing Data</h5>
        <div className='mt-4 grid grid-cols-5 gap-4'>
          <div className='relative flex w-full'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <div className='w-full'>
              <FormInputField
                name='sw_margin'
                className=''
                form={form}
                placeholder='SW Margin'
                label='SW Margin'
                type='number'
              />
            </div>
          </div>
          <div className='relative flex'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <div className='w-full'>
              <FormInputField
                placeholder='UP Margin'
                form={form}
                name='up_margin'
                label='UP Margin'
                type='number'
              />
            </div>
          </div>
          <div className='relative flex'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <div className='w-full'>
              <FormInputField
                placeholder='SP Margin'
                form={form}
                name='sp_margin'
                label='SP Margin'
                type='number'
              />
            </div>
          </div>
          <div className='relative flex'>
            <span className='symbol absolute self-center text-sm font-semibold'>
              %
            </span>
            <div className='w-full'>
              <FormInputField
                placeholder='MC Margin'
                form={form}
                name='mc_margin'
                label='MC Margin'
                type='number'
              />
            </div>
          </div>
          <div className='mt-5 flex justify-center gap-6'>
            <FormInputSwitch name='is_pricing' label='Budget Only' />
            <FormInputSwitch name='is_budget_only' label='Pricing' />
          </div>
        </div>
      </div>

      <div className='mt-8 flex items-center justify-between'>
        <h5 className='text-dark-color text-lg font-semibold'>Plan Info</h5>
      </div>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormInputField
          name='engineer'
          form={form}
          placeholder=''
          label='Engineer'
          readOnly={true}
        />
        <FormDatePicker form={form} name='plan_date' label='Plan Date' />
        <FormInputField
          placeholder='Plan Status'
          form={form}
          name='plan_status'
          label='Plan Status'
          type='text'
        />
      </div>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        <FormInputField
          placeholder=''
          form={form}
          name='plan_info'
          label='Plan Info'
          type='text'
        />
        <FormRadioButton
          name='tax'
          className='align- mt-6 flex flex-row gap-5'
          form={form}
          label='Tax'
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
        />
        {taxableNot === 1 && (
          <div className='pricing-data'>
            <div className='relative flex'>
              <span className='symbol absolute self-center text-sm font-semibold'>
                %
              </span>
              <FormInputField
                placeholder='Tax Rate'
                form={form}
                name='taxRate'
                label='Tax Rate'
                type='number'
                disabled
              />
            </div>
          </div>
        )}
      </div>

      <div className='space-y-6 py-6'>
        <div>
          <h2 className='mb-2 text-lg font-medium'>Adders</h2>
          <div className='grid grid-cols-5 gap-4'>
            <div className='address-collunm'>
              {addersDesignField.map((field, index) => (
                <div className='relative mt-1 flex' key={field.name}>
                  <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                    %
                  </span>
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={field.name}
                    type='number'
                  />
                  <Label className='absolute ms-2'>{field.label}</Label>
                </div>
              ))}
              <div className='relative mt-1 flex'>
                <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                  %
                </span>
                <FormInputField
                  className='total-calculate'
                  placeholder=''
                  form={form}
                  name='total_adders'
                  type='number'
                />
              </div>
            </div>
            <div className='address-collunm disabled-field'>
              <div className='relative flex flex-wrap'>
                <div className='per-sqft-main w-full'>
                  {totalFields.map(field => (
                    <div className='relative mt-1 flex' key={field.name}>
                      <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                        $
                      </span>
                      <FormInputField
                        placeholder='0'
                        form={form}
                        name={field.name}
                        type='number'
                        className={
                          field.name === 'total_calculate' && 'total-calculate'
                        }
                        readOnly={true}
                      />
                    </div>
                  ))}
                </div>
                <div className='per-sqft relative mt-1 flex'>
                  <span className='symbol absolute mr-2 self-center text-sm font-semibold'>
                    $
                  </span>
                  <span className='text absolute font-semibold'> PER SQFT</span>
                  <FormInputField
                    placeholder='0'
                    form={form}
                    name='per_sqft'
                    type='number'
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className='address-collunm padding-left'>
              {hrSealfieldData.map((field, index) => (
                <div
                  className={`relative ${index !== 0 ? 'mt-1' : ''} flex`}
                  key={field.name}
                >
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={field.name}
                    type='number'
                  />
                  <Label className='absolute ms-2'>{field.label}</Label>
                </div>
              ))}
            </div>
            <div className='address-collunm padding-left disabled-field'>
              {hrsSealsfieldData.map((field, index) => (
                <div
                  className={`relative ${index !== 0 ? 'mt-1' : ''} flex`}
                  key={field.name}
                >
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={field.name}
                    type='number'
                    readOnly={true}
                  />
                  <Label className='absolute ms-2'>{field.label}</Label>
                </div>
              ))}
            </div>
            <div className='address-collunm padding-left disabled-field'>
              {hrsSeals2fieldData.map((field, index) => (
                <div
                  className={`relative ${index !== 0 ? 'mt-1' : ''} flex`}
                  key={field.name}
                >
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={field.name}
                    type='number'
                    className={`${field.name === 'total2' ? '!font-bold' : ''}`}
                    readOnly={true}
                  />
                  <Label className='absolute ms-2'>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        <div className='blog-collunm disabled-field'>
          <h2 className='mb-2 font-semibold'>BLDG Data</h2>
          {bldgDataTable.map(({ label, name }) => (
            <div key={name} className='flex items-center'>
              <Label className='w-full'>{label}</Label>
              <FormInputField
                placeholder=''
                form={form}
                name={name}
                type='number'
                readOnly={true}
              />
            </div>
          ))}
        </div>
        <div className='blog-collunm disabled-field'>
          <h2 className='mb-2 font-semibold'>Pricing</h2>
          {pricingDataTable.map(({ name, label }) => (
            <div key={name} className='flex items-center justify-between'>
              <Label className='w-1/2'>{label}</Label>
              <FormInputField
                placeholder=''
                form={form}
                name={name}
                type='number'
                readOnly={true}
              />
            </div>
          ))}
        </div>
        <div className='blog-collunm disabled-field !mt-6'>
          <h2 className='mb-2 font-semibold'></h2>
          {pricingGDataTable.map(({ name, label }) => (
            <div key={name} className='flex items-center justify-between'>
              <Label className='w-1/2'>{label}</Label>
              <FormInputField
                placeholder=''
                form={form}
                name={name}
                type='number'
                readOnly={true}
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className='mb-2 font-semibold'> </h2>
          <div className='blog-collunm'>
            <div className='!w-full space-y-2'>
              {limitsArray.map(({ label, name }) => (
                <div
                  key={name}
                  className={`${
                    name === 'limit_notes' ? 'limit-notes' : ''
                  } !mt-0 flex items-center`}
                >
                  <Label className='w-full'>{label}</Label>
                  <FormInputField
                    placeholder=''
                    form={form}
                    name={name}
                    type={name === 'limit_notes' ? 'text' : 'number'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div>
          <h2 className='font-semibold'>Commission Info</h2>
          <div className='commission-info blog-collunm mt-2 flex flex-wrap gap-3'>
            {commissionFields.map(({ label, name }) => (
              <div key={name} className='flex w-full'>
                <Label className='w-full'>{label}</Label>
                <span>{name === 'commission_rate' ? '$' : '%'}</span>
                <FormInputField
                  placeholder=''
                  form={form}
                  readOnly={name === 'commission_rate'}
                  name={name}
                  type='number'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-2 gap-6 rounded py-4'>
        <div className='mt-4 shadow-sm'>
          <h4 className='mb-2 text-sm font-semibold text-gray-700'>
            INC EXC SCOPE
          </h4>
          {allScop?.map((item, index) => (
            <FormScopeToggle
              key={index}
              name={`projectScopeIncludes.${item?.budgetCategory?.id - 1}`}
              scopeItem={item}
            />
          ))}
        </div>
        <div className='scope-radio'>
          <FormInputSwitchGroup
            label='Contract Components'
            items={contractor}
            formKey='projectContracts'
            idKey='contract_component_id'
          />
        </div>
      </div>

      <div className='scope-radio mt-6 grid grid-cols-2 gap-6 rounded'>
        <FormInputSwitchGroup
          label='Drawings Submittals'
          items={drawing}
          formKey='projectSubmittals'
          idKey='submittal_id'
        />
        <FormInputSwitchGroup
          label='Key Areas'
          items={keyArea.data}
          formKey='projectKeyAreas'
          idKey='key_area_id'
        />
      </div>
      <br />

      <FormTextArea
        form={form}
        name='plan_note'
        label='Plan Notes'
        type='text'
        className='rounded-6 mt-8 !min-h-32 bg-white !pr-7 pt-3 shadow-none'
        errors={form?.formState?.errors}
      />
      <br />
      <FormTextArea
        form={form}
        name='terms'
        label='Terms'
        type='text'
        className='rounded-6 mt- !min-h-32 bg-white !pr-7 pt-3 shadow-none'
        errors={form?.formState?.errors}
      />
    </div>
  )
}

export default BudgetGeneralTab
