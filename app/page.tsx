import { Button } from "@/components/ui/button";
import { FactoryIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Home = async () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Login Section */}
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

        {/* Standard Login */}
        <Link href="/auth/sign-in">
          <Button variant="default" className="w-full mb-4">
            Login
          </Button>
        </Link>

        {/* Social Login Section */}
        <div className="text-center my-4">
          <span className="text-gray-500">Or log in with</span>
        </div>
        <div className="flex flex-col space-y-3">
          <Button variant="outline" className="w-full">
            <FcGoogle className="w-5 h-5 mr-2 inline-block" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            <FactoryIcon className="w-5 h-5 mr-2 inline-block" />
            Continue with Facebook
          </Button>
        </div>
      </div>

      {/* Logout Section */}
      <div className="mt-6">
        <Button variant="outline" className="w-full max-w-md">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;
