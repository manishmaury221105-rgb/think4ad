import { useEffect } from 'react';
import { AppRoute } from './router';
import { FAQS, SERVICES, SITE_CONFIG } from '../data/siteConfig';

interface PageSeoMeta {
  title: string;
  description: string;
  schemaType: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'ContactPage';
}

const ROUTE_META: Record<AppRoute, PageSeoMeta> = {
  '/': {
    title: 'Think4AD – Branding, Printing, Graphic Design, Fabrication & Digital Solutions',
    description:
      'Think4AD delivers end-to-end OOH branding promotion, printing solutions, graphic design, billboard fabrication & installation, and digital online solutions.',
    schemaType: 'WebPage',
  },
  '/about-us': {
    title: 'About Us – Think4AD | OOH, Fabrication & Brand Execution',
    description:
      'Learn about Think4AD, our fabrication infrastructure, skilled manpower, nationwide transportation fleet, and planning-to-execution approach.',
    schemaType: 'AboutPage',
  },
  '/our-services': {
    title: 'Our Services – Think4AD | Branding, Printing, Design, Fabrication & Digital',
    description:
      'Explore Think4AD services: Branding Promotion, Printing Solutions, Graphic Design, Fabrication & Installation, and Digital Online Solutions.',
    schemaType: 'CollectionPage',
  },
  '/contact-us': {
    title: 'Contact Us – Think4AD | Request a Quote or Campaign Consultation',
    description:
      'Contact Think4AD via inquiry form, email, phone, or WhatsApp for OOH branding, billboard fabrication, printing, design, and digital campaigns.',
    schemaType: 'ContactPage',
  },
  '/privacy-policy': {
    title: 'Privacy Policy – Think4AD',
    description:
      'Read the Privacy Policy for Think4AD explaining how project inquiry information is collected, protected, and managed.',
    schemaType: 'WebPage',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions – Think4AD',
    description:
      'Review the Terms & Conditions governing use of the Think4AD website and service engagements.',
    schemaType: 'WebPage',
  },
};

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertPageSchema(route: AppRoute, meta: PageSeoMeta, canonicalUrl: string) {
  const existing = document.getElementById('think4ad-page-schema');
  const script = existing || document.createElement('script');
  script.id = 'think4ad-page-schema';
  script.setAttribute('type', 'application/ld+json');

  const graph: Record<string, unknown>[] = [
    {
      '@type': meta.schemaType,
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: meta.title,
      description: meta.description,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_CONFIG.brand.name,
        url: SITE_CONFIG.brand.url,
      },
    },
  ];

  if (route === '/' || route === '/our-services') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  if (route === '/our-services') {
    graph.push({
      '@type': 'ItemList',
      itemListElement: SERVICES.map((service, idx) => ({
        '@type': 'Service',
        position: idx + 1,
        name: service.title,
        description: service.shortDescription,
        provider: {
          '@type': 'Organization',
          name: SITE_CONFIG.brand.name,
        },
      })),
    });
  }

  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });

  if (!existing) {
    document.head.appendChild(script);
  }
}

export function usePageSeo(route: AppRoute) {
  useEffect(() => {
    const meta = ROUTE_META[route] || ROUTE_META['/'];
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${route === '/' ? '/' : route}`;
    const shareImage = `${origin}${SITE_CONFIG.images.oohShowcase.src}`;

    document.title = meta.title;
    upsertMetaTag('name', 'description', meta.description);
    upsertMetaTag('property', 'og:title', meta.title);
    upsertMetaTag('property', 'og:description', meta.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', shareImage);
    upsertMetaTag('name', 'twitter:title', meta.title);
    upsertMetaTag('name', 'twitter:description', meta.description);
    upsertMetaTag('name', 'twitter:image', shareImage);
    upsertCanonical(canonicalUrl);
    upsertPageSchema(route, meta, canonicalUrl);
  }, [route]);
}
