import mongoClient from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { Journal } from '@/model/journal';
import { Paginated } from '@/model/pagination';
import { userEmail } from './auth';

const COLLECTION = 'journals';

export async function getJournals(
  term?: string,
  currencies?: string[],
  pageSize: number = 10
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

  const pageNumber = 1;

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
