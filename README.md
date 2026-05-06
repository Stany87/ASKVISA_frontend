# AskVisa B2B — Frontend UI Component

A premium, cinematic B2B visa processing portal for travel agencies and visa agents. Built with vanilla HTML/CSS/JS, powered by **GSAP ScrollTrigger** and **Lenis** for buttery smooth scroll animations.

![Hero](https://img.shields.io/badge/Status-Live-brightgreen) ![Tech](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-blue) ![GSAP](https://img.shields.io/badge/Animation-GSAP%20%2B%20Lenis-orange)

---

## ✨ Features

### 🎬 Cinematic Country Showcase
- **Pinned scroll sections** — Each featured country (Thailand, Malaysia, Hong Kong) locks in place while you scroll through 2–3 full-screen background images
- **Zoom + crossfade** transitions between images driven by scroll progress
- **Layered parallax** with images moving at different speeds for depth
- **Content fade-in/out** with staggered animations

### 🌍 Trending Visas — Horizontal Scroll
- Drag-to-scroll horizontal card layout for all 9 destinations
- Live / Coming Soon status badges
- No scroll hijacking — flows naturally with the page

### 📋 Compact Visa Detail Modals
- Minimal 420px card-style modals (not fullscreen overlays)
- 6 info fields: Processing Time, Visa Types, Agent Price, Validity, Entry Type, Max Stay
- Required documents checklist
- Supports all 9 countries with full data

### 🤖 AI Feature Sections
- **Automatic Document Identification** — AI-generated dashboard mockup with feature list
- **Real-Time Visa Updates** — Tracking dashboard with notification features

### 🏢 Business Features
- "Why AskVisa B2B" — 6 feature cards (Instant Processing, Agent Pricing, Bulk Applications, etc.)
- Animated counters (500+ Agents, 25000+ Visas, 98% Approval Rate)
- CTA section with contact details

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure |
| **Vanilla CSS** | Dark-mode design system, glassmorphism, responsive grid |
| **Vanilla JS** | Modal logic, drag-to-scroll, counter animations |
| **GSAP 3.12** | ScrollTrigger pinning, scrub-based parallax, timeline animations |
| **Lenis 1.1** | Smooth inertia scrolling (replaces native scroll) |
| **Font Awesome 6.5** | Iconography |
| **Google Fonts** | Inter (body) + Playfair Display (headings) |
| **Unsplash** | High-quality destination photography |

---

## 📁 File Structure

```
├── index.html            # Main page structure
├── styles.css            # Complete styling (dark mode, responsive)
├── script.js             # GSAP animations, Lenis, modals, drag-scroll
├── assets/
│   ├── doc-identification.png   # AI document ID dashboard mockup
│   └── realtime-tracking.png    # Real-time tracking dashboard mockup
└── README.md
```

---

## 🚀 Getting Started

### Quick Start
Just serve the files with any static server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

### CDN Dependencies (auto-loaded)
All dependencies are loaded via CDN — no `npm install` needed:
- `cdn.jsdelivr.net/npm/lenis@1.1.18`
- `cdn.jsdelivr.net/npm/gsap@3.12.5`
- `cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1`
- `fonts.googleapis.com` (Inter, Playfair Display)

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#c62a2a` | Buttons, accents, CTAs |
| `--primary-light` | `#e84545` | Hover states, highlights |
| `--dark` | `#0a0a0a` | Main background |
| `--dark-2` | `#111` | Section backgrounds |
| `--dark-3` | `#181818` | Cards, modals |
| `--gold` | `#c9a84c` | Country taglines |
| `--text` | `#f5f5f5` | Primary text |
| `--muted` | `#888` | Secondary text |

---

## 🌏 Supported Countries

| Country | Status | Visa Types |
|---|---|---|
| 🇹🇭 Thailand | ✅ Live | TDAC, Tourist, Business |
| 🇲🇾 Malaysia | ✅ Live | eVisa, eNTRI, Sticker |
| 🇭🇰 Hong Kong | ✅ Live | PAR, Tourist, Transit |
| 🇸🇬 Singapore | 🔜 Coming Soon | Tourist, Business |
| 🇻🇳 Vietnam | 🔜 Coming Soon | e-Visa, VOA |
| 🇦🇪 Dubai (UAE) | 🔜 Coming Soon | Tourist, Transit |
| 🇱🇰 Sri Lanka | 🔜 Coming Soon | ETA, Tourist |
| 🇮🇩 Indonesia | 🔜 Coming Soon | e-VOA, Tourist |
| 🇯🇵 Japan | 🔜 Coming Soon | Tourist, Business |

---

## 📱 Responsive Breakpoints

- **Desktop**: Full 2-column layouts, horizontal scroll cards
- **Tablet** (`≤1024px`): Single column, stacked grids
- **Mobile** (`≤768px`): Hidden nav links, compact spacing
- **Small** (`≤480px`): Single-column meta grids, stacked stats

---

## 📝 License

© 2026 AskVisa. All rights reserved.
