```markdown
# Design System Strategy: The Organic Curator

## 1. Overview & Creative North Star
The "Organic Curator" is the guiding philosophy behind this design system. It moves away from the rigid, clinical grids of traditional utility apps toward an editorial experience that feels premium, tactile, and intentionally soft. 

By blending Neumorphic depth with flat, high-contrast typography, we create an interface that feels less like a tool and more like a high-end concierge. We break the "template" look through **intentional asymmetry**—using floating pods and overlapping background shapes that mimic organic growth—and a hierarchy driven by tonal shifts rather than structural lines.

## 2. Colors & Surface Philosophy
The palette is rooted in a lush, verdant spectrum, designed to evoke freshness and premium quality.

### Primary Tokens (Brand)
- **Primary (`#006a2d`):** A deep, authoritative forest green used for key actions and branding.
- **Primary Container (`#6bff8f`):** A vibrant, soft green for high-visibility highlights and progress states.
- **Secondary (`#3e6353`):** A muted sage for supporting elements.
- **Tertiary/Accent (`#994100`):** A sophisticated orange for urgency (High Priority) and alerts.

### The "No-Line" Rule
To maintain a premium feel, **1px solid borders are strictly prohibited** for sectioning. Boundaries must be defined solely through:
- **Tonal Shifts:** Placing a `surface-container-lowest` card on a `surface-container-low` background.
- **Soft Shadows:** Using light to define space, not ink.
- **Spacing:** Leveraging the 8.5rem (`24`) and 5.5rem (`16`) tokens to create breathable voids between content groups.

### Surface Hierarchy & Glassmorphism
We treat the UI as a series of nested physical layers. 
- **The Base:** Use `surface` (`#f5f6f7`) as the canvas.
- **The Pods:** Use `surface-container-lowest` (`#ffffff`) for primary content cards to create a natural "lift."
- **Glass Elements:** Floating elements like the Bottom Navigation must utilize semi-transparent surface colors with a `backdrop-blur` (20px+) to allow the organic background shapes to bleed through, creating a "frosted glass" effect.

## 3. Typography: Editorial Authority
We utilize a dual-typeface system to balance character with readability.

- **Display & Headlines (Plus Jakarta Sans):** Chosen for its modern, geometric flair. High-contrast sizing (e.g., `display-lg` at 3.5rem) should be used to create clear entry points for the eye.
- **Body & Labels (Inter):** A workhorse sans-serif used for maximum legibility in dense grocery lists.

**Hierarchy Strategy:** 
Use `headline-sm` for card titles to convey a sense of "importance without shouting." Pair it with `label-sm` in all-caps for metadata (e.g., "SHOPPING ITEMS") to provide an editorial structure similar to a premium magazine.

## 4. Elevation & Depth: Tonal Layering
Depth is achieved through "stacking" rather than traditional drop shadows.

- **The Layering Principle:** A `surface-container-lowest` card sitting on a `surface-container-low` section creates a soft, natural lift.
- **Ambient Shadows:** When a true floating effect is required (e.g., a Floating Action Button), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 106, 45, 0.08)`. The shadow must be tinted with the `primary` or `on-surface` color—never pure black.
- **The Ghost Border:** If a boundary is required for accessibility, use the `outline-variant` at **10% opacity**. It should be felt, not seen.

## 5. Components

### Cards & Pods
- **Style:** Corners must use `md` (1.5rem) or `lg` (2rem) scales.
- **Constraint:** No dividers. Use `surface-variant` backgrounds for internal sectioning (e.g., the "Quantity" selector within an item card).

### Buttons & Interaction
- **Primary Button:** High-saturation `primary` background with `on-primary` text. Use `full` (9999px) corner radius for a pill shape.
- **Floating Action Button (FAB):** Should always use a gradient transition from `primary` to `primary_dim` to provide visual "soul" and a tactile, pressed-glass look.

### Input Fields
- **Style:** "Soft UI" inset style. Use `surface-container-high` with a subtle inner shadow to make the field feel "carved" into the card.
- **Feedback:** Use `tertiary` (`#994100`) for error states, paired with a subtle `surface-tint` glow.

### Progress & Analytics
- **Bar Gauges:** Use `primary_container` for the track and `primary` for the progress. Avoid hard ends; use `DEFAULT` (1rem) rounding on the bar ends for an organic feel.

## 6. Do's and Don'ts

### Do:
- **Do** use overlapping background circles/blobs in `secondary_container` to break the rectangular grid.
- **Do** use `title-lg` for numeric data in analytics cards to make data feel like a hero element.
- **Do** prioritize white space over lines. If a layout feels cluttered, increase the spacing token rather than adding a divider.

### Don't:
- **Don't** use 100% opaque black shadows. It kills the "Soft UI" aesthetic.
- **Don't** use sharp corners (`none` or `sm`). Everything in the grocery world (fruit, produce, bags) is organic; the UI should reflect that.
- **Don't** use high-contrast borders. If the background and the card are too similar, use a tonal shift (`surface` to `surface_container_low`) instead of a stroke.