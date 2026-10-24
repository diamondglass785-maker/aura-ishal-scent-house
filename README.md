# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

## Netlify static export

Run `bun install`, then `bun run export:netlify`. Deploy **only `dist/netlify`**, with `index.html` at the deploy root. `netlify.toml` sets that command and publish folder for Git-connected deployments.

The exporter stages a standalone build in a temporary directory, prerenders all nine pages, and packages all original photos and both video formats under `/media/` with exact filenames. Preview asset pointers are not changed. Media downloads are checked for status, content type and original byte size; a failed download stops the export instead of producing missing photos.

Optional environment variables: `NETLIFY_MEDIA_ORIGIN` selects the original Lovable media host; `NETLIFY_MEDIA_DIRECTORY` supplies an existing exported root containing `__l5e/assets-v1/`; `NETLIFY_EXPORT_DIR` selects the output folder.

The export uses a root base URL and trailing-slash page URLs, with MIME headers for JPEG, MP4 and WebM. HTML revalidates rather than keeping stale asset references. No payment or other business behavior changes.

- TanStack Start
- TypeScript
- React
- Tailwind CSS
