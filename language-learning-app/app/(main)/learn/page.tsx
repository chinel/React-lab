import { FeedWrapper, StickyWrapper, UserProgress } from "@/components/shared";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Header } from "./components";

const LearnPage = async () => {
  const [userProgress] = await Promise.all([getUserProgress()]);

  //checking if userProgress.activeCourse is present ensure that active
  //course is present so that we don't have to use optional chaining ? and optional properties in the type definition
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
