# Design System: The Organic Concierge

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Organic Concierge."** Most grocery apps feel like utility spreadsheets; this system reimagines the grocery planner as a high-end, editorial experience that feels tactile and intuitive. 

We move beyond the "grid-of-boxes" by utilizing **Tonal Depth** and **Asymmetric Breathing Room**. By mixing the soft, extruding physics of neumorphism with the crisp clarity of flat design, we create a UI that feels "grown" rather than "built." We prioritize a high-contrast typography scale to create an editorial rhythm, where large headers anchor the experience and soft, layered surfaces guide the hand.

## 2. Color & Surface Architecture
Color is not just decoration; it is structural. We use a "chromatic layering" approach to define space.

### The Palette
*   **Primary (#006E2F):** The "Deep Harvest" green. Used for high-impact brand moments.
*   **Primary Container (#22C55E):** The "Soft Sprout" green. This is your primary action color.
*   **Secondary (#416656):** A muted sage used for utilitarian elements.
*   **Tertiary (#9D4300):** A sophisticated burnt orange for accents and urgent notifications.

### Surface Rules
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation needed.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine, translucent paper. 
    *   **Level 0 (Background):** `surface` (#F8F9FA)
    *   **Level 1 (Sections):** `surface-container-low` (#F3F4F5)
    *   **Level 2 (Active Cards):** `surface-container-lowest` (#FFFFFF)
*   **The Glass & Gradient Rule:** For floating navigation or modals, use `surface-container-lowest` at 80% opacity with a `24px` backdrop-blur. Apply a subtle linear gradient from `primary` to `primary-container` (15% opacity) to give CTA buttons a "soul" and inner glow.

## 3. Typography: The Editorial Voice
We pair **Plus Jakarta Sans** (Display/Headlines) with **Inter** (Body/Labels) to create an authoritative yet approachable voice.

*   **Display-LG (3.5rem):** Used for "Empty State" hero text or massive category titles. High impact, low frequency.
*   **Headline-MD (1.75rem):** The standard page header. Use `on-surface` color with `tight` letter spacing (-0.02em) for a premium look.
*   **Title-SM (1.0rem):** Bold weight. Used for item names in a grocery list.
*   **Body-MD (0.875rem):** The workhorse for descriptions and quantity details.
*   **Label-MD (0.75rem):** Uppercase with +0.05em tracking for category labels and "Pill" text.

## 4. Elevation & Depth
In this system, elevation is "felt," not "seen." We eschew heavy drop shadows for **Ambient Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by placing a `surface-container-lowest` (pure white) card on a `surface-container-low` (pale grey) background. This creates a soft "lift" without visual noise.
*   **Ambient Shadows:** For floating action buttons (FABs) or high-priority cards, use a shadow with a 40px blur, 12px Y-offset, and 6% opacity. Use a tint of the `primary` color (#006E2F) for the shadow instead of black to maintain the "Organic" feel.
*   **The Ghost Border Fallback:** If high-density layouts require a container, use a "Ghost Border": `outline-variant` at 15% opacity. Never use a 100% opaque border.
*   **Soft UI Neumorphism:** For "pressed" states on category chips, use an inner shadow with a 4px blur to simulate the element being pushed into the surface.

## 5. Components

### Buttons & Chips
*   **Primary Action:** Use `primary-container` (#22C55E) with `on-primary-container` text. Radius: `md` (1.5rem). Apply a subtle 10% white inner-glow at the top edge.
*   **Priority Pills:** 
    *   **Low:** `secondary-container` background, `on-secondary-container` text.
    *   **Medium:** `tertiary-container` background, `on-tertiary-container` text.
    *   **High:** `error-container` background, `on-error` text.
*   **Category Chips:** Rounded `full` (pill). Use `surface-container-high` for unselected and `primary` for selected. 

### Cards & Lists
*   **The No-Divider Rule:** Forbid 1px dividers between list items. Use the `spacing-4` (1.4rem) scale to create breathing room, or alternate background tints (`surface` vs `surface-container-low`) for row separation.
*   **Smart Quantity Card:** A `surface-container-lowest` card with a `radius-lg` (2rem). Nest the +/- controls within a slightly darker `surface-container-high` inner well.

### Input Fields
*   **Soft Inputs:** Fields should not be boxes. Use a `surface-container-highest` background with a `radius-md` (1.5rem). The label should sit 8px above the input in `label-md` Inter, using 60% opacity.

## 6. Do’s and Don'ts

### Do
*   **DO** use asymmetric margins. For example, a page header can have a larger top margin (`spacing-12`) than side margin (`spacing-4`) to create an editorial "white space" feel.
*   **DO** use "Primary-to-Primary-Container" gradients for large progress bars.
*   **DO** ensure all touch targets are at least 44x44dp, even if the visual "pill" looks smaller.

### Don’t
*   **DON'T** use pure black (#000000) for text. Use `on-surface` (#191C1D) to maintain the soft UI harmony.
*   **DON'T** use sharp 90-degree corners. Everything must feel tumbled and smooth (Minimum `radius-sm`).
*   **DON'T** stack more than three levels of surface nesting (e.g., Background > Section > Card is the limit). Any more creates "visual clutter."