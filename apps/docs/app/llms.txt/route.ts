import { source, blog } from '@/lib/source';
import { getSection } from '@/lib/source/navigation';
import { baseUrl } from '@/lib/metadata';

export const revalidate = false;

export async function GET() {
  const url = (path: string): string => new URL(path, baseUrl).toString();
  const scanned: string[] = [];
  scanned.push('# Moyduz Dokümantasyonu');
  const map = new Map<string, string[]>();
  const sectionOrder = [
    'Docs',
    'Karar Motoru',
    'Maliyet Analizi',
    'Altyapı Taşıma',
    'Teknik Mimari',
    'Araçlar',
    'Karşılaştırmalar',
    'Blog',
    'Diğer Sayfalar',
  ];

  for (const page of source.getPages()) {
    if (page.data.type === 'openapi') continue;
    const section = getSection(page.slugs[0]);
    const list = map.get(section) ?? [];
    list.push(`- [${page.data.title}](${url(page.url)}): ${page.data.description || 'Dokümantasyon sayfası'}`);
    map.set(section, list);
  }

  // Add Blog Posts
  const blogList: string[] = [];
  for (const post of blog.getPages()) {
    blogList.push(`- [${post.data.title}](${url(post.url)}): ${post.data.description || 'Blog yazısı'}`);
  }
  if (blogList.length > 0) {
    map.set('Blog', blogList);
  }

  // Add Specific Pages
  const extraList = [`- [Ana Sayfa](${url('/')}): Moyduz Dokümantasyon Sistemi ana sayfası`];
  map.set('Diğer Sayfalar', extraList);

  for (const key of sectionOrder) {
    const value = map.get(key);
    if (!value || value.length === 0) continue;
    scanned.push(`## ${key}`);
    scanned.push(value.join('\n'));
  }

  return new Response(scanned.join('\n\n'));
}
