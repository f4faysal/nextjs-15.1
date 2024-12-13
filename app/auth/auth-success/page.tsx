import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { RxCheckCircled } from "react-icons/rx";

const AuthSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg animate-fade-in">
        <div className="text-center space-y-4">
          <RxCheckCircled className="w-16 h-16 mx-auto text-green-500 animate-bounce-small" />
          <h1 className="text-2xl font-semibold text-gray-900">Success!</h1>
          <p className="text-gray-600">
            Please check your email inbox for sign in link.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Didn&apos;t receive an email? To go back to the sign-in page and try
            again,{" "}
            <Link href="/api/auth/signin">
              <Button
                variant="link"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Click Here
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccessPage;
