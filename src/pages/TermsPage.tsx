import React from 'react';
import { useRouter } from '../lib/router';
import { SITE_CONFIG } from '../data/siteConfig';

export const TermsPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-zinc-50 text-slate-900">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-4">
          <p className="text-sm font-semibold text-red-700">Legal Documentation</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-slate-500">
            Effective Date: {SITE_CONFIG.legal.effectiveDate} &middot; {SITE_CONFIG.brand.name}
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-base leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the {SITE_CONFIG.brand.name} website, you agree to be bound by
            these Terms &amp; Conditions and all applicable laws. If you do not agree with any part
            of these terms, please discontinue use of this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Website Information &amp; Service Proposals</h2>
          <p>
            Information published on {SITE_CONFIG.brand.name} is provided for general overview and
            informational purposes. Specific deliverables, site permissions, dimensions, pricing,
            fabrication schedules, and installation obligations for client engagements are governed
            exclusively by a separate written quotation or service agreement executed between{' '}
            {SITE_CONFIG.brand.name} and the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Acceptable Use</h2>
          <p>You agree not to use this website to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Submit false, misleading, or unsolicited automated inquiries through our contact endpoints.</li>
            <li>Attempt unauthorized access to server infrastructure, APIs, or source assets.</li>
            <li>Reproduce, scrape, or redistribute website content or brand graphics for competing commercial representation without written consent.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Intellectual Property</h2>
          <p>
            All original copy, visual branding, logos, layouts, graphics, and source code presented
            on {SITE_CONFIG.brand.name} remain the intellectual property of{' '}
            {SITE_CONFIG.brand.name} or its respective licensors unless explicitly transferred by
            written client agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, {SITE_CONFIG.brand.name} shall not be
            liable for any indirect, incidental, or consequential damages arising out of your use
            of, or inability to access, this informational website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Governing Law &amp; Updates</h2>
          <p>
            These Terms &amp; Conditions are governed by the laws of{' '}
            <span className="font-medium text-slate-900">
              {SITE_CONFIG.legal.governingJurisdiction}
            </span>
            . We may update these terms periodically by posting a revised effective date on this
            page. Questions may be directed via our{' '}
            <a
              href="/contact-us"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact-us');
              }}
              className="text-red-700 font-medium underline underline-offset-4 hover:text-red-800"
            >
              Contact Us
            </a>{' '}
            page.
          </p>
        </section>
      </article>
    </div>
  );
};
