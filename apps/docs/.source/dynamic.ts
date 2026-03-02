// @ts-nocheck
import { dynamic } from 'fumadocs-mdx/runtime/dynamic';
import * as Config from '../source.script';

const create = await dynamic<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
    docs: {
      /**
       * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
       */
      extractedReferences: import("fumadocs-mdx").ExtractedReference[];
    },
  }
}>(Config, {"configPath":"source.script.ts","environment":"next","outDir":".source"}, {"doc":{"passthroughs":["extractedReferences"]}});