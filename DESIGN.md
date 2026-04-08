# SNS AI Assist - Design System

## Overview

SNS AI Assist is an AI-powered social media management tool. This document defines the complete design token system used across the application.

**Theme**: Dark Mode  
**Font**: Inter (Google Fonts)  
**Base Unit**: 4px  

---

## Color Tokens

### Primary

| Token                  | Value     | Usage                          |
|------------------------|-----------|--------------------------------|
| `--color-primary-50`   | `#eff6ff` | Lightest tint (rare in dark)   |
| `--color-primary-100`  | `#dbeafe` | Light accent background        |
| `--color-primary-200`  | `#bfdbfe` | Hover highlights               |
| `--color-primary-300`  | `#93c5fd` | Active state text              |
| `--color-primary-400`  | `#60a5fa` | Links, interactive elements    |
| `--color-primary-500`  | `#3b82f6` | Brand accent (main)            |
| `--color-primary-600`  | `#2563eb` | Buttons, CTAs                  |
| `--color-primary-700`  | `#1d4ed8` | Button hover                   |
| `--color-primary-800`  | `#1e40af` | Active / pressed               |
| `--color-primary-900`  | `#1e3a8a` | Darkest brand shade            |

### Extended Palette

| Token                     | Value     | Usage              |
|---------------------------|-----------|--------------------|
| `--color-secondary-400`   | `#a78bfa` | Purple accent      |
| `--color-secondary-500`   | `#8b5cf6` | Purple highlight   |
| `--color-teal-400`        | `#2dd4bf` | Teal accent        |
| `--color-teal-500`        | `#14b8a6` | Teal highlight     |
| `--color-pink-400`        | `#f472b6` | Pink accent        |
| `--color-pink-500`        | `#ec4899` | Pink highlight     |
| `--color-amber-400`       | `#fbbf24` | Amber accent       |
| `--color-amber-500`       | `#f59e0b` | Amber highlight    |

### Status Colors

| Token               | Value     | Usage                      |
|----------------------|-----------|----------------------------|
| `--color-success`    | `#22c55e` | Success states, positive   |
| `--color-warning`    | `#f59e0b` | Warning states, caution    |
| `--color-error`      | `#ef4444` | Error states, destructive  |
| `--color-info`       | `#3b82f6` | Informational              |

### Neutral / Gray Scale

| Token                 | Value     | Usage                       |
|-----------------------|-----------|-----------------------------|
| `--color-gray-50`     | `#f9fafb` | Lightest (rare in dark)     |
| `--color-gray-100`    | `#f3f4f6` | Light surface               |
| `--color-gray-200`    | `#e5e7eb` | Borders (light mode)        |
| `--color-gray-300`    | `#d1d5db` | Disabled text (light)       |
| `--color-gray-400`    | `#9ca3af` | Secondary text              |
| `--color-gray-500`    | `#6b7280` | Muted text, placeholders    |
| `--color-gray-600`    | `#4b5563` | Subtle borders              |
| `--color-gray-700`    | `#374151` | Card borders                |
| `--color-gray-800`    | `#1f2937` | Elevated surfaces           |
| `--color-gray-900`    | `#111827` | Card backgrounds            |
| `--color-gray-950`    | `#0a0a0a` | Page background             |

### Interactive / Surface

| Token                      | Value                    | Usage                   |
|----------------------------|--------------------------|-------------------------|
| `--surface-page`           | `#0a0a0a`                | Page background         |
| `--surface-page-alt`       | `#0f172a`                | Alternate background    |
| `--surface-card`           | `#111827`                | Card background         |
| `--surface-card-hover`     | `#1f2937`                | Card hover background   |
| `--surface-input`          | `#111827`                | Input background        |
| `--border-default`         | `rgba(255,255,255,0.1)`  | Default border          |
| `--border-focus`           | `#3b82f6`                | Focus ring              |
| `--border-error`           | `#ef4444`                | Error border            |

---

## Typography

### Font Family

| Token                    | Value                                   |
|--------------------------|-----------------------------------------|
| `--font-family-primary`  | `'Inter', system-ui, sans-serif`        |
| `--font-family-mono`     | `'JetBrains Mono', monospace`           |

### Font Scale

| Token              | Size      | Weight | Line Height | Usage            |
|--------------------|-----------|--------|-------------|------------------|
| `--text-xs`        | `0.75rem` | 400    | 1rem        | Captions, badges |
| `--text-sm`        | `0.875rem`| 400    | 1.25rem     | Helper text      |
| `--text-base`      | `1rem`    | 400    | 1.5rem      | Body text        |
| `--text-lg`        | `1.125rem`| 500    | 1.75rem     | Subheadings      |
| `--text-xl`        | `1.25rem` | 600    | 1.75rem     | Section titles   |
| `--text-2xl`       | `1.5rem`  | 600    | 2rem        | Card titles      |
| `--text-3xl`       | `1.875rem`| 700    | 2.25rem     | Page headings    |
| `--text-4xl`       | `2.25rem` | 700    | 2.5rem      | Hero title       |
| `--text-5xl`       | `3rem`    | 800    | 1           | Display          |

---

## Spacing

Base unit: **4px**

