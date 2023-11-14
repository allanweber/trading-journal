'use server';

import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Journal } from '@/model/journal';
import { Paginated } from '@/model/pagination';
import { ObjectId } from 'mongodb';
import { unstable_noStore as noStore } from 'next/cache';
import { userEmail } from './auth';

const COLLECTION = 'journals';

export async function getJournals(
  term?: string,
  currencies?: string[],
  pageSize: number = 10,
  pageNumber: number = 1
): Promise<Paginated<Journal>> {
  const email = await userEmail();
  const client = await mongoClient;
  const dbName = getDbName(email);

  let query = {};
  if (term) {
    query = { name: { $regex: term, $options: 'i' } };
  }

  if (currencies && currencies.length > 0) {
    query = { ...query, currency: { $in: currencies } };
  }

  const [
    {
      total: [total = 0],
      journals,
    },
  ] = await client
    .db(dbName)
    .collection(COLLECTION)
    .aggregate([
      { $match: query },
      {
        $facet: {
          total: [{ $group: { _id: 1, count: { $sum: 1 } } }],
          journals: [
            { $sort: { startDate: -1 } },
            { $skip: pageSize * (pageNumber - 1) },
            { $limit: pageSize },
          ],
        },
      },
      {
        $project: {
          total: '$total.count',
          journals: '$journals',
        },
      },
    ])
    .toArray();

  return new Paginated(journals, pageSize, pageNumber, total);
}

export async function getJournal(id: string): Promise<Journal> {
  const email = await userEmail();
  const client = await mongoClient;
  const dbName = getDbName(email);

  const journal = await client
    .db(dbName)
    .collection(COLLECTION)
    .findOne<Journal>({ _id: new ObjectId(id) });

  if (!journal) {
    throw Error(`Journal ${id} not found`);
  }

  return journal;
}

export async function saveJournal(journal: Journal) {
  noStore();
  const email = await userEmail();
  const client = await mongoClient;
  const dbName = getDbName(email);

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

export async function deleteJournal(id: string): Promise<void> {
  noStore();
  const email = await userEmail();
  const client = await mongoClient;
  const dbName = getDbName(email);

  await client
    .db(dbName)
    .collection(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
}
