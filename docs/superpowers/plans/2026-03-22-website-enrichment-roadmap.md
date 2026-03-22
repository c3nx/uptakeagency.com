# Uptake Agency Website Enrichment Roadmap

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform uptakeagency.com from a basic portfolio site into a comprehensive, conversion-optimized agency presence with rich content, social proof, and interactive elements.

**Architecture:** Astro 5 static site, Tailwind CSS dark theme, Content Collections (Zod schemas), i18n (EN/TR), deployed via Docker/Nginx.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, Content Collections (Markdown), JSON-LD, Plausible Analytics, Cal.com, Resend

---

## Sprint Calendar Overview

| Sprint | Dates | Theme | Tasks |
|--------|-------|-------|-------|
| **1** | Mar 24-28 | Quick Wins & Visuals | Project screenshots, partner logos, Plausible |
| **2** | Mar 31 - Apr 4 | Conversion & Contact | Cal.com booking, contact form (Resend) |
| **3** | Apr 7-11 | Content Foundation | Blog collection, first 3 blog posts |
| **4** | Apr 14-18 | Social Proof & Case Studies | Enhanced case studies, testimonials section |
| **5** | Apr 21-25 | Interactive Polish | Hero typing animation, GitHub activity widget |
| **6** | Apr 28 - May 2 | Theme & i18n | Dark/light mode toggle, i18n expansion (DE/AR) |
| **7** | May 5-9 | Rich Media | Video walkthroughs, interactive tech radar |

---

## Sprint 1: Quick Wins & Visuals (Mar 24-28)

### Task 1.1: Add Project Screenshots to Work Cards

**Files:**
- Modify: `src/content/config.ts` — add `image` field to projects schema
- Modify: `src/content/projects/en/*.md` — add image frontmatter to each project
- Modify: `src/content/projects/tr/*.md` — same for TR
- Add: `public/images/projects/*.webp` — project screenshot images
- Modify: `src/pages/work/index.astro` — render images in cards
- Modify: `src/pages/tr/work/index.astro` — same for TR
- Modify: `src/components/sections/home/FeaturedProjects.astro` — add image to home cards

- [ ] **Step 1: Update content schema**

Add optional `image` field to projects collection:

```typescript
// src/content/config.ts — add to projects schema
image: z.string().optional(), // e.g. "/images/projects/aru.webp"
```

- [ ] **Step 2: Add screenshots to project frontmatter**

For each project MD file, add `image` field:

```yaml
---
title: "ARU"
image: "/images/projects/aru.webp"
# ... rest of frontmatter
---
```

- [ ] **Step 3: Place WebP images in `public/images/projects/`**

User provides screenshots. Optimize to WebP, max 800px wide, ~50-100KB each.

```bash
# If needed, convert with sharp-cli:
bunx sharp-cli -i input.png -o public/images/projects/aru.webp --webp
```

- [ ] **Step 4: Update work/index.astro cards to show images**

Add image above title in project cards:

```astro
{project.data.image && (
  <div class="mb-4 overflow-hidden rounded-lg border border-surface-border">
    <img
      src={project.data.image}
      alt={project.data.title}
      class="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
  </div>
)}
```

- [ ] **Step 5: Update FeaturedProjects.astro home section similarly**

- [ ] **Step 6: Update TR work/index.astro**

- [ ] **Step 7: Build and verify**

