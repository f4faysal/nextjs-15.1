// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AllUsersList = async ({ users }: any) => {
  return (
    <div className="w-[500px] py-10">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <UserList users={users} />
    </div>
  );
};

const UserList = ({
  users,
}: {
  users: { id: string; email: string; name: string; role: string }[];
}) => (
  <div className="space-y-4">
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
