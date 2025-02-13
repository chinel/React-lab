import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { userProgress } from "./schema";

export const getUserProgress = cache(async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }
    const data = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
});

//the cache method caches the result of query so that it does not refetch all the time it is called
// Add specific fields selection and caching
export const getCourses = cache(async () => {
  try {
    const data = await db.query.courses.findMany({
      // Select only needed fields to reduce data transfer
      // select: {
      //   id: true,
      //   title: true,
      //   description: true,
      //   // Add other essential fields you need
      // },
      // Add ordering if needed
      // orderBy: {
      //   id: 'asc'
      // },
      // Add limit if you don't need all records
      limit: 100,
    });

    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
});
