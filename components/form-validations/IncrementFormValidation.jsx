import * as Yup from 'yup'

export const IncrementFormValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),

  acewebxTenure: Yup.number()
    .typeError('Tenure must be a number')
    .required('Tenure with AceWebX is required')
    .min(0, 'Tenure cannot be negative'),

  totalExperience: Yup.number()
    .typeError('Experience must be a number')
    .required('Overall experience is required')
    .min(0, 'Experience cannot be negative'),

  totalProjects: Yup.number()
    .typeError('Projects count must be a number')
    .required('Number of completed projects is required')
    .min(0, 'Projects cannot be negative'),

  ratingOnProjects: Yup.string()
    .required('Project rating is required')
    .matches(/^(10(\.0)?|[0-9](\.\d)?)$/, 'Enter a valid rating (e.g. 4.5)'),

  clientCalls: Yup.string()
    .required('Please select client call participation'),

  clientConverted: Yup.string()
    .required('Please specify if any clients were converted via test jobs'),

  newSkills: Yup.string()
    .trim()
    .required('New skills acquired is required'),

  experienceWithAcewebx: Yup.string()
    .trim()
    .required('Please describe your experience at AceWebX'),

  improvementAreas: Yup.string()
    .trim()
    .required('This field is required'),

  currentSalary: Yup.number()
    .typeError('Current salary must be a number')
    .required('Current salary is required')
    .min(0, 'Salary cannot be negative'),

  expectedSalary: Yup.number()
    .typeError('Expected raise must be a number')
    .required('Expected raise is required')
    .min(0, 'Raise cannot be negative'),

  raiseJustified: Yup.string()
    .trim()
    .required('Justification for raise is required'),

  ShortTermGoals: Yup.string()
    .trim()
    .required('Short-term goals are required'),

  Suggestions: Yup.string()
    .trim()
    .required('Suggestions are required'),

  weaknesses: Yup.string()
    .trim()
    .required('Please describe your weaknesses'),

  longTermGoals: Yup.string()
    .trim()
    .required('Long-term goals are required'),

  keyAchievements: Yup.string()
    .trim()
    .required('Key achievements are required'),
})
