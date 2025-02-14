"use client";

import { courses, userProgress } from "@/db/schema";
import Card from "./card";
import { useRouter } from "next/navigation"; // this is the new import the old import is next router
import { useTransition } from "react";

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
      router.push(`/courses/${id}`);
    });
  };
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <>
          {/*Card component automatically becomes client component except if passed via children props */}
          <Card
            key={course.id}
            onClick={() => {}}
            disabled={false}
            active={course.id === activeCourseId}
            {...course}
          />
        </>
      ))}
    </div>
  );
};

export default List;
