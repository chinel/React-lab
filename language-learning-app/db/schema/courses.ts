import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userProgress } from "./user-progress";
import { units } from "./units";

//create a courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // serial means auto increment
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(), // in the table column we want it called image_src
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));
