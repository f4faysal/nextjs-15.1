import { checkIsAuthenticated } from "@/lib/action/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { FiHome, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";

const Dashboard: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <button className="flex w-full items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <FiHome className="mr-3" /> Home
          </button>
          <button className="flex w-full items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <FiUsers className="mr-3" /> Users
          </button>
          <button className="flex w-full items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <FiSettings className="mr-3" /> Settings
          </button>
          <button className="flex w-full items-center px-6 py-3 text-red-600 hover:bg-red-50">
            <FiLogOut className="mr-3" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Active Projects
            </h3>
            <p className="mt-2 text-3xl font-bold text-green-600">42</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">$52,000</p>
          </div>

          {/* Recent Activity Section */}
          <div className="col-span-full mt-6 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              Recent Activity
            </h3>
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center border-b pb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">
                      User Action {item}
                    </p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
