import { SiteDetailPage } from "@/components/sites/SiteDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SiteDetailRoute({ params }: Props) {
  const { id } = await params;
  return <SiteDetailPage siteId={id} />;
}
