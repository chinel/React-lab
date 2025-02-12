import { cache } from "react";
import db from "./drizzle";

//the cache method caches the result of query so that it does not refetch all the time it is called
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});
