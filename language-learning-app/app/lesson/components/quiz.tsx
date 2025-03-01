"use client";

import { challengeOptions, challenges } from "@/db/schema";

type Props = {
  intitialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: object | undefined;
};

const Quiz = ({
  initialHearts,
  initialLessonChallenges,
  initialPercentage,
  intitialLessonId,
  userSubscription,
}: Props) => {
  return <div>Quiz!</div>;
};

export default Quiz;
