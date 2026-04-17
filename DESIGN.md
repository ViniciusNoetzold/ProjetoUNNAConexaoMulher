# Design System Document: The Editorial Sanctuary

## 1. Overview & Creative North Star
This design system is built upon the "Creative North Star" of **The Editorial Sanctuary**. We are moving away from the rigid, boxy constraints of standard application design and toward the fluid, intentional layouts of high-end fashion and lifestyle periodicals. 

The goal is to empower the user through a digital environment that feels curated, intimate, and sophisticated. We achieve this by breaking the traditional "template" look. We favor intentional asymmetry—where white space is as important as content—and use a high-contrast typography scale to create a clear, authoritative, yet feminine voice. Elements should feel like they are "placed" on fine paper rather than "rendered" on a screen.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated range of deep reds and soft blushes, designed to create warmth and depth without overwhelming the user.

### The "No-Line" Rule
To maintain an editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. Use the hierarchy of surfaces to separate content:
- Use `surface` (#fff8f7) for the main canvas.
- Use `surface_container_low` (#fff0f1) for secondary sections.
- Content groupings should feel "carved out" of the background rather than boxed in.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of stacked material. Use the surface-container tiers to create depth:
- **Level 0 (Base):** `surface`
- **Level 1 (Sectioning):** `surface_container`
- **Level 2 (Interaction/Cards):** `surface_container_highest` or `surface_container_lowest` for high-contrast "lift."

### Glass & Gradient
To elevate the experience beyond flat design, utilize the **Signature Gradient**: `linear-gradient(135deg, #f7e8ed, #e7b8c6, #ffffff)`. This should be used for Hero sections and primary call-to-action areas. For floating elements, apply **Glassmorphism**: use semi-transparent `surface_bright` with a `backdrop-blur` (12px–20px) to allow background tones to bleed through softly.

---

## 3. Typography
The typographic soul of the system lies in the tension between the high-impact `notoSerif` and the legible, classic `newsreader`.

*   **Display (notoSerif):** Reserved for moments of inspiration and key headings. `display-lg` (3.5rem) should be used with tight letter-spacing to feel like a magazine cover.
*   **Headline (notoSerif):** Used for section starts. These should always have generous top-margin to breathe.
*   **Body & Title (newsreader):** Provides a literary, trustworthy feel. `body-lg` (1rem) is the standard for long-form content to ensure an effortless reading experience.
*   **Labels (manrope):** Use this clean sans-serif sparingly for utility—metadata, captions, or small button text—to provide a modern counterpoint to the serifs.

---

## 4. Elevation & Depth
In this design system, elevation is conveyed through **Tonal Layering** rather than traditional structural lines.

- **The Layering Principle:** Depth is achieved by "stacking." Place a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#fff0f1) background. This creates a natural, soft lift.
- **Ambient Shadows:** When a floating effect is necessary (e.g., a primary Modal or Fab), shadows must be extra-diffused. 
    - **Blur:** 24px–40px. 
    - **Opacity:** 4%–8%. 
    - **Color:** Use a tinted version of `on_surface` (#3e0215) instead of pure black to keep the shadows "warm."
- **The Ghost Border:** If a border is required for accessibility, it must be a "Ghost Border": use the `outline_variant` token at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons
- **Primary:** Uses the Signature Gradient or `primary` (#8d0032). Shape: `md` (0.375rem) for a modern-classic look.
- **Secondary:** `surface_container_highest` background with `on_secondary_container` text. No border.
- **Tertiary:** Text-only using `primary` color, with a `full` rounded hover state in `surface_container`.

### Cards & Lists
- **Forbid Divider Lines:** Use vertical white space (32px–48px) to separate items.
- **Cards:** Should not have borders. Use background color shifts (`surface_container_low`) and a `lg` (0.5rem) corner radius.

### Input Fields
- **Styling:** Use `surface_container_highest` as the fill. 
- **States:** The active state is indicated by a 2px bottom-bar in `primary` (#8d0032), rather than a full-box outline. This maintains the editorial "lined paper" aesthetic.

### Chips
- **Style:** Pill-shaped (`full` roundedness).
- **Color:** Use `secondary_container` (#fd8fae) with `on_secondary_container` (#782442) for an active, feminine touch.

### The Editorial Hero (Custom Component)
A layout pattern where the headline (`display-md`) overlaps a high-quality image container. Use a `surface_container_lowest` background for the text block to create a "layered paper" effect over the photography.

---

## 6. Do's and Don'ts

### Do
- **Do** embrace asymmetry. Balance a heavy text block with a wide, empty margin.
- **Do** use `surface_dim` for subtle background transitions to keep the eyes from fatiguing on pure white.
- **Do** prioritize large imagery that feels like professional photography—high grain, natural lighting, and authentic subjects.

### Don't
- **Don't** use standard 1px #DDD borders. It breaks the premium "Editorial Sanctuary" feel.
- **Don't** use pure black (#000000) for anything. Use `on_surface` (#3e0215) for all high-contrast text.
- **Don't** crowd the interface. If a screen feels "busy," increase the padding using the `xl` (0.75rem) or higher spacing scale.
- **Don't** use standard "drop shadows" that look like they belong on a generic dashboard. If it's not diffused and tinted, it doesn't belong here.