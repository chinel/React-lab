"use client";

import { courses } from "@/db/schema";
import Card from "./card";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId: number;
};

const List = ({ courses, activeCourseId }: Props) => {
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
