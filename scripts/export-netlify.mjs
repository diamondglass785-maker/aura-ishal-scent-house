import { cp, mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { stageMedia } from './netlify-media.mjs';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const staging = await mkdtemp(path.join(os.tmpdir(), 'vip-netlify-'));
const output = path.resolve(process.env.NETLIFY_EXPORT_DIR || path.join(source, 'dist/netlify'));
const excluded = new Set(['.git', '.lovable', '.workspace', 'node_modules', 'dist', 'dist-ssr', '.output', '.tanstack', '.nitro', '.wrangler']);

for (const entry of await readdir(source)) {
  if (excluded.has(entry) || entry === '.env' || entry.startsWith('.env.')) continue;
  await cp(path.join(source, entry), path.join(staging, entry), { recursive: true });
}
await symlink(path.join(source, 'node_modules'), path.join(staging, 'node_modules'), 'dir');
await stageMedia({
  source, staging,
  mediaDirectory: process.env.NETLIFY_MEDIA_DIRECTORY,
  origin: process.env.NETLIFY_MEDIA_ORIGIN || 'https://id-preview--745352bc-472b-473a-ab66-8892419da603.lovable.app',
});
await cp(path.join(source, 'vite.netlify.config.ts'), path.join(staging, 'vite.config.ts'));
const routerPath = path.join(staging, 'src/router.tsx');
const router = await readFile(routerPath, 'utf8');
await writeFile(routerPath, router.replace('routeTree,', 'routeTree,\n    trailingSlash: "always",'));
// These variables pin Lovable's hosted output, not a standalone Netlify export.
const env = { ...process.env };
delete env.LOVABLE_SANDBOX;
delete env.LOVABLE_NITRO_PRESET;
const result = spawnSync('bun', ['run', 'build'], { cwd: staging, env, stdio: 'inherit' });
if (result.status !== 0) throw new Error(`Static export failed; inspect ${staging}`);
const client = path.join(staging, 'dist/client');
for (const route of ['', 'shop', 'aura', 'ishal', 'explore-fragrance', 'contact', 'cart', 'checkout', 'order-confirmation']) {
  await readFile(path.join(client, route, 'index.html'));
}
await writeFile(path.join(client, '_headers'), `/*\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/media/*.jpg\n  Content-Type: image/jpeg\n/media/*.mp4\n  Content-Type: video/mp4\n/media/*.webm\n  Content-Type: video/webm\n`);
await writeFile(path.join(client, '_redirects'), '/* /index.html 404\n');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });
console.log(`Netlify deploy folder: ${output}`);