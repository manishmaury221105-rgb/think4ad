import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const SITEMAP_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/our-services', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
  { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.4' },
];

interface ContactSubmission {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  receivedAt: string;
}

const recentSubmissions: ContactSubmission[] = [];

function resolveBaseUrl(req: express.Request): string {
  if (process.env.APP_URL && process.env.APP_URL.startsWith('http')) {
    return process.env.APP_URL.replace(/\/+$/, '');
  }
  const forwardedProto = req.headers['x-forwarded-proto'];
  const rawProto = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto;
  const protocol = (rawProto ? rawProto.split(',')[0].trim() : req.protocol) || 'https';

  const forwardedHost = req.headers['x-forwarded-host'];
  const rawHost = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost;
  const host = (rawHost ? rawHost.split(',')[0].trim() : req.get('host')) || 'think4ad.com';

  return `${protocol}://${host}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'think4ad-web', timestamp: new Date().toISOString() });
  });

  app.post('/api/contact', (req, res) => {
    const body = req.body ?? {};
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
      res.status(400).json({
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

    const entry: ContactSubmission = {
      referenceId,
      name,
      email,
      phone,
      company,
      service,
      message,
      receivedAt: now.toISOString(),
    };

    recentSubmissions.unshift(entry);
    if (recentSubmissions.length > 50) {
      recentSubmissions.pop();
    }

    res.status(201).json({
      ok: true,
      referenceId: entry.referenceId,
      receivedAt: entry.receivedAt,
      summary: {
        name: entry.name,
        email: entry.email,
        service: entry.service,
      },
    });
  });

  app.get('/robots.txt', (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const content = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
    res.type('text/plain').send(content);
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const lastmod = new Date().toISOString().slice(0, 10);
    const urls = SITEMAP_ROUTES.map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    ).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
    res.type('application/xml').send(xml);
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.use(
    (
      err: unknown,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (req.path.startsWith('/api/') && err instanceof SyntaxError) {
        res.status(400).json({ ok: false, error: 'Invalid JSON request body.' });
        return;
      }
      next(err);
    }
  );

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Think4AD server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
