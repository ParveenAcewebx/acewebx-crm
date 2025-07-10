import { FormProvider, useForm } from "react-hook-form"
import SearchFilterFields from "./SearchFilterFields"
import { Button } from "../ui/button"
import { formatDate } from "../utils/dateFormat"
import { useEffect } from "react"
import { errorMessage } from "../ToasterMessage"
import { GetFilterData } from "@/services/Leads/lead"


const LeadSearchFilter = ({
  setSearchFilter,
  setTotalRecord,
  getListLeads,
  page,
  length,
  setIsAccordionOpen,
  setLength,
  totalRecord,
  setSearchFormData
}) => {
  const methods = useForm()
  const onSearch = async data => {
    setSearchFormData(data)
    const params = {
      page: page,
      length: length,
      contact_id: Number(data.contact_id) || '',
      company_id: Number(data.company_id) || '',
      engineer_id: Number(data.engineer_id) || '',
      lead_status_id: Number(data.lead_status_id) || '',
      project_id: Number(data.project_id) || '',
      sale_person_id: Number(data.sale_person_id) || '',
      dcs: data.dcs || '',
      tags: data.tags || '',
      from_date_record: formatDate(data.from_date_record || '') || '',
      to_date_record: formatDate(data.to_date_record || '') || '',
      from_due_date: formatDate(data.from_due_date || '') || '',
      to_due_date: formatDate(data.to_due_date || '') || ''
    }
    try {
      const res = await GetFilterData.getleads(params)
      if (res?.status === 200) {
        setSearchFilter(res?.data?.data)
        setTotalRecord(res?.data?.meta?.total)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
    }
  }
  const handleClick = async () => {
    methods.reset()
    getListLeads()
    setSearchFilter(null)
    setSearchFormData(null)
  }



  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'length') {
        const val = value.length
        setLength(val === 'all' ? totalRecord || 9999 : Number(val))
        setPage(1)
      }
    })
    return () => subscription.unsubscribe()
  }, [methods, totalRecord])

  
  return (
    <>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSearch)}>
            <SearchFilterFields form={methods} />
            <div className='mb-1 mt-3 flex justify-end gap-4'>
              <Button type='Submit' className='site-button-small bg-white'>
                Search
              </Button>
              <Button
                type='button'
                className='site-button-small text-white'
                onClick={handleClick}
              >
                Clear
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default LeadSearchFilter
