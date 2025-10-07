import { z } from 'zod';

export const User = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required").optional()
}).strict();