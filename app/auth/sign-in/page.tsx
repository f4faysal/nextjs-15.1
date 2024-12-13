import { redirect } from "next/navigation";

import { SignInPage } from "@/components/sign-in";
import { checkIsAuthenticated } from "@/lib/action/auth/checkIsAuthenticated";

const SignIn: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    return <SignInPage />;
  }
};

export default SignIn;
