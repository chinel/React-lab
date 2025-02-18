import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { lessons } from "./lessons";
import { relations } from "drizzle-orm";
import { challengeOptions } from "./challengeOptions";
import { challengeProgress } from "./challengeProgress";

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  type: challengesEnum("type").notNull(),
  order: integer("order").notNull(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

//relations
export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions), // each challenge can have a lot of challengeOptions
  challengeProgress: many(challengeProgress),
}));
