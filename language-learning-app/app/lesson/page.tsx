import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";

const LessonPage = async () => {
  const [lesson, userProgress] = await Promise.all([
    getLesson(),
    getUserProgress(),
  ]);

  if (!lesson) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <div>
      <h1>This is a lesson page</h1>
    </div>
  );
};

export default LessonPage;
