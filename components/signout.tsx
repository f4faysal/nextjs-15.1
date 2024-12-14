"use client";

import { handleSignOut } from "@/lib/action/auth/signOutServerAction";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Button } from "./ui/button";

const SignOut = () => {
  return (
    <Button
      variant={"secondary"}
      onClick={() => handleSignOut()}
      className="flex items-center rounded-full w-fit"
    >
      <FiLogOut /> Logout
    </Button>
  );
};

export default SignOut;
