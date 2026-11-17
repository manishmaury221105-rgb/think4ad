import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '../lib/router';
import { SITE_CONFIG, WHY_CHOOSE_ITEMS } from '../data/siteConfig';
import { ResilientImage } from '../components/ResilientImage';

const GALLERY_HIGHLIGHTS = [
  {
    src: SITE_CONFIG.images.displayFleet.src,
    alt: SITE_CONFIG.images.displayFleet.alt,
    caption: 'Display Van Fleet & Roadshows',
  },
  {
    src: SITE_CONFIG.images.glowsignStore.src,
    alt: SITE_CONFIG.images.glowsignStore.alt,
    caption: 'Glowsign & Inshop Branding',
  },
];

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

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
            <p className="text-sm font-semibold text-red-700">About Us</p>
            <h1 className="text-[clamp(2rem,3.4vw,2.85rem)] font-bold tracking-tight leading-[1.15] text-slate-900">
              Your brand, our expertise, bigger reach.
            </h1>
            <p className="text-base text-slate-600">
              One team for OOH branding, print, design, steel fabrication, and digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                <ResilientImage
                  src={SITE_CONFIG.images.studioTeam.src}
                  alt={SITE_CONFIG.images.studioTeam.alt}
                  aspectClassName="aspect-[16/9]"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Planning · Execution · Results
              </h2>
              <p className="text-base text-slate-600">
                From creative artwork and CMYK printing to steel billboard structures, fleet
                transport, and safety-monitored site installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Visual Highlights */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Field &amp; retail reach</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_HIGHLIGHTS.map((item) => (
              <figure
                key={item.caption}
                className="bg-zinc-50 border border-slate-200 rounded-xl overflow-hidden"
              >
                <ResilientImage src={item.src} alt={item.alt} aspectClassName="aspect-[4/3]" />
                <figcaption className="p-4 text-sm font-semibold text-slate-900">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-zinc-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Operational infrastructure
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.index}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5"
              >
                <span className="font-mono text-xs font-semibold text-red-700 tabular-nums">
                  {item.index}
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Ready to launch your campaign?
          </h2>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/our-services')}
              className="px-5 py-2.5 text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Our Services
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact-us')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
