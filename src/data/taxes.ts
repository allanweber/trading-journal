import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Taxes, taxesSchema } from '@/model/entry';
import { TRPCClientError } from '@trpc/client';
import { ObjectId } from 'mongodb';
import { COLLECTION } from './entries';

export async function getTaxes(userEmail: string, entryId: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Taxes>({ _id: new ObjectId(entryId) });

  if (!journal) {
    throw new TRPCClientError(`Deposit ${entryId} not found`);
  }

  return journal;
}

export async function saveTaxes(userEmail: string, taxes: Taxes) {
  const parse = taxesSchema.safeParse(taxes);
  if (!parse.success) {
    throw new TRPCClientError(parse.error.message);
  }

  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const { _id, ...record } = taxes;
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...record, journalId: new ObjectId(record.journalId) } },
      { upsert: true }
    )
    .then(() => taxes);
  return result;
}
