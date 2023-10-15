import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Dividend, dividendSchema } from '@/model/entry';
import { TRPCClientError } from '@trpc/client';
import { ObjectId } from 'mongodb';
import { COLLECTION } from './entries';

export async function getDividend(userEmail: string, entryId: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Dividend>({ _id: new ObjectId(entryId) });

  if (!journal) {
    throw new TRPCClientError(`Deposit ${entryId} not found`);
  }

  return journal;
}

export async function saveDividend(userEmail: string, dividend: Dividend) {
  const parse = dividendSchema.safeParse(dividend);
  if (!parse.success) {
    throw new TRPCClientError(parse.error.message);
  }

  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const { _id, ...record } = dividend;
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...record, journalId: new ObjectId(record.journalId) } },
      { upsert: true }
    )
    .then(() => dividend);
  return result;
}
