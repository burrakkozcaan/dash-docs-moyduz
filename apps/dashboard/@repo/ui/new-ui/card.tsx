// AlignUI Card v0.0.0

import * as React from 'react';
import { tv, type VariantProps, type ClassValue } from '@/utils/tv';
import { recursiveCloneChildren } from '@/utils/recursive-clone-children';

const CARD_ROOT_NAME = 'CardRoot';
const CARD_HEADER_NAME = 'CardHeader';
const CARD_TITLE_NAME = 'CardTitle';
const CARD_DESCRIPTION_NAME = 'CardDescription';
const CARD_CONTENT_NAME = 'CardContent';
const CARD_FOOTER_NAME = 'CardFooter';

export const cardVariants = tv({
  slots: {
    root: [
      'rounded-2xl transition-all duration-200',
      'overflow-hidden',
    ],
    header: 'flex flex-col space-y-1.5',
    title: 'font-semibold leading-none tracking-tight',
    description: 'text-paragraph-sm text-text-sub-600',
    content: '',
    footer: 'flex items-center',
  },
  variants: {
    variant: {
      elevated: {
        root: [
          'bg-white',
          // Multi-layer shadow effect
          '[box-shadow:rgba(41,41,41,0.04)_0px_1px_1px_0.5px,rgba(41,41,41,0.02)_0px_3px_3px_-1.5px,rgba(41,41,41,0.04)_0px_6px_6px_-3px,rgba(41,41,41,0.04)_0px_12px_12px_-6px,rgba(41,41,41,0.04)_0px_24px_24px_-12px,rgba(41,41,41,0.04)_0px_48px_48px_-24px,rgba(41,41,41,0.04)_0px_0px_0px_1px,rgba(51,51,51,0.06)_0px_-1px_1px_-0.5px_inset]',
        ],
      },
      outlined: {
        root: 'bg-white border border-stroke-soft-200',
      },
      filled: {
        root: 'bg-bg-weak-50',
      },
      ghost: {
        root: 'bg-transparent',
      },
    },
    size: {
      small: {
        root: 'p-4',
        header: 'px-4 pt-4 pb-0',
        title: 'text-paragraph-sm',
        content: 'p-4 pt-3',
        footer: 'px-4 pb-4 pt-0',
      },
      medium: {
        root: 'p-6',
        header: 'px-6 pt-6 pb-0',
        title: 'text-paragraph-md',
        content: 'p-6 pt-4',
        footer: 'px-6 pb-6 pt-0',
      },
      large: {
        root: 'p-8',
        header: 'px-8 pt-8 pb-0',
        title: 'text-title-h6',
        content: 'p-8 pt-5',
        footer: 'px-8 pb-8 pt-0',
      },
    },
    interactive: {
      true: {
        root: 'cursor-pointer hover:shadow-regular-xl hover:scale-[1.02] active:scale-[0.98]',
      },
    },
  },
  defaultVariants: {
    variant: 'elevated',
    size: 'medium',
    interactive: false,
  },
});

type CardSharedProps = VariantProps<typeof cardVariants>;

export type CardProps = VariantProps<typeof cardVariants> &
  React.HTMLAttributes<HTMLDivElement>;

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant, size, interactive, ...rest }, forwardedRef) => {
    const uniqueId = React.useId();
    const { root } = cardVariants({ variant, size, interactive });

    const sharedProps: CardSharedProps = {
      variant,
      size,
      interactive,
    };

    const extendedChildren = recursiveCloneChildren(
      children as React.ReactElement[],
      sharedProps,
      [
        CARD_HEADER_NAME,
        CARD_TITLE_NAME,
        CARD_DESCRIPTION_NAME,
        CARD_CONTENT_NAME,
        CARD_FOOTER_NAME,
      ],
      uniqueId,
    );

    return (
      <div ref={forwardedRef} className={root({ class: className })} {...rest}>
        {extendedChildren}
      </div>
    );
  },
);
CardRoot.displayName = CARD_ROOT_NAME;

export type CardHeaderProps = CardSharedProps & React.HTMLAttributes<HTMLDivElement>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, variant, size, interactive, ...rest }, forwardedRef) => {
    const { header } = cardVariants({ variant, size, interactive });

    return (
      <div ref={forwardedRef} className={header({ class: className })} {...rest}>
        {children}
      </div>
    );
  },
);
CardHeader.displayName = CARD_HEADER_NAME;

export type CardTitleProps = CardSharedProps & React.HTMLAttributes<HTMLHeadingElement>;

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, variant, size, interactive, ...rest }, forwardedRef) => {
    const { title } = cardVariants({ variant, size, interactive });

    return (
      <h3 ref={forwardedRef} className={title({ class: className })} {...rest}>
        {children}
      </h3>
    );
  },
);
CardTitle.displayName = CARD_TITLE_NAME;

export type CardDescriptionProps = CardSharedProps &
  React.HTMLAttributes<HTMLParagraphElement>;

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, variant, size, interactive, ...rest }, forwardedRef) => {
    const { description } = cardVariants({ variant, size, interactive });

    return (
      <p ref={forwardedRef} className={description({ class: className })} {...rest}>
        {children}
      </p>
    );
  },
);
CardDescription.displayName = CARD_DESCRIPTION_NAME;

export type CardContentProps = CardSharedProps & React.HTMLAttributes<HTMLDivElement>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, variant, size, interactive, ...rest }, forwardedRef) => {
    const { content } = cardVariants({ variant, size, interactive });

    return (
      <div ref={forwardedRef} className={content({ class: className })} {...rest}>
        {children}
      </div>
    );
  },
);
CardContent.displayName = CARD_CONTENT_NAME;

export type CardFooterProps = CardSharedProps & React.HTMLAttributes<HTMLDivElement>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, variant, size, interactive, ...rest }, forwardedRef) => {
    const { footer } = cardVariants({ variant, size, interactive });

    return (
      <div ref={forwardedRef} className={footer({ class: className })} {...rest}>
        {children}
      </div>
    );
  },
);
CardFooter.displayName = CARD_FOOTER_NAME;

export {
  CardRoot as Root,
  CardHeader as Header,
  CardTitle as Title,
  CardDescription as Description,
  CardContent as Content,
  CardFooter as Footer,
};
