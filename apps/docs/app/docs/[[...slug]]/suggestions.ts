import type { Suggestion } from '@/components/not-found';
import { orama } from '@/lib/orama/client';

export async function getSuggestions(pathname: string): Promise<Suggestion[]> {
  try {
    const results = await orama.search({
      term: pathname,
      mode: 'vector',
    });

    if (!results?.hits || results.hits.length === 0) return [];

    return results.hits
      .slice(0, 3)
      .map((hit) => {
        const doc = hit.document;
        if (!doc) return null;
        return {
          id: hit.id,
          href: doc.url as string,
          title: doc.title as string,
        } satisfies Suggestion;
      })
      .filter((s): s is Suggestion => s !== null);
  } catch {
    return [];
  }
}
