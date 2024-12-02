

import { DataTable } from "./data-table"
import { currentUser } from '@clerk/nextjs';
import { getCheckListById } from "@/lib/actions/checkList.actions";




async function GetData() {
  // Fetch data from your API here.
  const user = await currentUser();
  const checkList :any|null = await getCheckListById({profileId:user?.id});
  return checkList;
}

export default async function Page() {
  const data = await GetData()

  return (
    <div className="container mx-auto py-10">
      <DataTable  data={data} columns={[]} />
    </div>
  )
}
