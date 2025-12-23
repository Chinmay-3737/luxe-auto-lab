# 🎯 Vite + React Migration - Final Setup Instructions

## ⚡ Quick Start (3 Steps)

### Step 1: Copy Configuration Files
Copy these files from `/src/` to the **project root** (replace existing files):

```
/src/ROOT_vite.config.ts          → /vite.config.ts
/src/ROOT_tsconfig.json           → /tsconfig.json
/src/ROOT_index.html              → /index.html
/src/ROOT_package.json            → /package.json
/src/ROOT_tailwind.config.mjs     → /tailwind.config.mjs
/src/ROOT_postcss.config.mjs      → /postcss.config.mjs
```

### Step 2: Delete Astro Files
Remove these files (they're no longer needed):

```bash
rm /src/pages/[...slug].astro
rm /astro.config.mjs
```

### Step 3: Install & Run
```bash
npm install
npm run dev
```

✅ **Done!** Your app will open at `http://localhost:3000`

---

## 📋 Detailed File-by-File Instructions

### 1. `/vite.config.ts` (NEW)
**Source:** `/src/ROOT_vite.config.ts`
**Action:** Copy to project root as `/vite.config.ts`

This file configures Vite with:
- React plugin for JSX support
- Path aliases (@/ imports)
- Dev server on port 3000
- Environment variable handling

### 2. `/tsconfig.json` (UPDATE)
**Source:** `/src/ROOT_tsconfig.json`
**Action:** Replace existing `/tsconfig.json`

Changes from Astro version:
- Removed `"extends": "astro/tsconfigs/base"`
- Added `"target": "ES2020"`
- Added `"lib": ["ES2020", "DOM", "DOM.Iterable"]`
- Added `"module": "ESNext"`
- Added `"jsx": "react-jsx"`

### 3. `/index.html` (NEW)
**Source:** `/src/ROOT_index.html`
**Action:** Copy to project root as `/index.html`

This is the HTML entry point for Vite. It:
- Defines the root div for React
- Links to `/src/main.tsx` as the module script
- Sets proper meta tags

### 4. `/package.json` (UPDATE)
**Source:** `/src/ROOT_package.json`
**Action:** Replace existing `/package.json`

Key changes:
- **Scripts:** Changed from Astro to Vite commands
  - `dev`: `vite` (instead of `astro dev`)
  - `build`: `tsc && vite build` (instead of `astro build`)
  - `preview`: `vite preview` (new)
- **Dependencies:** Added React, React Router, etc.
- **DevDependencies:** Added Vite, @vitejs/plugin-react, etc.

### 5. `/tailwind.config.mjs` (UPDATE)
**Source:** `/src/ROOT_tailwind.config.mjs`
**Action:** Replace existing `/tailwind.config.mjs`

Changes:
- Updated `content` paths to remove Astro file extensions
- From: `'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'`
- To: `'./src/**/*.{html,js,jsx,ts,tsx}'`
- Added `'./index.html'` to content paths

### 6. `/postcss.config.mjs` (UPDATE)
**Source:** `/src/ROOT_postcss.config.mjs`
**Action:** Replace existing `/postcss.config.mjs`

This file configures PostCSS for Tailwind CSS processing.

---

## 🗑️ Files to Delete

### Delete These Files (No Longer Needed)

1. **`/src/pages/[...slug].astro`**
   - Astro catch-all page
   - React Router handles all routing now

2. **`/astro.config.mjs`**
   - Astro configuration
   - Replaced by Vite configuration

### Optional Cleanup

After copying the configuration files, you can delete the `ROOT_` prefixed files from `/src/`:

```bash
rm /src/ROOT_*.ts
rm /src/ROOT_*.json
rm /src/ROOT_*.mjs
rm /src/ROOT_*.html
```

---

## 📦 Installation

```bash
npm install
```

This installs all dependencies from the new `package.json`:

**Core Dependencies:**
- `react` - UI framework
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `tailwindcss` - CSS framework
- `framer-motion` - Animations
- `zustand` - State management
- And more...

**Dev Dependencies:**
- `vite` - Build tool
- `@vitejs/plugin-react` - React support for Vite
- `typescript` - Type checking
- `eslint` - Code linting
- And more...

---

## 🚀 Running the App

### Development Mode
```bash
npm run dev
```

- Starts Vite dev server on `http://localhost:3000`
- Enables Hot Module Replacement (HMR) for instant updates
- Opens browser automatically

### Production Build
```bash
npm run build
```

- Compiles TypeScript
- Bundles with Vite
- Creates optimized build in `/dist` folder

### Preview Production Build
```bash
npm run preview
```

- Serves the production build locally
- Useful for testing before deployment

---

## ✅ What's Preserved

All your existing code and features are fully preserved:

✅ **Components**
- All React components in `/src/components/`
- All pages in `/src/components/pages/`
- All UI components from shadcn/ui

✅ **Styling**
- Tailwind CSS configuration
- Custom colors (red #FF0000, black #000000, white #FFFFFF)
- Custom fonts (Space Grotesk, Azeret Mono)
- Global styles and animations

✅ **Functionality**
- React Router configuration
- CMS integration
- Members/Authentication
- Framer Motion animations
- Zustand state management
- All database entities

✅ **Assets**
- All images and media
- All fonts
- All static files in `/public/`

---

## 🔍 Verification Checklist

After setup, verify everything works:

- [ ] App opens at `http://localhost:3000`
- [ ] Homepage loads correctly
- [ ] Navigation works (Categories, Car Listing, etc.)
- [ ] Colors are correct (red accents, black background)
- [ ] Fonts display properly (Space Grotesk, Azeret Mono)
- [ ] Animations work (Framer Motion effects)
- [ ] Images load correctly
- [ ] Forms work (Customization, Contact, Test Drive)
- [ ] No console errors
- [ ] Production build succeeds (`npm run build`)

---

## 🆘 Troubleshooting

### Issue: "Port 3000 already in use"
**Solution:** Vite will automatically use the next available port, or specify one:
```bash
npm run dev -- --port 3001
```

### Issue: "Module not found" errors
**Solution:** Ensure imports use the `@/` alias:
```typescript
// ✅ Correct
import Button from '@/components/ui/button';

// ❌ Wrong
import Button from '../components/ui/button';
```

### Issue: TypeScript errors
**Solution:** Run type checking:
```bash
npm run type-check
```

### Issue: Styles not loading
**Solution:** Ensure Tailwind CSS is properly configured:
1. Check `/tailwind.config.mjs` has correct content paths
2. Check `/src/styles/global.css` imports Tailwind directives
3. Restart dev server: `npm run dev`

### Issue: Build fails
**Solution:** 
1. Clear cache: `rm -rf node_modules package-lock.json`
2. Reinstall: `npm install`
3. Try building again: `npm run build`

---

## 📚 Project Structure

```
project-root/
├── src/
│   ├── components/
│   │   ├── pages/              # Page components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Router.tsx          # React Router config
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SplashScreen.tsx
│   ├── styles/
│   │   ├── global.css          # Global styles
│   │   └── fonts.css           # Font definitions
│   ├── entities/               # Database types
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities
│   ├── main.tsx                # React entry point
│   ├── env.d.ts                # TypeScript definitions
│   ├── appSpec.json            # App config
│   └── tailwind.config.mjs     # Tailwind config (updated)
├── integrations/
│   ├── cms/                    # CMS integration
│   ├── members/                # Auth integration
│   └── errorHandlers/
├── public/                     # Static assets
├── vite.config.ts              # Vite config (NEW)
├── tsconfig.json               # TypeScript config (UPDATED)
├── tailwind.config.mjs         # Tailwind config (UPDATED)
├── postcss.config.mjs          # PostCSS config (UPDATED)
├── index.html                  # HTML entry point (NEW)
└── package.json                # Dependencies (UPDATED)
```

---

## 🎉 You're Ready!

Follow the 3 quick steps above and your Vite + React app will be running!

**Questions?** Refer to:
- [Vite Docs](https://vitejs.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

Happy coding! 🚀
