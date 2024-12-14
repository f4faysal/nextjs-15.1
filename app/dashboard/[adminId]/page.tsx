import { UserManagementForm } from "@/components/user-management-form";
import { AllUsersList } from "@/components/all-users-list";
import { Suspense } from "react";

export default async function UserManagementPage({
  params,
}: {
  params: { adminId: string };
}) {
  return (
    <main className="container mx-auto px-4 py-4 h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">User Management</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-lg shadow-md p-6 ">
          <h2 className="text-xl font-semibold mb-6">Add New User</h2>
          <UserManagementForm adminId={params.adminId} />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">All Users</h2>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-48">
                <div className="animate-pulse text-gray-500">
                  Loading users...
                </div>
              </div>
            }
          >
            <AllUsersList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
