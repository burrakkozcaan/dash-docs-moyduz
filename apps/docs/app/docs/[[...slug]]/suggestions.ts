import type { Suggestion } from '@/components/not-found';
import { orama } from '@/lib/orama/client';

export async function getSuggestions(pathname: string): Promise<Suggestion[]> {
  const results = await orama.search({
    term: pathname,
    mode: 'vector',
    groupBy: {
      properties: ['url'],
      maxResult: 1,
    },
  });

  if (!results?.groups) return [];

  return (results.groups
    .map((group) => {
      const doc = group.result?.[0];
      if (!doc) return null;
      return {
        id: doc.id,
        href: doc.document.url as string,
        title: doc.document.title as string,
      } satisfies Suggestion;
    }) as (Suggestion | null)[])
    .filter((s): s is Suggestion => s !== null);
}
