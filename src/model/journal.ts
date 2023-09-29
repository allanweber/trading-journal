import { authOptions } from '@/lib/auth';
import mongoClient from '@/lib/mongodb';
import { promises as fs } from 'fs';
import { getServerSession } from 'next-auth';
import path from 'path';
import { z } from 'zod';

export const journalSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string().refine((val) => new Date(val)),
  startBalance: z.number(),
  currency: z.string(),
});

export type Journal = z.infer<typeof journalSchema>;

export async function getAllJournals(): Promise<Journal[]> {
  const session = await await getServerSession(authOptions);

  if (session?.user?.email === undefined) throw new Error('No user email');

  const client = await mongoClient;
  const dbName = session?.user?.email?.replaceAll('.', '') as string;
  const journals = await client
    .db(dbName)
    .collection('journals')
    .find<Journal>({})
    .toArray();

  const data = await fs.readFile(
    path.join(process.cwd(), '/src/data/journals.json')
  );

  const tasks = JSON.parse(data.toString());
  return z.array(journalSchema).parse(tasks);
}
