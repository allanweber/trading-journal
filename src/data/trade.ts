import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Trade, tradeSchema } from '@/model/entry';
import { TRPCClientError } from '@trpc/client';
import { ObjectId } from 'mongodb';
import { COLLECTION } from './entries';

export async function getTrade(
  userEmail: string,
  entryId: string
): Promise<Trade> {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Trade>({ _id: new ObjectId(entryId) });

  if (!journal) {
    throw new TRPCClientError(`Deposit ${entryId} not found`);
  }

  return journal;
}

export async function saveTrade(
  userEmail: string,
  trade: Trade
): Promise<Trade> {
  const parse = tradeSchema.safeParse(trade);
  if (!parse.success) {
    throw new TRPCClientError(parse.error.message);
  }

  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const { _id, ...record } = trade;
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...record, journalId: new ObjectId(record.journalId) } },
      { upsert: true }
    )
    .then(() => trade);
  return result;
}
