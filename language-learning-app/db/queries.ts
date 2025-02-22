import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, units, userProgress } from "./schema";

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

export const getCourseById = cache(async (courseId: number) => {
  try {
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
      // with: {
      //   units: {
      //     with: {
      //       lessons: {
      //         with: {
      //           challenges: {
      //             with: {
      //               challengeOptions: true,
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
    });

    return data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return null;
  }
});

export const getUnits = cache(async () => {
  try {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
      return [];
    }

    const data = await db.query.units.findMany({
      where: eq(units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          with: {
            challenges: {
              with: {
                challengeProgress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
      // Add ordering if needed
      // orderBy: {
      //   id: 'asc'
      // },
      // Add limit if you don't need all records
      limit: 100,
    });

    const normalizeData = data.map((unit) => {
      const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
        if (lesson.challenges.length === 0)
          return { ...lesson, completed: false };

        const allCompleted = lesson.challenges.every((challenge) => {
          return (
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every((progress) => progress.completed)
          );
        });

        return { ...lesson, completed: allCompleted };
      });

      return { ...unit, lessons: lessonsWithCompletedStatus };
    });
    return normalizeData;
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
});
