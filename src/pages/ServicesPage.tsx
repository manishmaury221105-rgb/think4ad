import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from '../lib/router';
import { SERVICES, FAQS, ServiceItem } from '../data/siteConfig';
import { ResilientImage } from '../components/ResilientImage';
import { FaqAccordion } from '../components/FaqAccordion';

type CategoryFilter = 'all' | ServiceItem['category'];

const FILTER_TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'ooh-branding', label: 'Branding & OOH' },
  { id: 'print-design', label: 'Printing & Design' },
  { id: 'fabrication', label: 'Fabrication & Install' },
  { id: 'digital', label: 'Digital Solutions' },
];

export const ServicesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredServices =
    activeFilter === 'all'
      ? SERVICES
      : SERVICES.filter((svc) => svc.category === activeFilter);

  const handleRequestService = (serviceTitle: string) => {
    navigate('/contact-us', { search: `service=${encodeURIComponent(serviceTitle)}` });
  };

  return (
    <div className="bg-zinc-50 text-slate-900">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-3"
          >
            <p className="text-sm font-semibold text-red-700">Our Services</p>
            <h1 className="text-[clamp(2rem,3.4vw,2.85rem)] font-bold tracking-tight leading-[1.15] text-slate-900">
              Five integrated divisions.
            </h1>
            <p className="text-base text-slate-600">
              Branding, printing, graphic design, fabrication &amp; digital growth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Service Catalog</h2>

            <div
              role="tablist"
              aria-label="Filter services by category"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                <div className="lg:col-span-5">
                  <ResilientImage
                    src={service.image}
                    alt={service.imageAlt}
                    aspectClassName="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[280px]"
                  />
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="font-mono text-slate-800 tabular-nums">{service.index}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{service.categoryLabel}</span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      {service.index}. {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600">
                      {service.fullDescription}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">{service.engagementModel}</span>
                    <button
                      type="button"
                      onClick={() => handleRequestService(service.title)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-700">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Quick answers.
            </h2>
          </div>

          <FaqAccordion items={FAQS} />
        </div>
      </section>
    </div>
  );
};
