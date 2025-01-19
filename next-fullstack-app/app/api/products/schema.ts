import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).max(20),
  price: z.number(),
  description: z.string().optional(),
});

export default schema;
