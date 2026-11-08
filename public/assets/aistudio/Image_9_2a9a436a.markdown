---
name: Hydrologic Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#404847'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707977'
  outline-variant: '#bfc8c6'
  surface-tint: '#316763'
  primary: '#003633'
  on-primary: '#ffffff'
  primary-container: '#134e4a'
  on-primary-container: '#87beb8'
  inverse-primary: '#9ad1cb'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#003631'
  on-tertiary: '#ffffff'
  tertiary-container: '#004f48'
  on-tertiary-container: '#56c5b8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b5ede7'
  primary-fixed-dim: '#9ad1cb'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#144f4b'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system serves municipal civil engineers, disaster response teams, and environmental monitoring officers operating mission-critical hydro-telemetry and GIS dashboards. The aesthetic language merges precision scientific instrumentation with executive-grade civic authority.

The visual ethos balances:
- **Absolute Clarity:** Zero decorative distraction; information density is mediated through deliberate negative space and strict optical hierarchy rather than sensory overload.
- **Scientific Dignity:** Deep ecological emeralds and structural nautical slates evoke sovereign authority, environmental stewardship, and infrastructural reliability.
- **Quiet Modernism:** Refined, precision-tooled cards with razor-thin structural borders and ambient atmospheric elevation, moving away from utilitarian legacy government portals toward modern aerospace-grade telemetry interfaces.

## Colors

The palette establishes a luminous, clinical daylight workroom calibrated for high legibility during prolonged emergency operations.

- **Primary (`#134e4a`):** Deep Forest Teal anchor. Conveys sovereign ecological governance and environmental focus. Used for primary navigation states, active geo-layer anchors, and executive summaries.
- **Secondary (`#0f172a`):** Abyssal Navy. Provides dense structural weight for foundational UI text, critical GIS toolbars, and primary metrics.
- **Tertiary (`#0d9488`):** Precision Emerald/Teal. Applied to live stream telemetry indicators, active data vectors, and verified operational statuses.
- **Surfaces & Neutral Baseline:**
  - Base Canvas: `#f8fafc` (Slate 50)
  - Card & Container Surface: `#ffffff` (Pure White)
  - Subtle Recessed Panel: `#f1f5f9` (Slate 100)
  - Structural Hairlines: `#e2e8f0` (Slate 200)
  - Text Muted: `#64748b` (Slate 500)
- **Semantic Risk & Early Warning Spectrum:**
  - **Low / Nominal:** `#10b981` (Emerald 500) on `#ecfdf5` (Emerald 50)
  - **Moderate / Advisory:** `#f59e0b` (Amber 500) on `#fffbeb` (Amber 50)
  - **High / Warning:** `#f97316` (Orange 500) on `#fff7ed` (Orange 50)
  - **Critical / Evacuation:** `#ef4444` (Rose 500) on `#fef2f2` (Rose 50)

## Typography

The typographic hierarchy utilizes **Manrope** for primary metrics, dashboard headings, and structural wayfinding, lending geometric geometry and clarity to complex sensor datasets.

**Inter** handles all tabular figures, telemetry readouts, spatial labels, and operational body copy, ensuring uncompromised legibility even at 10px inside crowded spatial viewports. Numeric data points (flow rate, gauge depth, cubic volume per second) must systematically enforce tabular figures (`font-variant-numeric: tabular-nums`) to prevent optical shifting across real-time telemetry feeds.

## Layout & Spacing

The architecture operates on an adaptive fluid spatial grid anchored by a 4px sub-grid unit.

- **Desktop (12 Columns):** 32px external canvas margin, 24px column gutters. Designed to frame high-resolution GIS raster maps while accommodating contextual sidebars (360px–420px) without occluding viewport telemetry.
- **Tablet (8 Columns):** 24px external margin, 16px gutters. Analytical sidebars fold into overlay draw panels.
- **Mobile (4 Columns):** 16px external margin, 12px gutters. Telemetry streams stack sequentially beneath an anchored map window.

