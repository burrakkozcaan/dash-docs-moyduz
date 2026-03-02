export function getSection(path: string | undefined) {
  if (!path) return 'Rehber';
  const [dir] = path.split('/', 1);
  if (!dir) return 'Rehber';
  return (
    {
      'e-ticaret-paketleri': 'E-Ticaret Paketleri',
      'headless-mimari': 'Headless Mimari',
      mdx: 'İçerik Yönetimi (MDX)',
    }[dir] ?? 'Genel'
  );
}