```bash
bun run type-check && timeout 120 bun run build
```

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add project screenshots to work cards and home page"
```

---

### Task 1.2: Replace Partner Text with Real Logos

**Files:**
- Add: `public/images/partners/{intel,nvidia,msi,praxilla}.svg` — partner logo SVGs
- Modify: `src/components/sections/home/Partners.astro` — use img instead of text

- [ ] **Step 1: Source partner logos**

Download official SVG logos (white/monochrome versions for dark theme). Place in `public/images/partners/`.

- [ ] **Step 2: Update Partners.astro**

Replace text spans with images:

```astro
const partners = [
  { name: "Intel", logo: "/images/partners/intel.svg", width: "w-24" },
  { name: "NVIDIA", logo: "/images/partners/nvidia.svg", width: "w-28" },
  { name: "MSI", logo: "/images/partners/msi.svg", width: "w-20" },
  { name: "Praxilla", logo: "/images/partners/praxilla.svg", width: "w-24" },
];
```

```astro
{partners.map((partner) => (
  <div class="group transition-all duration-300 opacity-40 hover:opacity-100">
    <img
      src={partner.logo}
      alt={partner.name}
      class={`block h-8 ${partner.width} object-contain brightness-0 invert`}
    />
  </div>
))}
```

- [ ] **Step 3: Build and verify logos render correctly**

- [ ] **Step 4: Commit**

---

### Task 1.3: Add Plausible Analytics

**Files:**
- Modify: `src/components/layout/SEOHead.astro` — add Plausible script

- [ ] **Step 1: Add Plausible script to SEOHead**

```html
<!-- Analytics: Plausible (privacy-first, no cookies) -->
<script defer data-domain="uptakeagency.com" src="https://plausible.io/js/script.js"></script>
```

- [ ] **Step 2: Commit**

```bash
git commit -m "feat: add Plausible analytics (privacy-first, cookie-free)"
```

> **Note:** Requires Plausible account setup at plausible.io or self-hosted instance.

---

## Sprint 2: Conversion & Contact (Mar 31 - Apr 4)

### Task 2.1: Cal.com Booking Integration

**Files:**
- Modify: `src/pages/contact.astro` — add Cal.com embed
- Modify: `src/pages/tr/contact.astro` — same for TR
- Modify: `src/components/sections/home/ContactCTA.astro` — link to booking
- Modify: `src/i18n/en.json` — add booking text keys
- Modify: `src/i18n/tr.json` — Turkish translations

- [ ] **Step 1: Set up Cal.com account and create event type**

Create a "30-min Discovery Call" event type at cal.com.

- [ ] **Step 2: Add Cal.com embed to contact page**

```astro
<!-- Cal.com inline embed -->
<div class="mt-8 glass-card p-2 rounded-xl overflow-hidden">
  <iframe
    src="https://cal.com/uptakeagency/discovery-call?embed=true&theme=dark"
    class="w-full min-h-[600px] border-0 rounded-lg"
    loading="lazy"
    title={locale === "en" ? "Schedule a meeting" : "Toplanti planla"}
  ></iframe>
</div>
```

- [ ] **Step 3: Add "Book a Call" CTA to ContactCTA.astro**

Add secondary button linking to contact page booking section:

```astro
<Button href={getLocalizedPath("/contact#booking", locale)} variant="secondary" size="lg">
  <span class="font-mono text-sm mr-2 opacity-70">$</span>
  {i18n.contact.cta_booking}
</Button>
```

- [ ] **Step 4: Add i18n keys**

```json
// en.json
"contact": {
  "cta_booking": "Book a Call",
  // ...existing
}

