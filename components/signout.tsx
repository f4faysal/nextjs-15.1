"use client";

import { handleSignOut } from "@/lib/action/auth/signOutServerAction";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const SignOut = () => {
  return (
    <button
      onClick={() => handleSignOut()}
      className="flex w-full items-center px-6 py-3 text-red-600 hover:bg-red-50"
    >
      <FiLogOut className="mr-3" /> Logout
    </button>
  );
};

export default SignOut;
