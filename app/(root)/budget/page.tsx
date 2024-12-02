
import { getBudgetById } from "@/lib/actions/budget.action";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { currentUser } from '@clerk/nextjs';




async function GetData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const user = await currentUser();
  const budget :any|null = await getBudgetById({profileId:user?.id});
  return budget;
}

export default async function Page() {
  const data = await GetData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
