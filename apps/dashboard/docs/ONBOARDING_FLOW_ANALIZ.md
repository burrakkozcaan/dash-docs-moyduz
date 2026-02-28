# Onboarding akış analizi

## Mevcut akış

1. **Paket seçimi** (select-package) → paket + eklentiler seçilir  
2. **Eklentiler** (select-addons) → eklenti detayı  
3. **Tarama** (scan) → "Mevcut web siteniz var mı?"  
   - **Evet** + domain → API tarama → sonuçlar → **Brief**  
   - **Hayır** → doğrudan **Brief**  
4. **Brief** (AI brifing) → soru–cevap, paket önerisi  
5. **Paket seçimi** (tekrar, öneriyle veya manuel)  
6. **Form** (form) → adım adım form  
7. **Özet** (summary) → özet + Dashboard’a git  

---

## "Hayır" deyince Brief göstermek mantıklı mı?

**Evet, mantıklı.**

- Brief’in amacı: Kullanıcıyı tanımak (işletme türü, satış/rezervasyon ihtiyacı, zamanlama, öncelikler).  
- Paketleri görmüş olmak brief için gerekli değil; brief zaten paket önerisini üretiyor.  
- Akış: **Scan (Hayır)** → **Brief** → önerilen paket → **Paket seçimi** (öneriyle veya “Kendim seçeceğim”).  
- Böylece “sitem yok” diyen kullanıcı da birkaç soruyla yönlendirilip paket önerisi alıyor; sonra paket/eklenti ekranında net seçim yapıyor.

**Alternatif:** “Hayır” deyince brief’i atlayıp doğrudan paket seçimine gitmek de mümkün, ama AI önerisi ve kişiselleştirme kaybolur. Mevcut akış (Hayır → Brief) daha değerli.

---

## Diğer alanlarda “brief benzeri” form

- **Form adımlarında** (sektör, proje, son adım) zaten kısa sorular ve öneri butonları (hedef, sayfa sayısı, ek notlar) var.  
- İstersen **scan’de “Evet”** diyenlere de tarama sonrası kısa bir “Neden bu paket?” / “Size önerimiz” kartı (brief’teki gibi) gösterilebilir; şu an scan sonrası doğrudan brief’e gidiyor, bu da tutarlı.  
- Özet: Mevcut akış (Scan → Brief → Paket → Form → Özet) tutarlı; “Hayır” da brief’e gitsin, “Evet” de tarama sonrası brief’e gitsin.

---

## Özet sayfası: “Kurulumunuza önerilen”

- moydu-app’teki gibi **Summary’de “⚡ Recommended for your setup”** (Kurulumunuza önerilen) bölümü eklendi.  
- Seçili olmayan, plana ait önerilen eklentiler (API’de `is_recommended` varsa o, yoksa seçilmeyen ilk birkaç eklenti) listeleniyor.  
- “Ekle” / “+” ile kullanıcı eklentiler adımına geri gidip o eklentiyi ekleyebiliyor.  
- Böylece özet ekranında da upsell fırsatı sunulmuş oluyor.
