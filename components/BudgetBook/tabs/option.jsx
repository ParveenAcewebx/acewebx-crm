import BudgetOptionPackagesTab from "@/components/BudgetTabsForm/BudgetOptionPackagesTab"
import BudgetveOptionsTab from "@/components/BudgetTabsForm/BudgetveOptionsTab"


const BudgetOptionTab = ({ form }) => {
  return (
    <>
      <BudgetveOptionsTab form={form} />
      {/* <BudgetOptionPackagesTab form={form} /> */}
    </>
  )
}

export default BudgetOptionTab