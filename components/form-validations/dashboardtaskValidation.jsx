import * as yup from 'yup'

export const TaskValidation = yup.object().shape({
  task_status_id: yup.string().required('Task status is required'),
  task_group_id: yup.string().required('Task group is required'),
  task_subject_id: yup.string().required('Task subject is required'),
  project_id: yup.string().required('Project is required'),
  task_urgency_id: yup.string().required('Task Urgency is required'),
  TaskValidationrequiredToMoveStatus: yup.boolean(),
  description: yup
    .string()
    .test(
      'more-than-default',
      'Please enter more info beyond default text',
      function (value) {
        const { requiredToMoveStatus } = this.parent
        const defaultText = '<p>Description for second task</p>'
        if (requiredToMoveStatus) {
          return value && value !== defaultText
        }
        return true
      }
    )
})
