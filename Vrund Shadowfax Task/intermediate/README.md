# ShadowFox Frontend Developer Internship - Intermediate Level Task

## Project: LUMINA Botanica — Brand-Focused Luxury Skincare & Wellness Storefront

**Developer:** Vrund Patel  
**Role:** Frontend Developer  
**Status:** Completed & Deployment-Ready  

---

## 🌿 Executive Overview
This project fulfills the **Intermediate Level Task** for the **ShadowFox Frontend Developer Internship**. It is a brand-focused, product-oriented e-commerce storefront for a high-end botanical skincare and holistic wellness brand called **"LUMINA Botanica"**.

Rather than mimicking a generic cookie-cutter store template, this storefront is designed with editorial elegance, brand-first visual storytelling, and an end-to-end shopping flow (browsing, real-time filtering, product inspection modals, slide-over cart with dynamic calculations, promo code discounts, and a multi-step checkout simulator).

---

## 🎨 Brand Identity & Design System

### 1. Brand Concept & Philosophy
- **Name:** Maison De LUMINA Botanica (Paris)
- **Positioning:** Cold-pressed wildcrafted botanicals paired with clinically proven biotechnology (THD Ascorbate Vitamin C, multi-weight peptides, plant stem cells, and microbiome bio-ferments).
- **Aesthetic:** Editorial luxury, calm organic warmth, apothecary sophistication, tactile micro-animations.

### 2. Color Palette
- **Silk Porcelain Alabaster (`#FAF7F2`):** Primary background conveying cleanliness and gentle formulation.
- **Deep Alpine Forest Green (`#1A2C22`):** Primary brand accent for headers, solid CTA buttons, and contrast.
- **Terracotta Rose Clay (`#C87D65`):** Warm accent for category tags, promo badges, and price highlights.
- **Golden Ochre (`#C39A55`):** Luxury detail accents for star ratings, shipping unlocks, and ribbon badges.
- **Soft Sage Green (`#EAF0EB`):** Secondary card backgrounds and badge containers.

### 3. Typography Hierarchy
- **Editorial Headings:** **Cormorant Garamond** (Google Fonts) — classical, sophisticated serif with warm italic accents.
- **Interface Copy & Data:** **Plus Jakarta Sans** (Google Fonts) — modern, highly legible geometric sans-serif for UI elements, labels, prices, and interactive forms.

---

## 🛍️ Core Features & Frontend Flow

### 1. Announcement Ribbon & Sticky Luxury Header
- Top promotional banner featuring discount codes and free carbon-neutral shipping incentives.
- Logo with botanical tagline, category quick links, live search bar with instant autocomplete, skin quiz shortcut, and a bag trigger with a live item counter badge.

### 2. High-Converting Hero Section
- Bold editorial typography (*"Nature's Pure Alchemy, Clinically Proven for Radiance"*).
- Primary CTA (*"Explore The Collection"*) and secondary CTA (*"Find My Skin Ritual"*).
- Interactive 3D-styled serum bottle showcase with glowing amber core, star rating, and one-click *"Quick Add"*.

### 3. Product Catalog with Dynamic Filtering & Sorting
- **Category Filter Tabs:**
  - *All Formulations (8)*
  - *Serums & Elixirs*
  - *Gentle Cleansers*
  - *Hydrating Creams*
  - *Holistic Wellness*
- **Real-Time Live Search:** Filters products instantly by title, active botanicals, or product description.
- **Sorting Engine:** Sort by *Featured Curations*, *Price: Low to High*, *Price: High to Low*, or *Customer Rating*.
- **Card Hover Quick Actions:** Hovering over any product card reveals *"Quick View"* and *"Add to Bag"* without navigating away.

### 4. Interactive Product Detail Modal (Deep-Dive View)
- Accessible dialog view displaying:
  - Product category, title, volume, and star ratings.
  - Formulated botanicals spotlight.
  - Accordion dropdowns: *Key Active Botanicals*, *How To Incorporate Into Ritual*, and *Clean Standards & Packaging*.
  - Quantity stepper (`-` / `+`) and *"Add to Ritual Bag"* action with dynamic total calculation.

### 5. Interactive Slide-Over Cart Drawer & Pricing Engine
- **Free Shipping Progress Tracker:** Visual progress bar that dynamically computes remaining dollars needed to reach the `$60.00` free shipping threshold.
- **Cart Item Management:** Real-time quantity adjustments, subtotal updates, and item deletion.
- **Promotional Code Engine:**
  - `LUMINA15`: Unlocks a 15% discount on the entire order.
  - `FREESHIP`: Unlocks 100% free shipping regardless of order size.
- **Real-time Cost Breakdown:** Subtotal, Promo Discount, Estimated Shipping, Sales Tax (8%), and Order Total.
- **Persistent State:** Saves cart items in browser `localStorage` to preserve user selections across reloads.

### 6. Complete Multi-Step Checkout Flow
- **Step 1: Shipping Address:** Form validation for recipient names, email, and postal code.
- **Step 2: Payment Method:** Mock selection for Credit Card, UPI / Instant NetBanking, and Apple/Google Pay with field validation.
- **Step 3: Order Confirmation:** Simulates payment processing, generates a unique confirmation code (e.g. `#LUM-84912`), displays items purchased recap, and clears the cart.

### 7. Interactive Skin Diagnostic Quiz
- 2-step consultation modal evaluating user skin goals and hydration tendencies.
- Generates a tailored botanical formula recommendation with an instant *"Add to Bag"* shortcut.

---

## 📱 Responsiveness & Accessibility

- **Fluid Breakpoints:**
  - **Desktop (> 1024px):** Rich dual-column layouts for hero, brand philosophy, and multi-column catalog grid.
  - **Tablet (768px – 1024px):** 2-column catalog grid, centered hero, and stacked quiz banners.
  - **Mobile (< 768px):** Collapsible mobile navigation menu, full-screen slide-over cart drawer, single-column product grid, and touch-optimized button targets.
- **Accessibility:**
  - ARIA attributes (`aria-label`, `aria-modal`, `role="dialog"`) on modals and drawer components.
  - Focus trapping and keyboard dismissals (`Escape` key closes modals and cart).

---

## 📁 File Structure
```
intermediate/
├── index.html        # Complete semantic storefront markup
├── style.css         # Luxury botanical stylesheet with CSS variables
├── script.js         # Interactive catalog, cart drawer & checkout engine
└── README.md         # Brand design rationale & frontend workflow documentation
```

---

## 🌐 How to Run Locally & Deploy

### Run Locally:
Open `intermediate/index.html` directly in any web browser or start a local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

### Free Deployment:
- **GitHub Pages:** Deploy directly from your repository root or `/intermediate` folder.
- **Netlify / Vercel:** Drop the `intermediate` folder into Netlify Drop for immediate live production hosting.
