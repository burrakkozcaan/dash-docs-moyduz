import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function ProductsPage() {
  return (
    <DashboardShell title="Ürünler">
      <div className="p-4 lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Ürün Yönetimi</CardTitle>
            <CardDescription>
              Ürün listesi, stok ve fiyat güncellemeleri burada olacak.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Laravel ürün endpoint’i bağlandıktan sonra tabloyu aktif ederiz.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