// tr.json
"contact": {
  "cta_booking": "Gorusme Planla",
  // ...existing
}
```

- [ ] **Step 5: Build and verify**

- [ ] **Step 6: Commit**

---

### Task 2.2: Contact Form with Resend

**Files:**
- Create: `src/components/sections/ContactForm.astro` — form component
- Modify: `src/pages/contact.astro` — add form
- Modify: `src/pages/tr/contact.astro` — add form (TR)

- [ ] **Step 1: Create ContactForm component**

Static Astro form that submits to a Resend-powered API endpoint (or Formspree as fallback):

```astro
<form action="https://formspree.io/f/YOUR_ID" method="POST" class="space-y-6">
  <div>
    <label for="name" class="block text-sm font-medium text-text-secondary mb-2">
      {locale === "en" ? "Name" : "Ad Soyad"}
    </label>
    <input
      type="text" id="name" name="name" required
      class="w-full rounded-lg border border-surface-border bg-surface-raised px-4 py-3 text-text-primary placeholder-text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      placeholder={locale === "en" ? "Your name" : "Adiniz"}
    />
  </div>
  <div>
    <label for="email" class="block text-sm font-medium text-text-secondary mb-2">Email</label>
    <input type="email" id="email" name="email" required
      class="w-full rounded-lg border border-surface-border bg-surface-raised px-4 py-3 text-text-primary placeholder-text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      placeholder="you@company.com"
    />
  </div>
  <div>
    <label for="message" class="block text-sm font-medium text-text-secondary mb-2">
      {locale === "en" ? "Message" : "Mesaj"}
    </label>
    <textarea id="message" name="message" rows="5" required
      class="w-full rounded-lg border border-surface-border bg-surface-raised px-4 py-3 text-text-primary placeholder-text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
      placeholder={locale === "en" ? "Tell us about your project..." : "Projenizi anlattin..."}
    ></textarea>
  </div>
  <button type="submit"
    class="inline-flex w-full items-center justify-center font-medium rounded-lg px-8 py-3 text-base bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2 focus:ring-offset-surface"
  >
    <span class="font-mono text-sm mr-2 opacity-70">$</span>
    {locale === "en" ? "Send Message" : "Mesaj Gonder"}
  </button>
</form>
```

- [ ] **Step 2: Add i18n keys for form fields**

```json
// en.json → "contact" object
"form_name": "Name",
"form_name_placeholder": "Your name",
"form_email_placeholder": "you@company.com",
"form_message": "Message",
"form_message_placeholder": "Tell us about your project...",
"form_submit": "Send Message"

// tr.json → "contact" object
"form_name": "Ad Soyad",
"form_name_placeholder": "Adiniz",
"form_email_placeholder": "siz@sirket.com",
"form_message": "Mesaj",
"form_message_placeholder": "Projenizi anlatin...",
"form_submit": "Mesaj Gonder"
```

- [ ] **Step 3: Add to contact pages (EN + TR), use i18n keys instead of inline ternaries**

- [ ] **Step 4: Test form submission**

- [ ] **Step 5: Commit**

---

## Sprint 3: Content Foundation (Apr 7-11)

### Task 3.1: Create Blog Content Collection

**Files:**
- Modify: `src/content/config.ts` — add blog collection schema
- Create: `src/content/blog/en/` — English blog posts directory
- Create: `src/content/blog/tr/` — Turkish blog posts directory
- Create: `src/pages/blog/index.astro` — blog listing page
- Create: `src/pages/blog/[slug].astro` — blog post page
- Create: `src/pages/tr/blog/index.astro` — TR listing
- Create: `src/pages/tr/blog/[slug].astro` — TR post page
- Create: `src/layouts/BlogLayout.astro` — blog post layout with prose-invert
- Modify: `src/components/layout/Header.astro` — add Blog nav item
- Modify: `src/i18n/en.json` — add blog keys
- Modify: `src/i18n/tr.json` — add blog keys

- [ ] **Step 1: Define blog schema**

```typescript
// src/content/config.ts
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    author: z.string().default("Cengiz Selcuk"),
    locale: z.enum(["en", "tr"]),
  }),
});

export const collections = { projects, services, blog };
```

- [ ] **Step 2: Create BlogLayout.astro**

Layout with reading time, date, author, prose-invert content area.

- [ ] **Step 3: Create blog pages (listing + [slug])**

- [ ] **Step 4: Add nav link**

Add "Blog" to navItems in Header.astro.

- [ ] **Step 5: Add i18n keys**

```json
// en.json → add to "nav" object
"blog": "Blog"

// en.json → add new "blog" object
"blog": {
  "title": "Blog",
  "subtitle": "Insights on AI, software development, and technology consulting.",
  "read_more": "Read More",
  "back": "Back to Blog",
  "reading_time": "min read",
  "published": "Published",
  "by": "by"
}

