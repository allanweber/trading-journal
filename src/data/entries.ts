import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Entry } from '@/model/entry';
import { EntryType } from '@/model/entryType';
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

export async function getEntryType(
  userEmail: string,
  entryId: string
): Promise<EntryType> {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const result = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne(
      { _id: new ObjectId(entryId) },
      { projection: { entryType: 1, _id: 0 } }
    )
    .then((entry) => entry?.entryType as EntryType);
  return result;
}
