"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Separator } from "@repo/ui/components/ui/separator";
import { cn } from "@repo/ui/lib/utils";

type User = {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  created_at?: string;
};

function resolveUser(payload: unknown): User | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  if (record.user && typeof record.user === "object") return record.user as User;
  if (record.data && typeof record.data === "object") return record.data as User;
  if ("email" in record || "name" in record) return record as User;
  return null;
}

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10 sm:grid sm:grid-cols-[minmax(0,250px)_minmax(0,1fr)] sm:items-center sm:gap-6">
      <div className="space-y-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 text-sm text-foreground">
        {children}
      </div>
    </div>
  );
}

function AccountSwitch({
  checked,
  onCheckedChange,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-input dark:bg-input/80"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform",
          checked ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
        )}
      />
    </button>
  );
}

export default function SettingsProfilePage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [userError, setUserError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [fullName, setFullName] = React.useState("");
  const [theme, setTheme] = React.useState("system");
  const [openLinksInApp, setOpenLinksInApp] = React.useState(true);
  const [timezone, setTimezone] = React.useState("asia-saigon");
  const [weekStartsOn, setWeekStartsOn] = React.useState("monday");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [passwordLastChanged, setPasswordLastChanged] = React.useState<string | null>("2 ay önce");
  const userId = React.useMemo(() => user?.id?.toString() ?? "7nsqk2c2v1R", [user?.id]);

  const fetchUser = React.useCallback(async () => {
    setLoading(true);
    setUserError(null);
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setUserError("Kullanıcı bilgisi için giriş yapman gerekiyor.");
      } else {
        const userRes = await fetch("/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const userPayload = await userRes.json().catch(() => null);
        if (!userRes.ok) {
          const message =
            userPayload && typeof userPayload === "object"
              ? (userPayload as { message?: string }).message
              : null;
          setUserError(message || "Kullanıcı bilgisi alınamadı.");
        } else {
          const extracted = resolveUser(userPayload);
          setUser(extracted ?? null);
          if (extracted?.name) setFullName(extracted.name);
          if (!extracted) setUserError("Kullanıcı cevabı beklenen formatta değil.");
        }
      }
    } catch {
      setUserError("Kullanıcı endpoint'ine ulaşılamadı.");
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const copyUserId = () => {
    void navigator.clipboard.writeText(userId);
  };

  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-0 py-0 sm:min-h-0">
      <div className="space-y-8">
        <div>
          <h2 className="font-semibold text-xl">Hesap</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Kişisel bilgilerinizi ve hesap tercihlerinizi yönetin.
          </p>
        </div>

        <Separator orientation="horizontal" />

        <section className="space-y-4">
          <div className="text-sm font-semibold text-foreground">Bilgiler</div>
          <div className="space-y-5">
            <SettingsRow
              label="Profil fotoğrafı"
              description="Bu görsel çalışma alanınızda görünür."
            >
              <div className="flex flex-wrap items-center gap-4">
                <Avatar className="h-16 w-16 size-16 shrink-0 overflow-hidden rounded-full">
                  <AvatarImage src="/avatar-profile.jpg" alt="" />
                  <AvatarFallback>
                    {(user?.name ?? fullName || "K")
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Fotoğrafı değiştir
                  </Button>
                  <input
                    ref={fileInputRef}
                    accept="image/*"
                    type="file"
                    className="hidden"
                    aria-label="Profil fotoğrafı yükle"
                  />
                </div>
              </div>
            </SettingsRow>

            <SettingsRow label="Ad Soyad">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ad Soyad"
              />
            </SettingsRow>

            <SettingsRow
              label="E-posta adresi"
              description="Bildirimler bu adrese gönderilir."
            >
              <Input
                type="email"
                readOnly
                value={user?.email ?? ""}
                className="bg-muted/40"
              />
            </SettingsRow>

            <SettingsRow
              label="Şifre"
              description={passwordLastChanged ? `Son değişiklik ${passwordLastChanged}.` : undefined}
            >
              <div className="flex items-center justify-between gap-3 rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                <span>••••••••</span>
                <Button variant="outline" size="sm" type="button">
                  Şifre belirle
                </Button>
              </div>
            </SettingsRow>
          </div>
        </section>

        <Separator orientation="horizontal" />

        <section className="space-y-4">
          <div className="text-sm font-semibold text-foreground">Görünüm</div>
          <div className="space-y-5">
            <SettingsRow label="Tema">
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Tema seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">Sistem varsayılanı</SelectItem>
                  <SelectItem value="light">Açık</SelectItem>
                  <SelectItem value="dark">Koyu</SelectItem>
                </SelectContent>
              </Select>
            </SettingsRow>

            <SettingsRow
              label="Bağlantıları uygulama içinde aç"
              description="Bir bağlantıya tıkladığınızda mümkünse uygulama içinde açılsın."
            >
              <AccountSwitch
                checked={openLinksInApp}
                onCheckedChange={setOpenLinksInApp}
                aria-label="Bağlantıları uygulama içinde aç"
              />
            </SettingsRow>
          </div>
        </section>

        <Separator orientation="horizontal" />

        <section className="space-y-4">
          <div className="text-sm font-semibold text-foreground">Konum ve saat</div>
          <div className="space-y-5">
            <SettingsRow label="Saat dilimi">
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Saat dilimi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-saigon">Saigon, Asya</SelectItem>
                  <SelectItem value="europe-istanbul">İstanbul, Avrupa</SelectItem>
                  <SelectItem value="europe-london">Londra, Avrupa</SelectItem>
                </SelectContent>
              </Select>
            </SettingsRow>

            <SettingsRow
              label="Hafta başlangıcı"
              description="Takvimlerinizde haftanın ilk günü."
            >
              <Select value={weekStartsOn} onValueChange={setWeekStartsOn}>
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Gün seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Pazartesi</SelectItem>
                  <SelectItem value="sunday">Pazar</SelectItem>
                </SelectContent>
              </Select>
            </SettingsRow>
          </div>
        </section>

        <Separator orientation="horizontal" />

        <section className="space-y-4">
          <div className="text-sm font-semibold text-foreground">Kimlik doğrulama</div>
          <div className="space-y-5">
            <SettingsRow
              label="Token"
              description="Bearer kimlik doğrulama token'ı olan API anahtarınızı yönetin."
            >
              <Button variant="outline" size="sm" type="button">
                + Kimlik doğrulama token'ı oluştur
              </Button>
            </SettingsRow>

            <SettingsRow
              label="Kullanıcı ID"
              description="Destek ile iletişime geçerseniz bu ID'yi paylaşın."
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  readOnly
                  value={userId}
                  className="h-9 font-mono text-sm bg-muted/40"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  type="button"
                  onClick={copyUserId}
                  aria-label="Kopyala"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="h-4 w-4"
                  >
                    <path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z" />
                  </svg>
                </Button>
              </div>
            </SettingsRow>
          </div>
        </section>
      </div>
    </main>
  );
}
