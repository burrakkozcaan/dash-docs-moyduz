"use client";

import { useState } from "react";
import { RiAddLine } from "@remixicon/react";

import { DashboardShell } from "@/components/dashboard-shell";
import { SupportTicketStatusBadge } from "@/components/support/SupportTicketStatusBadge";
import * as Button from "@repo/ui/new-ui/button";
import * as Drawer from "@repo/ui/new-ui/drawer";
import * as InputPrimitive from "@repo/ui/new-ui/input";
import { Root as TextareaRoot } from "@repo/ui/new-ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";

export interface Ticket {
  id: number;
  ticket_number: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  category: string;
  created_at: string;
  email: string;
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("product");
  const [priority, setPriority] = useState<string>("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/support-tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          message: description.trim(),
          category,
          priority,
        }),
      });

      const data = await res.json().catch(() => ({}));

      const newTicket: Ticket = {
        id: data.id ?? Date.now(),
        ticket_number: data.ticket_number ?? `#${String(tickets.length + 1).padStart(4, "0")}`,
        subject: subject.trim(),
        message: description.trim(),
        status: "open",
        priority,
        category,
        created_at: new Date().toISOString(),
        email: data.email ?? "",
      };

      setTickets((prev) => [newTicket, ...prev]);
      setIsDialogOpen(false);
      resetForm();
    } catch {
      const newTicket: Ticket = {
        id: Date.now(),
        ticket_number: `#${String(tickets.length + 1).padStart(4, "0")}`,
        subject: subject.trim(),
        message: description.trim(),
        status: "open",
        priority,
        category,
        created_at: new Date().toISOString(),
        email: "",
      };
      setTickets((prev) => [newTicket, ...prev]);
      setIsDialogOpen(false);
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const getUserInitials = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

  const resetForm = () => {
    setSubject("");
    setDescription("");
    setCategory("product");
    setPriority("medium");
    setError(null);
  };

  return (
    <DashboardShell title="Destek Talepleri">
      <div className="flex h-full w-full flex-col gap-y-4 p-4 md:p-6">
        <div className="flex w-full flex-col gap-y-4 md:flex-row md:items-center md:justify-between">
          <h4 className="whitespace-nowrap text-2xl font-medium text-foreground">
            Destek Talepleri
          </h4>

          <Drawer.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Drawer.Trigger asChild>
              <Button.Root
                type="button"
                variant="primary"
                mode="filled"
                size="small"
                className="text-white"
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
              >
                <Button.Icon as={RiAddLine} />
                Talep ekle
              </Button.Root>
            </Drawer.Trigger>

            <Drawer.Content
              className="absolute inset-y-0 mx-2 my-2 max-h-[calc(100%-16px)] w-[min(400px,calc(100%-16px))] rounded-20 shadow-custom-md"
            >
              <Drawer.Header className="flex items-start gap-2 border-b">
                <Drawer.Title className="flex flex-col gap-1">
                  <div className="text-label-lg text-text-strong-950">Yeni destek talebi</div>
                  <div className="text-paragraph-sm text-text-sub-600">
                    Destek talebinizi aşağıdaki formu doldurarak iletin.
                  </div>
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.Body>
                <form onSubmit={handleSubmit} id="support-ticket-form">
                  <div className="space-y-4 p-5">
                    {/* Konu */}
                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-paragraph-xs font-medium text-text-sub-600">
                        Konu
                      </Label>
                      <InputPrimitive.Root>
                        <InputPrimitive.Wrapper>
                          <InputPrimitive.Input
                            id="subject"
                            placeholder="Konu başlığı..."
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </InputPrimitive.Wrapper>
                      </InputPrimitive.Root>
                    </div>

                    {/* Mesaj */}
                    <div className="space-y-1.5">
                      <Label htmlFor="description" className="text-paragraph-xs font-medium text-text-sub-600">
                        Mesaj
                      </Label>
                      <TextareaRoot
                        id="description"
                        placeholder="Mesajınızı yazın..."
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        className="min-h-[120px]"
                        simple
                        required
                      />
                    </div>
                  </div>

                  {/* Kategori + Öncelik */}
                  <div role="separator" className="relative flex w-full items-center bg-bg-weak-50 px-5 py-1.5 uppercase text-subheading-xs text-text-soft-400">
                    KATEGORİ VE ÖNCELİK
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="category" className="text-paragraph-xs font-medium text-text-sub-600">
                        Kategori
                      </Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger className="w-full rounded-lg border-border bg-background">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">Ürün</SelectItem>
                          <SelectItem value="billing">Faturalama</SelectItem>
                          <SelectItem value="emergency">Acil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="priority" className="text-paragraph-xs font-medium text-text-sub-600">
                        Öncelik
                      </Label>
                      <Select value={priority} onValueChange={setPriority} required>
                        <SelectTrigger className="w-full rounded-lg border-border bg-background">
                          <SelectValue placeholder="Öncelik seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Düşük</SelectItem>
                          <SelectItem value="medium">Orta</SelectItem>
                          <SelectItem value="high">Yüksek</SelectItem>
                          <SelectItem value="urgent">Acil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Hata mesajı */}
                  {error && (
                    <div className="mx-5 mb-4 rounded-lg border border-error-light bg-error-lighter p-3">
                      <p className="text-paragraph-xs text-error-base">{error}</p>
                    </div>
                  )}
                </form>
              </Drawer.Body>

              <Drawer.Footer className="justify-between gap-3 border-t">
                <Drawer.Close asChild>
                  <Button.Root
                    type="button"
                    variant="neutral"
                    mode="stroke"
                    size="medium"
                    disabled={isSubmitting}
                    onClick={resetForm}
                    className="flex-1"
                  >
                    İptal
                  </Button.Root>
                </Drawer.Close>
                <Button.Root
                  type="submit"
                  form="support-ticket-form"
                  variant="primary"
                  mode="filled"
                  size="medium"
                  className="flex-1 text-white"
                  disabled={
                    isSubmitting ||
                    !description.trim() ||
                    !subject.trim() ||
                    !category ||
                    !priority
                  }
                >
                  {isSubmitting ? "Gönderiliyor..." : "Talep gönder"}
                </Button.Root>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        </div>

        <p className="text-paragraph-sm text-text-sub-600">
          Kullanıcıların açtığı destek taleplerini buradan yönetebilirsiniz.
        </p>

        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Kullanıcı
                    </TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      İçerik
                    </TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Tarih
                    </TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Durum
                    </TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Öncelik
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="p-8 text-center text-muted-foreground"
                      >
                        Henüz destek talebi yok. İlk talebi eklemek için &quot;Talep ekle&quot; butonuna tıklayın.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tickets.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell className="p-4 align-middle">
                          <div className="flex flex-row items-center gap-2">
                            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted text-sm">
                              <span className="text-xs font-medium text-foreground">
                                {getUserInitials(item.email)}
                              </span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="truncate text-sm font-medium text-foreground">
                                {item.email || "—"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {item.ticket_number}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md p-4 align-middle">
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {item.message || item.subject}
                          </p>
                        </TableCell>
                        <TableCell className="p-4 align-middle">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(item.created_at)}
                          </span>
                        </TableCell>
                        <TableCell className="p-4 align-middle">
                          <SupportTicketStatusBadge status={item.status} />
                        </TableCell>
                        <TableCell className="p-4 align-middle">
                          <span className="capitalize text-sm text-muted-foreground">
                            {item.priority === "medium"
                              ? "Orta"
                              : item.priority === "high"
                                ? "Yüksek"
                                : item.priority === "urgent"
                                  ? "Acil"
                                  : item.priority === "low"
                                    ? "Düşük"
                                    : item.priority}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
