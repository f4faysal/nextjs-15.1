import { UserManagementForm } from "@/components/user-management-form";
import { AllUsersList } from "@/components/all-users-list";
import db from "@/db";
import { Suspense } from "react";

export default async function UserManagementPage({
  params,
}: {
  params: { adminId: string };
}) {
  "use server";
  const users = await db.user.findMany({});
  console.log(params.adminId);
  return (
    <div className="flex   items-center justify-center space-y-10 space-x-3 py-10">
      <div className="w-[500px]">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <UserManagementForm adminId={params.adminId} />
      </div>
      <Suspense fallback={<div>Loading users...</div>}>
        <AllUsersList users={users} />
      </Suspense>
    </div>
  );
}
