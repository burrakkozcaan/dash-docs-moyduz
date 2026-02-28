'use client';

import React, { useState } from 'react';
import { Minus, Plus, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className={`bg-[#fafafa] rounded-[20px] p-5 md:p-6 cursor-pointer transition-all duration-200 w-fumll  hover:scale-[1.005] ''
                }`}
      onClick={(e) => {
        // Prevent toggle if clicking on interactive elements inside
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('textarea')) return;
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
      <div className="flex items-center justify-between gap-4">
        <h5 className="text-[rgb(28,39,6)] flex-1 font-medium text-lg md:text-xl leading-tight text-left">
          {question}
        </h5>

        {/* Icon */}
        <div className="w-[34px] h-[34px] bg-[#d5d3d3] rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ease-out hover:scale-105">
          <div className={`transition-transform duration-200 ease-out ${isOpen ? 'rotate-0' : 'rotate-0'}`}>
            {isOpen ? (
              <Minus className="w-4 h-4 text-white transition-all duration-200" />
            ) : (
              <Plus className="w-4 h-4 text-white transition-all duration-200" />
            )}
          </div>
        </div>
      </div>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${isOpen
          ? 'max-h-[600px] opacity-100 mt-4'
          : 'max-h-0 opacity-0 mt-0'
          }`}
      >
        <div className="pt-4 border-t border-[rgb(28,39,6)]/10 cursor-default" onClick={(e) => e.stopPropagation()}>
          <p className="text-[rgb(28,39,6)] opacity-70 text-base leading-relaxed text-left font-medium mb-4">
            {answer}
          </p>

          {!submitted ? (
            <div className="flex flex-col gap-4 mt-6">
              {!showFeedback ? (
                <div className="flex items-center gap-4 text-sm text-[rgb(28,39,6)]/70">
                  <span>Bu cevap yardımcı oldu mu?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSubmitted(true)}
                      className="p-1 hover:text-[rgb(28,39,6)] transition-colors"
                      title="Evet"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowFeedback(true)}
                      className="p-1 hover:text-[rgb(28,39,6)] transition-colors"
                      title="Hayır"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <textarea
                    placeholder="Cevabı nasıl geliştirebiliriz?"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={2}
                    className="flex min-h-[80px] w-full rounded-md border border-[rgb(28,39,6)]/20 bg-white/50 px-3 py-2 text-sm placeholder:text-[rgb(28,39,6)]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(28,39,6)]/30 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFeedback(false)}
                      className="text-[rgb(28,39,6)]/70 hover:text-[rgb(28,39,6)] hover:bg-[rgb(28,39,6)]/5"
                    >
                      İptal
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSubmitted(true);
                        setShowFeedback(false);
                      }}
                      className="bg-[rgb(28,39,6)] text-white hover:bg-[rgb(28,39,6)]/90"
                    >
                      Gönder
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 text-sm text-[rgb(28,39,6)]/70 italic animate-in fade-in">
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
      question: "UGKTED nedir?",
      answer: "Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED), girişimcilik ruhunu kültür, turizm ve eğitim alanlarında uluslararası düzeyde yaygınlaştırmak amacıyla kurulmuş bir sivil toplum kuruluşudur."
    },
    {
      question: "Amacınız nedir?",
      answer: "Derneğimiz; yenilikçi düşünceyi, kültürel çeşitliliği ve sürdürülebilir gelişimi destekleyerek bireylerin ve toplumların potansiyelini ortaya çıkarmayı hedefler.",
    },
    {
      question: "Neler yapıyorsunuz?",
      answer: "Farklı ülkelerden girişimciler, akademisyenler, sanatçılar ve genç liderleri bir araya getirerek; bilgi paylaşımı, ortak projeler, uluslararası seminerler, kültürel organizasyonlar ve eğitim programları düzenlemektedir.",
    },
    {
      question: "İlkeniz nedir?",
      answer: "UGKTED, “birlikte üretmek, paylaşmak ve gelişmek” ilkesiyle hareket eder. Her adımda toplumsal faydayı, kültürel köprüleri ve girişimcilik vizyonunu ön planda tutar.",
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="bg-white flex items-center justify-center relative overflow-visible py-[100px] px-[30px] md:py-20 md:px-7.5 w-full"
      id="faq-section"
    >
      <div className="flex flex-col items-center justify-center gap-[60px] w-full max-w-[1200px]">
        {/* Title */}
        <div className="flex flex-col items-center justify-start gap-5 w-full max-w-[540px]">
          <h2 className="text-center font-bold text-[rgba(255, 255, 255, 1)] text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-center text-[rgba(255, 255, 255, 1)] text-base md:text-lg leading-relaxed opacity-80">
            Merak ettikleriniz ve daha fazlası.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="w-full max-w-[900px] flex flex-col gap-4">
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