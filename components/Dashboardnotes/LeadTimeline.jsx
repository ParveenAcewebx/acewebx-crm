import { DataTable } from '../Table'
import { pipelineColumn } from './PipelineColumn'

const LeadTimeline = ({ editData }) => {
  const activitiesData = editData?.pipelineActivity || []

  return (
    <>
      <DataTable
        data={activitiesData}
        columns={pipelineColumn((editData = { editData }))}
      />
    </>
  )
}

export default LeadTimeline
