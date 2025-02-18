import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { relations } from "drizzle-orm";
import { lessons } from "./lessons";

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .references(() => courses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const unitsRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));
