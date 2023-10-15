import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Withdrawal, withdrawalSchema } from '@/model/entry';
import { TRPCClientError } from '@trpc/client';
import { ObjectId } from 'mongodb';
import { COLLECTION } from './entries';

export async function getWithdrawal(userEmail: string, entryId: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Withdrawal>({ _id: new ObjectId(entryId) });

  if (!journal) {
    throw new TRPCClientError(`Deposit ${entryId} not found`);
  }

  return journal;
}

export async function saveWithdrawal(
  userEmail: string,
  withdrawal: Withdrawal
) {
  const parse = withdrawalSchema.safeParse(withdrawal);
  if (!parse.success) {
    throw new TRPCClientError(parse.error.message);
  }

  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const { _id, ...record } = withdrawal;
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...record, journalId: new ObjectId(record.journalId) } },
      { upsert: true }
    )
    .then(() => withdrawal);
  return result;
}