// tr.json — same keys with Turkish translations
```

- [ ] **Step 6: Commit**

---

### Task 3.2: Write First 3 Blog Posts

**Files:**
- Create: `src/content/blog/en/building-ai-agents-whatsapp.md`
- Create: `src/content/blog/en/our-tech-stack-2026.md`
- Create: `src/content/blog/en/from-gaming-to-ai-our-story.md`
- Create: Turkish translations for each

- [ ] **Step 1: Write "Building AI Agents for WhatsApp"**

Case study format: challenge → approach → results (Estanbul AI Agent).

- [ ] **Step 2: Write "Our Tech Stack in 2026"**

Technical deep-dive into TypeScript/React/Bun/Docker stack choices.

- [ ] **Step 3: Write "From Gaming to AI: Our Story"**

Founder story, career timeline, why Uptake Agency was created.

- [ ] **Step 4: Write TR translations**

- [ ] **Step 5: Update llms-full.txt with blog references**

- [ ] **Step 6: Commit**

---

## Sprint 4: Social Proof & Case Studies (Apr 14-18)

### Task 4.1: Enhanced Case Study Pages

**Files:**
- Modify: `src/content/config.ts` — add metrics, challenge, solution fields
- Modify: `src/content/projects/en/*.md` — add structured case study content
- Modify: `src/pages/work/[slug].astro` — enhanced layout with metrics bar
- Modify: `src/pages/tr/work/[slug].astro` — same for TR

- [ ] **Step 1: Extend projects schema**

```typescript
// Add to projects schema
metrics: z.array(z.object({
  value: z.string(),
  label: z.string(),
})).optional(),
challenge: z.string().optional(),
solution: z.string().optional(),
result: z.string().optional(),
```

- [ ] **Step 2: Add metrics bar to [slug].astro**

Display metrics in a terminal-styled stats row at top of case study.

- [ ] **Step 3: Update project markdown files with structured content**

- [ ] **Step 4: Commit**

---

### Task 4.2: Testimonials Section

**Files:**
- Create: `src/components/sections/home/Testimonials.astro` — testimonial cards
- Modify: `src/pages/index.astro` — add Testimonials section
- Modify: `src/pages/tr/index.astro` — same for TR
- Modify: `src/pages/index.astro` — add Review JSON-LD schema

- [ ] **Step 1: Create Testimonials component**

Terminal-styled quote cards with client name, role, company.

```astro
<!-- Terminal-style testimonial card -->
<div class="glass-card p-6">
  <p class="font-mono text-xs text-brand-400 mb-3">// client_feedback</p>
  <blockquote class="text-text-secondary leading-relaxed italic">
    "{testimonial.quote}"
  </blockquote>
  <div class="mt-4 flex items-center gap-3">
    <div class="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center">
      <span class="text-brand-400 text-sm font-bold">{testimonial.name[0]}</span>
    </div>
    <div>
      <p class="text-sm text-text-primary font-medium">{testimonial.name}</p>
      <p class="text-xs text-text-muted">{testimonial.role}, {testimonial.company}</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add i18n keys for testimonials**

```json
// en.json
"testimonials": {
  "title": "What Clients Say",
  "comment": "client_feedback"
}

// tr.json
"testimonials": {
  "title": "Musterilerimiz Ne Diyor",
  "comment": "musteri_geri_bildirimi"
}
```

Testimonial content (quotes, names, roles) is locale-aware — pass `locale` prop to component and define separate quote arrays per locale.

- [ ] **Step 3: Add to home pages (EN + TR)**

Place between FAQ and ContactCTA sections.

- [ ] **Step 4: Add Review JSON-LD schema**

- [ ] **Step 5: Commit**

---

## Sprint 5: Interactive Polish (Apr 21-25)

### Task 5.1: Hero Typing Animation

**Files:**
- Modify: `src/components/sections/home/Hero.astro` — add typewriter effect

- [ ] **Step 1: Add `id="terminal-text"` to Hero breadcrumb span**

In `src/components/sections/home/Hero.astro`, add id to the breadcrumb text:

```astro
<span id="terminal-text" class="text-text-secondary" style="visibility:hidden;">~/projects/uptake-agency</span>
```

- [ ] **Step 2: Add typewriter script**

Pure CSS + minimal JS typing animation for `~/projects/uptake-agency`:

```astro
<script>
  const el = document.getElementById('terminal-text');
  if (el) {
    const text = el.textContent || '';
    el.textContent = '';
    el.style.visibility = 'visible';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(type, 50 + Math.random() * 30);
      }
    };
    type();
  }
</script>
```

- [ ] **Step 3: Test animation renders correctly on load**

- [ ] **Step 4: Commit**

---

### Task 5.2: GitHub Activity Widget

**Files:**
- Create: `src/components/sections/home/GitHubActivity.astro` — contribution graph
- Modify: `src/pages/index.astro` — add section
- Modify: `src/pages/tr/index.astro` — add section (TR)
- Modify: `src/i18n/en.json` — add github section keys
- Modify: `src/i18n/tr.json` — add github section keys

- [ ] **Step 1: Create GitHub activity component**

Fetch GitHub contribution data at build time using GitHub API:

```astro
---
// Fetch at build time (static site)
const res = await fetch('https://api.github.com/users/c3nx/events?per_page=10');
const events = await res.json();
---
```

Display as terminal-styled activity feed.

- [ ] **Step 2: Add i18n keys**

```json
// en.json
"github": { "title": "Recent Activity", "comment": "open_source" }
// tr.json
"github": { "title": "Son Aktivite", "comment": "acik_kaynak" }
```

- [ ] **Step 3: Add to home pages (EN + TR)**

- [ ] **Step 4: Commit**

---

## Sprint 6: Theme & i18n (Apr 28 - May 2)

### Task 6.1: Dark/Light Mode Toggle

> **Scope warning:** This is a multi-step refactor. The current color system uses hardcoded Tailwind tokens (`surface-*`, `text-*`), NOT CSS custom properties. Converting to a togglable theme requires migrating ALL color references to CSS variables first.

**Files:**
- Modify: `tailwind.config.mjs` — switch colors to CSS variable references, add `darkMode: 'class'`
- Modify: `src/styles/global.css` — define CSS custom properties for dark + light themes
- Create: `src/components/ui/ThemeToggle.astro` — toggle button
- Modify: `src/components/layout/Header.astro` — add toggle
- Modify: `src/layouts/BaseLayout.astro` — add `dark` class default + flash prevention script

- [ ] **Step 1: Migrate color tokens to CSS custom properties**

In `global.css`, define both themes via CSS variables:

```css
@layer base {
  :root {
    --surface: 10 10 15;         /* #0a0a0f */
    --surface-raised: 17 17 24;  /* #111118 */
    --surface-overlay: 26 26 36; /* #1a1a24 */
    --surface-border: 42 42 58;  /* #2a2a3a */
    --text-primary: 228 228 231; /* #e4e4e7 */
    --text-secondary: 161 161 170;
    --text-muted: 113 113 122;
  }

  :root:not(.dark) {
    --surface: 255 255 255;
    --surface-raised: 249 250 251;
    --surface-overlay: 243 244 246;
    --surface-border: 229 231 235;
    --text-primary: 17 24 39;
    --text-secondary: 107 114 128;
    --text-muted: 156 163 175;
  }
}
```

- [ ] **Step 2: Update tailwind.config.mjs to reference CSS variables**

```javascript
colors: {
  surface: {
    DEFAULT: "rgb(var(--surface) / <alpha-value>)",
    raised: "rgb(var(--surface-raised) / <alpha-value>)",
    // ... etc
  },
}
```

- [ ] **Step 3: Add `dark` class to `<html>` by default in BaseLayout**

```astro
<html lang={locale} class="scroll-smooth dark">
```

- [ ] **Step 4: Add flash prevention script (before body)**

```html
<script is:inline>
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('dark');
  }
