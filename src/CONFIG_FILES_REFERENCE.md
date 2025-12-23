# 📋 Configuration Files Reference

## Overview

All configuration files are located in `/src/` with the `ROOT_` prefix. This document provides a quick reference for what each file contains and where it should be copied.

---

## 📁 File Locations & Destinations

| Source File | Destination | Size | Purpose |
|-------------|-------------|------|---------|
| `src/ROOT_vite.config.ts` | `/vite.config.ts` | ~500 bytes | Vite build configuration |
| `src/ROOT_tsconfig.json` | `/tsconfig.json` | ~1 KB | TypeScript compiler options |
| `src/ROOT_index.html` | `/index.html` | ~300 bytes | HTML entry point |
| `src/ROOT_package.json` | `/package.json` | ~2 KB | Dependencies & scripts |
| `src/ROOT_tailwind.config.mjs` | `/tailwind.config.mjs` | ~2 KB | Tailwind CSS configuration |
| `src/ROOT_postcss.config.mjs` | `/postcss.config.mjs` | ~100 bytes | PostCSS configuration |

---

## 🔧 Configuration Files Details

### 1. ROOT_vite.config.ts → vite.config.ts

**Purpose:** Vite build tool configuration

**Key Features:**
- React plugin for JSX support
- Path aliases (@/ imports)
- Dev server on port 3000
- Environment variable handling
- Build output configuration

**What It Does:**
- Configures Vite to work with React
- Sets up path aliases for cleaner imports
- Configures development server
- Handles environment variables

**Size:** ~500 bytes

---

### 2. ROOT_tsconfig.json → tsconfig.json

**Purpose:** TypeScript compiler configuration

**Key Features:**
- ES2020 target
- React JSX support
- Module resolution
- Path aliases
- Strict type checking (disabled for flexibility)

**What It Does:**
- Tells TypeScript how to compile your code
- Configures JSX support for React
- Sets up path aliases (@/ imports)
- Defines compilation target

**Size:** ~1 KB

**Note:** This replaces the existing Astro tsconfig.json

---

### 3. ROOT_index.html → index.html

**Purpose:** HTML entry point for Vite

**Key Features:**
- Root div for React mounting
- Script tag linking to main.tsx
- Proper meta tags
- Viewport configuration

