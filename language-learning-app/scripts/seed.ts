import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding the database");
    await db.delete(schema.userProgress);
    await db.delete(schema.courses);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
      {
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        courseId: 1,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Spanish",
        order: 1,
      },
      {
        courseId: 1,
        title: "Unit 2 - Phrasal Verbs",
        description: "Learn phrasal verbs in Spanish",
        order: 2,
      },
      {
        courseId: 2,
        title: "Unit 1 - Basics",
        description: "Learn the basics of French",
        order: 1,
      },
      {
        courseId: 3,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Italian",
        order: 1,
      },
      {
        courseId: 4,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Japanese",
        order: 1,
      },
      {
        courseId: 5,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Croatian",
        order: 1,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