| Token        | Value   | Pixels |
|--------------|---------|--------|
| `--space-1`  | `0.25rem` | 4px  |
| `--space-2`  | `0.5rem`  | 8px  |
| `--space-3`  | `0.75rem` | 12px |
| `--space-4`  | `1rem`    | 16px |
| `--space-5`  | `1.25rem` | 20px |
| `--space-6`  | `1.5rem`  | 24px |
| `--space-8`  | `2rem`    | 32px |
| `--space-10` | `2.5rem`  | 40px |
| `--space-12` | `3rem`    | 48px |
| `--space-16` | `4rem`    | 64px |
| `--space-20` | `5rem`    | 80px |
| `--space-24` | `6rem`    | 96px |

---

## Border Radius

| Token              | Value    | Usage               |
|--------------------|----------|---------------------|
| `--radius-none`    | `0`      | No rounding         |
| `--radius-sm`      | `2px`    | Subtle rounding     |
| `--radius-default` | `4px`    | Inputs, small items |
| `--radius-md`      | `6px`    | Buttons             |
| `--radius-lg`      | `8px`    | Cards               |
| `--radius-xl`      | `12px`   | Modals, dialogs     |
| `--radius-2xl`     | `16px`   | Large panels        |
| `--radius-full`    | `9999px` | Pills, avatars      |

---

## Shadows / Elevation

| Token             | Value                                             | Usage           |
|-------------------|---------------------------------------------------|-----------------|
| `--shadow-sm`     | `0 1px 2px rgba(0,0,0,0.3)`                      | Subtle depth    |
| `--shadow-md`     | `0 4px 6px rgba(0,0,0,0.3)`                      | Cards, dropdowns|
| `--shadow-lg`     | `0 10px 15px rgba(0,0,0,0.4)`                    | Modals, popovers|
| `--shadow-xl`     | `0 20px 25px rgba(0,0,0,0.5)`                    | Floating panels |
| `--shadow-glow`   | `0 0 20px rgba(59,130,246,0.3)`                   | Focus glow      |

---

## Buttons

### Variants

| Variant     | Background  | Text    | Border                   | Radius |
|-------------|-------------|---------|--------------------------|--------|
| Primary     | `#2563eb`   | `#fff`  | none                     | 6px    |
| Secondary   | transparent | `#9ca3af`| `rgba(255,255,255,0.1)` | 6px    |
| Ghost       | transparent | `#9ca3af`| none                    | 6px    |
| Danger      | `#ef4444`   | `#fff`  | none                     | 6px    |

### States

| State    | Primary Change      | Secondary Change        |
|----------|---------------------|-------------------------|
| Hover    | bg `#1d4ed8`        | bg `rgba(255,255,255,0.05)` |
| Active   | bg `#1e40af`        | bg `rgba(255,255,255,0.1)`  |
| Focus    | ring `#3b82f6` 2px  | ring `#3b82f6` 2px         |
| Disabled | opacity `0.5`       | opacity `0.5`              |

### Sizes

| Size   | Padding          | Font Size  | Height |
|--------|------------------|------------|--------|
| Small  | `6px 12px`       | 0.875rem   | 32px   |
| Medium | `8px 16px`       | 1rem       | 40px   |
| Large  | `12px 24px`      | 1.125rem   | 48px   |

---

## Form Elements

### Input

| Property     | Default                  | Focus                | Error                |
|-------------|--------------------------|----------------------|----------------------|
| Background  | `#111827`                | `#111827`            | `#111827`            |
| Border      | `rgba(255,255,255,0.1)` | `#3b82f6`            | `#ef4444`            |
| Text        | `#ffffff`                | `#ffffff`            | `#ffffff`            |
| Placeholder | `#6b7280`                | `#6b7280`            | `#6b7280`            |
| Shadow      | none                     | `0 0 0 3px rgba(59,130,246,0.2)` | `0 0 0 3px rgba(239,68,68,0.2)` |
| Radius      | `4px`                    | `4px`                | `4px`                |
| Padding     | `10px 14px`              | `10px 14px`          | `10px 14px`          |

---

## Cards

| Property     | Value                    |
|-------------|--------------------------|
| Background  | `#111827`                |
| Border      | `rgba(255,255,255,0.1)` |
| Radius      | `8px`                    |
| Shadow      | `0 4px 6px rgba(0,0,0,0.3)` |
| Padding     | `24px`                   |
| Hover Shadow| `0 10px 15px rgba(0,0,0,0.4)` |

---

## Transitions

| Token                  | Value      | Usage              |
|------------------------|------------|--------------------|
| `--transition-fast`    | `150ms`    | Hover states       |
| `--transition-normal`  | `300ms`    | Transforms, fades  |
| `--transition-slow`    | `500ms`    | Page transitions   |

---

## Breakpoints

| Name    | Min Width | Container Max |
|---------|-----------|---------------|
| `sm`    | `640px`   | `640px`       |
| `md`    | `768px`   | `768px`       |
| `lg`    | `1024px`  | `1024px`      |
| `xl`    | `1280px`  | `1280px`      |

---

## File References

- **Preview (Dark)**: `preview-dark.html` - Standalone HTML design system preview
- **Source**: Built with Next.js + Tailwind CSS
