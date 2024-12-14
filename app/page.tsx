import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with login and logout button */}
      <nav className="bg-gray-50 p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-800 text-lg">MyApp</div>
          <div>
            <Link href="/auth/sign-in">
              <Button variant="default" className="mr-4">
                Login
              </Button>
            </Link>
            <Button variant="outline">Logout</Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Welcome to MyApp</h1>
          <p className="text-lg">This is the main content area.</p>
          <Link href="/dashboard"> Go to Dashboard</Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4">
        <div className="container mx-auto text-center text-white">
          &copy; 2024 MyApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
