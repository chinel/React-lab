"use client";

import { courses, userProgress } from "@/db/schema";
import Card from "./card";
import { useRouter } from "next/navigation"; // this is the new import the old import is next router
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferInsert.activeCourseId;
};

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition(); //this will help us use a server action & its pending state

  const onClick = (id: number) => {
    if (pending) {
      return;
    }
    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      upsertUserProgress(id).catch((e) => {
        if (e.message !== "NEXT_REDIRECT") {
          // console.log(e.message);
          toast.error(`Something went wrong ${e}`);
        }
      });
    });
  };
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <>
          {/*Card component automatically becomes client component except if passed via children props */}
          <Card
            key={course.id}
            onClick={onClick}
            disabled={pending}
            active={course.id === activeCourseId}
            {...course}
          />
        </>
      ))}
    </div>
  );
};

export default List;
