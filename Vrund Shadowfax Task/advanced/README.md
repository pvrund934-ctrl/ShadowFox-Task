# ShadowFox Frontend Developer Internship - Advanced Level Task

## Project: PulseFlow AI — Enterprise Cloud Infrastructure & Autonomous Agent Operations Console

**Developer:** Vrund Patel  
**Role:** Frontend Developer  
**Status:** Completed & Deployment-Ready  

---

## 🏢 Executive Overview & Client Scenario
This project fulfills the **Advanced Level Task** for the **ShadowFox Frontend Developer Internship**. It is a client-grade, product-oriented enterprise web application built to satisfy a rigorous product requirement brief issued by **PulseFlow Technologies Inc.** (see [CLIENT_BRIEF.md](file:///c:/Users/Admin/OneDrive/Desktop/Vrund%20Shadowfax%20Task/advanced/CLIENT_BRIEF.md)).

The project simulates a real-world enterprise engineering assignment where a frontend developer must interpret client requirements, design an intuitive information architecture, implement real-time data visualizations, simulate complex multi-step workflows, and deliver a deployable, high-usability interface.

---

## 🎯 Requirement Interpretation & Architecture

### 1. The Client Problem
Enterprise engineering teams running autonomous AI agents on distributed cloud clusters suffered from fragmented command-line tooling. They required a unified portal to:
- Monitor cluster throughput and latency in real time.
- Simulate and inspect multi-stage AI agent workflows.
- Dynamically estimate cloud compute costs and ROI against legacy hyperscalers (AWS / GCP).
- Track security audit compliance with exportable logs.
- Manage secret authorization tokens and test webhook connectivity.

### 2. Frontend Solution Architecture
- **Single-Page Application (SPA) Router:** Smooth client-side switching between 5 dedicated view panes (*Live Telemetry*, *Agent Workflows*, *ROI Calculator*, *Audit Logs*, *API Keys & Webhooks*).
- **High-Density Dark Design System:** Crafted with a modern dark theme (`#080c14` background, `#0d121f` sidebar), vibrant neon accents (`#00f2fe` Cyan, `#8b5cf6` Purple, `#10b981` Emerald), and monospace data tables.
- **Pure Web Standards:** Engineered without cumbersome runtime frameworks to ensure instantaneous loading, zero bundle overhead, and cross-browser stability.

---

## ⚡ Core Sections & Implemented Features

### Section 1: Executive KPI Dashboard & Real-Time Canvas Telemetry
- **4 Key Performance Indicators (KPIs):** Active Compute Nodes (48/64), API Throughput (18,420 req/s), Average Agent Latency (42.5ms), and Monthly Cloud Savings ($4,890).
- **Interactive HTML5 Canvas Telemetry Graph:**
  - Plots two smooth Bézier curves: Ingress API Traffic (Cyan) and Vector Embedding Queries (Purple).
  - Time range toggle filters (**24 Hours**, **7 Days**, **30 Days**) with dynamic data generation.
  - Interactive mouse hover inspection tooltip detailing exact timestamps and req/sec values.
- **Global Fleet Mesh Grid:** Status cards monitoring regional clusters in Virginia, Frankfurt, Mumbai, and Oregon.

### Section 2: Visual Workflow / AI Agent DAG Pipeline Orchestrator
- **Visual Directed Acyclic Graph (DAG):** Clear 4-stage pipeline:
  `01. Data Ingestion` ➔ `02. Vector Embedding` ➔ `03. LLM Agent Reasoning` ➔ `04. Action & Dispatch`.
- **Interactive Simulation Engine:** Clicking *"Run Pipeline Simulation"* executes an animated sequential run highlighting active nodes with glowing cyan pulses and stream-logging progress directly into an embedded macOS-style terminal viewer (`pulseflow-orchestrator-stdout.log`).
- **Autonomous Agent Fleet Manager:** Status table with state toggling (*Active* / *Paused*) and model indicators (Gemini 1.5 Pro, Claude 3.5 Sonnet, GPT-4o-mini).

### Section 3: Cloud Compute & ROI Cost Calculator
- **Reactive Infrastructure Sliders:**
  1. *Monthly API Invocations:* 100K to 50M.
  2. *Dedicated Compute Nodes:* 1 to 64 Nodes.
  3. *Vector Database Storage (HNSW):* 10 GB to 2,000 GB.
- **Real-Time Savings Engine:** Computes immediate cost comparisons against legacy hyperscaler baselines (AWS/GCP), calculating net enterprise monthly savings ($) and percentage reduction.
- **Dynamic Tier Recommendation:** Automatically categorizes infrastructure needs into *Starter Pro*, *Growth Production*, or *Enterprise Dedicated Global Mesh*.

### Section 4: Security Audit Logs & Real-Time CSV Exporter
- **Searchable & Filterable Compliance Table:** Filter by query string (actor, resource, IP) and action category (*DEPLOY*, *AUTH*, *POLICY*, *ALERT*).
- **One-Click CSV Exporter:** Converts currently displayed audit logs into an authentic `.csv` file and initiates browser download (`PulseFlow_Security_Audit_Report.csv`).
- **Team Provisioning:** Interactive modal to invite team members with role-based authorization (Admin, Developer, Auditor).

### Section 5: API Key Manager & Webhook Diagnostic Ping Tool
- **Key Administration:** List active cryptographic tokens with masked strings, scope permissions, and a one-click copy to clipboard.
- **Webhook Handshake Diagnostic:** Input a target endpoint URL and dispatch a simulated diagnostic ping returning HTTP 200 OK, SSL cipher verification, formatted JSON response payload, and roundtrip latency (e.g. 38ms).

### Global Productivity: Command Palette (`Ctrl + K`)
- Accessible anywhere in the application by pressing `Ctrl + K` or clicking the top search bar. Enables rapid keyboard navigation across any section of the platform.

---

## 📱 Responsiveness & Usability Considerations

- **Desktop (> 1024px):** Fixed sidebar navigation with breadcrumb header and high-density multi-column metric layouts.
- **Tablet (860px – 1024px):** Responsive 1-column layout for calculator, auto-wrapping data tables, and scrollable DAG pipeline.
- **Mobile (< 860px):** Off-canvas slide-out navigation drawer with hamburger toggle, full-width data controls, and compact stat cards.
- **Usability Focus:** Monospace numerical formatting (`JetBrains Mono`), immediate visual validation states, and toast notifications confirm all user actions without ambiguous latency.

---

## 📁 File Structure
```
advanced/
├── CLIENT_BRIEF.md   # Official client requirement brief and functional spec
├── index.html        # Enterprise single-page console markup
├── style.css         # High-density dark design system & telemetry styling
├── script.js         # Reactive state engine, canvas chart, DAG runner, & CSV exporter
└── README.md         # Architecture rationale, usability decisions, & deployment guide
```

---

## 🌐 How to Run Locally & Deploy

### Run Locally:
Open `advanced/index.html` directly in any web browser or start a local HTTP server:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

### Free Deployment:
- **GitHub Pages:** Select repository root or `/advanced`.
- **Netlify / Vercel:** Deploy via GitHub repository or drag and drop `/advanced` into Netlify Drop.
