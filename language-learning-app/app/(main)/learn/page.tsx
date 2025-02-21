import { FeedWrapper, StickyWrapper, UserProgress } from "@/components/shared";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Header } from "./components";

const LearnPage = async () => {
  const [userProgress, units] = await Promise.all([
    getUserProgress(),
    getUnits(),
  ]);

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

        {units.length > 0 &&
          units.map((unit) => (
            <div key={unit.id} className="mb-10">
              <div className="flex items-center gap-x-2">
                <div className="flex-1">
                  <div className="font-medium text-neutral-700">
                    {unit.title}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {unit.lessons.length} lessons
                </div>
              </div>
            </div>
          ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
