import api from '@/lib/api'
import { GetAllContact } from '@/services/BudgetBook/budget-book-api'
import BudgetBooksServices from '@/services/BudgetBook/budgetBook'
import { GetAllEngineers } from '@/services/BudgetBook/customer-api'
import LeadsSettingServices from '@/services/Settings/LeadSetting'
import { UsersServices } from '@/services/Settings/UserSetting'
import { useEffect, useState } from 'react'
import FormDatePicker from '../share/form/datePicker'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import FormSelectField from '../share/form/FormSelect'
import SelectFilter from '../share/form/SelectFilter'
import { DealConfidence } from '../static-Values'

const SearchFilterFields = ({ form }) => {
  const [allContacts, setAllContacts] = useState([])
  const [company, setCompany] = useState([])
  const [enginer, setEnginer] = useState([])
  const [leadStatus, setLeadStatus] = useState([])
  const [project, setProject] = useState([])
  const [sales, setSales] = useState([])
  const [tag, setTag] = useState([])
  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          contactRes,
          companyRes,
          engRes,
          leadstatus,
          engproj,
          slaesRes,
          tagRes
        ] = await Promise.all([
          GetAllContact.GetContact(),
          api.get('/companies'),
          GetAllEngineers.GetEngineersList(),
          LeadsSettingServices.getLeadsStatus(),
          BudgetBooksServices.budgetBooks(),
          UsersServices.users(),
          LeadsSettingServices.getTags()
        ])

        // Get the all contact to sent in the fields
        if (contactRes.status === 200) {
          const modifyProjectData = contactRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setAllContacts(modifyProjectData)
        }
        if (companyRes?.status === 200) setCompany(companyRes?.data?.data)
        if (engRes.status === 200) {
          const modifyProjectData = engRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setEnginer(modifyProjectData)
        }
        if (leadstatus.status === 200) {
          const modifyProjectData = leadstatus?.data?.data.map(item => {
            return {
              label: item.title,
              value: String(item.id)
            }
          })
          setLeadStatus(modifyProjectData)
        }
        if (engproj.status === 200) {
          const modifyProjectData = engproj?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setProject(modifyProjectData)
        }
        if (slaesRes.status === 200) {
          const modifyProjectData = slaesRes?.data?.data.map(item => {
            return {
              label: item.name,
              value: String(item.id)
            }
          })
          setSales(modifyProjectData)
        }
        if (tagRes.status === 200) {
          const modifyProjectData = tagRes?.data?.data.map(item => {
            return {
              label: item.title,
              value: String(item.id)
            }
          })
          console.log('modifyProjectData', modifyProjectData)
          setTag(modifyProjectData)
        }
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])
  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <SelectFilter
          name='contact_id'
          form={form}
          placeholder='Select Contact'
          label='Contact'
          options={allContacts}
        />
        <SelectFilter
          form={form}
          name='company_id'
          label='Company'
          placeholder='Select Company'
          options={
            company.length > 0
              ? company.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          name='engineer_id'
          form={form}
          placeholder='Select Engineer'
          label='Engineer'
          options={enginer}
        />
        <SelectFilter
          name='lead_status_id'
          form={form}
          placeholder='Select Lead Status'
          label='Lead Status'
          options={leadStatus}
        />
        <FormDatePicker name='from_due_date' form={form} label='From Date' />
        <FormDatePicker name='to_due_date' form={form} label='To Date' />
        <FormDatePicker
          name='from_date_record'
          form={form}
          label='From Date Record'
        />
        <FormDatePicker
          name='to_date_record'
          form={form}
          label='To Date Record'
        />
        <SelectFilter
          name='project_id'
          form={form}
          placeholder='Select Project'
          label='Project'
          options={project}
        />
        <SelectFilter
          name='sale_person_id'
          form={form}
          placeholder='Select Sale Person'
          label='Sale Person'
          options={sales}
        />
        <FormSelectField
          form={form}
          name='dcs'
          label='Deal Confidence Score'
          placeholder='Select Deal Confidence Score'
          options={DealConfidence}
        />
        <FormMultiSelectField
          className='col-span-2'
          name='tags'
          form={form}
          placeholder='Select Lead Tags'
          label='Lead Tags'
          options={tag}
        />
      </div>
    </>
  )
}

export default SearchFilterFields
