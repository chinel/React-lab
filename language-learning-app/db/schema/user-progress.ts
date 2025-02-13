import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { relations } from "drizzle-orm";

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").notNull().primaryKey(),
  userName: text("user_name").notNull(),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
