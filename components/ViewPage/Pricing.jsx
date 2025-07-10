import ActualCost from '../Dashboardnotes/ActualCost'
import ActualPrice from '../Dashboardnotes/ActualPrice'
import ProjectCost from '../Dashboardnotes/ProjectCost'
import ProjectPrice from '../Dashboardnotes/ProjectPrice'
import ProspectiveCost from '../Dashboardnotes/ProspectiveCost'
import ProspectivePrice from '../Dashboardnotes/ProspectivePrice'
import { Card } from '../ui/card'

const Pricing = ({ editId, editData }) => {
  return (
    <>
      <div className='mt-5 grid grid-cols-3 gap-4 rounded'>
        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ProjectCost editId={editId} editData={editData} />
        </Card>

        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ProspectiveCost editId={editId} />
        </Card>

        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ActualCost editId={editId} />
        </Card>

        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ProjectPrice editId={editId} editData={editData} />
        </Card>

        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ProspectivePrice editId={editId} />
        </Card>

        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ActualPrice editId={editId} />
        </Card>
      </div>
    </>
  )
}

export default Pricing
