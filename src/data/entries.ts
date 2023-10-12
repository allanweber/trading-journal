import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Entry } from '@/model/entry';
import { ObjectId } from 'mongodb';

export const COLLECTION = 'entries';

export async function getEntries(userEmail: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journals = await client
    .db(dbName)
    .collection(COLLECTION)
    .aggregate<Entry>([
      {
        $lookup: {
          from: 'journals',
          localField: 'journalId',
          foreignField: '_id',
          as: 'journal',
        },
      },
      { $unwind: '$journal' },
    ])
    .toArray();

  return journals;
}

export async function deleteEntry(userEmail: string, entryId: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .deleteOne({ _id: new ObjectId(entryId) });
  return result;
}
