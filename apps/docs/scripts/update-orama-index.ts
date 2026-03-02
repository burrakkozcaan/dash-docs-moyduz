import { type OramaDocument, sync } from 'fumadocs-core/search/orama-cloud';
import * as fs from 'node:fs/promises';
import { isAdmin } from '@/lib/orama/client';
import { OramaCloud } from '@orama/core';

export async function updateSearchIndexes(): Promise<void> {
  if (!isAdmin) {
    console.log('no private API key for Orama found, skipping');
    return;
  }

  const content = await fs.readFile('.next/server/app/static.json.body');
  const records = JSON.parse(content.toString()) as OramaDocument[];

  const adminOrama = new OramaCloud({
    projectId: process.env.NEXT_PUBLIC_ORAMA_PROJECT_ID || '',
    apiKey: process.env.ORAMA_PRIVATE_API_KEY || '',
  });

  await sync(adminOrama, {
    index: process.env.NEXT_PUBLIC_ORAMA_DATASOURCE_ID || '',
    documents: records,
  });

  console.log(`search updated: ${records.length} records`);
}
