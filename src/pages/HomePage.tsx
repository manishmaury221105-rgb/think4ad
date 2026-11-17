import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Edit3,
} from 'lucide-react';
import { useRouter } from '../lib/router';
import {
  SITE_CONFIG,
  SERVICES,
  EXECUTION_GALLERY,
  WHY_CHOOSE_ITEMS,
  FEATURES_AND_BENEFITS,
  TESTIMONIAL_SLOTS,
  FAQS,
} from '../data/siteConfig';
import { ResilientImage } from '../components/ResilientImage';
import { ContactForm } from '../components/ContactForm';
import { FaqAccordion } from '../components/FaqAccordion';

export const HomePage: React.FC = () => {
  const { navigate, navigateToSection } = useRouter();
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('General Inquiry');

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappDefaultMessage
  )}`;

  const handleInquiryPreselect = (serviceTitle: string) => {
    setSelectedServiceForForm(serviceTitle);
    navigateToSection('contact', '/');
  };

  return (
    <div className="bg-zinc-50 text-slate-900">
      {/* 1. Hero Section */}
      <section className="bg-zinc-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-5"
            >
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                {SITE_CONFIG.brand.name} &middot; {SITE_CONFIG.brand.foundedNote}
              </p>

              <h1 className="text-[clamp(2.1rem,3.6vw,3.15rem)] font-bold tracking-tight leading-[1.12] text-slate-900">
                Your brand, bigger reach.
              </h1>

              <p className="text-base leading-relaxed text-slate-600">
                OOH branding, printing, design, fabrication &amp; digital solutions.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigateToSection('contact', '/')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/our-services')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Services</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <ResilientImage
                  src={SITE_CONFIG.images.oohShowcase.src}
                  alt={SITE_CONFIG.images.oohShowcase.alt}
                  aspectClassName="aspect-[3/2]"
                  fit="contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. About Think4AD Section (Visual-first) */}
      <section id="about" className="py-12 sm:py-16 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-zinc-50">
                <ResilientImage
                  src={SITE_CONFIG.images.about.src}
                  alt={SITE_CONFIG.images.about.alt}
                  aspectClassName="aspect-[4/3]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm font-semibold text-red-700">About Think4AD</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                OOH &amp; Retail Branding, end to end.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                Dealer boards, glowsigns, metro ads, display vans, steel fabrication, and digital
                campaigns handled by one team.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-1 text-xs sm:text-sm font-semibold text-slate-800">
                <div className="py-2 border-t border-slate-200">01. Plan</div>
                <div className="py-2 border-t border-slate-200">02. Build</div>
                <div className="py-2 border-t border-slate-200">03. Install</div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/about-us')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors cursor-pointer"
              >
                <span>About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visual Services Showcase (Image-rich cards, minimal text) */}
      <section id="services" className="py-12 sm:py-16 bg-zinc-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-red-700">Our Services</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                What we build &amp; deliver.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/our-services')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-red-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300"
              >
                <div>
                  <ResilientImage
                    src={service.image}
                    alt={service.imageAlt}
                    aspectClassName="aspect-[4/3]"
                  />
                  <div className="p-5 space-y-2">
                    <p className="text-xs font-medium text-slate-500">
                      <span className="font-mono text-slate-700 tabular-nums">{service.index}</span>
                      <span className="mx-1.5">&middot;</span>
                      <span>{service.categoryLabel}</span>
                    </p>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">{service.engagementModel}</span>
                  <button
                    type="button"
                    onClick={() => handleInquiryPreselect(service.title)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-red-700 hover:text-red-800 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3b. Visual Execution Gallery (5 Unique Photos, Minimal Captions) */}
      <section id="gallery" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-700">Execution Gallery</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Outdoor, retail &amp; fabrication in focus.
            </h2>
          </div>

          <div className="space-y-6">
            {EXECUTION_GALLERY.slice(0, 1).map((heroShot) => (
              <figure
                key={heroShot.id}
                className="bg-zinc-50 border border-slate-200 rounded-xl overflow-hidden"
              >
                <ResilientImage
                  src={heroShot.src}
                  alt={heroShot.alt}
                  aspectClassName="aspect-[16/9]"
                />
                <figcaption className="px-5 py-3.5 text-sm font-semibold text-slate-900">
                  {heroShot.title}
                </figcaption>
              </figure>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {EXECUTION_GALLERY.slice(1).map((shot) => (
                <figure
                  key={shot.id}
                  className="bg-zinc-50 border border-slate-200 rounded-xl overflow-hidden"
                >
                  <ResilientImage
                    src={shot.src}
                    alt={shot.alt}
                    aspectClassName="aspect-[4/3]"
                  />
                  <figcaption className="p-4 text-sm font-semibold text-slate-900">
                    {shot.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us & Benefits (Compact) */}
      <section id="why-choose-us" className="py-12 sm:py-16 bg-zinc-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-700">Why Choose Think4AD</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Complete field &amp; studio infrastructure.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.index}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5"
              >
                <span className="font-mono text-xs font-medium text-red-700 tabular-nums">
                  {item.index}
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.summary}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {FEATURES_AND_BENEFITS.map((row) => (
              <div
                key={row.title}
                className="p-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-2 items-center"
              >
                <h3 className="md:col-span-4 text-sm font-bold text-slate-900">{row.title}</h3>
                <p className="md:col-span-5 text-sm text-slate-600">{row.benefit}</p>
                <p className="md:col-span-3 text-xs text-slate-500">{row.technicalStandard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Client Feedback (Compact Editable Slots) */}
      <section id="testimonials" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-red-700">Client Feedback</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Client endorsements.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => handleInquiryPreselect('Reference Request')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-800 bg-zinc-50 border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>Request References</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIAL_SLOTS.map((slot) => (
              <blockquote
                key={slot.id}
                className="bg-zinc-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{slot.engagementType}</span>
                    {slot.isEditablePlaceholder && (
                      <span className="inline-flex items-center gap-1">
                        <Edit3 className="w-3 h-3" />
                        <span>Editable</span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700">&ldquo;{slot.quoteTemplate}&rdquo;</p>
                </div>
                <footer className="pt-3 border-t border-slate-200 text-xs font-medium text-slate-600">
                  {slot.clientAttribution}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="py-12 sm:py-16 bg-zinc-50 border-b border-slate-200">
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

      {/* 7. Contact Section */}
      <section id="contact" className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-red-700">Contact Think4AD</p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Start your campaign.
                </h2>
                <p className="text-sm text-slate-600">
                  {SITE_CONFIG.contact.responseExpectation}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-900 hover:text-red-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-red-700 shrink-0" />
                  <span>{SITE_CONFIG.contact.emailLabel}</span>
                </a>

                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-900 hover:text-red-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-700 shrink-0" />
                  <span>{SITE_CONFIG.contact.phoneDisplay}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <span>{SITE_CONFIG.contact.address}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm initialService={selectedServiceForForm} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
