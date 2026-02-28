import arcjet, { detectBot, fixedWindow, shield } from "@arcjet/next";

/**
 * Auth endpoint'leri için Arcjet: önce buradan geçer, sonra Laravel API'ye gider.
 * - shield: Yaygın saldırılar (ör. input injection)
 * - detectBot: Bot / otomasyon tespiti
 * - fixedWindow: Rate limit (örn. dakikada 10 login denemesi)
 */
export const arcjetAuth = (() => {
  const key = process.env.ARCJET_KEY;
  if (!key) return null;

  return arcjet({
    key,
    rules: [
      shield({
        mode: process.env.ARCJET_DRY_RUN === "1" ? "DRY_RUN" : "LIVE",
      }),
      detectBot({
        mode: process.env.ARCJET_DRY_RUN === "1" ? "DRY_RUN" : "LIVE",
        allow: [], // Tespit edilen botları engelle
      }),
      fixedWindow({
        mode: process.env.ARCJET_DRY_RUN === "1" ? "DRY_RUN" : "LIVE",
        window: "1m",
        max: 10, // Dakikada 10 istek (login/register/forgot-password için makul)
      }),
    ],
  });
})();

/** Auth route'unda koruma uygula; engellenirse 429/403 döner, yoksa null (devam). */
export async function protectAuth(request: Request): Promise<Response | null> {
  if (!arcjetAuth) return null; // Key yoksa koruma yok (local dev)

  const decision = await arcjetAuth.protect(request);
  if (decision.isDenied()) {
    const reason = decision.reason;
    const message =
      reason.isRateLimit?.()
        ? "Çok fazla deneme. Lütfen biraz bekleyin."
        : reason.isBot?.()
          ? "İstek reddedildi."
          : "İstek güvenlik nedeniyle reddedildi.";
    const status = reason.isRateLimit?.() ? 429 : 403;
    return new Response(
      JSON.stringify({ message }),
      { status, headers: { "Content-Type": "application/json" } }
    );
  }
  return null;
}