**What It Does:**
- Provides the HTML structure for the app
- Defines where React mounts (#root)
- Links to the React entry point

**Size:** ~300 bytes

**Note:** This is NEW - Vite requires an HTML entry point at the root

---

### 4. ROOT_package.json → package.json

**Purpose:** Project dependencies and scripts

**Key Features:**
- npm scripts (dev, build, preview, lint, type-check)
- React and React DOM dependencies
- Vite and build tools
- Tailwind CSS and styling
- Framer Motion for animations
- React Router for routing
- And more...

**What It Does:**
- Defines all project dependencies
- Configures npm scripts
- Specifies versions of packages

**Size:** ~2 KB

**Note:** This replaces the existing package.json with updated scripts and dependencies

**Key Scripts:**
```json
{
  "scripts": {
    "dev": "vite",                    // Start dev server
    "build": "tsc && vite build",     // Build for production
    "preview": "vite preview",        // Preview production build
    "lint": "eslint ...",             // Run ESLint
    "type-check": "tsc --noEmit"      // Check TypeScript
  }
}
```

---

### 5. ROOT_tailwind.config.mjs → tailwind.config.mjs

**Purpose:** Tailwind CSS configuration

**Key Features:**
- Content paths for Vite (updated from Astro)
- Custom colors (red, black, white, etc.)
- Custom fonts (Space Grotesk, Azeret Mono)
- Font sizes
- Tailwind plugins

**What It Does:**
- Configures Tailwind CSS
- Defines custom colors and fonts
- Sets up responsive design
- Configures plugins

**Size:** ~2 KB

**Note:** This replaces the existing tailwind.config.mjs with updated content paths

**Key Changes from Astro:**
```javascript
// OLD (Astro):
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html']

// NEW (Vite):
content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html']
```

---

### 6. ROOT_postcss.config.mjs → postcss.config.mjs

**Purpose:** PostCSS configuration

**Key Features:**
- Tailwind CSS processor
- Autoprefixer for browser compatibility

**What It Does:**
- Processes CSS with Tailwind
- Adds vendor prefixes for browser compatibility

**Size:** ~100 bytes

**Note:** This replaces the existing postcss.config.mjs

---

## 📊 Configuration Comparison

### Astro vs Vite Configuration

| Aspect | Astro | Vite |
|--------|-------|------|
| **Config File** | `astro.config.mjs` | `vite.config.ts` |
| **HTML Entry** | Astro pages | `/index.html` |
| **Routing** | File-based | React Router |
| **TypeScript** | `astro/tsconfigs/base` | Standard ES2020 |
| **Dev Server** | Astro dev | Vite dev |
| **Build Tool** | Astro build | Vite build |

---

## 🎯 What Each File Configures

### vite.config.ts
```
Vite Build Tool
├── React Plugin
├── Path Aliases (@/)
├── Dev Server (port 3000)
├── Build Output
└── Environment Variables
```

### tsconfig.json
```
TypeScript Compiler
├── Target (ES2020)
├── Module System (ESNext)
├── JSX Support (React)
├── Path Aliases (@/)
└── Type Checking
```

### index.html
```
HTML Entry Point
├── Meta Tags
├── Viewport Settings
├── Root Div (#root)
└── Script Link (main.tsx)
```

### package.json
```
Project Configuration
├── Dependencies
├── Dev Dependencies
├── Scripts (dev, build, etc.)
└── Project Metadata
```

### tailwind.config.mjs
```
Tailwind CSS
├── Content Paths
├── Custom Colors
├── Custom Fonts
├── Font Sizes
└── Plugins
```

### postcss.config.mjs
```
CSS Processing
├── Tailwind CSS
└── Autoprefixer
```

---

## ✅ Verification Checklist

After copying files, verify:

### vite.config.ts
- [ ] File exists at project root
- [ ] Contains React plugin configuration
- [ ] Contains path aliases

### tsconfig.json
- [ ] File exists at project root
- [ ] No longer extends "astro/tsconfigs/base"
- [ ] Contains React JSX configuration

### index.html
- [ ] File exists at project root
- [ ] Contains `<div id="root"></div>`
- [ ] Contains `<script type="module" src="/src/main.tsx"></script>`

### package.json
- [ ] File exists at project root
- [ ] Contains "dev": "vite" script
- [ ] Contains React dependencies
- [ ] Contains Vite dependencies

### tailwind.config.mjs
- [ ] File exists at project root
- [ ] Content paths updated for Vite
- [ ] Custom colors defined
- [ ] Custom fonts defined

### postcss.config.mjs
- [ ] File exists at project root
- [ ] Contains Tailwind CSS configuration
- [ ] Contains autoprefixer configuration

---

## 🔄 File Dependencies

```
index.html
    ↓ (links to)
src/main.tsx
    ↓ (imports)
src/components/Router.tsx
    ↓ (uses)
vite.config.ts (for path aliases)
tsconfig.json (for TypeScript)
tailwind.config.mjs (for styling)
postcss.config.mjs (for CSS processing)
package.json (for dependencies)
```

---

## 📝 File Modification Notes

### Files That REPLACE Existing Files
- `tsconfig.json` - Removes Astro extends
- `package.json` - Updates scripts and dependencies
- `tailwind.config.mjs` - Updates content paths
- `postcss.config.mjs` - Updates configuration

### Files That Are NEW
- `vite.config.ts` - Vite configuration (didn't exist before)
- `index.html` - HTML entry point (didn't exist before)

---

## 🚀 Quick Copy Command

Copy all 6 files at once:

```bash
cp src/ROOT_vite.config.ts vite.config.ts && \
cp src/ROOT_tsconfig.json tsconfig.json && \
cp src/ROOT_index.html index.html && \
cp src/ROOT_package.json package.json && \
cp src/ROOT_tailwind.config.mjs tailwind.config.mjs && \
cp src/ROOT_postcss.config.mjs postcss.config.mjs
```

---

## 📊 File Sizes

| File | Size | Compressed |
|------|------|-----------|
| vite.config.ts | ~500 B | ~300 B |
| tsconfig.json | ~1 KB | ~500 B |
| index.html | ~300 B | ~200 B |
| package.json | ~2 KB | ~1 KB |
| tailwind.config.mjs | ~2 KB | ~1 KB |
| postcss.config.mjs | ~100 B | ~80 B |
| **TOTAL** | **~6 KB** | **~3 KB** |

---

## 🎯 Configuration Hierarchy

```
package.json (defines dependencies)
    ↓
vite.config.ts (configures build)
    ↓
tsconfig.json (configures TypeScript)
    ↓
index.html (HTML entry point)
    ↓
src/main.tsx (React entry point)
    ↓
src/components/Router.tsx (App routing)
    ↓
tailwind.config.mjs (styling)
    ↓
postcss.config.mjs (CSS processing)
```

---

## ✨ Key Configuration Values

### Vite Dev Server
```
Port: 3000
Auto-open: true
HMR: enabled
```

### TypeScript
```
Target: ES2020
Module: ESNext
JSX: react-jsx
Strict: false (for flexibility)
```

### Tailwind CSS
```
Content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html']
Primary Color: #FF0000 (Red)
Background: #000000 (Black)
Secondary: #FFFFFF (White)
```

---

## 🔗 Related Files

### Already in Place (No Changes Needed)
- `/src/main.tsx` - React entry point
- `/src/env.d.ts` - TypeScript definitions
- `/src/components/Router.tsx` - React Router config
- `/src/styles/global.css` - Global styles
- `/src/styles/fonts.css` - Font definitions

### To Delete
- `/src/pages/[...slug].astro` - Astro catch-all
- `/astro.config.mjs` - Astro configuration

---

## 📚 Documentation References

For more information about each configuration file:

1. **Vite Configuration**
   - [Vite Config Documentation](https://vitejs.dev/config/)

2. **TypeScript Configuration**
   - [TypeScript Config Documentation](https://www.typescriptlang.org/tsconfig)

3. **Tailwind CSS Configuration**
   - [Tailwind Config Documentation](https://tailwindcss.com/docs/configuration)

4. **PostCSS Configuration**
   - [PostCSS Documentation](https://postcss.org/)

---

## 🎉 You're All Set!

All configuration files are prepared and ready to copy. Follow the quick copy command above or manually copy each file, then run:

```bash
npm install
npm run dev
```

Your Vite + React app will be running at `http://localhost:3000`!

---

## 📞 Quick Reference

| Need | File |
|------|------|
| Build configuration | `vite.config.ts` |
| TypeScript setup | `tsconfig.json` |
| HTML entry | `index.html` |
| Dependencies | `package.json` |
| Styling | `tailwind.config.mjs` |
| CSS processing | `postcss.config.mjs` |

**All files are in `/src/` with `ROOT_` prefix. Copy to project root!**
