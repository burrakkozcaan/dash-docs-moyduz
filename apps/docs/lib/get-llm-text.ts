import { type Page } from '@/lib/source';
import { getSection } from './source/navigation';

export async function getLLMText(page: Page) {
  if (page.data.type === 'openapi') return '';

  const section = getSection(page.slugs[0]);
  const category =
    {
      framework: 'Rehberler',
      ui: 'Paketler ve Bileşenler',
      headless: 'Geliştirici Referansı',
      mdx: 'MDX ve İçerik',
      cli: 'CLI Araçları',
    }[section] ?? section;

  const processed = await page.data.getText('processed');

  return `# ${category}: ${page.data.title}
URL: ${page.url}
Source: https://github.com/burrakkozcaan/dash-docs-moyduz/blob/main/apps/docs/content/docs/${page.path}

${page.data.description ?? ''}
        
${processed}`;
}
