import { UserManagementForm } from "@/components/user-management-form";

export default function UserManagementPage({
  params,
}: {
  params: { adminId: string };
}) {
  console.log(params.adminId);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        User Management {params.adminId}
      </h1>
      <UserManagementForm adminId={params.adminId} />
    </div>
  );
}
