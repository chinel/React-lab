import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    sortBy: "name" | "email";
  }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const { sortBy } = await searchParams;
  return (
    <div>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <div>
        <Link href="/users/new" className="btn my-2">
          New user
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable sortBy={sortBy} />
      </Suspense>
    </div>
  );
};

export default UsersPage;
