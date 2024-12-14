"use client";

import { FcGoogle } from "react-icons/fc";
import { useTransition, useState } from "react";
import { handleEmailSignIn } from "@/lib/action/auth/emailSignInServerAction";
import { handleGoogleSignIn } from "@/lib/action/auth/googleSignInServerAction";
import { Button } from "./ui/button";
import { FiGithub } from "react-icons/fi";
import { Input } from "./ui/input";
import { handleGitHubSignIn } from "@/lib/action/auth/gitHubSignInServerAction";

export const SignInPage: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: "" as string });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the form from submitting and reloading the page, allowing us to handle the submission in TypeScript.
    try {
      startTransition(async () => {
        await handleEmailSignIn(formData.email);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Sign In
        </h2>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              maxLength={320}
              placeholder="Email Address"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ email: event.target.value })
              }
              disabled={isPending}
              required
            />
            <button
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              type="submit"
              disabled={isPending}
            >
              Sign in with Email
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <div className="space-y-3">
            <Button variant={"outline"} onClick={() => handleGoogleSignIn()}>
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
            <Button variant={"outline"} onClick={() => handleGitHubSignIn()}>
              <FiGithub className="mr-2 h-5 w-5" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
