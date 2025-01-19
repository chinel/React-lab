import { notFound } from "next/navigation";
import { parse } from "path";
import React from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const UserDetail = async ({ params }: Props) => {
  const { id } = await params;
  if (parseInt(id) > 10) {
    notFound();
  }
  return <div>UserDetail {id}</div>;
};

export default UserDetail;
