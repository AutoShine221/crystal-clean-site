# CrystalClean — landing page

Même stack et même structure que le site Auto Shine (`~/Desktop/auto-shine-site`) : React 19 + Vite, un seul composant `src/LandingCrystalClean.jsx`, thème clair.

- `npm run dev` → http://localhost:5173 (ou `npx vite --port 5174` si Auto Shine tourne déjà)
- `npm run build` → `dist/` (base `/crystal-clean-site/` pour GitHub Pages)
- En ligne : https://autoshine221.github.io/crystal-clean-site/ — republier avec `npm run deploy`

**Toutes les infos à compléter sont dans `src/config.js`** (valeurs `null`). Tant qu'elles sont vides, la page affiche un repère orange « à compléter ».
Photos : déposer dans `public/images/` et renseigner `PHOTOS` dans `src/config.js`.
Captures de contrôle : `captures/`.
