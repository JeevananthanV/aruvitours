# Design System & Guidelines

This document details the visual style, design tokens, premium UX components, and frontend development guidelines for the **Aruvi Tours** web application. It bridges the design skills defined in [SKILL.md](file:///j:/eithiroli/Aruvi%20Tours/final/New%20folder/aruvitours/.agents/skills/SKILL.md) and the implementation details found in [index.css](file:///j:/eithiroli/Aruvi%20Tours/final/New%20folder/aruvitours/src/assets/css/index.css).

---

## 1. Visual Philosophy & Aesthetics

Aruvi Tours is positioned as a **luxury & premium travel agency**. The interface is designed to evoke a sense of exclusivity, elegant adventure, and modern sophistication. 

Key design pillars include:
*   **Rich Materiality:** Glassmorphism, subtle noise overlays, and premium shadows to establish depth.
*   **Luxury Accents:** Gold-accented highlights, typography pairings, and warm beige backdrops.
*   **Fluid Transitions:** Micro-interactions, sliding shimmers, and smooth vertical animations to make the application feel active and high-end.

---

## 2. Design Tokens

These variables are defined in the `:root` of [index.css](file:///j:/eithiroli/Aruvi%20Tours/final/New%20folder/aruvitours/src/assets/css/index.css) and must be used for all styling needs.

### Color Palette

| Token | Hex Value | Usage / Role |
| :--- | :--- | :--- |
| `--gold` | `#C9A84C` | Primary branding, buttons, highlights, active nav indicators. |
| `--gold-light` | `#E8D08A` | Text overlays on dark backgrounds, secondary gold accent. |
| `--gold-dim` | `#8B6914` | Scrollbar thumb, dark gold hover states, gradient ends. |
| `--black` | `#0A0A0A` | Deepest background/dark areas, scrollbar track. |
| `--dark` | `#111111` | Primary dark theme backdrop, dark navigation overlay. |
| `--dark-2` | `#1A1A1A` | Secondary dark container background. |
| `--dark-3` | `#222222` | Tertiary dark accents. |
| `--beige` | `#F5F0E8` | Primary body background (light, warm tone). |
| `--beige-2` | `#EDE8DC` | Secondary content background, loading skeleton base. |
| `--beige-3` | `#E0D8CC` | Tertiary content dividers, skeleton shimmer highlights. |
| `--white` | `#FFFFFF` | Clear backgrounds, cards, typography on dark zones. |

### Typography Stack

*   **Primary Headings (`--font-serif`):** `'Playfair Display', Georgia, serif`
    *   Used for brand titles, main section headings (`h1`, `h2`, `h3`).
    *   Evokes heritage, trust, and luxury.
*   **Body & Interface (`--font-body`):** `'Poppins', sans-serif`
    *   Used for general content, labels, cards, buttons, and navigation.
    *   Highly readable, clean, and geometric.
*   **Luxury Italics & Accents (`--font-italic`):** `'Cormorant Garamond', Georgia, serif`
    *   Used sparingly for sub-captions, blockquotes, or highlighted terms inside titles.

### Spacing & Borders

*   **Regular Border Radius (`--radius`):** `16px` (Default card corners, buttons, search panels)
*   **Large Border Radius (`--radius-lg`):** `28px` (Premium feature cards, call-to-actions)
*   **Transitions (`--transition`):** `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)` (Used for all hover effects, ensures a smooth fluid response)

### Elevation & Depth (Shadows)

*   `--shadow`: `0 24px 60px rgba(0,0,0,0.10)` (Regular white cards)
*   `--shadow-gold`: `0 8px 32px rgba(201,168,76,0.25)` (Buttons, active gold elements)
*   `--shadow-premium`: `0 32px 80px rgba(0,0,0,0.15)` (Hovered state cards)

---

## 3. Core Component Guidelines

### 1. Buttons
*   **Primary Action (`.btn-primary`):** 
    *   Uses a `.gradient-gold` background.
    *   Features a custom shiny sliding shimmer on hover (`::before` animation).
    *   Slightly lifts (`translateY(-2px)`) and intensifies the gold glow shadow.
*   **Secondary/Ghost Action (`.btn-ghost`):**
    *   Translucent backdrop filter blur (`10px`).
    *   Subtle white border.

### 2. Glassmorphism
*   Use `.glass` (light background) and `.glass-dark` (dark background) components.
*   Always require:
    *   `backdrop-filter: blur(20px)`
    *   A semi-transparent background (e.g., `rgba(255, 255, 255, 0.05)` or `rgba(10, 10, 10, 0.4)`)
    *   A high-contrast thin border to catch the light (`rgba(255, 255, 255, 0.1)`)

### 3. Premium Cards
*   `.premium-card` features soft corners (`--radius-lg`) and a deep light-dispersed shadow.
*   On hover, cards must lift `8px` up and double the shadow intensity to produce depth.
*   Card headers or background images must contain a subtle vignette to make text legible.

### 4. Hero Sections
*   **Visual Texture:** Includes a tiny, repeating SVG noise pattern (`.hero-grain` at `0.03` opacity) and a vignette gradient (`.hero-vignette`) to create a cinematic look.
*   **Progress Indicators:** A bottom progress bar (`.hero-progress-fill`) filled with a gold gradient displays the timer for background slide rotations.

---


## 4. Premium Motion & Animation Guidelines

To ensure the site feels responsive, alive, and luxurious, we employ specific transition variables and motion classes:
## React Motion Implementation
- **Library**: `framer-motion`
- **Initial State**: `opacity: 0`, `y: 40` (Slide up from 40 pixels down)
- **Animate State**: `opacity: 1`, `y: 0`
- **Transition Physics**: `type: "spring"`, `stiffness: 100`, `damping: 15`
- **Stagger Effect**: Grid items must stagger entry by `0.1s` per item.


### Animation Classes & Keyframes
*   **Fade In Up (`.animate-fade-in-up`):** An elegant entry animation that slides elements up by `30px` while fading them in over `0.8s` with a smooth custom transition curve.
*   **Floating (`.animate-float`):** A continuous, smooth vertical floating animation (`4s` loop) ideal for highlighting floating booking buttons, destination badges, or subtle interactive pointers.
*   **Hover Zoom (`.hover-zoom-container`):** Used on card images. On hover, the nested image scales up smoothly to `1.08` without overflowing the card container.
*   **Gold Hover Glow (`.hover-glow-gold`):** A luxurious hover effect that applies a soft, gold box-shadow glow and shifts the border to `--gold-light`.

### Staggered Load Times
Use staggered animation delays to orchestrate the entrance of lists, grids, or multi-step cards:
*   `.delay-100`: `100ms` delay
*   `.delay-200`: `200ms` delay
*   `.delay-300`: `300ms` delay
*   `.delay-400`: `400ms` delay

---

## 5. Visual Accessibility & Motion

*   **Custom Scrollbars:** Replaces chunky OS scrollbars with a custom dark track (`--black`) and thin gold-dimmed thumb (`--gold-dim` hovering to `--gold`).
*   **Custom Text Selection:** Selected text utilizes `rgba(201, 168, 76, 0.3)` as its background to stay on-brand.
*   **Focus Rings:** Interactive elements must support high-contrast outline styling:
    ```css
    *:focus-visible {
      outline: 2px solid var(--gold);
      outline-offset: 2px;
    }
    ```
*   **Reduced Motion:** Support users who prefer static layouts via `@media (prefers-reduced-motion: reduce)`, disabling all transitions and timer animations instantly.

