import * as yup from 'yup'

export const LeadFormSchema = yup.object().shape({
  // dcs: yup.string().required('DCS is required'),
  project_id: yup.string().required('Project is required'),
  nextStepDate: yup.date().required('Next Step Date is required'),
  pipelineType: yup.string().required('Pipeline is required'),
  // company_id: yup
  //   .string()
  //   .required('Company is required'),
  //   contact_id: yup
  //   .string()
  //   .required('Contact is required')
  //   .test('company-selected', 'Please select a company first.', function (value) {
  //     const { company_id } = this.parent
  //     return !!company_id
  //   }),
  
  // engineer_id: yup.string().required('Engineer is required'),
  // lead_status_id: yup.string().required('Lead status is required'),
  // date_record: yup.date().required('Date received is required'),
})