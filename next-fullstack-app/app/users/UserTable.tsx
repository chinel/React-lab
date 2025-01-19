import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortBy?: "name" | "email";
}

const UserTable = async ({ sortBy = "name" }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();

  const sortedUsers = sortBy ? sort(users).asc((user) => user[sortBy]) : users;

  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortBy=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortBy=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
