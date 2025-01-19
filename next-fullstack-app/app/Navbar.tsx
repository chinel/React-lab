"use client"; // Because we are using a hook useSession
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { status, data: session } = useSession(); // renaming the data field to session

  return (
    <nav className="flex bg-slate-200 p-5 space-x-3 justify-between">
      <div>
        <Link href="/" className="mr-5">
          Next js
        </Link>
        <Link href="/users" className="mr-5">
          Users
        </Link>
      </div>

      <div className="flex">
        {" "}
        {status === "unauthenticated" ? ( // Check if the user is not authenticated
          <Link href="/api/auth/signin" className="mr-5">
            Login
          </Link>
        ) : (
          <>
            <div>
              <p className="mr-5">{session?.user?.name}</p>
            </div>
            <Link href="/api/auth/signout" className="mr-5">
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
