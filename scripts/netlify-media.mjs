import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export function portableMediaPath(pointer) {
  const filename = pointer.original_filename;
  if (!filename || filename !== path.basename(filename) || !/^[a-zA-Z0-9._-]+$/.test(filename)) {
    throw new Error('Invalid media filename');
  }
  return `/media/${filename}`;
}

export async function stageMedia({ source, staging, mediaDirectory, origin }) {
  const { readdir } = await import('node:fs/promises');
  const pointers = await readdir(path.join(source, 'src/assets/uploads'));
  const used = new Set();
  for (const filename of pointers.filter(name => name.endsWith('.asset.json'))) {
    const relative = path.join('src/assets/uploads', filename);
    const pointer = JSON.parse(await readFile(path.join(source, relative), 'utf8'));
    const url = portableMediaPath(pointer);
    if (used.has(url)) throw new Error(`Duplicate media filename: ${url}`);
    used.add(url);
    let bytes;
    if (mediaDirectory) {
      bytes = await readFile(path.join(mediaDirectory, pointer.url.slice(1)));
    } else {
      const response = await fetch(new URL(pointer.url, origin));
      if (!response.ok || !response.headers.get('content-type')?.startsWith(pointer.content_type.split('/')[0] + '/')) {
        throw new Error(`Media download failed: ${filename} (${response.status})`);
      }
      bytes = Buffer.from(await response.arrayBuffer());
    }
    if (bytes.length !== pointer.size) throw new Error(`Media size mismatch: ${filename}`);
    await mkdir(path.join(staging, 'public/media'), { recursive: true });
    await writeFile(path.join(staging, 'public', url.slice(1)), bytes);
    await writeFile(path.join(staging, relative), JSON.stringify({ ...pointer, url }, null, 2) + '\n');
    console.log(`Packaged ${url}: ${bytes.length} bytes`);
  }
}