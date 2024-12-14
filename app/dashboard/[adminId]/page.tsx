import { UserManagementForm } from "@/components/user-management-form";

export default function UserManagementPage({
  params,
}: {
  params: { adminId: string };
}) {
  console.log(params.adminId);
  return (
    <div className="flex items-center justify-center">
      <div className="py-10 w-[500px]">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <UserManagementForm adminId={params.adminId} />
      </div>
    </div>
  );
}
