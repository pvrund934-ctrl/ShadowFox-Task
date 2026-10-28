# ShadowFox Frontend Developer Internship - Beginner Level Task

## Project: Modern Personal Portfolio Website

**Developer:** Vrund Patel  
**Role:** Frontend Developer  
**Status:** Completed & Deployment-Ready  

---

## 🌟 Executive Overview
This project fulfills the **Beginner Level Task** for the **ShadowFox Frontend Developer Internship**. It is a modern, responsive, high-performance personal portfolio website built with pure semantic HTML5, modern CSS3 (Custom Properties, Flexbox, and CSS Grid), and vanilla JavaScript (ES6+).

The portfolio showcases frontend engineering capabilities, interactive micro-animations, accessible UI components, and real-time form validation.

---

## 🚀 Key Sections & Features

1. **Header & Navigation:**
   - Sticky navigation bar with frosted-glass backdrop blur (`backdrop-filter: blur(16px)`).
   - Theme switch toggle with instant transition between **Dark** and **Light** modes, persisted via browser `localStorage`.
   - Scrollspy active link indicator using `IntersectionObserver`.
   - Responsive mobile navigation drawer with animated hamburger toggle.

2. **Hero Section:**
   - Eye-catching introductory greeting with glowing ambient radial lights.
   - Dynamic typing animation highlighting multiple developer competencies.
   - Interactive call-to-actions: *"Explore My Work"*, *"Get in Touch"*, and *"Download CV"*.
   - Live animated numeric counters for projects completed, client satisfaction, and responsive accuracy.
   - Interactive Code Editor visual component with syntax highlighting and floating skill badges.

3. **About Section:**
   - Journey story outlining developer philosophies and technical focus.
   - Key engineering pillars: *Mobile First*, *Speed & Performance*, and *Accessibility Mindset (WCAG)*.
   - Direct social connectivity links (GitHub, LinkedIn, Twitter/X, Email).

4. **Skills & Toolbox Section:**
   - Interactive category filter tabs (*All Skills*, *Core Frontend*, *Styling & Design*, *Tools & Workflow*).
   - 8 proficiency cards with custom brand icons, percentage indicators, and animated level meters.

5. **Featured Projects Section:**
   - Category filtering (*All Projects*, *E-Commerce*, *SaaS & Dashboards*, *Interactive Apps*).
   - Detailed project cards with custom mockups, pill tags, and direct links to the **Intermediate** and **Advanced** tasks.
   - **Quick Preview Modal:** Allows users to inspect architecture overviews, engineering highlights, and technical stacks without page reloading.

6. **Contact Section with Comprehensive Form Validation:**
   - Direct contact card with email, phone, location, and real-time availability indicator.
   - **Rigorous Client-Side Validation:**
     - **Name:** Minimum 3 characters, alphabetical characters & spaces only.
     - **Email:** Strict RFC email format matching.
     - **Subject:** Minimum 4 characters required.
     - **Message:** Minimum 15 characters, maximum 500 characters, equipped with a live character countdown indicator.
     - **Visual Feedback:** Real-time green/red state borders, descriptive error tooltips, button spinner animation during simulated dispatch, and toast notifications.

7. **Footer & Quick Jump:**
   - Multi-column layout with quick links, ShadowFox track level shortcuts, copyright info, and a smooth "Back to Top" button.

---

## 📐 Design Choices & Layout Decisions

- **Color Palette & Aesthetics:**  
  Built with a modern tech-focused dark palette (`#0a0d14` background with `#6366f1` Indigo and `#06b6d4` Cyan accent gradients). The light theme transitions cleanly into a crisp `#f8fafc` background with balanced contrast ratios for high readability.
- **Typography:**  
  Paired **Plus Jakarta Sans** (clean, ergonomic sans-serif for UI copy) with **Space Grotesk** (geometric, expressive font for headlines and numerical badges).
- **Glassmorphism & Depth:**  
  Utilized subtle translucent backgrounds with border outlines (`rgba(255, 255, 255, 0.08)`) and multi-layer shadows to convey visual hierarchy and high craftsmanship without relying on heavy frameworks.

---

## 📱 Responsiveness Approach

- **Fluid Breakpoints:**
  - **Desktop (> 992px):** Two-column balanced grids for Hero, About, and Contact layouts.
  - **Tablet (768px – 992px):** Single-column stacked layouts with centered content, auto-wrapping skill and project cards.
  - **Mobile (< 768px):** Collapsible full-width navigation drawer, touch-friendly tap targets (minimum 44x44px), optimized typography via `clamp()`, and full-width form inputs.
- **Pure CSS Layouts:**
  Leveraged CSS Grid (`repeat(auto-fill, minmax(260px, 1fr))`) and Flexbox for natural auto-wrapping across arbitrary screen widths.

---

## 🛠️ File Structure
```
beginner/
├── index.html        # Semantic HTML5 markup with accessible ARIA tags
├── style.css         # Modern responsive CSS3 with CSS variables & glassmorphism
├── script.js         # Interactive JavaScript logic & form validation engine
└── README.md         # Comprehensive project documentation & design rationale
```

---

## 🌐 How to Run Locally & Deploy

### Run Locally:
Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari) or use a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js npx
npx serve .
```

### Free Deployment Options:
1. **GitHub Pages:**
   - Push repository to GitHub.
   - Go to **Settings > Pages > Source** and select the branch root or `/beginner`.
2. **Vercel / Netlify:**
   - Drag and drop the `beginner` folder directly into [Netlify Drop](https://app.netlify.com/drop) or link via GitHub on Vercel for instant free SSL hosting.
