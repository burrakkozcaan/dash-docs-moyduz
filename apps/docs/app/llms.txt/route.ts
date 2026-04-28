import { source, blog } from '@/lib/source';
import { getSection } from '@/lib/source/navigation';
import { baseUrl } from '@/lib/metadata';

export const revalidate = false;

export async function GET() {
  const url = (path: string): string => new URL(path, baseUrl).toString();
  const scanned: string[] = [];
  scanned.push('# Moyduz Dokümantasyonu');
  const map = new Map<string, string[]>();

  for (const page of source.getPages()) {
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
  const extraList = [
    `- [Showcase](${url('/showcase')}): Moyduz kullanan örnek siteler`,
    `- [Ana Sayfa](${url('/')}): Moyduz Dokümantasyon Sistemi Ana Sayfası`,
  ];  
  map.set('Diğer Sayfalar', extraList);

  for (const [key, value] of map) {
    scanned.push(`## ${key}`);
    scanned.push(value.join('\n'));
  }

  return new Response(scanned.join('\n\n'));
}