</script>
```

- [ ] **Step 5: Create ThemeToggle component**

Sun/moon icon toggle with localStorage persistence.

- [ ] **Step 6: Add toggle to Header**

- [ ] **Step 7: Test ALL pages in both themes — every component must render correctly**

This is critical — every component uses surface/text colors. Full visual regression test needed.

- [ ] **Step 8: Commit**

---

### Task 6.2: i18n Expansion (German, Arabic)

**Files:**
- Create: `src/i18n/de.json` — German translations
- Create: `src/i18n/ar.json` — Arabic translations
- Modify: `src/i18n/index.ts` — add new locales
- Modify: `astro.config.mjs` — add locales
- Create: `src/pages/de/` — German page mirrors
- Create: `src/pages/ar/` — Arabic page mirrors (RTL consideration)

- [ ] **Step 1: Create translation files**

- [ ] **Step 2: Update i18n config**

- [ ] **Step 3: Create page mirrors**

- [ ] **Step 4: Add RTL support for Arabic**

```astro
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

- [ ] **Step 5: Test all locales build correctly**

- [ ] **Step 6: Commit**

---

## Sprint 7: Rich Media (May 5-9)

### Task 7.1: Video Walkthroughs

**Files:**
- Modify: `src/content/config.ts` — add `video` field to projects
- Modify: `src/pages/work/[slug].astro` — embed video player
- Modify: `src/pages/tr/work/[slug].astro` — same for TR

