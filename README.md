# LOVE.EXE — birthday website

A small interactive birthday website built with React, TypeScript, Vite, Motion and Lucide.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
cd love-exe
npm install
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

The optimized website is generated in `dist/`.

## Put it online so she can open a link

1. Create a GitHub repository and upload the contents of this folder.
2. Open Vercel and import that repository.
3. Keep the default settings: build command `npm run build`, output directory `dist`.
4. Deploy. Vercel gives you a public HTTPS URL that you can send to her.

You can also deploy the `dist/` folder to Cloudflare Pages.

## Personalize the letter

Edit the `letterLines` array near the top of `src/App.tsx`. Replace the default text with your own words.

## Sound

The music player uses a gentle romantic piano melody from Orange Free Sounds (Emotional Love Piano Melody by Alexander), streamed from the source after the visitor taps Play. The track is licensed under Creative Commons Attribution 4.0; if you publish the site publicly, credit the artist and source. Browsers block autoplay until a user gesture, so sound deliberately does not start on its own.

## Notes

- The website works without a backend or database.
- No login or private information is collected.
- A public link is created only after you deploy it to a hosting service.
