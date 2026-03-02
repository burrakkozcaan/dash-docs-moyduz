// source.script.ts
import { defineConfig as defineConfig2 } from "fumadocs-mdx/config";
import { visit } from "unist-util-visit";

// source.config.ts
import {
  applyMdxPreset,
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
import jsonSchema from "fumadocs-mdx/plugins/json-schema";
import lastModified from "fumadocs-mdx/plugins/last-modified";
var docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
      /**
       * API routes only
       */
      method: z.string().optional()
    }),
    postprocess: {
      includeProcessedMarkdown: true,
      extractLinkReferences: true
    },
    async: true,
    async mdxOptions(environment) {
      const { rehypeCodeDefaultOptions } = await import("fumadocs-core/mdx-plugins/rehype-code");
      const { remarkStructureDefaultOptions } = await import("fumadocs-core/mdx-plugins/remark-structure");
      const { remarkSteps } = await import("fumadocs-core/mdx-plugins/remark-steps");
      const { remarkFeedbackBlock } = await import("fumadocs-core/mdx-plugins/remark-feedback-block");
      const { transformerTwoslash } = await import("fumadocs-twoslash");
      const { createFileSystemTypesCache } = await import("fumadocs-twoslash/cache-fs");
      const { default: remarkMath } = await import("remark-math");
      const { remarkTypeScriptToJavaScript } = await import("fumadocs-docgen/remark-ts2js");
      const { default: rehypeKatex } = await import("rehype-katex");
      const { remarkAutoTypeTable, createGenerator, createFileSystemGeneratorCache } = await import("fumadocs-typescript");
      const generator = createGenerator({
        cache: createFileSystemGeneratorCache(".next/fumadocs-typescript")
      });
      const feedbackOptions = {
        resolve(node) {
          if (node.type === "mdxJsxFlowElement") return "skip";
          return node.type === "paragraph" || node.type === "image" || node.type === "list";
        }
      };
      return applyMdxPreset({
        remarkStructureOptions: {
          types: [...remarkStructureDefaultOptions.types, "code"]
        },
        rehypeCodeOptions: {
          langs: ["ts", "js", "html", "tsx", "mdx"],
          inline: "tailing-curly-colon",
          themes: {
            light: "catppuccin-latte",
            dark: "catppuccin-mocha"
          },
          transformers: [
            ...rehypeCodeDefaultOptions.transformers ?? [],
            transformerTwoslash({
              typesCache: createFileSystemTypesCache()
            }),
            transformerEscape()
          ]
        },
        remarkCodeTabOptions: {
          parseMdx: true
        },
        remarkNpmOptions: {
          persist: {
            id: "package-manager"
          }
        },
        remarkPlugins: [
          remarkSteps,
          remarkMath,
          [remarkFeedbackBlock, feedbackOptions],
          [
            remarkAutoTypeTable,
            {
              generator
            }
          ],
          remarkTypeScriptToJavaScript
        ],
        rehypePlugins: (v) => [rehypeKatex, ...v]
      })(environment);
    }
  },
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional()
    })
  }
});
var blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.iso.date().or(z.date()),
    image: z.string().optional()
  }),
  async: true,
  async mdxOptions(environment) {
    const { rehypeCodeDefaultOptions } = await import("fumadocs-core/mdx-plugins/rehype-code");
    const { remarkSteps } = await import("fumadocs-core/mdx-plugins/remark-steps");
    return applyMdxPreset({
      rehypeCodeOptions: {
        inline: "tailing-curly-colon",
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha"
        },
        transformers: [...rehypeCodeDefaultOptions.transformers ?? [], transformerEscape()]
      },
      remarkCodeTabOptions: {
        parseMdx: true
      },
      remarkNpmOptions: {
        persist: {
          id: "package-manager"
        }
      },
      remarkPlugins: [remarkSteps]
    })(environment);
  }
});
function transformerEscape() {
  return {
    name: "@shikijs/transformers:remove-notation-escape",
    code(hast) {
      function replace(node) {
        if (node.type === "text") {
          node.value = node.value.replace("[\\!code", "[!code");
        } else if ("children" in node) {
          for (const child of node.children) {
            replace(child);
          }
        }
      }
      replace(hast);
      return hast;
    }
  };
}
var source_config_default = defineConfig({
  plugins: [
    jsonSchema({
      insert: true
    }),
    lastModified()
  ]
});

// source.script.ts
function remarkElementIds() {
  return (tree, vfile) => {
    const file = vfile;
    file.data ??= {};
    file.data.elementIds ??= [];
    visit(tree, "mdxJsxFlowElement", (element) => {
      if (!element.name || !element.attributes) return;
      const idAttr = element.attributes.find(
        (attr) => attr.type === "mdxJsxAttribute" && attr.name === "id"
      );
      if (idAttr && typeof idAttr.value === "string") {
        file.data.elementIds.push(idAttr.value);
      }
    });
  };
}
var source_script_default = defineConfig2({
  mdxOptions: {
    valueToExport: ["elementIds", "toc"],
    remarkNpmOptions: {
      persist: {
        id: "package-manager"
      }
    },
    remarkHeadingOptions: {
      generateToc: true
    },
    remarkPlugins: [remarkElementIds],
    rehypePlugins: () => []
  }
});
export {
  blog,
  source_script_default as default,
  docs
};
