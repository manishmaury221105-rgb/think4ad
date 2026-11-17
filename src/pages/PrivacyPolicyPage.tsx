import React from 'react';
import { useRouter } from '../lib/router';
import { SITE_CONFIG } from '../data/siteConfig';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-zinc-50 text-slate-900">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-4">
          <p className="text-sm font-semibold text-red-700">Legal Documentation</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Effective Date: {SITE_CONFIG.legal.effectiveDate} &middot; {SITE_CONFIG.brand.name}
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-base leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Overview &amp; Scope</h2>
          <p>
            {SITE_CONFIG.brand.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
            respects your privacy and is committed to protecting the personal and business
            information you share when visiting our website or contacting our team. This Privacy
            Policy explains what data we collect, why we collect it, and how you may request access
            or deletion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Information We Collect</h2>
          <p>When you submit an inquiry through our contact form or communicate with us, we collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact details you voluntarily provide, including your name, email address, telephone or WhatsApp number, and organization name.</li>
            <li>Campaign specifications, selected service division, and correspondence content submitted in your inquiry message.</li>
            <li>Standard technical request metadata (such as browser type and requested page paths) strictly necessary to deliver and secure the website.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. How We Use Information</h2>
          <p>We process inquiry details solely for legitimate business purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responding to branding, printing, fabrication, installation, and digital consultation inquiries.</li>
            <li>Preparing project quotes, site assessments, and production timelines when engaged.</li>
            <li>Maintaining website reliability, preventing automated spam, and complying with applicable legal obligations.</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal contact details to third-party data
            brokers or unrelated marketing networks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Data Retention &amp; Security</h2>
          <p>
            We retain correspondence only for as long as necessary to fulfill the purpose for which
            it was collected or to satisfy contractual and legal requirements. Reasonable technical
            and administrative safeguards are used to protect submitted inquiries against
            unauthorized access or disclosure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. External Links &amp; Messaging</h2>
          <p>
            Our website provides links to external communication platforms such as WhatsApp and
            social media profiles. When you choose to interact with third-party platforms, their
            respective privacy policies govern your use of those services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Your Rights &amp; Contact</h2>
          <p>
            You may request to review, correct, or delete personal information you have submitted to{' '}
            {SITE_CONFIG.brand.name} at any time by writing to{' '}
            <a
              href={`mailto:${SITE_CONFIG.legal.privacyOfficerEmail}`}
              className="text-red-700 font-medium underline underline-offset-4 hover:text-red-800"
            >
              {SITE_CONFIG.legal.privacyOfficerEmail}
            </a>{' '}
            or contacting us through our{' '}
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
