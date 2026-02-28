'use client';

import React, { useState } from 'react';
import { Minus, Plus, ThumbsDown, ThumbsUp } from 'lucide-react';
import * as Button from './ui/button';
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className={`'' } w-full cursor-pointer rounded-[20px] bg-white p-5 transition-all duration-200 hover:scale-[1.005] dark:bg-[linear-gradient(180deg,#1C1C1C_0%,#141414_100%)] dark:shadow-[0_16px_8px_rgba(31,31,31,.01),0_12px_6px_rgba(31,31,31,.04),0_4px_4px_rgba(31,31,31,.07),0_1.5px_3px_rgba(31,31,31,.08),0_0_0_1px_#0F0F0F,inset_0_1px_2px_rgba(255,255,255,.12)] md:p-6`}
      onClick={(e) => {
        // Prevent toggle if clicking on interactive elements inside
        if (
          (e.target as HTMLElement).closest('button') ||
          (e.target as HTMLElement).closest('textarea')
        )
          return;
        onToggle();
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Question */}
      <div className='flex items-center justify-between gap-4'>
        <h5 className='text-lg md:text-xl flex-1 text-left font-medium leading-tight text-ln-gray-900 dark:text-white'>
          {question}
        </h5>

        {/* Icon */}
        <div className='flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-[#d5d3d3] transition-transform duration-200 ease-out hover:scale-105'>
          <div
            className={`transition-transform duration-200 ease-out ${isOpen ? 'rotate-0' : 'rotate-0'}`}
          >
            {isOpen ? (
              <Minus className='h-4 w-4 text-white transition-all duration-200' />
            ) : (
              <Plus className='h-4 w-4 text-white transition-all duration-200' />
            )}
          </div>
        </div>
      </div>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'mt-4 max-h-[600px] opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        <div
          className='cursor-default border-t border-ln-gray-200 pt-4 dark:border-ln-gray-800'
          onClick={(e) => e.stopPropagation()}
        >
          <p className='text-base mb-4 text-left font-medium leading-relaxed text-ln-gray-600 opacity-70 dark:text-ln-gray-300'>
            {answer}
          </p>

          {!submitted ? (
            <div className='mt-6 flex flex-col gap-4'>
              {!showFeedback ? (
                <div className='text-sm flex items-center gap-4 text-ln-gray-600 dark:text-ln-gray-400'>
                  <span>Bu cevap yardımcı oldu mu?</span>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setSubmitted(true)}
                      className='p-1 transition-colors hover:text-ln-gray-900 dark:hover:text-ln-gray-200'
                      title='Evet'
                    >
                      <ThumbsUp className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => setShowFeedback(true)}
                      className='p-1 transition-colors hover:text-ln-gray-900 dark:hover:text-ln-gray-200'
                      title='Hayır'
                    >
                      <ThumbsDown className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col gap-2 duration-200 animate-in fade-in slide-in-from-top-2'>
                  <textarea
                    placeholder='Cevabı nasıl geliştirebiliriz?'
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={2}
                    className='text-sm flex min-h-[80px] w-full rounded-md border border-ln-gray-200 bg-white/50 px-3 py-2 placeholder:text-ln-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ln-gray-900/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ln-gray-700 dark:bg-black/20 dark:text-white dark:placeholder:text-ln-gray-500 dark:focus-visible:ring-ln-gray-100/30'
                  />
                  <div className='flex justify-end gap-2'>
                    <Button.Root
                      variant='neutral'
                      mode='filled'
                      size='xsmall'
                      onClick={() => setShowFeedback(false)}
                      className='text-ln-gray-600 hover:bg-ln-gray-100 hover:text-ln-gray-900 dark:text-ln-gray-400 dark:hover:bg-ln-gray-800 dark:hover:text-ln-gray-200'
                    >
                      İptal
                    </Button.Root>
                    <Button.Root
                      variant='neutral'
                      mode='filled'
                      size='xsmall'
                      onClick={() => {
                        setSubmitted(true);
                        setShowFeedback(false);
                      }}
                      className='bg-ln-gray-900 text-white hover:bg-ln-gray-800 dark:bg-white dark:text-ln-gray-900 dark:hover:bg-ln-gray-100'
                    >
                      Gönder
                    </Button.Root>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='text-sm mt-4 italic text-ln-gray-600 animate-in fade-in dark:text-ln-gray-400'>
              Geri bildiriminiz için teşekkürler!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'UGKTED nedir?',
      answer:
        'Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED), girişimcilik ruhunu kültür, turizm ve eğitim alanlarında uluslararası düzeyde yaygınlaştırmak amacıyla kurulmuş bir sivil toplum kuruluşudur.',
    },
    {
      question: 'Amacınız nedir?',
      answer:
        'Derneğimiz; yenilikçi düşünceyi, kültürel çeşitliliği ve sürdürülebilir gelişimi destekleyerek bireylerin ve toplumların potansiyelini ortaya çıkarmayı hedefler.',
    },
    {
      question: 'Neler yapıyorsunuz?',
      answer:
        'Farklı ülkelerden girişimciler, akademisyenler, sanatçılar ve genç liderleri bir araya getirerek; bilgi paylaşımı, ortak projeler, uluslararası seminerler, kültürel organizasyonlar ve eğitim programları düzenlemektedir.',
    },
    {
      question: 'İlkeniz nedir?',
      answer:
        'UGKTED, “birlikte üretmek, paylaşmak ve gelişmek” ilkesiyle hareket eder. Her adımda toplumsal faydayı, kültürel köprüleri ve girişimcilik vizyonunu ön planda tutar.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className='md:px-7.5 relative flex w-full items-center justify-center overflow-visible md:py-20'
      id='faq-section'
    >
      <div className='flex w-full max-w-[1200px] flex-col items-center justify-center gap-[60px] py-5'>
        {/* Title */}
        <div className='flex shrink-0 flex-col items-start md:items-center xl:block xl:w-[368px]'>
          <div className='hidden text-ln-label-md text-ln-gray-500 xl:block'>
            F.A.Q
          </div>
          <div className='xl:hidden'>
            <div className='flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
                className='size-[18px] text-ln-gray-400'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.125'
                  d='M7.313 6.938c0-.622.503-1.125 1.125-1.125h.906a1.343 1.343 0 0 1 .745 2.46l-.421.282A1.5 1.5 0 0 0 9 9.803v.134M9 12v-.008M15.938 9A6.937 6.937 0 1 1 2.063 9a6.937 6.937 0 0 1 13.874 0Zm-6.75 3a.187.187 0 1 1-.375 0 .187.187 0 0 1 .374 0Z'
                ></path>
              </svg>
              F.A.Q
            </div>
          </div>
          <div className='font-550 md:text-ln-title-h4 mt-4 text-[28px]/[36px] -tracking-[0.02em] text-ln-gray-900 xl:mt-2 xl:text-[40px]/[48px]'>
            Frequently Asked Questions.
          </div>
          <p className='mt-3 text-ln-paragraph-md text-ln-gray-600'>
            Get <span className='font-medium text-ln-gray-800'>answers</span> to{' '}
            <span className='font-medium text-ln-gray-800'>commonly</span> asked
            questions.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className='flex w-full max-w-[900px] flex-col gap-4'>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
