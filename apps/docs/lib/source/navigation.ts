export function getSection(path: string | undefined) {
  if (!path) return 'framework';
  const [dir] = path.split('/', 1);
  if (!dir) return 'framework';
  return (
    {
      'e-ticaret-paketleri': 'ui',
      headless: 'headless',
    }[dir] ?? 'framework'
  );
}
