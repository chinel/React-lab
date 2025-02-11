import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

//create a courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // serial means auto increment
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(), // in the table column we want it called image_src
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
