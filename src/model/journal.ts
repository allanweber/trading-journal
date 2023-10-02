import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { z } from 'zod';

export const journalSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string().refine((val) => new Date(val)),
  startBalance: z.number(),
  currency: z.string(),
});

export type Journal = z.infer<typeof journalSchema>;

export async function getAllJournals(userEmail: string): Promise<Journal[]> {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journals = await client
    .db(dbName)
    .collection('journals')
    .find<Journal>({})
    .toArray();

  return journals;
}
