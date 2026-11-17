// server.ts
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var PORT = 3e3;
var isProduction = process.env.NODE_ENV === "production";
var SITEMAP_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about-us", changefreq: "monthly", priority: "0.8" },
  { path: "/our-services", changefreq: "weekly", priority: "0.9" },
  { path: "/contact-us", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.4" }
];
var recentSubmissions = [];
function resolveBaseUrl(req) {
  if (process.env.APP_URL && process.env.APP_URL.startsWith("http")) {
    return process.env.APP_URL.replace(/\/+$/, "");
  }
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.get("host") || "think4ad.com";
  return `${protocol}://${host}`;
}
async function startServer() {
  const app = express();
  app.use(express.json({ limit: "64kb" }));
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "think4ad-web", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/contact", (req, res) => {
    const body = req.body ?? {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "General Inquiry";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const fieldErrors = {};
    if (name.length < 2) {
      fieldErrors.name = "Please enter your full name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      fieldErrors.email = "Please provide a valid email address.";
    }
    if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) {
      fieldErrors.phone = "Please enter a valid phone number or leave this field blank.";
    }
    if (message.length < 10) {
      fieldErrors.message = "Please share a brief description of your requirements (at least 10 characters).";
    }
    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        ok: false,
        error: "Please review the highlighted fields and try again.",
        fieldErrors
      });
      return;
    }
    const now = /* @__PURE__ */ new Date();
    const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const referenceId = `T4A-${dateStamp}-${randomSuffix}`;
    const entry = {
      referenceId,
      name,
      email,
      phone,
      company,
      service,
      message,
      receivedAt: now.toISOString()
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
        service: entry.service
      }
    });
  });
  app.get("/robots.txt", (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.type("text/plain").send(content);
  });
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const lastmod = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const urls = SITEMAP_ROUTES.map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    ).join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
    res.type("application/xml").send(xml);
  });
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir, { index: false }));
    app.get("*", (_req, res) => {
      const indexPath = path.join(distDir, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Build output not found.");
      }
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aapaakad.com server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
