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
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 3,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 4,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
      {
        id: 5,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Spanish",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Unit 2 - Phrasal Verbs",
        description: "Learn phrasal verbs in Spanish",
        order: 2,
      },
      {
        id: 3,
        courseId: 2,
        title: "Unit 1 - Basics",
        description: "Learn the basics of French",
        order: 1,
      },
      {
        id: 4,
        courseId: 3,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Italian",
        order: 1,
      },
      {
        id: 5,
        courseId: 4,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Japanese",
        order: 1,
      },
      {
        id: 6,
        courseId: 5,
        title: "Unit 1 - Basics",
        description: "Learn the basics of Croatian",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        unitId: 1,
        order: 1,
        title: "Lesson 1 - Greetings",
        id: 1,
      },
      {
        unitId: 1,
        order: 2,
        title: "Lesson 2 - Numbers",
        id: 2,
      },
      {
        unitId: 2,
        order: 1,
        title: "Lesson 1 - Phrasal Verbs",
        id: 3,
      },
      {
        unitId: 3,
        order: 1,
        title: "Lesson 1 - Greetings",
        id: 4,
      },
      {
        unitId: 4,
        order: 1,
        title: "Lesson 1 - Greetings",
        id: 5,
      },
      {
        unitId: 5,
        order: 1,
        title: "Lesson 1 - Greetings",
        id: 6,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        order: 1,
        type: "SELECT",
        question: 'What is "Hello" in Spanish?',
      },
      {
        id: 2,
        lessonId: 1,
        order: 2,
        type: "SELECT",
        question: 'What is "Welcome" in Spanish?',
      },
      {
        id: 3,
        lessonId: 2,
        order: 1,
        type: "SELECT",
        question: 'What is "Girl" in Spanish?',
      },
      {
        id: 4,
        lessonId: 2,
        order: 2,
        type: "SELECT",
        question: 'What is "Eat" in Spanish?',
      },
      {
        id: 5,
        lessonId: 3,
        order: 1,
        type: "SELECT",
        question: 'What is "Sleep" in Italian?',
      },
      {
        id: 6,
        lessonId: 3,
        order: 2,
        type: "SELECT",
        question: 'What is "Read" in Italian?',
      },
      {
        id: 7,
        lessonId: 4,
        order: 1,
        type: "SELECT",
        question: 'What is "Working" in Japanese?',
      },
      {
        id: 8,
        lessonId: 4,
        order: 2,
        type: "SELECT",
        question: 'What is "Eating" in Japanese?',
      },
      {
        id: 9,
        lessonId: 5,
        order: 1,
        type: "SELECT",
        question: 'What is "Happy" in Croatian?',
      },
      {
        id: 10,
        lessonId: 5,
        order: 2,
        type: "SELECT",
        question: 'What is "Angry" in Croatian?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: "Hola",
        audioSrc: "/es_hola.mp3",
        imageSrc: "/es_hola.jpg",
        id: 1,
      },
      {
        challengeId: 1,
        correct: false,
        text: "Adios",
        audioSrc: "/es_adios.mp3",
        imageSrc: "/es_adios.jpg",
        id: 2,
      },
      {
        challengeId: 1,
        correct: false,
        text: "Buenos dias",
        audioSrc: "/es_buenos_dias.mp3",
        imageSrc: "/es_buenos_dias.jpg",
        id: 3,
      },
      {
        challengeId: 2,
        correct: true,
        text: "Bienvenido",
        audioSrc: "/es_bienvenido.mp3",
        imageSrc: "/es_bienvenido.jpg",
        id: 4,
      },
      {
        challengeId: 2,
        correct: false,
        text: "Adios",
        audioSrc: "/es_adios.mp3",
        imageSrc: "/es_adios.jpg",
        id: 5,
      },
      {
        challengeId: 2,
        correct: false,
        text: "Hola",
        audioSrc: "/es_hola.mp3",
        imageSrc: "/es_hola.jpg",
        id: 6,
      },
      {
        challengeId: 3,
        correct: true,
        text: "Buongiorno",
        audioSrc: "/it_buongiorno.mp3",
        imageSrc: "/it_buongiorno.jpg",
        id: 7,
      },
      {
        challengeId: 3,
        correct: false,
        text: "Addio",
        audioSrc: "/it_addio.mp3",
        imageSrc: "/it_addio.jpg",
        id: 8,
      },
      {
        challengeId: 3,
        correct: false,
        text: "Buonasera",
        audioSrc: "/it_buonasera.mp3",
        imageSrc: "/it_buonasera.jpg",
        id: 9,
      },
      {
        challengeId: 4,
        correct: true,
        text: "Konnichiwa",
        audioSrc: "/jp_konnichiwa.mp3",
        imageSrc: "/jp_konnichiwa.jpg",
        id: 10,
      },
      {
        challengeId: 4,
        correct: false,
        text: "Sayonara",
        audioSrc: "/jp_sayonara.mp3",
        imageSrc: "/jp_sayonara.jpg",
        id: 11,
      },
      {
        challengeId: 4,
        correct: false,
        text: "O-sen",
        audioSrc: "/jp_o-sen.mp3",
        imageSrc: "/jp_o-sen.jpg",
        id: 12,
      },
      {
        challengeId: 5,
        correct: true,
        text: "Sjunico",
        audioSrc: "/hr_sjunico.mp3",
        imageSrc: "/hr_sjunico.jpg",
        id: 13,
      },
      {
        challengeId: 5,
        correct: false,
        text: "Ljubav",
        audioSrc: "/hr_ljubav.mp3",
        imageSrc: "/hr_ljubav.jpg",
        id: 14,
      },
      {
        challengeId: 5,
        correct: false,
        text: "Zdravo",
        audioSrc: "/hr_zdravo.mp3",
        imageSrc: "/hr_zdravo.jpg",
        id: 15,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
