export function getSection(path: string | undefined) {
  if (!path) return 'Docs';
  const [dir] = path.split('/', 1);
  if (!dir) return 'Docs';
  return (
    {
      'karar-motoru': 'Karar Motoru',
      'maliyet-analizi': 'Maliyet Analizi',
      'altyapi-tasima': 'Altyapı Taşıma',
      'teknik-mimari': 'Teknik Mimari',
      araclar: 'Araçlar',
      karsilastirmalar: 'Karşılaştırmalar',
    }[dir] ?? 'Docs'
  );
}
