# Tradicom S.A. - Project Rules & Guidelines

This document specifies the design system, constraints, components, and guidelines for the Tradicom S.A. project. All future agents working on this workspace must strictly adhere to these rules.

## 1. Scope & Content Preservation Constraints
* **Strict Scope Isolation**: Do NOT modify existing content or sections outside of requested components. Everything else must remain exactly intact.
* **White Background**: The main page background, card containers, and alternate section backgrounds must remain pure white (`#ffffff`). Avoid dark section backgrounds or grey cards unless explicitly requested.

## 2. Brand Color Palette
The details, highlights, buttons, and borders must strictly rotate and reuse the following three primary brand colors:
* **Color 1 (Red)**: `#E22B2B` / `rgb(226, 43, 43)` (main CTA action buttons, active tab states, badges, capsule borders/tints, and red highlights).
* **Color 2 (Blue)**: `#0A369D` / `rgb(10, 54, 157)` (primary headlines/highlights, technology links, blue badges, and spec card titles).
* **Color 3 (Green)**: `#158B49` / `rgb(21, 139, 73)` (secondary accents, green checklist checkmarks, certified spec indicators, and green highlights).

### Support Color Variables:
* Red Hover: `#C81E1E`
* Red Light Tint: `rgba(226, 43, 43, 0.08)`
* Blue Hover: `#082B7E`
* Blue Light Tint: `rgba(10, 54, 157, 0.08)`
* Green Hover: `#106E39`
* Green Light Tint: `rgba(21, 139, 73, 0.15)`
* Brand Dark Blue: `#051C54`

## 3. Navigation Bar (`scandi-nav`) & Footer Standards
* **Navbar Component**: Frosted Scandinavian Nav (`.scandi-nav`) with sticky position, `backdrop-filter: blur(16px)`, and logo `assets/tradicom_logo.svg`.
* **Capsule CTA Button**: The main navbar action button is "Contáctanos" (`.btn-phone-capsule`), linking to `contacto.html`.
* **Mobile Hamburger Toggle**: Hamburger menu toggle (`.menu-toggle`) bars must maintain high-contrast dark color `#0f172a` with `z-index: 1005`.
* **Footer Logo**: The footer logo in `footer-brand` MUST be identical to the navbar logo (`assets/tradicom_logo.svg`).
* **Ticker Bar**: Ticker bar (`ticker-bar`) is permanently removed from all pages.

## 4. Hero Section (`hero-fusion-section`) Standards
* Integrated from `hero_fusion.html` with:
  * Dot matrix background pattern (`.fusion-bg-texture`).
  * Interactive sector selector tabs (`.sector-tabs-row`: Agrícola & Ganadero, Flotas Transporte, Industria Pesada, Calefacción).
  * High-impact subheadline and value pillars checklist with green checkmarks.
  * Capsule CTA buttons ("Solicitar Presupuesto Directo", "Ver Ficha Técnica ISO").
  * Right angled image frame (`assets/hero2.jpg`) with AENOR 99.9% purity spec card (`.industrial-spec-card`).
  * Bottom feature capsules grid (`.scandi-pills-grid`).

## 5. Typography & Responsiveness Rules
* **Typography Stack**: Use `'Outfit'` and `'Plus Jakarta Sans'` as primary geometric typography.
* **Single Scrollbar Enforcement**: `html` has `overflow-x: hidden !important`, while `body` MUST have `overflow: visible !important`. Never set `overflow-x: hidden` or `overflow` on `body` to avoid creating secondary browser scrollbars.
* **No `100vw` Widths**: Never use `100vw` for element widths/max-widths in CSS (as `100vw` includes the 17px vertical scrollbar width). Always use `100%` or `max-width: 100%`.
* **Smooth Hardware Acceleration**: Do NOT use real-time heavy `filter: blur(...)` (e.g. 80px blur) on large elements to prevent scroll lag. Use hardware-accelerated CSS radial gradients.
* **Mobile Breakpoints**: Standardized breakpoints at `1200px`, `992px`, `768px`, and `576px`. Sector tabs collapse to 2x2 grid on mobile (<576px), and CTA buttons expand to 100% block width.
