# ShiftAI / LevelShift — Design Skills

**Version**: 1.0  
**Last updated**: 2026-06-04  
**Stack**: Next.js · Tailwind CSS · Framer Motion · lucide-react  
**Theme**: Dark-first, light-mode supported via `[data-theme="light"]`

---

## Table of Contents

1. [Color System](#1-color-system)
2. [Typography](#2-typography)
3. [Spacing & Layout](#3-spacing--layout)
4. [Borders & Radius](#4-borders--radius)
5. [Shadows & Elevation](#5-shadows--elevation)
6. [Buttons](#6-buttons)
7. [Cards & Surfaces](#7-cards--surfaces)
8. [Form Elements](#8-form-elements)
9. [Badges & Status Indicators](#9-badges--status-indicators)
10. [Icons](#10-icons)
11. [Animations & Motion](#11-animations--motion)
12. [Components](#12-components)
13. [Responsive Design](#13-responsive-design)
14. [Theme System](#14-theme-system)
15. [Scrollbar](#15-scrollbar)
16. [Print / PDF Styles](#16-print--pdf-styles)
17. [Accessibility](#17-accessibility)

---

## 1. Color System

### 1.1 Brand Palette

| Name | Value | Usage |
|------|-------|-------|
| `ls-blue` | `#4a6fb9` | Primary CTA, links, accents, focus rings |
| `ls-blue-dark` | `#006FA6` | Gradient end, dark hover |
| `ls-blue-light` | `#007DB8` | Light-mode primary |
| `ls-teal` | `#4a6fb9` | Success, completion, checks, secondary accent |

### 1.2 CSS Variables — Dark Mode (`:root` default)

```css
:root {
  /* New token set (preferred) */
  --bg:       #0B0B0E;   /* Page background */
  --surface:  #1C1C1E;   /* Card / panel background */
  --border:   #3A3A3C;   /* Default border */
  --tx:       #F1F1F3;   /* Primary text */
  --mu:       #8E8E93;   /* Secondary / muted text */
  --dm:       #3A3A3C;   /* Divider, subtle lines */

  /* Legacy token set (used by existing pages — do not rename) */
  --c-bg:    #0a0c0f;
  --c-sf:    #111418;
  --c-sf2:   #171b21;
  --c-sf3:   #1e232b;
  --c-b:     rgba(255,255,255,0.07);
  --c-b2:    rgba(255,255,255,0.13);
  --c-tx:    #e8eaed;
  --c-mu:    #6b7280;
  --c-dm:    #3d4450;

  /* Accent */
  --c-ac:    #4a6fb9;
  --c-acBg:  rgba(0,154,218,0.08);
  --c-acBd:  rgba(0,154,218,0.25);

  /* Status */
  --c-gr:    #22c55e;   --c-grBg: rgba(34,197,94,0.10);   --c-grBd: rgba(34,197,94,0.30);
  --c-am:    #F59E0B;   --c-amBg: rgba(245,158,11,0.10);  --c-amBd: rgba(245,158,11,0.30);
  --c-rd:    #EF4444;   --c-rdBg: rgba(239,68,68,0.10);   --c-rdBd: rgba(239,68,68,0.30);
  --c-pu:    #a78bfa;   --c-puBg: rgba(167,139,250,0.10); --c-puBd: rgba(167,139,250,0.30);
}
```

### 1.3 CSS Variables — Light Mode (`[data-theme="light"]`)

```css
[data-theme="light"] {
  --bg:       #F3F1EC;
  --surface:  #FFFFFF;
  --border:   #D5D0C8;
  --tx:       #18181A;
  --mu:       #3D3D44;
  --dm:       #D5D0C8;

  --c-bg:    #f8f6f1;
  --c-sf:    #ffffff;
  --c-sf2:   #f3f0ea;
  --c-sf3:   #ebe7de;
  --c-b:     rgba(0,0,0,0.08);
  --c-b2:    rgba(0,0,0,0.14);
  --c-tx:    #18181a;
  --c-mu:    #9ca3af;
  --c-dm:    #d1d5db;

  --c-ac:    #007DB8;
  --c-acBg:  rgba(0,125,184,0.07);
  --c-acBd:  rgba(0,125,184,0.25);

  --c-gr:    #10B981;   --c-grBg: #D1FAE5;  --c-grBd: rgba(16,185,129,0.35);
  --c-am:    #F59E0B;   --c-amBg: #FEF3C7;  --c-amBd: rgba(245,158,11,0.35);
  --c-rd:    #EF4444;   --c-rdBg: #FEE2E2;  --c-rdBd: rgba(239,68,68,0.35);
  --c-pu:    #8B5CF6;   --c-puBg: #EDE9FE;  --c-puBd: rgba(139,92,246,0.35);
}
```

### 1.4 Status Colors at a Glance

| State | Text | Background | Border |
|-------|------|------------|--------|
| Success | `#22c55e` / `#10B981` | 10% opacity / `#D1FAE5` | 30% / 35% |
| Warning | `#F59E0B` | 10% opacity / `#FEF3C7` | 30% / 35% |
| Error | `#EF4444` | 10% opacity / `#FEE2E2` | 30% / 35% |
| Info / Purple | `#a78bfa` / `#8B5CF6` | 10% opacity / `#EDE9FE` | 30% / 35% |
| Primary | `#4a6fb9` / `#007DB8` | 8% opacity | 25% |

### 1.5 Process Category Colors

| Process | Color |
|---------|-------|
| Lead-to-Cash | `#4a6fb9` |
| Hire-to-Retire | `#A78BFA` |
| Procure-to-Pay | `#4a6fb9` |
| Order-to-Cash | `#60A5FA` |
| Record-to-Report | `#34D399` |
| Issue-to-Resolution | `#F87171` |

---

## 2. Typography

### 2.1 Font Families

```js
// tailwind.config.js
fontFamily: {
  sans:  ['Inter', 'IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  mono:  ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
}
```

- **sans** — Default body, UI elements, forms, labels
- **serif** — Display headings, hero text, chat message bubbles, assistant responses
- **mono** — Section labels (UPPERCASE), code snippets, technical tags, badges

### 2.2 Type Scale

| Token | Size | Primary Use |
|-------|------|-------------|
| `text-[8px]` | 8px | AI badge labels, micro indicators |
| `text-[9px]` | 9px | Badge text, small chip labels |
| `text-[10px]` | 10px | Form labels (mono, uppercase), section headers |
| `text-[11px]` | 11px | Ghost button text, small mono text |
| `text-[13px]` | 13px | Standard body copy, descriptions |
| `text-xs` | 12px | Secondary text, helper copy |
| `text-sm` | 14px | Card content, navigation, general UI |
| `text-base` | 16px | Input fields, primary readable content |
| `text-xl` | 20px | Section headers |
| `text-2xl` | 24px | Card titles, subheadings |
| `text-[30px]` | 30px | Page headings (mobile) |
| `text-[44px]` | 44px | Hero headings (desktop) |

### 2.3 Font Weights

| Class | Usage |
|-------|-------|
| `font-normal` | Serif headings, body |
| `font-medium` | Emphasis, UI labels |
| `font-semibold` | Button text, strong emphasis |
| `font-bold` | Badge text, status indicators |

### 2.4 Heading Hierarchy

```
H1 (Hero)     — font-serif · 30–44px · font-normal · leading-tight
H2 (Section)  — font-serif · 24–30px · font-normal · tracking-tight
H3 (Sub)      — font-serif · 20–24px · font-normal
Section Label — font-mono  · 9–10px  · font-bold   · uppercase · tracking-[0.08em]–[0.12em]
```

### 2.5 Line Heights & Tracking

| Context | Value |
|---------|-------|
| Hero headings | `leading-tight` |
| Body / cards | `leading-[1.5]` |
| Chat bubbles (user) | `leading-relaxed` |
| Assistant text | `leading-[1.75]` |
| Section labels (mono) | `tracking-[0.08em]` to `tracking-[0.12em]` |
| Button labels | No extra tracking |

---

## 3. Spacing & Layout

### 3.1 Core Spacing Scale (Tailwind units · 4px base)

| Shorthand | px | Primary Use |
|-----------|-----|-------------|
| `0.5` | 2px | Inline gap, badge padding |
| `1` | 4px | Tight inline items |
| `1.5` | 6px | Badge/chip padding (`px-1.5`) |
| `2` | 8px | Compact button padding |
| `2.5` | 10px | Input vertical padding |
| `3` | 12px | Button horizontal padding |
| `4` | 16px | Card padding, standard gap |
| `5` | 20px | Card body padding |
| `6` | 24px | Section vertical padding |
| `8` | 32px | Large section gaps |

### 3.2 Padding Patterns by Context

| Context | Pattern |
|---------|---------|
| Badge / pill | `px-2 py-0.5` · `px-2.5 py-1` |
| Icon button | `p-1.5` · `p-2` |
| Ghost button | `px-3 py-2` · `px-4 py-2.5` |
| Primary button | `px-4 py-2.5` · `py-3` |
| Card body | `p-4` · `p-5` |
| Card header | `px-5 py-4` |
| Form input | `px-3 py-2` · `px-4 py-3` |
| Page section | `px-3 sm:px-4 py-6 sm:py-8` |
| Header bar | `px-4 md:px-6 py-2.5` |

### 3.3 Gap & Spacing Patterns

| Context | Classes |
|---------|---------|
| Inline items | `gap-1.5` · `gap-2` · `space-x-1.5` · `space-x-2` |
| Button groups | `gap-2` · `gap-3` |
| Card elements | `gap-3` · `gap-4` |
| Section blocks | `gap-6` · `gap-8` |
| Form fields | `space-y-3` · `space-y-4` |
| Chat messages | `space-y-4 pb-2` |

### 3.4 Max-Width Containers

| Class | Width | Use |
|-------|-------|-----|
| `max-w-xs` | 320px | Narrow inputs, small panels |
| `max-w-sm` | 384px | Small cards |
| `max-w-2xl` | 672px | Narrow content sections |
| `max-w-3xl` | 768px | Default content area, chat |
| `max-w-4xl` | 896px | Wide content |
| `max-w-5xl` | 1024px | Extra wide, dashboard panels |

Always pair with `mx-auto` for centering.

### 3.5 Flex Patterns

```jsx
flex items-center justify-between   // Header layout
flex items-center gap-2             // Inline items with icon
flex flex-col gap-4                 // Vertical stacking
flex flex-wrap gap-2                // Wrapping badges/chips
flex-1                              // Grow to fill
flex items-center space-x-3        // Horizontal grouping
flex flex-col sm:flex-row           // Responsive direction
```

### 3.6 Grid Patterns

```jsx
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   // Responsive 3-col
grid grid-cols-1 lg:grid-cols-2                   // Responsive 2-col
```

---

## 4. Borders & Radius

### 4.1 Border Radius Scale

| Class | px | Use |
|-------|----|-----|
| `rounded-sm` / `rounded-[3px]` | 3px | Minimal (legacy badges) |
| `rounded` / `rounded-[4px]` | 4px | Small chips, input focus ring |
| `rounded-[5px]` | 5px | Form inputs |
| `rounded-lg` / `rounded-[8px]` | 8px | Buttons, panels, dropdowns |
| `rounded-xl` / `rounded-[12px]` | 12px | Action buttons |
| `rounded-2xl` / `rounded-[16px]` | 16px | Cards, panels (primary surface) |
| `rounded-[20px]` | 20px | Step pills, process badges |
| `rounded-full` | 9999px | Circular avatars, pill badges |

### 4.2 Border Colors & Widths

```jsx
// Standard border
border border-[#3A3A3C]                  // dark
border border-[#D5D0C8]                  // light
border border-[var(--border)]            // via variable

// Accent borders
border-[#4a6fb9]/20
border-[#4a6fb9]/30
border-[#4a6fb9]/40

// Dividers
border-b border-[var(--border)]
border-t border-[var(--border)]

// Width
border       // 1px
border-[1px] // explicit 1px
```

---

## 5. Shadows & Elevation

### 5.1 Shadow Scale

| Class | Use |
|-------|-----|
| `shadow-sm` | Subtle hover state, icon buttons |
| `shadow-md` | Medium elevation, standard buttons |
| `shadow-lg` | Cards in focus, dropdowns |
| `shadow-xl` | Modals, popovers, overlays |

### 5.2 Colored Shadows (Brand)

```jsx
shadow-md shadow-[#4a6fb9]/25        // Primary button
shadow-lg shadow-[#4a6fb9]/15        // Gradient button hover
shadow-black/10                      // Subtle dark on light bg
```

### 5.3 Glow Effects

```jsx
// Neon status glow
shadow-[0_0_8px_rgba(48,213,200,0.6)]   // Teal glow (active state)
shadow-[0_0_8px_rgba(0,154,218,0.4)]    // Blue glow (primary active)
```

---

## 6. Buttons

### 6.1 Primary Button

```jsx
// Gradient CTA
<button className="
  w-full flex items-center justify-center gap-2
  bg-gradient-to-tr from-[#4a6fb9] to-[#006FA6]
  text-white text-sm font-semibold
  px-4 py-2.5 rounded-xl
  shadow-lg shadow-[#4a6fb9]/15
  hover:scale-[1.01] hover:shadow-[#4a6fb9]/25
  active:scale-[0.98]
  transition-all duration-200
  disabled:opacity-35 disabled:cursor-not-allowed disabled:scale-100
">
```

**States:**
- Default: Gradient visible, pointer cursor
- Hover: `scale(1.01)`, stronger shadow
- Active/Press: `scale(0.98)`
- Disabled: `opacity-35`, `cursor-not-allowed`, no scale

### 6.2 Ghost / Secondary Button

```jsx
<button className="
  flex items-center justify-center gap-1.5
  bg-transparent
  border border-[#3A3A3C]
  text-[#8E8E93] text-xs font-semibold
  px-3 py-2 rounded-lg
  hover:border-[#4a6fb9]/40 hover:text-[#4a6fb9]
  transition-colors duration-200
">
```

**Light mode override:** `border-[#D5D0C8] text-[#3D3D44]`

### 6.3 Icon Button (Compact)

```jsx
<button className="
  w-[30px] h-[30px] flex items-center justify-center
  border border-[#3A3A3C] rounded-lg
  text-[#8E8E93]
  hover:border-[#4a6fb9]/40 hover:text-[#4a6fb9]
  transition-colors duration-200
">
  <Icon size={14} />
</button>
```

### 6.4 Button Size Reference

| Variant | Height | Padding | Font | Radius |
|---------|--------|---------|------|--------|
| Primary | ~42px | `py-2.5 px-4` | `text-sm font-semibold` | `rounded-xl` |
| Ghost | ~36px | `py-2 px-3` | `text-xs font-semibold` | `rounded-lg` |
| Icon | 30px | `p-1.5`–`p-2` | — | `rounded-lg` |
| Large CTA | ~48px | `py-3 px-6` | `text-sm font-semibold` | `rounded-xl` |

---

## 7. Cards & Surfaces

### 7.1 Standard Card

```jsx
<div className="
  bg-[#1C1C1E] dark: bg-[var(--surface)]
  border border-[#3A3A3C]
  rounded-2xl
  p-4 md:p-5
  transition-colors duration-300
">
```

Light: `bg-white border-[#D5D0C8]`

### 7.2 Card with Header/Body Structure

```jsx
<div className="rounded-2xl border border-[#3A3A3C] overflow-hidden">
  {/* Header */}
  <div className="px-5 py-4 border-b border-[#3A3A3C] flex items-center justify-between">
    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#8E8E93]">
      Section Title
    </span>
    {/* Action buttons */}
  </div>
  {/* Body */}
  <div className="p-5">
    {/* Content */}
  </div>
</div>
```

### 7.3 Surface Hierarchy

| Level | Variable | Dark Value | Light Value |
|-------|----------|------------|-------------|
| Page background | `--bg` / `--c-bg` | `#0B0B0E` | `#F3F1EC` |
| Card / panel | `--surface` / `--c-sf` | `#1C1C1E` | `#FFFFFF` |
| Surface secondary | `--c-sf2` | `#171b21` | `#f3f0ea` |
| Surface tertiary | `--c-sf3` | `#1e232b` | `#ebe7de` |

### 7.4 Header Bar

```jsx
<header className="
  sticky top-0 z-40
  bg-[var(--bg)]
  border-b border-[var(--border)]
  px-4 md:px-6 py-2.5
  flex items-center justify-between
">
```

### 7.5 Content Area (Page Body)

```jsx
<main className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-6">
```

---

## 8. Form Elements

### 8.1 Input

```css
.form-input {
  width: 100%;
  padding: 10px 14px;
  background: var(--c-sf2);
  border: 1px solid var(--c-b);
  border-radius: 5px;
  font-size: 13px;
  font-family: var(--font-sans);
  color: var(--c-tx);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.form-input::placeholder { color: var(--c-dm); }
.form-input:focus {
  border-color: var(--c-ac);
  box-shadow: 0 0 0 3px var(--c-acBg);
}
.form-input:disabled { opacity: 0.5; cursor: not-allowed; }
```

### 8.2 Select

```css
.form-select-wrap { position: relative; }
.form-select-wrap::after {
  content: '▾';
  position: absolute;
  right: 10px; top: 50%;
  transform: translateY(-50%);
  color: var(--c-dm);
  pointer-events: none;
  font-size: 11px;
}
.form-select {
  appearance: none;
  /* Inherits .form-input styles */
  padding-right: 28px;
  cursor: pointer;
}
```

### 8.3 Textarea

```css
.form-textarea {
  /* Inherits .form-input */
  min-height: 80px;
  resize: vertical;
  line-height: 1.5;
}
```

### 8.4 Label

```css
.form-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--c-mu);
  margin-bottom: 6px;
}
```

### 8.5 Form Group

```jsx
<div className="space-y-3">
  <div>
    <label className="form-label">Field Name</label>
    <input className="form-input" />
  </div>
</div>
```

---

## 9. Badges & Status Indicators

### 9.1 Pill / Badge Base

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  border: 1px solid;
  white-space: nowrap;
}
```

### 9.2 Pill Variants

```css
.pill-green  { background: var(--c-grBg); color: var(--c-gr); border-color: var(--c-grBd); }
.pill-amber  { background: var(--c-amBg); color: var(--c-am); border-color: var(--c-amBd); }
.pill-red    { background: var(--c-rdBg); color: var(--c-rd); border-color: var(--c-rdBd); }
.pill-blue   { background: var(--c-acBg); color: var(--c-ac); border-color: var(--c-acBd); }
.pill-purple { background: var(--c-puBg); color: var(--c-pu); border-color: var(--c-puBd); }
```

### 9.3 Step Flow Pills

```jsx
// Active step
<span className="px-3 py-1 rounded-[20px] bg-[#4a6fb9] text-black text-[10px] font-bold tracking-[0.06em]">
  Step Name
</span>

// Completed step
<span className="px-3 py-1 rounded-[20px] bg-[#4a6fb9]/20 border border-[#4a6fb9]/30 text-[#4a6fb9] text-[10px] font-bold">
  <Check size={9} className="inline mr-1" />Step Name
</span>

// Future step
<span className="px-3 py-1 rounded-[20px] bg-[#3A3A3C]/30 text-[#8E8E93] text-[10px]">
  Step Name
</span>
```

### 9.4 AI Badge

```jsx
<span className="
  inline-block
  bg-[#4a6fb9] text-black
  text-[8px] font-bold
  px-[4px] py-[1px] rounded-[2px]
  tracking-[0.04em]
  uppercase
">
  AI
</span>
```

### 9.5 Info/Alert Banners

```css
.banner-error   { background: var(--c-rdBg); border: 1px solid var(--c-rdBd); color: var(--c-rd);
                  padding: 10px 14px; border-radius: 5px; font-size: 13px; }
.banner-info    { background: var(--c-acBg); border: 1px solid var(--c-acBd); color: var(--c-ac); }
.banner-success { background: var(--c-grBg); border: 1px solid var(--c-grBd); color: var(--c-gr); }
.banner-warning { background: var(--c-amBg); border: 1px solid var(--c-amBd); color: var(--c-am); }
```

---

## 10. Icons

### 10.1 Library

**`lucide-react`** — sole icon library. No other icon packages.

```bash
import { IconName } from 'lucide-react';
<IconName size={16} className="text-[var(--c-mu)]" />
```

### 10.2 Icon Size Reference

| Size | px | Use |
|------|----|-----|
| `size={9}` | 9 | Badge inline icon |
| `size={11}` | 11 | Tiny status dot |
| `size={12}` | 12 | Dense UI, small labels |
| `size={14}` | 14 | Icon buttons, inline body |
| `size={15}` | 15 | Standard inline |
| `size={16}` | 16 | Default button icon |
| `size={18}` | 18 | Action icon |
| `size={20}` | 20 | Section header icon |
| `size={24}` | 24 | Large action, nav icon |

### 10.3 Commonly Used Icons

```
Navigation    ArrowRight  ArrowLeft  ChevronRight  ChevronDown  ExternalLink
Status        Check  CheckCircle  AlertCircle  AlertTriangle  Circle  X
Business      Building2  Database  BarChart2  BarChart3  TrendingUp  TrendingDown  Minus
Files/Docs    FileText  Upload  Download  Link2  ClipboardList
Actions       Plus  RefreshCw  Loader  Bot
Tech/Process  Shield  Zap  Map  GitCompare  Activity  Radio  Wrench  Cpu
              Terminal  PlugZap  Wifi  Lightbulb  UserCheck
Theme         Moon  Sun
```

### 10.4 Icon Color Patterns

```jsx
// Static muted
className="text-[#8E8E93]"

// Theme-aware primary
className={isDark ? 'text-[#4a6fb9]' : 'text-[#007DB8]'}

// Status colors
className="text-[#4a6fb9]"   // success / teal
className="text-[#F59E0B]"   // warning / amber
className="text-[#EF4444]"   // error / red
className="text-[#a78bfa]"   // info / purple

// Inherits parent text color
className="text-current"
```

---

## 11. Animations & Motion

### 11.1 Framer Motion Variants (`src/lib/animations.js`)

```js
fadeUp: {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } }
}

fadeIn: {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
}

staggerContainer: {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } }
}

slideInRight: {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
}

slideInLeft: {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
}
```

### 11.2 Motion Component Patterns

```jsx
// Entry animation
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.1 }}
>

// Hover / press
<motion.button
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.98 }}
>

// Staggered list
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={fadeUp} />
  ))}
</motion.div>
```

### 11.3 CSS Keyframe Animations

| Name | Effect | Duration |
|------|--------|----------|
| `heartbeatPulse` | Scale 1→1.2 + opacity pulse | 1.5s infinite |
| `cursorBlink` | Opacity blink | 1s step-end |
| `fadeInUp` | Opacity + 10px Y → 0 | custom ease |
| `slideDown` | -6px Y → 0 | 0.25s ease-out |
| `fadeInRight` | 16px X → 0 + opacity | 0.35s ease |
| `shimmer` | Background position scan | 1.6s ease-in-out |
| `spin` | 360deg | 0.8s linear |
| `pulseOpacity` | Opacity 1→0.35→1 | 2s–3s |
| `pulsePing` | Scale 2x + fade | 1s infinite |

### 11.4 Tailwind Animation Classes

```
animate-heartbeat-glow    Pulsing glow effect on status indicators
animate-cursor-blink      Blinking text cursor
animate-fade-in-up        Page/section entry
animate-slide-down        Dropdown open
animate-fade-in-right     Side panel slide in
animate-spin              Loading spinner
animate-pulse             Skeleton / loading opacity
animate-pulse-slow        3s slower pulse (less urgent)
animate-ping              Growing ping dot (live indicators)
animate-shimmer           Skeleton loading gradient
```

### 11.5 Stagger Children CSS

```css
.stagger-children > *:nth-child(1) { animation-delay: 0.04s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.08s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.12s; }
/* ... up to nth-child(8) at 0.32s */
```

### 11.6 Transition Utilities

| Class | Use |
|-------|-----|
| `transition-colors` | Color/border changes |
| `transition-all` | General micro-interactions |
| `transition-transform` | Scale/rotate |
| `duration-200` | Instant feel (hover) |
| `duration-300` | Standard (most transitions) |
| `duration-500` | Deliberate (panel opens) |
| `duration-700` | Slow (loading states) |
| `ease-out` | Standard easing |

---

## 12. Components

### 12.1 Tech Chip (Selection State)

```css
.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid var(--c-b);
  color: var(--c-tx);
  background: var(--c-sf);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
  user-select: none;
}
.tech-chip:hover {
  border-color: var(--c-ac);
  color: var(--c-ac);
  background: var(--c-acBg);
}
.tech-chip-selected {
  background: var(--c-ac);
  border-color: var(--c-ac);
  color: #fff;
}
.tech-chip-none            { border-style: dashed; }
.tech-chip-none.tech-chip-selected {
  background: var(--c-sf3);
  border-style: solid;
  color: var(--c-mu);
}
```

### 12.2 Progress Bar

```jsx
{/* Track */}
<div className="h-[3px] rounded-[2px] bg-[var(--c-sf3)] overflow-hidden">
  {/* Fill */}
  <div
    className="h-full rounded-[2px] bg-[var(--c-ac)] transition-[width] duration-500 ease-out"
    style={{ width: `${progress}%` }}
  />
</div>
```

Green variant: replace `bg-[var(--c-ac)]` with `bg-[var(--c-gr)]`

### 12.3 Step Flow Visualization

```jsx
<div className="flex items-center gap-0">
  {steps.map((step, i) => (
    <>
      <span key={step.id} className={stepPillClass(step.state)}>
        {step.state === 'done' && <Check size={9} />}
        {step.label}
      </span>
      {i < steps.length - 1 && (
        <div className={`w-5 h-[1px] ${step.state === 'done' ? 'bg-[#4a6fb9]/50' : 'bg-[#3A3A3C]'}`} />
      )}
    </>
  ))}
</div>
```

### 12.4 Chat Message Bubbles

```jsx
{/* User bubble */}
<div className="flex justify-end">
  <div className="
    max-w-[80%]
    bg-[var(--c-acBg)] border border-[var(--c-acBd)]
    text-[var(--c-tx)]
    px-4 py-3 rounded-2xl rounded-tr-sm
    font-serif text-[15px] leading-relaxed
  ">
    {message}
  </div>
</div>

{/* Assistant bubble */}
<div className="flex gap-3 items-start">
  {/* Avatar */}
  <div className="
    w-7 h-7 rounded-full flex-shrink-0
    bg-gradient-to-br from-[#4a6fb9] to-[#006FA6]
    flex items-center justify-center
    text-white text-[10px] font-bold
  ">
    AI
  </div>
  {/* Content */}
  <div className="font-serif text-[15px] leading-[1.75] text-[var(--c-tx)]">
    {message}
  </div>
</div>
```

### 12.5 Scrollable Container

```jsx
<div className="
  overflow-y-auto
  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#3A3A3C]
  hover:scrollbar-thumb-[#8E8E93]
">
```

### 12.6 Shimmer / Skeleton Loader

```css
.skeleton {
  background: linear-gradient(90deg,
    var(--c-sf) 0%,
    var(--c-sf2) 50%,
    var(--c-sf) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: 4px;
}
```

---

## 13. Responsive Design

### 13.1 Breakpoints

| Prefix | Min-width | Description |
|--------|-----------|-------------|
| (none) | 0px | Mobile-first base |
| `sm:` | 640px | Small tablets and up |
| `md:` | 768px | Medium — padding/heading adjustments |
| `lg:` | 1024px | Large — 2 or 3 column grids |
| `xl:` | 1280px | Extra large — wide content areas |

### 13.2 Common Responsive Patterns

```jsx
// Padding scales up
px-3 sm:px-4 md:px-6

// Heading scales up
text-[30px] md:text-[44px]

// Column layout
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

// Flex direction flips
flex flex-col sm:flex-row

// Hide/show
hidden sm:block        // hidden on mobile, shown on tablet+
block sm:hidden        // shown on mobile only

// Vertical padding
py-6 sm:py-8
```

### 13.3 Mobile Principles

- Single column layouts at base
- All buttons full-width or min-touch-target `h-10`
- Text never smaller than `text-xs` (12px) on mobile
- Cards stack vertically; no horizontal scroll
- Header collapses to icon-only on small screens

---

## 14. Theme System

### 14.1 Architecture

- **Default**: Dark mode
- **Storage key**: `localStorage['ls-theme']` or `localStorage['demo-theme']`
- **HTML hook**: `document.documentElement.setAttribute('data-theme', theme)`
- **CSS selector**: `:root` = dark · `[data-theme="light"]` = light
- **Context**: `ThemeProvider` in `src/lib/theme.js`
- **Hook**: `const { isDark, toggle } = useTheme()`

### 14.2 Theme-Aware Class Pattern

```jsx
// Option A — conditional classes
className={isDark ? 'bg-[#1C1C1E] text-[#F1F1F3]' : 'bg-white text-[#18181A]'}

// Option B — CSS variable (preferred for complex components)
style={{ background: 'var(--surface)', color: 'var(--tx)' }}

// Option C — Tailwind arbitrary variable
className="bg-[var(--surface)] text-[var(--tx)]"
```

### 14.3 Selection & Focus Ring

```css
::selection {
  background-color: #4a6fb9;
  color: #000000;
}

:focus-visible {
  outline: 2px solid #4a6fb9;
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## 15. Scrollbar

```css
/* Webkit */
::-webkit-scrollbar       { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: #3A3A3C;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover { background: var(--mu); }
```

---

## 16. Print / PDF Styles

```css
@media print {
  .no-print   { display: none !important; }
  .print-only { display: block !important; }
  body        { background: #fff; color: #000; }
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
.print-only { display: none; }  /* hidden by default in browser */
```

---

## 17. Accessibility

### 17.1 Focus States

- Keyboard-only focus ring: `outline: 2px solid #4a6fb9` with `outline-offset: 2px`
- Mouse clicks do not trigger focus ring (`:focus-visible` not `:focus`)
- Custom inputs use `border-color + box-shadow` focus instead of outline

### 17.2 Semantic HTML

- Proper heading hierarchy: `h1 → h2 → h3` — never skip levels
- Form `<label>` always associated with its `<input>` via `htmlFor` / `id`
- Icon-only buttons: include `aria-label`
- Loading states: `aria-live="polite"` on status regions

### 17.3 Color Contrast

- Primary text on dark bg: `#F1F1F3` on `#0B0B0E` — passes WCAG AA
- Primary text on light bg: `#18181A` on `#F3F1EC` — passes WCAG AA
- Muted text (`#8E8E93`) used only for secondary / decorative content, not critical info
- Interactive elements always have a visible non-color indicator (border, underline, or icon)

---

## Quick Reference — Design Tokens Cheat Sheet

```
BRAND PRIMARY    #4a6fb9  (dark-mode)  |  #007DB8  (light-mode)
BRAND SECONDARY  #4a6fb9  (teal)
BRAND GRADIENT   from-[#4a6fb9] to-[#006FA6]  (top-right)

BG               #0B0B0E  |  #F3F1EC
SURFACE          #1C1C1E  |  #FFFFFF
BORDER           #3A3A3C  |  #D5D0C8
TEXT             #F1F1F3  |  #18181A
MUTED            #8E8E93  |  #3D3D44

FONT SANS        Inter
FONT SERIF       Cormorant Garamond
FONT MONO        JetBrains Mono

BASE FONT SIZE   14px
BASE LINE HEIGHT 1.5

CARD RADIUS      rounded-2xl  (16px)
BUTTON RADIUS    rounded-xl   (12px)
INPUT RADIUS     5px
BADGE RADIUS     rounded-full / rounded-[20px] / rounded-[3px]

ICON LIBRARY     lucide-react
ICON DEFAULT     size={16}

ANIMATION        framer-motion · custom CSS keyframes
EASING           cubic-bezier(0.22, 1, 0.36, 1)
DURATION SHORT   200ms
DURATION DEFAULT 300ms
DURATION LONG    500ms
```
