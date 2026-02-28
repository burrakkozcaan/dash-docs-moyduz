import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function AnalyticsPage() {
  return (
    <DashboardShell title="Analizler">
      <div className="p-4 lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Analitik Görünüm</CardTitle>
            <CardDescription>
              Satış, trafik ve dönüşüm metriklerini burada toplayacağız.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              API bağlantısı sonrası chart bileşenlerini bu sayfaya
              taşıyabiliriz.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
