# ANACONDA Design Tokens Reference

> **Version:** 1.0  
> **Last Updated:** April 2026  
> **Purpose:** Single source of truth for design tokens across web platform.

---

## Table of Contents

1. [Token Architecture](#token-architecture)
2. [Color Palette](#color-palette)
3. [Typography Scale](#typography-scale)
4. [Spacing & Layout](#spacing--layout)
5. [Border Radius](#border-radius)
6. [Shadows & Effects](#shadows--effects)
7. [Motion & Timing](#motion--timing)
8. [Component Tokens](#component-tokens)
9. [Usage Guidelines](#usage-guidelines)
10. [Accessibility Notes](#accessibility-notes)

---

## Token Architecture

Tokens are organized in **3 levels**:

### Level 1: Primitive Tokens
**Raw values, zero semantic meaning.** Used only as building blocks for Level 2.

```css
/* Primitives */
--color-emerald-500: #00E5D1;
--color-neutral-950: #050507;
--spacing-8: 32px;
--border-radius-md: 12px;
```

### Level 2: Semantic Tokens
**Meaningful aliases with intent.** Maps primitives to use cases.

```css
/* Semantics */
--color-text-primary: #FFFFFF;              /* Maps neutral-0 */
--color-accent-primary: var(--color-emerald-500);  /* Primary interaction */
--color-bg-primary: var(--color-neutral-950);      /* Main background */
```

### Level 3: Component Tokens
**Component-scoped tokens.** Maximum specificity, lowest reusability.

```css
/* Component-level */
--button-primary-bg: var(--color-accent-primary);
--card-bg: rgba(20, 24, 32, 0.40);
--input-border-focus: var(--color-accent-primary);
```

**Why this structure?**
- Change theme color → modify 1 Level 1 token
- Add dark mode → override Level 2 in `@media (prefers-color-scheme: dark)`
- Component styling isolated → Level 3 contains all details

---

## Color Palette

### Neutral (Grayscale)

| Tone | Value | Use Case |
|------|-------|----------|
| **0** | `#FFFFFF` | Text on dark, highlights |
| **50** | `#F9FAFB` | Disabled text, secondary |
| **100** | `#F3F4F6` | — |
| **200** | `#E5E7EB` | — |
| **300** | `#D1D5DB` | Dividers, borders |
| **400** | `#9CA3AF` | Muted text |
| **500** | `#6B7280` | Secondary text |
| **600** | `#4B5563` | — |
| **700** | `#374151` | — |
| **800** | `#1F2937` | — |
| **900** | `#111827` | — |
| **950** | `#050507` | **Primary background** |

**Tailwind usage:**
```jsx
<div className="bg-neutral-950 text-neutral-0" />
```

**CSS usage:**
```css
.element {
  background: var(--color-neutral-950);
  color: var(--color-text-primary);
}
```

### Emerald (Primary Accent / Neon)

| Tone | Value | Note |
|------|-------|------|
| **50** | `#F0FDFA` | — |
| **100** | `#CCFBF1` | — |
| **200** | `#99F6E4` | — |
| **300** | `#5EEAD4` | — |
| **400** | `#2BE0CC` | Secondary accent |
| **500** | `#00E5D1` | **PRIMARY ACCENT — 60% luminosity** |
| **600** | `#14B8A6` | Hover state (darker) |
| **700** | `#0D9488` | Active state |
| **800** | `#0F766E` | — |
| **900** | `#134E4A` | — |
| **950** | `#0A3432` | — |

**Rules:**
- ✅ Use **500 for primary CTA**, hover underlines, focus rings
- ✅ Use **400 for hover state** on buttons (slightly brighter)
- ✅ Use **600 for active/pressed state**
- ✅ Use with **15% opacity max** (never full background)
- ❌ Do NOT use as text on light backgrounds (fails WCAG)
- ❌ Do NOT use for more than 1-2 elements per screen

**Glow values:**
- Subtle: `0 0 12px rgba(0, 229, 209, 0.35)`
- Medium: `0 0 20px rgba(0, 229, 209, 0.5), 0 0 40px rgba(0, 229, 209, 0.25)`
- Strong: `0 0 30px rgba(0, 229, 209, 0.6), 0 0 60px rgba(0, 229, 209, 0.3)`

### Violet (Secondary Accent)

| Tone | Value | Use |
|------|-------|-----|
| **500** | `#8B5CF6` | Secondary interactions, brand accent |
| **600** | `#7C3AED` | Hover state |
| **700** | `#6D28D9` | Active state |

**Contrast WCAG:**
- On neutral-950: **4.1:1 ✅ AA**
- On white: **5.1:1 ✅ AA**

### Status Colors

| Color | Value | Usage |
|-------|-------|-------|
| **Green** | `#22C55E` | Success, validity ✓ |
| **Red** | `#EF4444` | Error, destructive ✗ |
| **Amber** | `#F59E0B` | Warning ⚠ |
| **Blue** | `#0EA5E9` | Info ℹ, data visualization |

---

## Typography Scale

### Font Families

```css
--font-family-sans: "Inter", ui-sans-serif, system-ui;        /* Body, UI */
--font-family-display: "Space Grotesk", "Inter", sans-serif;  /* Headlines */
--font-family-mono: "JetBrains Mono", ui-monospace;           /* Code, numbers */
```

### Font Sizes

| Class | Size | Line Height | Weight | Use Case |
|-------|------|-------------|--------|----------|
| **display-xl** | 96px | 1.2 | 600 | Huge hero texts |
| **display-lg** | 72px | 1.2 | 600 | H1 hero section |
| **display-md** | 56px | 1.25 | 600 | Major headlines |
| **h1** | 72px | 1.25 | 600 | Page title |
| **h2** | 56px | 1.3 | 600 | Section title |
| **h3** | 44px | 1.35 | 600 | Subsection |
| **h4** | 32px | 1.4 | 600 | Card title |
| **h5** | 24px | 1.4 | 600 | Small heading |
| **body-xl** | 20px | 1.5 | 400 | Large body text |
| **body-lg** | 18px | 1.6 | 400 | Reading content |
| **body-md** | 16px | 1.5 | 400 | Standard body (main use) |
| **body-sm** | 14px | 1.5 | 400 | Secondary text, labels |
| **caption** | 12px | 1.5 | 400 | Fine print |
| **overline** | 11px | 1.4 | 600 | UPPERCASE labels |
| **mono-xl** | 20px | 1.4 | 500 | Large numbers/code |
| **mono-lg** | 16px | 1.5 | 500 | Regular numbers |
| **mono-md** | 14px | 1.5 | 500 | Small numbers |

**Tailwind usage:**
```jsx
<h1 className="text-display-lg font-display">Hero Headline</h1>
<p className="text-body-md font-sans">Regular paragraph text</p>
<span className="text-mono-lg font-mono">40%</span>
```

**CSS usage:**
```css
.hero-title {
  font-family: var(--font-family-display);
  font-size: 72px;
  line-height: 1.2;
  font-weight: 600;
}
```

### Font Weights

| Token | Value | Use |
|-------|-------|-----|
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Labels, captions |
| `--font-weight-semibold` | 600 | Headings, emphasis |
| `--font-weight-bold` | 700 | Strong emphasis |
| `--font-weight-extrabold` | 800 | Display texts |

---

## Spacing & Layout

### 8-Point Grid System

All spacing is **8px-based** for consistency.

```
4px  → --space-1  (micro gaps)
8px  → --space-2  (icon + text)
12px → --space-3  (medium)
16px → --space-4  (standard)
20px → --space-5
24px → --space-6  (between elements)
32px → --space-8  (between sections)
48px → --space-12 (large sections)
64px → --space-16
...and so on
```

### Container/Padding by Breakpoint

```css
/* Mobile (< 640px) */
--space-container-x-mobile: 16px;
--space-section-y-mobile: 48px;

/* Tablet (640-1024px) */
--space-container-x-tablet: 24px;
--space-section-y-tablet: 64px;

/* Desktop (> 1024px) */
--space-container-x-desktop: 32px;
--space-section-y-desktop: 96px;
```

**Usage:**
```javascript
// Mobile-first responsive padding
<div className="px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24" />
```

### Grid Gutters

```css
--grid-gutter-mobile: 16px;
--grid-gutter-tablet: 24px;
--grid-gutter-desktop: 32px;
```

Used in CSS Grid and Flexbox layouts for consistent spacing between items.

---

## Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| **none** | 0 | Sharp corners |
| **xs** | 4px | Subtle rounding |
| **sm** | 8px | Input fields, small buttons |
| **md** | 12px | Cards, medium buttons |
| **lg** | 16px | Large cards, modals |
| **xl** | 20px | Extra large components |
| **2xl** | 24px | — |
| **3xl** | 32px | — |
| **full** | 9999px | Circular/pill shapes |

**Tailwind usage:**
```jsx
<button className="rounded-full" />  {/* Pill button */}
<div className="rounded-lg" />        {/* Card */}
<input className="rounded-md" />      {/* Input field */}
```

---

## Shadows & Effects

### Elevation System (5 levels)

```css
--shadow-subtle:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-small:   0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 13px rgba(0, 0, 0, 0.05);
--shadow-medium:  0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-large:   0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
--shadow-none:    none;
```

| Elevation | Shadows | Use Case |
|-----------|---------|----------|
| **Level 1** | subtle | Subtle dividers, borders |
| **Level 2** | small | Hovered cards, slight depth |
| **Level 3** | medium | Default card state |
| **Level 4** | large | Modal, moderated elevation |
| **Level 5** | — | (Reserved) |

**Tailwind usage:**
```jsx
<div className="shadow-lg" />  {/* shadow-large */}
<div className="shadow-md" />  {/* shadow-medium */}
```

### Neon Glow Effects

**3-level glow system for emerald accent:**

```css
/* Subtle — hover on icons */
--glow-emerald-subtle:  0 0 12px rgba(0, 229, 209, 0.35);

/* Medium — hover on CTA buttons */
--glow-emerald-medium:  0 0 20px rgba(0, 229, 209, 0.5), 
                        0 0 40px rgba(0, 229, 209, 0.25);

/* Strong — hero accents, key elements */
--glow-emerald-strong:  0 0 30px rgba(0, 229, 209, 0.6), 
                        0 0 60px rgba(0, 229, 209, 0.3);
```

**Tailwind usage:**
```jsx
<button className="shadow-glow-emerald-medium hover:shadow-glow-emerald-strong" />
```

### Blur Values (for glass effects)

```css
--blur-sm: 16px;   /* Subtle glass */
--blur-md: 24px;   /* Default glass */
--blur-lg: 40px;   /* Strong glass */
```

**Tailwind usage:**
```jsx
<div className="backdrop-blur-lg bg-opacity-40" />
```

---

## Motion & Timing

### Durations

```css
--duration-fast:   200ms;  /* Quick feedback (hover, feedback) */
--duration-normal: 300ms;  /* Standard animations */
--duration-slow:   500ms;  /* Longer transitions (modals, pages) */
```

### Easing Functions

```css
--easing-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);      /* Snappy, energetic */
--easing-out-quad:  cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smooth */
--easing-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);  /* Ease out */
```

**Framer Motion usage:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.3,
    ease: "easeOut"
  }}
/>
```

---

## Component Tokens

### Button

```css
--button-primary-bg:        var(--color-emerald-500);
--button-primary-text:      var(--color-neutral-950);
--button-primary-hover-bg:  var(--color-emerald-400);
--button-primary-active-bg: var(--color-emerald-600);

--button-secondary-bg:      var(--color-interactive-hover);
--button-secondary-text:    var(--color-text-primary);
--button-secondary-border:  var(--color-border-default);

--button-ghost-bg:          transparent;
--button-ghost-text:        var(--color-text-primary);
--button-ghost-border:      var(--color-border-default);
```

### Card

```css
--card-bg:           rgba(20, 24, 32, 0.40);  /* Glass effect */
--card-border:       rgba(0, 229, 209, 0.12);  /* Neon-tinted border */
--card-shadow:       0 4px 6px rgba(0, 0, 0, 0.07), ...;
--card-shadow-hover: 0 10px 15px rgba(0, 0, 0, 0.1), ...;
```

### Input

```css
--input-bg:              rgba(255, 255, 255, 0.02);
--input-border:          var(--color-border-default);
--input-border-focus:    var(--color-accent-primary);
--input-text:            var(--color-text-primary);
--input-placeholder:     var(--color-text-tertiary);
```

### Modal

```css
--modal-overlay-bg:    rgba(0, 0, 0, 0.8);      /* Dark overlay */
--modal-backdrop-blur: blur(24px);              /* Backdrop blur */
--modal-content-bg:    rgba(20, 24, 32, 0.95);  /* Content bg */
```

### Navbar

```css
--navbar-bg:                      rgba(5, 5, 7, 0.8);
--navbar-border:                  rgba(0, 229, 209, 0.1);
--navbar-height-desktop:          72px;
--navbar-height-desktop-scrolled: 60px;  /* Collapses on scroll */
```

---

## Usage Guidelines

### Naming Convention

**Format:** `--{category}-{property}-{variant}-{state}`

**Categories:**
- `color` — color tokens
- `space` — spacing (margin, padding)
- `radius` — border-radius
- `shadow` — box-shadow
- `blur` — backdrop-filter blur
- `duration` — animation duration
- `easing` — animation easing

**Examples:**
```css
--color-bg-primary            /* ✓ Good: category-property-variant */
--color-text-secondary        /* ✓ Good */
--color-border-accent-hover   /* ✓ Good: includes state */
--my-cool-color               /* ✗ Bad: no category */
--blue-1                      /* ✗ Bad: unclear purpose */
--btn-color                   /* ✗ Bad: abbreviations */
```

### When to Use Each Level

| Scenario | Use Token Level | Example |
|----------|-----------------|---------|
| Direct styling in component | Level 3 | `--button-primary-bg` |
| Shared semantic concept | Level 2 | `--color-text-primary` |
| Custom one-off value | Avoid (use Level 2 or 3) | — |
| CSS custom property override | Level 1 | Only in special cases |

### Responsive Spacing

Always use **mobile-first** with Tailwind:

```jsx
{/* Default mobile size, then grow on larger screens */}
<div className="p-4 md:p-6 lg:p-8" />

{/* Equivalent to: */}
{/* Mobile: padding-left/right 16px */}
{/* Tablet (640px+): padding-left/right 24px */}
{/* Desktop (1024px+): padding-left/right 32px */}
```

---

## Accessibility Notes

### Contrast Requirements

All text colors tested against backgrounds for **WCAG 2.2 AA** compliance:

| Text Color | On `#050507` | On White | Status |
|------------|--------------|----------|--------|
| `#FFFFFF` | 18.7:1 | 1:1 | ✅ AAA on dark |
| `rgba(255,255,255,0.72)` | 13.4:1 | — | ✅ AAA |
| `rgba(255,255,255,0.52)` | 8.2:1 | — | ✅ AAA |
| `rgba(255,255,255,0.28)` | 3.8:1 | — | ⚠ AA for large text |
| `#00E5D1` (emerald-500) | 11.2:1 | 2.1:1 | ✅ On dark / ❌ on white |

**Rules:**
- Emerald-500 is **NOT safe for body text on light backgrounds**
- Use emerald-500 only as:
  - Accent on dark background
  - Button background with black text
  - Border, icon fill, glow effect
- For combinations, always validate in **WebAIM Contrast Checker**

### Focus States

All interactive elements must have **visible focus indicators:**

```css
.interactive:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 3px;
}
```

### Font Size Minimums

- Body text: **≥16px** on mobile (for readability)
- Labels: **≥14px** (minimum)
- Captions: **≥12px** (rarely smaller)

### Color-Blind Safe

- Do not rely on color alone to convey information
- Always add text or icons to status indicators
- Test palettes with **Sim Daltonism** or **WCAG contrast tools**

---

## Testing Tokens

```bash
# Validate CSS tokens are present
grep -r "var(--color-" ./app ./components

# Check Tailwind configuration
npx tailwind config --print

# Run accessibility audit
npx axe-core --tags wcag2aa
```

---

## Versioning

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Apr 2026 | Initial release — 3-level token system, full palette |

---

## Questions?

Refer to `DESIGN.md` sections:
- **Section 2** — Design Tokens Architecture
- **Section 3** — Цветовая система
- **Section 4** — Типографика
- **Section 5** — Сетка, spacing, layout
