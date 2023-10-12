import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Entry } from '@/model/entry';

export const COLLECTION = 'entries';

export async function getEntries(userEmail: string) {
  const client = await mongoClient;
  const dbName = getDbName(userEmail);
  const journals = await client
    .db(dbName)
    .collection(COLLECTION)
    .find<Entry[]>({})
    .toArray();
  return journals;
}
