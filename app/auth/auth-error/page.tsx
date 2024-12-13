import Link from "next/link";
import { RxExclamationTriangle } from "react-icons/rx";

const AuthErrorPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center mb-6">
          <RxExclamationTriangle className="w-16 h-16 text-red-500 mb-4" />
          <p className="text-2xl font-semibold text-gray-800">
            Oops, something went wrong.
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">
            To go back to the sign in page,{" "}
            <Link
              href="/api/auth/signin"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
