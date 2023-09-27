import { z } from 'zod';

export const journalSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string().refine((val) => new Date(val)),
  startBalance: z.number(),
  currency: z.string(),
});

export type Journal = z.infer<typeof journalSchema>;
