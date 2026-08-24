# Xiangmou Qu · Academic Homepage

Source code for [lokinko.github.io](https://lokinko.github.io), built with Astro and deployed through GitHub Pages.

## Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

## Content

- Profile and homepage content: `src/content/bio.md`
- Publications: `src/content/publications/`
- Projects: `src/content/projects/`
- Site configuration and links: `src/config/`

## Google Scholar citations

The `Update Google Scholar citations` workflow refreshes the cached citation
count every 12 hours and redeploys the site only when that count increases.
Run the same updater locally with:

```bash
npm run update:scholar
```

## License and attribution

The site uses the MIT-licensed Academic Portfolio Astro template. See `LICENSE` for the original copyright notice and license terms.
