import "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "USER";
    isAdminCreated: boolean;
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
