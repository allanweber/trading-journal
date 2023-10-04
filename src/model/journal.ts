import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { TRPCClientError } from '@trpc/client';
import { z } from 'zod';

export const journalSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  startBalance: z.number(),
  currency: z.string(),
});

export type Journal = z.infer<typeof journalSchema>;

export async function getJournals(userEmail: string): Promise<Journal[]> {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journals = await client
    .db(dbName)
    .collection('journals')
    .find<Journal>({})
    .toArray();

  return journals;
}

export async function getJournal(
  userEmail: string,
  journalId: string
): Promise<Journal> {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection('journals')
    .findOne<Journal>({ id: journalId });

  if (!journal) {
    throw new TRPCClientError(`Journal ${journalId} not found`);
  }

  return journal;
}
