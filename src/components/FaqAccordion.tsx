import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../data/siteConfig';

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`button-${item.id}`}
                onClick={() => toggle(item.id)}
                className="w-full py-5 px-2 sm:px-4 flex items-center justify-between gap-6 text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg font-semibold text-slate-900">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-red-700' : ''
                  }`}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={`panel-${item.id}`}
                role="region"
                aria-labelledby={`button-${item.id}`}
                className="px-2 sm:px-4 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-slate-600 max-w-3xl"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
