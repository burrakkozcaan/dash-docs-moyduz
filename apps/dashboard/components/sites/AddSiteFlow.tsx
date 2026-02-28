"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RiArrowLeftSLine,
  RiCloseLine,
  RiImageLine,
  RiInformationLine,
} from "@remixicon/react";
import * as Button from "@repo/ui/new-ui/button";
import { cn } from "@/utils/cn";
import { MOCK_TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/data/templates";
import AppLogoIcon from "../app-logo-icon";

type WizardStep = {
  id: string;
  title: string;
};

const STEPS: WizardStep[] = [
  { id: "general", title: "Genel Bilgiler" },
  { id: "pricing", title: "Proje Detayları" },
  { id: "image", title: "Site Görseli" },
  { id: "stock", title: "Site Briefi" },
  { id: "summary", title: "Özet" },
];

function StepSuccessIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      className="size-3.5 shrink-0 origin-center text-success-base"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M7 14A7 7 0 117 0a7 7 0 010 14zm-.698-4.2l4.95-4.95-.99-.99-3.96 3.96-1.98-1.98-.99.99 2.97 2.97z"
      />
    </svg>
  );
}

export function AddSiteFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateSlug = searchParams.get("template");

  const selectedTemplate = useMemo(
    () => MOCK_TEMPLATES.find((t) => t.slug === templateSlug) ?? null,
    [templateSlug],
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [siteName, setSiteName] = useState("");
  const [sector, setSector] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("SITE-0001");
  const [projectSummary, setProjectSummary] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [priorityFeatures, setPriorityFeatures] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTemplate) return;
    setSiteName((prev) => prev || selectedTemplate.title);
    setSector((prev) => prev || selectedTemplate.category);
    setDescription((prev) => prev || selectedTemplate.description);
    setProjectSummary((prev) => prev || selectedTemplate.description);
    setPriorityFeatures((prev) => prev || selectedTemplate.pages.slice(0, 3).join(", "));
  }, [selectedTemplate]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const currentTitle = STEPS[currentStep]?.title ?? "Site Ekle";
  const previousTitle = STEPS[currentStep - 1]?.title ?? "Siteler";
  const stepIndicatorTop = currentStep * 76;

  const canContinue = useMemo(() => {
    if (currentStep === 0) return siteName.trim().length > 0 && sector.trim().length > 0;
    if (currentStep === 1) return Number(price) > 0;
    if (currentStep === 3) return projectSummary.trim().length > 0;
    return true;
  }, [currentStep, price, sector, siteName, projectSummary]);

  const onBack = () => {
    if (currentStep === 0) {
      router.push("/dashboard/sites");
      return;
    }
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const onContinue = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    router.push("/dashboard/sites");
  };

  const previewGradient = selectedTemplate?.gradient ?? "from-slate-600 to-slate-800";

  const previewSlug = useMemo(() => {
    const source = (siteName.trim() || selectedTemplate?.slug || "yeni-site").toLowerCase();
    const sanitized = source.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return sanitized || "yeni-site";
  }, [siteName, selectedTemplate]);

  const stepDescriptions = [
    "Temel site bilgilerini girin.",
    "Proje kodu ve bütçe detaylarını belirleyin.",
    "Sitenizi temsil edecek görseli yükleyin.",
    "Sitenin amacı ve hedef kitlesini kısaca yazın.",
    "Bilgileri kontrol edip siteyi oluşturun.",
  ];

  const currentStepDescription =
    stepDescriptions[currentStep] ?? "Site bilgilerinizi yapılandırın ve yayına hazırlayın";

  return (
    <div className="flex min-h-full flex-col bg-bg-white-0 lg:flex-row">
      <aside className="hidden w-[212px] shrink-0 flex-col gap-12  p-8 lg:flex">
        <div className="flex size-8 items-center justify-center rounded-xl bg-primary-base text-static-white">
          <AppLogoIcon />
        </div>

        <div className="relative flex w-full flex-1 flex-col gap-8">
          <div
            className="absolute right-[-34px] h-11 w-0.5 bg-primary-base transition-all duration-500"
            style={{
              top: stepIndicatorTop,
              transitionTimingFunction: "cubic-bezier(0.6, 0.6, 0, 1)",
            }}
          />

          {STEPS.map((step, index) => {
            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(index)}
                className="flex w-full flex-col gap-1 text-left focus:outline-none"
              >
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-label-sm transition-colors duration-200 ease-out",
                    active ? "text-primary-base" : completed ? "text-text-sub-600" : "text-text-soft-400",
                  )}
                >
                  {`Adım ${index + 1}/${STEPS.length}`}
                  {completed && <StepSuccessIcon />}
                </div>
                <div
                  className={cn(
                    "text-label-sm transition-colors duration-200 ease-out",
                    active || completed ? "text-text-strong-950" : "text-text-sub-600",
                  )}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-paragraph-xs text-text-soft-400">© 2026 Moyduz</div>
      </aside>

      <div className="lg:hidden">
        <div className="px-2.5 pb-3.5 pt-2.5">
          <div className="relative flex h-9 items-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-label-sm text-text-sub-600 hover:text-text-strong-950"
            >
              <RiArrowLeftSLine className="size-5" />
              {`${previousTitle} sayfasına dön`}
            </button>
            <div className="flex-1" />
            <Link
              href="/dashboard/sites"
              className="inline-flex size-9 items-center justify-center rounded-10 text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950"
            >
              <RiCloseLine className="size-5" />
            </Link>
          </div>
        </div>

        <div className="h-1 w-full bg-bg-soft-200">
          <div
            className="h-full bg-primary-base transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-full bg-primary-base text-label-xs text-static-white">
              {currentStep + 1}
            </div>
            <span className="text-paragraph-sm text-text-strong-950">{currentTitle}</span>
          </div>
          <div className="text-right text-paragraph-sm text-text-soft-400">
            {`${currentStep + 1}/${STEPS.length}`}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:grid md:flex-1 md:grid-cols-[minmax(0,600fr)_minmax(0,628fr)]">
        <div className="flex flex-col md:py-2 md:pl-2 lg:pl-0">
          <div className="flex w-full flex-1 flex-col items-center justify-center overflow-hidden bg-bg-weak-50 py-9 md:rounded-2xl lg:py-0">
            <div className="flex w-full max-w-[352px] flex-col gap-5">
              <div>
                <div className="text-label-md text-text-sub-600">Önizleme</div>
                <div className="mt-1 text-label-sm text-text-soft-400">
                  Sitenizin nasıl görüneceği burada yer alır.
                </div>
              </div>

              <div className="relative w-full min-w-0">
                <div className="relative z-10 flex w-full flex-col gap-6 rounded-3xl bg-bg-white-0 p-6 pb-7 shadow-custom-md">
                  <div className="flex items-center gap-1.5">
                    <RiInformationLine className="size-3.5 text-text-disabled-300" />
                    <div className="text-label-sm text-text-soft-400">{`Kod: ${sku || "SITE-0000"}`}</div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-stroke-soft-200">
                    <div className="flex items-center gap-1.5 bg-bg-soft-200 px-3 py-2">
                      <span className="size-2 rounded-full bg-rose-400/70" />
                      <span className="size-2 rounded-full bg-amber-400/70" />
                      <span className="size-2 rounded-full bg-green-400/70" />
                      <div className="ml-2 flex-1 truncate rounded-full bg-bg-weak-50 px-2 py-0.5 text-[10px] text-text-soft-400">
                        {"demo.moyduz.com/" + previewSlug}
                      </div>
                    </div>

                    <div className={cn("relative h-[224px] w-full ", previewGradient)}>
                      {imagePreviewUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imagePreviewUrl}
                          alt="Yüklenen site görseli"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}

                      {!imagePreviewUrl && (
                        <>
                          <div className="absolute inset-0 bg-black/10" />

                          <div className="absolute inset-0 p-4">
                            <div className="h-full rounded-xl bg-white/18 p-3 ring-1 ring-white/35 backdrop-blur-[1px]">
                              <div className="animate-pulse">
                                <div className="flex items-center justify-between">
                                  <div className="h-2.5 w-20 rounded-full bg-white/75" />
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                                  </div>
                                </div>

                                <div className="mt-3 space-y-2">
                                  <div className="h-4 w-3/4 rounded-full bg-white/80" />
                                  <div className="h-3 w-1/2 rounded-full bg-white/65" />
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-2">
                                  {[...Array(3)].map((_, index) => (
                                    <div key={index} className="h-14 rounded-lg bg-white/45" />
                                  ))}
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="mt-3 h-2.5 w-1/3 rounded-full bg-white/65" />
                                  <div className="mt-3 h-2.5 w-1/3 rounded-full bg-white/65" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="absolute left-3 top-3 rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                        {sector || selectedTemplate?.category || "Sektör"}
                      </div>

                      <div className="absolute bottom-3 right-3 rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white backdrop-blur-sm">
                        {(selectedTemplate?.pages.length ?? 6) + " sayfa"}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="text-label-md text-text-soft-400">
                      {sector || selectedTemplate?.category || "Sektör"}
                    </div>
                    <div className="mt-2 line-clamp-3 text-label-lg text-text-sub-600">
                      {siteName || selectedTemplate?.title || "Site adı"}
                    </div>
                    <div className="mt-1 line-clamp-2 text-paragraph-sm text-text-soft-400">
                      {description || selectedTemplate?.description || "Site açıklaması burada görünecek."}
                    </div>
                    {price.trim() && (
                      <div className="mt-2 text-title-h4 text-text-strong-950">{"$" + Number(price).toFixed(2)}</div>
                    )}
                  </div>

                  <div className="relative h-0 w-full">
                    <div
                      className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 text-stroke-soft-200"
                      style={{
                        background:
                          "linear-gradient(90deg, currentcolor 4px, transparent 4px) 50% 50% / 10px 1px repeat-x",
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="text-label-md text-text-soft-400">Site Briefi</div>
                      <div className="text-label-sm text-text-soft-400">
                        {projectSummary.trim() ? "Dolu" : "Bekleniyor"}
                      </div>
                    </div>

                    <div className="rounded-lg bg-bg-weak-50 p-3 ring-1 ring-inset ring-stroke-soft-200">
                      <div className="text-paragraph-xs text-text-soft-400">Amaç</div>
                      <div className="mt-1 line-clamp-2 text-paragraph-sm text-text-sub-600">
                        {projectSummary || "Henüz yazılmadı"}
                      </div>

                      <div className="mt-2 text-paragraph-xs text-text-soft-400">Hedef Kitle</div>
                      <div className="mt-1 line-clamp-2 text-paragraph-sm text-text-sub-600">
                        {targetAudience || "Henüz belirtilmedi"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-4 py-9 md:px-8 lg:py-0">
          <div className="relative z-20 mt-8 hidden w-full items-center lg:flex">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-label-sm text-text-sub-600 hover:text-text-strong-950"
            >
              <RiArrowLeftSLine className="size-5" />
              {`${previousTitle} sayfasına dön`}
            </button>
            <div className="flex-1" />
            <Link
              href="/dashboard/sites"
              className="flex size-5 items-center justify-center rounded-md text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950"
            >
              <RiCloseLine className="size-[18px]" />
            </Link>
          </div>

          <div className="flex h-full w-full flex-col justify-center md:py-9">
            <div className="mx-auto flex w-full max-w-[372px] flex-col gap-5 md:gap-6">
              <div className="flex w-full flex-col gap-6">
                <RiImageLine className="size-7 text-primary-base" />
                <div>
                  <div className="text-title-h5 text-text-strong-950">{currentTitle}</div>
                  <div className="mt-2 text-paragraph-md text-text-sub-600">
                    {currentStepDescription}
                  </div>
                </div>
              </div>

              {currentStep === 0 && (
                <div className="flex flex-col gap-3">
                  <label className="text-label-sm text-text-sub-600">
                    Site adı
                    <input
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="Yeni sitem"
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Sektör
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                    >
                      <option value="">Sektör seçin</option>
                      {TEMPLATE_CATEGORIES.filter((category) => category !== "Tümü").map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Açıklama
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 min-h-[88px] w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="Sitenizi kısaca anlatın..."
                    />
                  </label>
                </div>
              )}

              {currentStep === 1 && (
                <div className="flex flex-col gap-3">
                  <label className="text-label-sm text-text-sub-600">
                    Proje kodu
                    <input
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                    />
                  </label>
                  <label className="text-label-sm text-text-sub-600">
                    Bütçe (USD)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                    />
                  </label>
                </div>
              )}

              {currentStep === 2 && (
                <label className="w-full cursor-pointer rounded-2xl border border-dashed border-stroke-sub-300 bg-bg-white-0 p-6">
                  <div className="text-label-md text-text-sub-600">Bir dosya seçin veya buraya sürükleyin.</div>
                  <div className="mt-1 text-label-sm text-text-soft-400">
                    JPEG, PNG, PDF ve MP4 formatları, en fazla 50 MB.
                  </div>
                  <div className="mt-4">
                    <span className="inline-flex h-8 items-center rounded-lg bg-bg-white-0 px-2.5 text-label-sm text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200">
                      Dosya seç
                    </span>
                  </div>

                  {imageFile && (
                    <div className="mt-3 rounded-lg bg-bg-weak-50 px-3 py-2 text-paragraph-sm text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200">
                      {"Yüklendi: " + imageFile.name}
                    </div>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/webp,application/pdf,video/mp4"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col gap-3">
                  <label className="text-label-sm text-text-sub-600">
                    Proje özeti
                    <textarea
                      value={projectSummary}
                      onChange={(e) => setProjectSummary(e.target.value)}
                      className="mt-1 min-h-[88px] w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="Ne geliştirdiğinizin kısa bir özeti…"
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Hedef kitle
                    <input
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="mt-1 h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="Örn: 25-45 yaş şehirli profesyoneller"
                    />
                  </label>

                  <label className="text-label-sm text-text-sub-600">
                    Öncelikli özellikler
                    <textarea
                      value={priorityFeatures}
                      onChange={(e) => setPriorityFeatures(e.target.value)}
                      className="mt-1 min-h-[70px] w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-paragraph-sm text-text-strong-950 outline-none focus:border-stroke-strong-950"
                      placeholder="Örn: Hızlı teklif formu, WhatsApp butonu, blog"
                    />
                  </label>

                  <p className="text-paragraph-xs text-text-soft-400">
                    Kısa bir özet, kapsamı doğru belirlememize yardımcı olur.
                  </p>
                </div>
              )}

              {currentStep === 4 && (
                <div className="rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-4">
                  <div className="text-label-sm text-text-strong-950">Özet</div>
                  <div className="mt-3 space-y-2 text-paragraph-sm text-text-sub-600">
                    <p>
                      <strong className="text-text-strong-950">Site:</strong> {siteName || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Sektör:</strong> {sector || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Bütçe:</strong> {price.trim() ? `$${Number(price).toFixed(2)}` : "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Proje Özeti:</strong> {projectSummary || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Hedef Kitle:</strong> {targetAudience || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Öncelikli Özellikler:</strong> {priorityFeatures || "-"}
                    </p>
                    <p>
                      <strong className="text-text-strong-950">Şablon:</strong>{" "}
                      {selectedTemplate?.title ?? "Seçilmedi"}
                    </p>
                  </div>
                </div>
              )}

              <Button.Root
                variant="primary"
                mode="filled"
                size="small"
                className="text-white"
                disabled={!canContinue}
                onClick={onContinue}
              >
                {currentStep === STEPS.length - 1 ? "Siteyi Oluştur" : "Devam Et"}
              </Button.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
