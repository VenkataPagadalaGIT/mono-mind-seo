#!/usr/bin/env node
/**
 * Tiny static server for the prerendered SSG build.
 *
 * Rules:
 *   GET /about    → dist/about/index.html  (per-route prerender)
 *   GET /about/   → dist/about/index.html
 *   GET /assets/* → dist/assets/*          (hashed static files, immutable cache)
 *   Unknown route → dist/index.html        (SPA fallback, lets React Router render)
 */

import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import url from "node:url";

const PORT = Number(process.env.PORT || 8080);
const HOST = "0.0.0.0";
const DIST = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..", "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/";

  // Candidate 1: exact file (e.g. /assets/index-abc.js, /favicon.ico)
  const direct = path.join(DIST, clean);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
    return direct;
  }

  // Candidate 2: directory index (e.g. /about → dist/about/index.html)
  const dirIndex = path.join(DIST, clean, "index.html");
  if (fs.existsSync(dirIndex) && fs.statSync(dirIndex).isFile()) {
    return dirIndex;
  }

  // Fallback: SPA shell — React Router picks up the route client-side
  return path.join(DIST, "index.html");
}

const server = http.createServer((req, res) => {
  try {
    const filePath = resolveFile(req.url || "/");
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || "application/octet-stream";

    // Hashed assets → long cache; HTML → no cache (always fresh)
    const isHashedAsset = /\/assets\/[^/]+\.[a-f0-9]{8,}\.[a-z0-9]+$/i.test(req.url || "");
    const cacheControl = isHashedAsset
      ? "public, max-age=31536000, immutable"
      : ext === ".html"
      ? "public, max-age=0, must-revalidate"
      : "public, max-age=3600";

    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", cacheControl);
    res.setHeader("X-Content-Type-Options", "nosniff");

    fs.createReadStream(filePath)
      .on("error", (err) => {
        res.statusCode = 500;
        res.end(String(err));
      })
      .pipe(res);
  } catch (err) {
    res.statusCode = 500;
    res.end(String(err));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[server] listening on http://${HOST}:${PORT}  (serving ${DIST})`);
});
