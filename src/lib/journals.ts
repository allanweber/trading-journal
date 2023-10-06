import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Journal } from '@/model/journal';
import { TRPCClientError } from '@trpc/client';
import { ObjectId } from 'mongodb';

export async function getJournals(userEmail: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journals = await client
    .db(dbName)
    .collection('journals')
    .find<Journal>({})
    .toArray();
  return journals;
}

export async function getJournal(userEmail: string, journalId: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection('journals')
    .findOne<Journal>({ _id: new ObjectId(journalId) });

  if (!journal) {
    throw new TRPCClientError(`Journal ${journalId} not found`);
  }

  return journal;
}
