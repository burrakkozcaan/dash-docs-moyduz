'use client';

import { useState, useMemo } from 'react';
import { Drawer } from 'vaul';
import useMeasure from 'react-use-measure';
import { motion } from 'motion/react';
import * as Button from '@/components/new-ui/button';
import { FolderX, X, Tag, DollarSign, Check } from 'lucide-react';

interface Category {
  title: string;
  slug: string;
}

interface DrawerFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedPrice: string | null;
  onCategoryChange: (category: string | null) => void;
  onPriceChange: (price: string | null) => void;
}

const PRICE_OPTIONS = [
  { label: 'All Prices', value: null },
  { label: 'Free', value: 'Free' },
  { label: '$25', value: '$25' },
  { label: '$49', value: '$49' },
];

export const AnimatedDrawer = ({
  categories,
  selectedCategory,
  selectedPrice,
  onCategoryChange,
  onPriceChange,
}: DrawerFilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [view, setView] = useState<'default' | 'category' | 'price'>('default');
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return (
          <div className=''>
            <div className='flex w-full items-center justify-between'>
              <h1 className='text-lg font-medium text-neutral-900 dark:text-neutral-100'>
                Filter Templates
              </h1>
              <Button.Root
                variant='neutral'
                mode='ghost'
                size='icon'
                className='rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800'
                onClick={() => setIsOpen(false)}
              >
                <X
                  className='text-neutral-600 dark:text-neutral-400'
                  size='18'
                />
              </Button.Root>
            </div>

            <div className='mt-6 flex flex-col items-start gap-4'>
              <button
                onClick={() => setView('category')}
                className='flex w-full items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-3.5 font-medium text-neutral-900 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
              >
                <FolderX />
                Filter by Category
              </button>
              <button
                onClick={() => setView('price')}
                className='flex w-full items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-3.5 font-medium text-neutral-900 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
              >
                <DollarSign />
                Filter by Price
              </button>
            </div>
          </div>
        );
      case 'category':
        return (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <FolderX
                  className='text-neutral-600 dark:text-neutral-400'
                  size={20}
                />
                <h1 className='text-xl font-medium text-neutral-900 dark:text-neutral-100'>
                  Filter by Category
                </h1>
              </div>
              <Button
                variant='secondary'
                size='icon'
                className='rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800'
                onClick={() => setIsOpen(false)}
              >
                <X
                  className='text-neutral-600 dark:text-neutral-400'
                  size='18'
                />
              </Button>
            </div>
            <div className='mt-6 space-y-2'>
              <button
                onClick={() => {
                  onCategoryChange(null);
                  setView('default');
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                  selectedCategory === null
                    ? 'bg-neutral-900 text-white dark:bg-neutral-800'
                    : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <span className='font-medium'>All Categories</span>
                {selectedCategory === null && (
                  <Check className='text-white' size={18} />
                )}
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => {
                    onCategoryChange(category.slug);
                    setView('default');
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-neutral-900 text-white dark:bg-neutral-800'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span className='font-medium'>{category.title}</span>
                  {selectedCategory === category.slug && (
                    <Check className='text-white' size={18} />
                  )}
                </button>
              ))}
            </div>
            <div className='mt-6 flex items-center justify-start gap-4'>
              <Button.Root
                variant='neutral'
                mode='lighter'
                onClick={() => setView('default')}
                className='text-lg h-12 w-full rounded-3xl'
              >
                Back
              </Button.Root>
            </div>
          </div>
        );
      case 'price':
        return (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <DollarSign
                  className='text-neutral-600 dark:text-neutral-400'
                  size={20}
                />
                <h1 className='text-xl font-medium text-neutral-900 dark:text-neutral-100'>
                  Filter by Price
                </h1>
              </div>
              <Button
                variant='secondary'
                size='icon'
                className='rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800'
                onClick={() => setIsOpen(false)}
              >
                <X
                  className='text-neutral-600 dark:text-neutral-400'
                  size='18'
                />
              </Button>
            </div>
            <div className='mt-6 space-y-2'>
              {PRICE_OPTIONS.map((option) => (
                <button
                  key={option.value || 'all'}
                  onClick={() => {
                    onPriceChange(option.value);
                    setView('default');
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                    selectedPrice === option.value
                      ? 'bg-neutral-900 text-white dark:bg-neutral-800'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span className='font-medium'>{option.label}</span>
                  {selectedPrice === option.value && (
                    <Check className='text-white' size={18} />
                  )}
                </button>
              ))}
            </div>
            <div className='mt-6 flex items-center justify-start gap-4'>
              <Button.Root
                variant='neutral'
                mode='lighter'
                onClick={() => setView('default')}
                className='text-lg h-12 w-full rounded-3xl'
              >
                Back
              </Button.Root>
            </div>
          </div>
        );
    }
  }, [
    view,
    categories,
    selectedCategory,
    selectedPrice,
    onCategoryChange,
    onPriceChange,
  ]);

  return (
    <>
      <Button.Root
        variant='neutral'
        mode='stroke'
        className='rounded-full border border-ln-gray-200 bg-ln-gray-50 px-6 py-2 font-medium text-ln-gray-800 shadow-ln-button-white transition hover:bg-ln-gray-100 md:font-medium'
        onClick={() => setIsOpen(true)}
      >
        <Tag size={16} className='mr-2' />
        Filter Templates
      </Button.Root>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className='fixed inset-0 bg-black/40'
            onClick={() => setIsOpen(false)}
          />
          <Drawer.Content
            asChild
            className='fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-white outline-none dark:bg-neutral-900 md:mx-auto md:w-full'
          >
            <motion.div animate={{ height: bounds.height }}>
              <Drawer.Title className='sr-only'>Filter Templates</Drawer.Title>
              <div className='p-6' ref={elementRef}>
                {content}
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
