import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useRouter } from '../lib/router';
import { SITE_CONFIG } from '../data/siteConfig';
import { ResilientImage } from '../components/ResilientImage';
import { ContactForm } from '../components/ContactForm';

export const ContactPage: React.FC = () => {
  const { searchParams } = useRouter();
  const initialService = searchParams.get('service') || 'General Inquiry';

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappDefaultMessage
  )}`;

  return (
    <div className="bg-zinc-50 text-slate-900">
      {/* Page Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-4"
          >
            <p className="text-sm font-semibold text-red-700">Contact Us</p>
            <h1 className="text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight leading-[1.15] text-slate-900">
              Request a quote or consultation.
            </h1>
            <p className="text-base leading-relaxed text-slate-600">
              Connect with Think4AD via form, email, phone, or WhatsApp.{' '}
              {SITE_CONFIG.contact.responseExpectation}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Details + Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                <ResilientImage
                  src={SITE_CONFIG.images.consultation.src}
                  alt={SITE_CONFIG.images.consultation.alt}
                  aspectClassName="aspect-[4/3]"
                  priority
                />
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
                <h2 className="text-lg font-bold text-slate-900">Direct Channels</h2>

                <div className="space-y-4">
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-start gap-3 text-sm hover:text-red-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-red-700 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500">Email</span>
                      <span className="font-semibold text-slate-900">
                        {SITE_CONFIG.contact.emailLabel}
                      </span>
                    </div>
                  </a>

                  <a
                    href={SITE_CONFIG.contact.phoneHref}
                    className="flex items-start gap-3 text-sm hover:text-red-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-red-700 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500">Phone</span>
                      <span className="font-semibold text-slate-900">
                        {SITE_CONFIG.contact.phoneDisplay}
                      </span>
                    </div>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm hover:text-emerald-800 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500">WhatsApp</span>
                      <span className="font-semibold text-emerald-800">
                        Start a WhatsApp Conversation
                      </span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500">Office Address</span>
                      <span className="text-slate-700">{SITE_CONFIG.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <Clock className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500">Business Hours</span>
                      <span className="text-slate-700">{SITE_CONFIG.contact.businessHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2.5">
                  <span className="block text-xs font-medium text-slate-500">Connect Online</span>
                  <div className="flex flex-wrap gap-2">
                    {SITE_CONFIG.social.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-zinc-50 border border-slate-200 hover:border-red-700 hover:text-red-700 rounded-lg transition-colors whitespace-nowrap"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm initialService={initialService} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
