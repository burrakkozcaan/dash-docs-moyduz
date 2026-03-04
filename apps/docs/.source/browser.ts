// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
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
}>();
const browserCollections = {
  blog: create.doc("blog", {}),
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "altyapi-tasima/cayma-bedeli-destegi.mdx": () => import("../content/docs/altyapi-tasima/cayma-bedeli-destegi.mdx?collection=docs"), "altyapi-tasima/index.mdx": () => import("../content/docs/altyapi-tasima/index.mdx?collection=docs"), "araclar/index.mdx": () => import("../content/docs/araclar/index.mdx?collection=docs"), "araclar/trendyol-komisyon-hesaplama.mdx": () => import("../content/docs/araclar/trendyol-komisyon-hesaplama.mdx?collection=docs"), "karar-motoru/b2b-e-ticaret-gerekli-mi.mdx": () => import("../content/docs/karar-motoru/b2b-e-ticaret-gerekli-mi.mdx?collection=docs"), "karar-motoru/e-ticaret-altyapisi-secerken-dikkat-edilmesi-gerekenler.mdx": () => import("../content/docs/karar-motoru/e-ticaret-altyapisi-secerken-dikkat-edilmesi-gerekenler.mdx?collection=docs"), "karar-motoru/hazir-e-ticaret-sinirlari.mdx": () => import("../content/docs/karar-motoru/hazir-e-ticaret-sinirlari.mdx?collection=docs"), "karar-motoru/hazir-paket-mi-ozel-yazilim-mi.mdx": () => import("../content/docs/karar-motoru/hazir-paket-mi-ozel-yazilim-mi.mdx?collection=docs"), "karar-motoru/index.mdx": () => import("../content/docs/karar-motoru/index.mdx?collection=docs"), "karsilastirmalar/index.mdx": () => import("../content/docs/karsilastirmalar/index.mdx?collection=docs"), "karsilastirmalar/kiralik-e-ticaret-vs-satin-alma.mdx": () => import("../content/docs/karsilastirmalar/kiralik-e-ticaret-vs-satin-alma.mdx?collection=docs"), "karsilastirmalar/moyduz-vs-ideasoft.mdx": () => import("../content/docs/karsilastirmalar/moyduz-vs-ideasoft.mdx?collection=docs"), "karsilastirmalar/moyduz-vs-ikas.mdx": () => import("../content/docs/karsilastirmalar/moyduz-vs-ikas.mdx?collection=docs"), "maliyet-analizi/3-yillik-sahip-olma-maliyeti-tco.mdx": () => import("../content/docs/maliyet-analizi/3-yillik-sahip-olma-maliyeti-tco.mdx?collection=docs"), "maliyet-analizi/e-ticaret-paket-yenileme-ucretleri-enflasyon-tuzagi.mdx": () => import("../content/docs/maliyet-analizi/e-ticaret-paket-yenileme-ucretleri-enflasyon-tuzagi.mdx?collection=docs"), "maliyet-analizi/index.mdx": () => import("../content/docs/maliyet-analizi/index.mdx?collection=docs"), "maliyet-analizi/sifir-komisyon-yalanlari-ve-nakit-akisi.mdx": () => import("../content/docs/maliyet-analizi/sifir-komisyon-yalanlari-ve-nakit-akisi.mdx?collection=docs"), "teknik-mimari/index.mdx": () => import("../content/docs/teknik-mimari/index.mdx?collection=docs"), "teknik-mimari/kaynak-kod-teslimi-ve-ozgurluk.mdx": () => import("../content/docs/teknik-mimari/kaynak-kod-teslimi-ve-ozgurluk.mdx?collection=docs"), }),
};
export default browserCollections;