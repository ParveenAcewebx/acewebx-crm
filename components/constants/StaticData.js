export const walkInFormDefaultValues = {
  name: '',
  email: '',
  dob: '',
  gender: '',
  phone: '',
  currentLocation: '',
  designationApplyingFor: '',
  totalExperience: '',
  currentSalary: '',
  expectedSalary: '',
  currentCompanyName: '',
  noticePeriod: 0,
  reasonForChange: '',
  preferredShift: '',
  resume: ''
}

export const salesCandidateDefaultValue ={

    name: '',
    email: '',
    phone: '',
    joiningDate: null, // use `null` for DatePicker
    currentSalary: '',
    expectedSalary: '',
    totalExperience: '',
    monthlySalesTarget: '',
    preferredShift: '',
    preferredRegions: '',
    freshBusinessTarget: '',
    achievedTarget: '',
    businessMethods: '',
    leadPlatforms: '',
    reasonForLeaving: '',
    topSalesAchievement: '',
    resume: null, // File input should be null initially
    recaptcha: undefined, // This is for validation of ReCAPTCHA
  }
  



export const editWalkInForm = {
  name: '',
  email: '',
  dob: '',
  gender: '',
  phone: '',
  currentLocation: '',
  designationApplyingFor: '',
  totalExperience: '',
  currentSalary: '',
  expectedSalary: '',
  currentCompanyName: '',
  noticePeriod: 0,
  reasonForChange: '',
  preferredShift: [],
  resume: '',
  reference1Name: '',
  reference1ContactNumber: '',
  reference1Designation: '',
  reference1Experience: '',
  reference2Name: '',
  reference2ContactNumber: '',
  reference2Designation: '',
  reference2Experience: '',
  source: '',
  currentAddress: '',
  permanentAddress: '',
  lastIncrementDate: '',
  lastIncrementAmount: ''
}
export const experienceOptions = [
  { label: 'Fresher', value: '0' },
  { label: '6 Months', value: '0.6' },
  { label: '1+ Years', value: '1' },
  { label: '2+ Years', value: '2' },
  { label: '3+ Years', value: '3' },
  { label: '4+ Years', value: '4' },
  { label: '5+ Years', value: '5' },
  { label: '6+ Years', value: '6 ' },
  { label: '7+ Years', value: '7 ' },
  { label: '8+ Years', value: '8 ' },
  { label: '9+ Years', value: '9' },
  { label: '10+ Years', value: '10' }
]

export const GenderData = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' }
]

export const TypeData = [
  { label: 'Candidate', value: 'candidate' },
  { label: 'Candidate Sales', value: 'candidatesales' },
]
export const StatusData = [
  { label: 'Active', value: '0' },
  { label: 'Inactive', value: '1' },
]
export const totalExperienceOptions = [
  { label: 'Fresher', value: '0' },
  { label: '6 Months', value: '0.6' },
  { label: '1+ Years', value: '1' },
  { label: '2+ Years', value: '2' },
  { label: '3+ Years', value: '3' },
  { label: '4+ Years', value: '4 ' },
  { label: '5+ Years', value: '5' },
  { label: '6+ Years', value: '6' },
  { label: '7+ Years', value: '7' },
  { label: '8+ Years', value: '8' },
  { label: '9+ Years', value: '9' },
  { label: '10+ Years', value: '10' }
]

export const designationOptions = [
  { label: 'Software Developer', value: 'software developer' },
  { label: 'Frontend Developer', value: 'frontend developer' },
  { label: 'Backend Developer', value: 'backend developer' },
  { label: 'Full Stack Developer', value: 'full stack developer' },
  { label: 'UI/UX Designer', value: 'ui ux designer' },
  { label: 'Quality Assurance (QA) Engineer', value: 'qa engineer' },
  { label: 'Technical Lead', value: 'technical lead' },
  { label: 'Business Development Executive (BDE)', value: 'bde' },
  { label: 'Business Development Manager (BDM)', value: 'bdm' },
  { label: 'Sales Executive', value: 'sales executive' },
  { label: 'Pre-Sales Consultant', value: 'pre sales consultant' },
  { label: 'Project Manager', value: 'project manager' },
  { label: 'Product Manager', value: 'product manager' },
  {
    label: 'Digital Marketing Executive',
    value: 'digital marketing executive'
  },
  { label: 'SEO Specialist', value: 'seo specialist' },
  { label: 'Content Writer', value: 'content writer' }
]

export const sourceOption = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Job Portal', value: 'job portal' },
  { label: 'Employee Referral', value: 'employee referral' },
  { label: 'Company Website', value: 'company website' },
  { label: 'Other', value: 'other' }
]

export const preferredShiftOptions = [
  { value: 'day', label: 'Day Shift' },
  { value: 'night', label: 'Night Shift' },
  { value: 'staggered', label: 'Staggered Shift' },
  { value: 'any', label: 'Any Shift' }
]

export const onlinePlatforms = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Upwork', value: 'upwork' },
  { label: 'Freelancer', value: 'freelancer' },
  { label: 'PPH', value: 'pph' },
  { label: 'Other', value: 'other' },
  { label: 'Fiverr', value: 'fiverr' }
]

export const businessGenerate = [
  { label: 'Cold Calling', value: 'cold calling' },
  { label: 'Email Marketing', value: 'email marketing' },
  { label: 'LinkedIn Sales Navigator', value: 'linkedIn sales navigator' },
  {
    label: 'Online Platforms (Upwork, Freelancer, etc.)',
    value: 'online platforms'
  },
  { label: 'Other', value: 'other' }
]


export const LengthData = [
  {
    label: '10',
    value: '10'
  },
  {
    label: '25',
    value: '25'
  },
  {
    label: '50',
    value: '50'
  },
  {
    label: '100',
    value: '100'
  },
  {
    label: 'All',
    value: 'all'
  }
]

export const DealConfidenceScore = [
  {
    label: '0%',
    value: '0%'
  },
  {
    label: '10%',
    value: '10%'
  },
  {
    label: '20%',
    value: '20%'
  },
  {
    label: '30%',
    value: '30%'
  },
  {
    label: '40%',
    value: '40%'
  },
  {
    label: '50%',
    value: '50%'
  },
  {
    label: '60%',
    value: '60%'
  },
  {
    label: '70%',
    value: '70%'
  },
  {
    label: '80%',
    value: '80%'
  },
  {
    label: '90%',
    value: '90%'
  },
  {
    label: '100%',
    value: '100%'
  }
]