'use client';

// Radix Dialog tabanlı Sheet. Her açılışta smooth animasyon için:
// 1) forceMount ile Overlay + Content her zaman DOM'da (ilk açılışta da transition çalışsın)
// 2) transition + data-state ile aç/kapa

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { RiCloseLine } from '@remixicon/react';

import * as CompactButton from '@/components/new-ui/compact-button';
import { cn } from '@/utils/cn';

const SheetRoot = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    forceMount
    className={cn(
      'fixed inset-0 z-50 bg-black/40',
      'transition-opacity duration-300 ease-out',
      'data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
      'data-[state=closed]:pointer-events-none',
      className,
    )}
    {...rest}
  />
));
SheetOverlay.displayName = 'SheetOverlay';

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: 'right' | 'left';
    showClose?: boolean;
  }
>(({ className, side = 'right', showClose = true, children, ...rest }, ref) => (
  <SheetPortal forceMount>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      forceMount
      className={cn(
        'fixed z-50 flex flex-col bg-white shadow-lg',
        'transition-transform duration-300 ease-out',
        'focus:outline-none',
        side === 'right' &&
          'inset-y-0 right-0 h-full w-full max-w-[90vw] data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 lg:w-[400px]',
        side === 'left' &&
          'inset-y-0 left-0 h-full w-full max-w-[90vw] data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 lg:w-[400px]',
        'data-[state=closed]:pointer-events-none',
        className,
      )}
      {...rest}
    >
      {children}
      {showClose && (
        <SheetClose asChild>
          <CompactButton.Root
            variant='ghost'
            size='large'
            className='absolute right-4 top-4'
          >
            <CompactButton.Icon as={RiCloseLine} />
          </CompactButton.Root>
        </SheetClose>
      )}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = 'SheetContent';

function SheetHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...rest}
    />
  );
}
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-gray-900 dark:text-gray-50', className)}
    {...rest}
  />
));
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
    {...rest}
  />
));
SheetDescription.displayName = 'SheetDescription';

// Namespace export (Sheet.Root, Sheet.Trigger, ...)
export const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
};

// shadcn-style: Sheet = Root (open/onOpenChange), SheetTrigger, SheetContent, ...
export {
  SheetRoot,
  SheetRoot as Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};
