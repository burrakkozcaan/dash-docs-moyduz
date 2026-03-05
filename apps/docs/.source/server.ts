// @ts-nocheck
import { frontmatter as __fd_glob_31 } from "../content/docs/teknik-mimari/kaynak-kod-teslimi-ve-ozgurluk.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_30 } from "../content/docs/teknik-mimari/index.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_29 } from "../content/docs/maliyet-analizi/sifir-komisyon-yalanlari-ve-nakit-akisi.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_28 } from "../content/docs/maliyet-analizi/index.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_27 } from "../content/docs/maliyet-analizi/e-ticaret-paket-yenileme-ucretleri-enflasyon-tuzagi.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_26 } from "../content/docs/maliyet-analizi/3-yillik-sahip-olma-maliyeti-tco.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_25 } from "../content/docs/karar-motoru/index.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_24 } from "../content/docs/karar-motoru/hazir-paket-mi-ozel-yazilim-mi.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_23 } from "../content/docs/karar-motoru/hazir-e-ticaret-sinirlari.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_22 } from "../content/docs/karar-motoru/e-ticaret-altyapisi-secerken-dikkat-edilmesi-gerekenler.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_21 } from "../content/docs/karar-motoru/b2b-e-ticaret-gerekli-mi.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_20 } from "../content/docs/karsilastirmalar/ozel-yazilim-vs-hazir-paket.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_19 } from "../content/docs/karsilastirmalar/moyduz-vs-ikas.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_18 } from "../content/docs/karsilastirmalar/moyduz-vs-ideasoft.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_17 } from "../content/docs/karsilastirmalar/index.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_16 } from "../content/docs/entegrasyonlar/odeme.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_15 } from "../content/docs/entegrasyonlar/index.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_14 } from "../content/docs/araclar/trendyol-komisyon-hesaplama.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_13 } from "../content/docs/araclar/tco-hesaplayici.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_12 } from "../content/docs/araclar/kar-marji.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_11 } from "../content/docs/araclar/index.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_10 } from "../content/docs/altyapi-tasima/index.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_9 } from "../content/docs/altyapi-tasima/cayma-bedeli-destegi.mdx?collection=docs&only=frontmatter"
import { frontmatter as __fd_glob_8 } from "../content/docs/index.mdx?collection=docs&only=frontmatter"
import { default as __fd_glob_7 } from "../content/docs/teknik-mimari/meta.json?collection=docs"
import { default as __fd_glob_6 } from "../content/docs/maliyet-analizi/meta.json?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/karar-motoru/meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/karsilastirmalar/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/entegrasyonlar/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/araclar/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/altyapi-tasima/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
    docs: {
      /**
       * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
       */
      extractedReferences: import("fumadocs-mdx").ExtractedReference[];
    },
  }
} & {
  DocData: {
    blog: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
    docs: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>({"doc":{"passthroughs":["extractedReferences","lastModified"]}});

export const blog = await create.docLazy("blog", "content/blog", {}, {});

export const docs = await create.docsLazy("docs", "content/docs", {"meta.json": __fd_glob_0, "altyapi-tasima/meta.json": __fd_glob_1, "araclar/meta.json": __fd_glob_2, "entegrasyonlar/meta.json": __fd_glob_3, "karsilastirmalar/meta.json": __fd_glob_4, "karar-motoru/meta.json": __fd_glob_5, "maliyet-analizi/meta.json": __fd_glob_6, "teknik-mimari/meta.json": __fd_glob_7, }, {"index.mdx": __fd_glob_8, "altyapi-tasima/cayma-bedeli-destegi.mdx": __fd_glob_9, "altyapi-tasima/index.mdx": __fd_glob_10, "araclar/index.mdx": __fd_glob_11, "araclar/kar-marji.mdx": __fd_glob_12, "araclar/tco-hesaplayici.mdx": __fd_glob_13, "araclar/trendyol-komisyon-hesaplama.mdx": __fd_glob_14, "entegrasyonlar/index.mdx": __fd_glob_15, "entegrasyonlar/odeme.mdx": __fd_glob_16, "karsilastirmalar/index.mdx": __fd_glob_17, "karsilastirmalar/moyduz-vs-ideasoft.mdx": __fd_glob_18, "karsilastirmalar/moyduz-vs-ikas.mdx": __fd_glob_19, "karsilastirmalar/ozel-yazilim-vs-hazir-paket.mdx": __fd_glob_20, "karar-motoru/b2b-e-ticaret-gerekli-mi.mdx": __fd_glob_21, "karar-motoru/e-ticaret-altyapisi-secerken-dikkat-edilmesi-gerekenler.mdx": __fd_glob_22, "karar-motoru/hazir-e-ticaret-sinirlari.mdx": __fd_glob_23, "karar-motoru/hazir-paket-mi-ozel-yazilim-mi.mdx": __fd_glob_24, "karar-motoru/index.mdx": __fd_glob_25, "maliyet-analizi/3-yillik-sahip-olma-maliyeti-tco.mdx": __fd_glob_26, "maliyet-analizi/e-ticaret-paket-yenileme-ucretleri-enflasyon-tuzagi.mdx": __fd_glob_27, "maliyet-analizi/index.mdx": __fd_glob_28, "maliyet-analizi/sifir-komisyon-yalanlari-ve-nakit-akisi.mdx": __fd_glob_29, "teknik-mimari/index.mdx": __fd_glob_30, "teknik-mimari/kaynak-kod-teslimi-ve-ozgurluk.mdx": __fd_glob_31, }, {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "altyapi-tasima/cayma-bedeli-destegi.mdx": () => import("../content/docs/altyapi-tasima/cayma-bedeli-destegi.mdx?collection=docs"), "altyapi-tasima/index.mdx": () => import("../content/docs/altyapi-tasima/index.mdx?collection=docs"), "araclar/index.mdx": () => import("../content/docs/araclar/index.mdx?collection=docs"), "araclar/kar-marji.mdx": () => import("../content/docs/araclar/kar-marji.mdx?collection=docs"), "araclar/tco-hesaplayici.mdx": () => import("../content/docs/araclar/tco-hesaplayici.mdx?collection=docs"), "araclar/trendyol-komisyon-hesaplama.mdx": () => import("../content/docs/araclar/trendyol-komisyon-hesaplama.mdx?collection=docs"), "entegrasyonlar/index.mdx": () => import("../content/docs/entegrasyonlar/index.mdx?collection=docs"), "entegrasyonlar/odeme.mdx": () => import("../content/docs/entegrasyonlar/odeme.mdx?collection=docs"), "karsilastirmalar/index.mdx": () => import("../content/docs/karsilastirmalar/index.mdx?collection=docs"), "karsilastirmalar/moyduz-vs-ideasoft.mdx": () => import("../content/docs/karsilastirmalar/moyduz-vs-ideasoft.mdx?collection=docs"), "karsilastirmalar/moyduz-vs-ikas.mdx": () => import("../content/docs/karsilastirmalar/moyduz-vs-ikas.mdx?collection=docs"), "karsilastirmalar/ozel-yazilim-vs-hazir-paket.mdx": () => import("../content/docs/karsilastirmalar/ozel-yazilim-vs-hazir-paket.mdx?collection=docs"), "karar-motoru/b2b-e-ticaret-gerekli-mi.mdx": () => import("../content/docs/karar-motoru/b2b-e-ticaret-gerekli-mi.mdx?collection=docs"), "karar-motoru/e-ticaret-altyapisi-secerken-dikkat-edilmesi-gerekenler.mdx": () => import("../content/docs/karar-motoru/e-ticaret-altyapisi-secerken-dikkat-edilmesi-gerekenler.mdx?collection=docs"), "karar-motoru/hazir-e-ticaret-sinirlari.mdx": () => import("../content/docs/karar-motoru/hazir-e-ticaret-sinirlari.mdx?collection=docs"), "karar-motoru/hazir-paket-mi-ozel-yazilim-mi.mdx": () => import("../content/docs/karar-motoru/hazir-paket-mi-ozel-yazilim-mi.mdx?collection=docs"), "karar-motoru/index.mdx": () => import("../content/docs/karar-motoru/index.mdx?collection=docs"), "maliyet-analizi/3-yillik-sahip-olma-maliyeti-tco.mdx": () => import("../content/docs/maliyet-analizi/3-yillik-sahip-olma-maliyeti-tco.mdx?collection=docs"), "maliyet-analizi/e-ticaret-paket-yenileme-ucretleri-enflasyon-tuzagi.mdx": () => import("../content/docs/maliyet-analizi/e-ticaret-paket-yenileme-ucretleri-enflasyon-tuzagi.mdx?collection=docs"), "maliyet-analizi/index.mdx": () => import("../content/docs/maliyet-analizi/index.mdx?collection=docs"), "maliyet-analizi/sifir-komisyon-yalanlari-ve-nakit-akisi.mdx": () => import("../content/docs/maliyet-analizi/sifir-komisyon-yalanlari-ve-nakit-akisi.mdx?collection=docs"), "teknik-mimari/index.mdx": () => import("../content/docs/teknik-mimari/index.mdx?collection=docs"), "teknik-mimari/kaynak-kod-teslimi-ve-ozgurluk.mdx": () => import("../content/docs/teknik-mimari/kaynak-kod-teslimi-ve-ozgurluk.mdx?collection=docs"), });