- [ ] **Step 1: Add video field to projects schema**

```typescript
video: z.string().url().optional(), // YouTube or Loom URL
```

- [ ] **Step 2: Create video embed component**

Lazy-loaded YouTube/Loom embed with dark theme wrapper:

```astro
{project.data.video && (
  <div class="mt-8 terminal-window">
    <div class="terminal-dots"></div>
    <div class="aspect-video">
      <iframe
        src={project.data.video}
        class="w-full h-full"
        loading="lazy"
        allowfullscreen
      ></iframe>
    </div>
  </div>
)}
```

- [ ] **Step 3: Record project walkthrough videos (Loom)**

- [ ] **Step 4: Commit**

---

### Task 7.2: Interactive Tech Radar

**Files:**
- Create: `src/pages/stack.astro` — tech stack page
- Create: `src/pages/tr/stack.astro` — TR version

- [ ] **Step 1: Create tech stack page**

Categorized grid of technologies with proficiency indicators:

```
Categories:
- Languages: TypeScript, Python, Swift, Rust
- Frontend: React, Next.js, Astro, Tailwind CSS
- Backend: Node.js, Express, FastAPI, Bun
- AI/ML: OpenAI, Gemini, LangChain, RAG
- Infrastructure: Docker, Kubernetes, GitHub Actions, Nginx
- Databases: PostgreSQL, MongoDB, SQLite
```

Terminal-styled cards with usage level indicator (daily / frequent / occasional).

- [ ] **Step 2: Add i18n keys**

```json
// en.json
"stack": {
  "title": "Tech Stack",
  "subtitle": "Technologies we use daily to deliver solutions.",
  "daily": "Daily",
  "frequent": "Frequent",
  "occasional": "Occasional"
}
// tr.json — Turkish translations
```

- [ ] **Step 3: Add to navigation (Header.astro navItems)**

- [ ] **Step 4: Commit**

---

## Definition of Done (per Sprint)

- [ ] All features build without errors (`bun run build`)
- [ ] Type-check passes (`bun run type-check`)
- [ ] Both locales (EN/TR) work correctly
- [ ] Dark theme consistent across new components
- [ ] OG images updated if new pages added
- [ ] llms.txt / llms-full.txt updated if significant content added
- [ ] Committed and pushed to main

---

## Dependencies & Prerequisites

| Task | Requires |
|------|----------|
| 1.1 Project screenshots | User provides images |
| 1.2 Partner logos | Download SVGs from brand resources |
| 1.3 Plausible | Plausible.io account or self-hosted |
| 2.1 Cal.com | Cal.com account + event type |
| 2.2 Contact form | Formspree or Resend account |
| 3.2 Blog posts | Content writing (user) |
| 4.2 Testimonials | Client quotes (user collects) |
| 5.2 GitHub widget | GitHub API (public, no auth needed) |
| 7.1 Videos | Screen recordings (user) |
