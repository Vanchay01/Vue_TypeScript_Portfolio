// validation/education.schema.ts
import { z } from "zod";

export const educationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  major: z.string().optional(),
  gpa: z.string().optional(),
  date_start: z.string().optional(),
  date_end: z.string().optional(),
  // logo: z.file().nullish()
});
