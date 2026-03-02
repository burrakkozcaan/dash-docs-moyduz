import { DataSourceId, orama } from '@/lib/orama/client';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { ProvideLinksToolSchema } from '@/lib/chat/inkeep-qa-schema';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

export const dynamic = 'force-dynamic';

let cachedHandler: any = null;

function getHandler() {
  if (cachedHandler) return cachedHandler;

  const openai = createOpenAICompatible({
    name: 'inkeep',
    apiKey: process.env.INKEEP_API_KEY,
    baseURL: 'https://api.inkeep.com/v1',
  });

  cachedHandler = createMcpHandler(
    (server) => {
      server.registerTool(
        'search',
        {
          title: 'Search Docs',
          description: 'Search docs pages with a query',
          inputSchema: z.object({
            query: z.string('the search query'),
          }),
        },
        async ({ query }) => {
          const result = await orama.search({
            term: query,
            datasources: [DataSourceId],
            limit: 50,
          });

          return {
            content: result.hits.map((hit) => ({
              type: 'text',
              text: JSON.stringify(hit.document),
            })),
          };
        },
      );

      server.registerTool(
        'ask-ai',
        {
          title: 'Ask AI',
          description: 'Ask another specialized AI a question for more info',
          inputSchema: z.object({
            message: z.string(),
          }),
        },
        async ({ message }) => {
          const result = await generateText({
            model: openai('inkeep-qa-sonnet-4'),
            tools: {
              provideLinks: {
                inputSchema: ProvideLinksToolSchema,
              },
            },
            messages: [
              {
                role: 'user',
                content: message,
              },
            ],
          });

          return {
            content: [
              {
                type: 'text',
                text: result.text,
              },
            ],
          };
        },
      );
    },
    {},
    { basePath: '/api', disableSse: true },
  );

  return cachedHandler;
}

export const GET = (req: Request, ctx: any) => getHandler()(req, ctx);
export const POST = (req: Request, ctx: any) => getHandler()(req, ctx);
export const DELETE = (req: Request, ctx: any) => getHandler()(req, ctx);
