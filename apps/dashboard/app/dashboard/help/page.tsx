import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function HelpPage() {
  return (
    <DashboardShell title="Yardım Merkezi">
      <div className="p-4 lg:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Yardım Merkezi</CardTitle>
            <CardDescription>
              Onboarding nasıl çalışır, teslim süreçleri, iptal politikası ve SSS.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              İçerik burada listelenecek. Destek yükünü azaltmak için sık sorulan sorular ve rehberler eklenecek.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
