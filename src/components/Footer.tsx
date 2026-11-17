import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Linkedin,
  Facebook,
  Youtube,
} from 'lucide-react';
import { AppRoute, useRouter } from '../lib/router';
import { SITE_CONFIG } from '../data/siteConfig';

const PinterestIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 20l4-9" />
    <path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75-1.554 3.75-4a5 5 0 1 0-9.7 1.7" />
  </svg>
);

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  YouTube: <Youtube className="w-4 h-4" />,
  Pinterest: <PinterestIcon />,
  LinkedIn: <Linkedin className="w-4 h-4" />,
  Facebook: <Facebook className="w-4 h-4" />,
};

export const Footer: React.FC = () => {
  const { navigate, navigateToSection } = useRouter();
  const currentYear = new Date().getFullYear();

  const handleRoute = (e: React.MouseEvent, path: AppRoute) => {
    e.preventDefault();
    navigate(path);
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappDefaultMessage
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Line 1: Brand, Navigation & Legal Links, Social Icons */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <a
            href="/"
            onClick={(e) => handleRoute(e, '/')}
            className="inline-flex items-center gap-1.5 text-lg font-bold tracking-tight whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Think4AD Home"
          >
            <span className="text-red-500">THINK4</span>
            <span className="px-1.5 py-0.5 bg-red-700 text-white rounded text-sm leading-none font-bold">
              AD
            </span>
          </a>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-4 xl:gap-x-5 gap-y-2 text-xs sm:text-sm"
          >
            <a
              href="/"
              onClick={(e) => handleRoute(e, '/')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Home
            </a>
            <a
              href="/about-us"
              onClick={(e) => handleRoute(e, '/about-us')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              About Us
            </a>
            <a
              href="/our-services"
              onClick={(e) => handleRoute(e, '/our-services')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Services
            </a>
            <a
              href="/#faq"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('faq', '/');
              }}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              FAQ
            </a>
            <a
              href="/contact-us"
              onClick={(e) => handleRoute(e, '/contact-us')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Contact
            </a>
            <a
              href="/privacy-policy"
              onClick={(e) => handleRoute(e, '/privacy-policy')}
              className="text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              onClick={(e) => handleRoute(e, '/terms-and-conditions')}
              className="text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Terms
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span>Sitemap</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span>Robots</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {SITE_CONFIG.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE_CONFIG.brand.name} on ${item.name}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                {SOCIAL_ICON_MAP[item.name] ?? <ArrowUpRight className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </div>

        {/* Line 2: Direct Contact, Varanasi Address & Copyright */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{SITE_CONFIG.contact.emailLabel}</span>
            </a>
            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{SITE_CONFIG.contact.address}</span>
            </span>
          </div>

          <p className="text-slate-400 whitespace-nowrap shrink-0">
            &copy; {currentYear} {SITE_CONFIG.brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
