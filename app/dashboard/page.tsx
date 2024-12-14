import { auth } from "@/auth";
import SignOut from "@/components/signout";
import { checkIsAuthenticated } from "@/lib/action/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";

const Dashboard: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  const session = await auth();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  }

  const email = session?.user?.email;
  const name = session?.user?.name;
  const image = session?.user?.image;
  const token = session?.expires;
  const role = session?.user?.role;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col p-10 rounded-3xl bg-red-50">
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-xl font-bold ">Dashboard</h1>
          <SignOut />
        </div>
        {/* user card */}
        <div>
          <span className="text-xs rounded-full px-2 py-1 bg-red-400 mr-14">
            {role}
          </span>
          <div className="flex items-center space-x-4">
            <img src={image} alt="user" className="w-12 h-12 rounded-full" />
            <div>
              <div className="text-lg font-semibold">{name}</div>
              <div className="text-gray-500">{email}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-gray-500">Token</div>
            <div className="text-sm">{token}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
