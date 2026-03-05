import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as FilesComponents from 'fumadocs-ui/components/files';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import * as icons from 'lucide-react';
import { DecisionMatrix } from './components/mdx/decision-matrix';
import { RiskAnalysis } from './components/mdx/risk-analysis';
import { UserProfileSegment } from './components/mdx/user-profile-segment';
import { TahsilatVadesiCalculator } from './components/mdx/mini-calculator';
import { FAQSchema } from './components/mdx/faq-schema';
import { EEATCard } from './components/mdx/eeat-card';
import { AboveTheFoldVerdict } from './components/mdx/above-the-fold-verdict';
import { SemanticKnowledgeBox } from './components/mdx/semantic-knowledge-box';
import { SanalPosKomisyonCalculator } from './components/mdx/sanal-pos-komisyon-calculator';
import { EnflasyonCalculator } from './components/mdx/enflasyon-calculator';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion,
    Accordions,
    DecisionMatrix,
    RiskAnalysis,
    UserProfileSegment,
    TahsilatVadesiCalculator,
    FAQSchema,
    EEATCard,
    AboveTheFoldVerdict,
    SemanticKnowledgeBox,
    SanalPosKomisyonCalculator,
    EnflasyonCalculator,
    ...components,
  } satisfies MDXComponents;
}

declare module 'mdx/types.js' {
  // Augment the MDX types to make it understand React.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type ElementType = React.JSX.ElementType;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
