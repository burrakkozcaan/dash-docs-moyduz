import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function CustomersPage() {
  return (
    <DashboardShell title="Müşteriler">
      <div className="p-4 lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Müşteri Yönetimi</CardTitle>
            <CardDescription>
              Müşteri listesi ve segmentasyon ekranı bu sayfada olacak.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              İlk aşamada Laravel’den müşteri datasını burada doğrulayacağız.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
