import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { SERVICES } from '../data/siteConfig';

interface ContactFormProps {
  initialService?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface SubmissionReceipt {
  referenceId: string;
  receivedAt: string;
  name: string;
  email: string;
  service: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || 'General Inquiry',
    message: '',
  });

  useEffect(() => {
    if (initialService) {
      setForm((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number or leave blank.';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please describe your inquiry (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }
        setServerError(data.error || 'Unable to submit your inquiry. Please verify your entries.');
        return;
      }

      setReceipt({
        referenceId: data.referenceId,
        receivedAt: data.receivedAt,
        name: data.summary?.name || form.name,
        email: data.summary?.email || form.email,
        service: data.summary?.service || form.service,
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'General Inquiry',
        message: '',
      });
      setErrors({});
    } catch {
      setServerError(
        'Network error while sending your message. Please try again or reach us directly via email or WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Inquiry Received</h3>
            <p className="text-sm text-slate-600 mt-1">
              Thank you, {receipt.name}. Your message regarding{' '}
              <span className="font-medium text-slate-900">{receipt.service}</span> has been logged.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="block text-slate-500">Reference ID</span>
            <span className="font-mono font-medium text-slate-900 tabular-nums">
              {receipt.referenceId}
            </span>
          </div>
          <div>
            <span className="block text-slate-500">Confirmation Sent To</span>
            <span className="font-medium text-slate-900">{receipt.email}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setReceipt(null)}
          className="px-4 py-2.5 text-sm font-semibold text-red-700 border border-red-700/25 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5"
    >
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800 mb-1.5">
            Full Name <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
              errors.name
                ? 'border-red-500 focus:border-red-600'
                : 'border-slate-300 focus:border-red-700'
            }`}
          />
          {errors.name && (
            <p id="error-name" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-800 mb-1.5">
            Email Address <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-600'
                : 'border-slate-300 focus:border-red-700'
            }`}
          />
          {errors.email && (
            <p id="error-email" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-800 mb-1.5">
            Phone / WhatsApp Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            placeholder="+91 98000 00000 (Optional)"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
              errors.phone
                ? 'border-red-500 focus:border-red-600'
                : 'border-slate-300 focus:border-red-700'
            }`}
          />
          {errors.phone && (
            <p id="error-phone" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-slate-800 mb-1.5">
            Company or Organization
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Organization name (Optional)"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-red-700 bg-white text-slate-900 placeholder:text-slate-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="block text-sm font-medium text-slate-800 mb-1.5">
          Area of Interest
        </label>
        <select
          id="contact-service"
          name="service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-red-700 bg-white text-slate-900 transition-colors"
        >
          <option value="General Inquiry">General Inquiry</option>
          {SERVICES.map((svc) => (
            <option key={svc.id} value={svc.title}>
              {svc.title}
            </option>
          ))}
          <option value="Reference Request">Client Reference Request</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800 mb-1.5">
          Project Details or Message <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          placeholder="Tell Think4AD about your campaign, fabrication size, print specs, or digital goals..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors resize-y ${
            errors.message
              ? 'border-red-500 focus:border-red-600'
              : 'border-slate-300 focus:border-red-700'
          }`}
        />
        {errors.message && (
          <p id="error-message" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          By submitting, you agree to our inquiry handling described in our Privacy Policy.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Inquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
