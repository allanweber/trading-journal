import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Deposit, depositSchema } from '@/model/entry';
import { TRPCClientError } from '@trpc/client';
import { ObjectId } from 'mongodb';
import { COLLECTION } from './entries';

export async function getDeposit(
  userEmail: string,
  entryId: string
): Promise<Deposit> {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Deposit>({ _id: new ObjectId(entryId) });

  if (!journal) {
    throw new TRPCClientError(`Deposit ${entryId} not found`);
  }

  return journal;
}

export async function saveDeposit(
  userEmail: string,
  deposit: Deposit
): Promise<Deposit> {
  const parse = depositSchema.safeParse(deposit);
  if (!parse.success) {
    throw new TRPCClientError(parse.error.message);
  }

  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const { _id, ...record } = deposit;
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...record, journalId: new ObjectId(record.journalId) } },
      { upsert: true }
    )
    .then(() => deposit);
  return result;
}
