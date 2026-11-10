# Deploy this portfolio to Vercel

This folder is the actual Vite project root. `package.json`, `index.html`, `vite.config.js`, `src/`, `public/`, and `vercel.json` are all at the top level.

## GitHub deployment
1. Extract this ZIP.
2. Upload the *contents* of this folder to the root of your GitHub repository (do not upload the ZIP itself and do not place these files inside another `portfolio-studio/` folder).
3. In Vercel, import or open the project connected to that GitHub repository.
4. In Settings → Build and Development Settings, use:
   - Framework Preset: Vite
   - Root Directory: `.` (repository root)
   - Install Command: `npm ci`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Redeploy the latest commit and open the new Production deployment URL.

If the repository already contains other files/projects, set Root Directory to the folder containing this `package.json` instead of `.`.
