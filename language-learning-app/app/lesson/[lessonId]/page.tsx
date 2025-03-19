import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";
import { Quiz } from "../components";

type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: Props) => {
  const [lesson, userProgress] = await Promise.all([
    getLesson(params.lessonId),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      intitialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={undefined} // Todo Add user susbcription
    />
  );
};

export default LessonIdPage;
