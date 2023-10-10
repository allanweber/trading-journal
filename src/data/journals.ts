import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Journal, journalSchema } from '@/model/journal';
import { TRPCClientError } from '@trpc/client';
import { ObjectId } from 'mongodb';

const COLLECTION = 'journals';

export async function getJournals(userEmail: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journals = await client
    .db(dbName)
    .collection(COLLECTION)
    .find<Journal>({})
    .toArray();
  return journals;
}

export async function getJournal(userEmail: string, journalId: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Journal>({ _id: new ObjectId(journalId) });

  if (!journal) {
    throw new TRPCClientError(`Journal ${journalId} not found`);
  }

  return journal;
}

export async function saveJournal(userEmail: string, journal: Journal) {
  const parse = journalSchema.safeParse(journal);
  if (!parse.success) {
    throw new TRPCClientError(parse.error.message);
  }

  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const { _id, ...record } = journal;
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...record } },
      { upsert: true }
    )
    .then(() => journal);
  return result;
}

export async function deleteJournal(userEmail: string, journalId: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .deleteOne({ _id: new ObjectId(journalId) });
  return result;
}
