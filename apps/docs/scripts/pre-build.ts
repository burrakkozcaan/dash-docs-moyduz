/**
 * Pre-build: MDX generation runs via next build / fumadocs-mdx.
 * Registry build (Fumadocs CLI customise) kullanılmıyor; harici paket _registry'leri yok.
 */
async function main() {
  // public/registry yoksa boş dizin oluştur (opsiyonel)
  const { mkdir } = await import('node:fs/promises');
  const { join } = await import('node:path');
  await mkdir(join(process.cwd(), 'public', 'registry'), { recursive: true }).catch(() => {});
}

await main().catch((e) => {
  console.error('Failed to run pre build script', e);
  process.exit(1);
});