Spacing adheres strictly to predictable spatial intervals: micro-paddings (`space-xs`, `space-sm`) define compact chip arrays and telemetry badges, while structural component intervals (`space-lg`, `space-xl`) isolate distinct hydrological zones and watershed analysis cards.

## Elevation & Depth

Visual hierarchy rejects exaggerated drop shadows in favor of crisp, structural delineation optimized for multi-monitor municipal watchrooms.

- **Surface Boundary System:** Every elevation layer utilizes a hairline boundary (`1px solid #e2e8f0`).
- **Level 0 (Basemap & Canvas):** Recessed canvas tone `#f8fafc`. Map frames sit flush or encapsulated within zero-elevation containers.
- **Level 1 (Card & Standard Modules):** Pure white background (`#ffffff`), anchored by `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Active Hydro Drawers & Overlay Toolbars):** Elevated GIS interaction clusters and active stream inspection panels utilize `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Emergency Modals & Critical Flood Alerts):** High-priority operational interrupts utilize `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`.

## Shapes

The design system employs a refined, geometric contour profile (`roundedness: 1`). 

- Default elements (buttons, inputs, metric tiles) use subtle `0.25rem` (4px) corner radii, imparting structural discipline and architectural rigor suited for GIS telemetry.
- Primary modular cards and floating operational panels employ `0.5rem` (8px, `rounded-lg`).
- Dialogs and mission-control flyout panels scale to `0.75rem` (12px, `rounded-xl`).
- High-priority circular coordinates, spatial status markers, and telemetry ping pills employ full circular radii (`rounded-full`) to immediately contrast against rigid square-cornered coordinate tables.

## Components

### Buttons
- **Primary:** Deep Teal background (`#134e4a`), pure white text, 4px border radius. Hover: `#115e59`. Active: `#042f2e`.
- **Secondary / Operational:** Surface `#ffffff`, border `1px solid #e2e8f0`, text `#0f172a`. Hover: surface `#f8fafc`, border `#cbd5e1`.
- **Danger (Disaster Dispatch):** Solid `#ef4444` background with white text, deployed solely for emergency siren triggers or live evacuation orders.

### Cards & Telemetry Tiles
Constructed with a pure white surface (`#ffffff`), encased in a crisp boundary (`1px solid #e2e8f0`), with `space-md` internal padding. Card headers feature clear separation through muted subtitles (`label-md` in `#64748b`) paired with tabular metric values in `Manrope`.

### Risk & Status Badges (Chips)
Structured as compact pills with uppercase tracking (`label-sm`).
- **Low Risk:** `#ecfdf5` background, `#047857` label, `#10b981` leading 6px status dot.
- **Moderate Risk:** `#fffbeb` background, `#b45309` label, `#f59e0b` leading dot.
- **High Risk:** `#fff7ed` background, `#c2410c` label, `#f97316` leading dot.
- **Critical Risk:** `#fef2f2` background, `#b91c1c` label, accompanied by a pulsing ping indicator.

### Input Fields & Spatial Selectors
Height standardized at 38px for dense workstation efficiency. Solid `#ffffff` background with `#e2e8f0` stroke. On focus: border transitions to `#0d9488` alongside an ambient `0 0 0 3px rgba(13, 148, 136, 0.12)` focus ring.

### Data Tables & Sensor Lists
Alternating rows are eschewed in favor of clean hairline separators (`1px solid #f1f5f9`). Column headers utilize `label-md` uppercase in `#64748b`. Real-time sensor rows update seamlessly with soft flash animations (300ms transition on metric variance).

### Specialized Domain Components
- **Hydrograph Depth Tracker:** Monochromatic SVG sparkline bounded by a semi-transparent gradient fill (`rgba(13, 148, 136, 0.08)`) with dotted threshold lines representing historical crest levels.
- **GIS Floating Control Cluster:** High-contrast minimal vertical pill containing zoom, vector layer toggles, and terrain mode selectors positioned precisely 16px offset from the map viewport edges.