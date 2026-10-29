# Jevin Parmar — Developer Portfolio

> **Awwwards "Site of the Day" caliber portfolio** engineered with obsessive attention to motion, typography, and performance.

Designed with a **Dark Minimal Editorial / Swiss-Grid** aesthetic, combining **GSAP + ScrollTrigger** for scroll-driven choreographies, **Lenis** for inertial smooth scroll, and **Motion (`motion/react`)** for spring physics, micro-interactions, and shared-element transitions.

---

## ⚡ Tech Stack & Architecture

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- **Scroll Engine:** [Lenis](https://github.com/darkroomengineering/lenis) synchronized with [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/) via `gsap.ticker`
- **UI State & Layout Motion:** [Motion (`motion/react`)](https://motion.dev/) for springs, shared-element transitions (`layoutId`), and `AnimatePresence` route wipes
- **Typography:** `@fontsource/syne` (fluid editorial display) + `@fontsource/space-grotesk` + `@fontsource/inter` (crisp grotesk body)
- **Styling:** Tailwind CSS v4 with custom dark tokens (`#0a0a0a` background, `#c8ff00` electric acid lime accent)
- **Assets & Icons:** Vector SVGs, analog film-grain noise overlay, zero external icon bloat

---

## ✨ Signature Interactions Implemented

1. **Preloader:** Tabular 0→100 counter with subtitle reveal, followed by a dual-curtain wipe. Plays once per browser session.
2. **Hero Reveal:** Masked split-character stagger reveal of *JEVIN PARMAR* with scroll parallax and continuous 60fps marquee.
3. **Dual-Tier Custom Cursor:** Micro dot + lagging ring powered by `gsap.quickTo`. Adapts dynamically to `'hover'`, `'view'`, and `'drag'` labels. Automatically disabled on touch devices.
4. **Magnetic Elements:** Physics-based spring magnetism on buttons, nav links, and social triggers.
5. **Scroll-Driven Word Opacity:** Paragraphs scrub from 20% to 100% opacity word-by-word with keyword highlights.
6. **Selected Work Showcase:** Scale and clip-path reveals on scroll, direct case study navigation.
7. **Horizontal Exhibition Rail:** Pinned lateral scroll showcase powered by ScrollTrigger `pin: true`.
8. **Shared-Element Transitions:** Seamless `layoutId` zoom from project card to `/work/:slug` hero image without jump.
9. **Interactive Philosophy & Stats:** Sticky profile card with scrubbed metric counters (`0 → 4+`, `0 → 30+`, `0 → 99.9%`).
10. **Kinetic Footer:** Giant interactive `LET'S TALK` anchor, one-click email copy button with confetti burst, live IST (UTC+5:30) clock, and Lenis back-to-top trigger.
11. **Smart Autohiding Navbar:** Hides on scroll-down, reveals on scroll-up, with fullscreen menu overlay.
12. **Scroll Progress Indicator:** Sleek top progress bar tracking reading position.

---

## 📁 Directory Structure

```
.
├── public/
│   ├── favicon.svg          # Custom vector monogram favicon
│   ├── og-image.jpg         # OpenGraph social share card
│   ├── projects/            # High-res project showcase visuals
│   ├── robots.txt           # SEO robots directives
│   └── sitemap.xml          # XML sitemap for search crawlers
├── src/
│   ├── components/
│   │   ├── common/          # Cursor, Preloader, ScrollProgress, Noise, SocialIcons
│   │   ├── layout/          # Navbar, FullscreenMenu, Footer
│   │   ├── motion/          # Magnetic, SplitReveal, TextOpacityScroll, PageTransition
│   │   └── sections/        # Hero, IntroAbout, SelectedWork, WorkHorizontal, TechStack, Experience
│   ├── context/
│   │   └── CursorContext.tsx# Dynamic cursor variants ('default', 'view', 'drag')
│   ├── data/
│   │   ├── projects.ts      # Project metadata, specs, stack, URLs
│   │   ├── experience.ts    # Career timeline & verified metrics
│   │   └── skills.ts        # Categorized skills matrix & marquee array
│   ├── hooks/
│   │   ├── useLenis.ts      # Lenis smooth scroll provider synced to GSAP
│   │   ├── useLiveTime.ts   # Live IST (UTC+5:30) digital clock
│   │   └── usePrefersReducedMotion.ts # Accessibility compliance
│   ├── lib/
│   │   └── gsap.ts          # GSAP & ScrollTrigger initialization
│   ├── pages/
│   │   ├── HomePage.tsx     # Primary portfolio presentation
│   │   ├── ProjectDetailPage.tsx # /work/:slug case study page
│   │   └── NotFoundPage.tsx # 404 void page
│   ├── styles/
│   │   └── globals.css      # Design tokens, fonts, CSS variables
│   ├── App.tsx              # Router, providers, and root layout
│   └── main.tsx             # Application bootstrap
└── index.html               # Semantic HTML, SEO tags, JSON-LD Person schema
```

---

## 🛠️ How to Edit Your Content

### 1. Updating Projects
Edit [`src/data/projects.ts`](file:///run/media/jevin/Box%20A/Port/src/data/projects.ts):
```ts
{
  slug: 'your-project-slug',
  title: 'Project Title',
  subtitle: 'One-line punchy subtitle',
  year: '2025',
  role: 'Your Role',
  stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  shortDesc: 'Brief overview for project cards',
  description: 'In-depth case study description',
  highlights: ['Key metric or architectural victory', ...],
  architecture: 'Backend & frontend architecture blueprint',
  liveUrl: 'https://your-demo-url.com',
  githubUrl: 'https://github.com/your-username/repo',
  image: '/projects/your-image.jpg',
  accentColor: '#c8ff00',
  category: 'Full Stack'
}
```

### 2. Updating Skills & Marquee
Edit [`src/data/skills.ts`](file:///run/media/jevin/Box%20A/Port/src/data/skills.ts) to modify categories, proficiencies, or marquee ticker keywords.

### 3. Updating Work Experience & Career Stats
Edit [`src/data/experience.ts`](file:///run/media/jevin/Box%20A/Port/src/data/experience.ts) to adjust companies, tenure, accomplishments, or statistical counters.

### 4. Updating Contact & Social Handles
Edit [`src/components/layout/Footer.tsx`](file:///run/media/jevin/Box%20A/Port/src/components/layout/Footer.tsx) and [`src/components/layout/FullscreenMenu.tsx`](file:///run/media/jevin/Box%20A/Port/src/components/layout/FullscreenMenu.tsx) with your email address and preferred links.

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Vercel

### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Deploying via GitHub
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of Awwwards-grade developer portfolio"
   git remote add origin https://github.com/jevinparmar/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. Vercel will automatically detect **Vite** with the following settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your site will be live on an ultra-fast global edge network in seconds!
