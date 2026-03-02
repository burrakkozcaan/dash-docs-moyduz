import { OramaClient } from '@oramacloud/client';

export const DataSourceId = process.env.NEXT_PUBLIC_ORAMA_DATASOURCE_ID as string;

export const isAdmin = process.env.ORAMA_PRIVATE_API_KEY !== undefined;

export const orama = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/docs-moyduz-com-r3obvs',
  api_key: 'BuoJunift2Ou1ltF6Vxlc5EMIjT7Q6Y5',
});
