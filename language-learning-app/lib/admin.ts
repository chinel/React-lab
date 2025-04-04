import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2sdawkD1fjdgicMpbG4urcS2NVb"]; // userId copied from clerk dashboard

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
