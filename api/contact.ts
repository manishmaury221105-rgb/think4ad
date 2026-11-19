import type { IncomingMessage, ServerResponse } from 'node:http';

interface ParsedRequest extends IncomingMessage {
  body?: unknown;
}

async function readJsonBody(req: ParsedRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as Record<string, unknown>;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    return {};
  }
  return JSON.parse(raw) as Record<string, unknown>;
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

export default async function handler(req: ParsedRequest, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
    return;
  }

  let body: Record<string, unknown>;
  try {
    body = await readJsonBody(req);
  } catch {
    sendJson(res, 400, { ok: false, error: 'Invalid JSON request body.' });
    return;
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const service = typeof body.service === 'string' ? body.service.trim() : 'General Inquiry';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  const fieldErrors: Record<string, string> = {};

  if (name.length < 2 || name.length > 120) {
    fieldErrors.name = 'Please enter your full name (2 to 120 characters).';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 254) {
    fieldErrors.email = 'Please provide a valid email address.';
  }
  if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) {
    fieldErrors.phone = 'Please enter a valid phone number or leave this field blank.';
  }
  if (message.length < 10 || message.length > 5000) {
    fieldErrors.message = 'Please share a brief description of your requirements (10 to 5000 characters).';
  }

  if (Object.keys(fieldErrors).length > 0) {
    sendJson(res, 400, {
      ok: false,
      error: 'Please review the highlighted fields and try again.',
      fieldErrors,
    });
    return;
  }

  const now = new Date();
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  const referenceId = `T4A-${dateStamp}-${randomSuffix}`;

  sendJson(res, 201, {
    ok: true,
    referenceId,
    receivedAt: now.toISOString(),
    summary: {
      name,
      email,
      company,
      service,
    },
  });
}
