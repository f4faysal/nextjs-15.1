import db from "@/db";

export async function fetchUsers() {
  const users = await db.user.findMany({});
  if (!users) return [];
  return users;
}

export const AllUsersList = async () => {
  const users = (await fetchUsers()) as {
    id: string;
    email: string;
    name: string;
    role: string;
  }[];

  const isUser = users.length > 0;
  if (!isUser) {
    return <div>No users found</div>;
  }

  return <UserList users={users} />;
};

const UserList = ({
  users,
}: {
  users: { id: string; email: string; name: string; role: string }[];
}) => (
  <div className="space-y-2 overflow-y-auto">
    {users.map((user) => (
      <div
        key={user.id}
        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <div>
          <div className="font-bold">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="text-sm text-gray-500">{user.role}</div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Edit
          </button>
          <button className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
