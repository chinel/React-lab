import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
} from "./schema";

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

export const getCourseProgress = cache(async () => {
  try {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
      return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
      orderBy: (units, { asc }) => [asc(units.order)],
      where: eq(units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            unit: true,
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
    });

    const firstUncompletedLesson = unitsInActiveCourse
      .flatMap((unit) => unit.lessons)
      .find((lesson) => {
        return lesson.challenges.some((challenge) => {
          return (
            !challenge.challengeProgress ||
            challenge.challengeProgress.length === 0 ||
            !challenge.challengeProgress.every((progress) => progress.completed)
          );
        });
      });

    return {
      activeLesson: firstUncompletedLesson,
      activeLessonId: firstUncompletedLesson?.id,
    };
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return null;
  }
});

export const getLesson = cache(async (id?: number) => {
  try {
    const { userId } = await auth();
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if (!userId || !courseProgress?.activeLessonId || !lessonId) {
      return null;
    }

    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      with: {
        challenges: {
          orderBy: (challenges, { asc }) => [asc(challenges.order)],
          with: {
            challengeOptions: true,
            challengeProgress: {
              where: eq(challengeProgress.userId, userId),
            },
          },
        },
      },
    });

    if (!lesson || !lesson.challenges) {
      return null;
    }

    const normalizedChallenges = lesson.challenges.map((challenge) => {
      const completed =
        challenge.challengeProgress &&
        challenge.challengeProgress.length > 0 &&
        challenge.challengeProgress.every((progress) => progress.completed);
      return { ...challenge, completed };
    });
    return { ...lesson, challenges: normalizedChallenges };
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
});
