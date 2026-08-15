# MONSTER IPTV — Design Direction

## Three possible approaches

### Theme Name: Midnight Broadcast

Very Brief Intro: A cinematic streaming interface built on deep space-black surfaces, electric-blue broadcast light, and a confident media-first hierarchy. It feels premium, focused, and ready for large-screen viewing.

Probability: 0.06

### Theme Name: Signal Laboratory

Very Brief Intro: A technical control-room direction using graphite panels, precise telemetry lines, and restrained status colors. It would make the product feel powerful and operational rather than entertainment-led.

Probability: 0.03

### Theme Name: Neon Arcade

Very Brief Intro: A playful, high-energy streaming direction with saturated accents, bold cards, and expressive motion. It would create stronger youth appeal but reduce the premium, cinematic tone.

Probability: 0.08

## Selected approach: Midnight Broadcast

### Design Movement

Contemporary cinematic streaming design with restrained broadcast-console cues: dark material surfaces, sharp light accents, poster-led composition, and large-screen readability.

### Core Principles

1. **Media leads the hierarchy.** Posters, backdrops, and player states should carry visual weight before secondary metadata.
2. **Contrast is intentional.** Deep surfaces create a stage for electric blue and premium gold, while text remains high-contrast and restrained.
3. **Structure supports every screen.** Layout primitives must scale from touch devices to TV viewing distances without overflow or tiny targets.
4. **Motion confirms state.** Transitions are short and physical; reduced-motion preferences always override non-essential effects.

### Color Philosophy

The base is near-black rather than flat black, creating cinematic depth without crushing detail. **Monster Blue** is the owned action color for focus, play, links, and progress. **Electric Blue** supports secondary broadcast signals, while **Premium Gold** is reserved for earned attention such as ratings or featured moments. Status colors remain semantic and do not compete with the brand accent.

### Layout Paradigm

Use asymmetric media-led compositions with a strong content rail, flexible poster grids, and vertical rhythm rather than generic centered blocks. The layout primitives provide a shared structural vocabulary: `Container` controls readable width, `Page` controls the viewport canvas, `Section` creates rhythm, `Row` and `Column` express intent, and `Grid` handles poster density across breakpoints.

### Signature Elements

1. Electric-blue focus rings and action affordances that remain visible for keyboard and remote users.
2. Poster surfaces with subtle dark gradients that keep metadata readable without hiding imagery.
3. Broadcast-inspired status badges for live, quality, and availability states.

### Interaction Philosophy

Every interaction should feel immediate and legible. Focus is never removed; it is made more visible. Click, Enter, and Space activate the same interactive card behavior. Loading states preserve the layout and announce busy status rather than replacing the entire screen.

### Animation

Use 100–200ms transitions for controls, 200–300ms for card emphasis and drawers, and never animate layout dimensions when transform or opacity can express the same change. Entrances begin around `scale(0.95)` rather than `scale(0)`. All non-essential motion is disabled or reduced under `prefers-reduced-motion: reduce`.

### Typography System

Headlines use a bold geometric or condensed sans at display scale; body copy stays clean and restrained. The current token system keeps a readable sans body family and a display family for future branded surfaces. Hierarchy should come from scale, weight, and spacing rather than default browser text.

### Brand Essence

A premium IPTV and entertainment experience for viewers who want their channels, movies, and series organized for the screen they actually use. It is **cinematic, capable, direct**.

### Brand Voice

Headlines are concise and benefit-led. CTAs describe the next viewing action rather than using generic filler. Microcopy is calm, specific, and helpful.

Example headline: **Every signal. One screen.**

Example CTA: **Open the viewing hub**

### Wordmark & Logo

The wordmark should use a custom condensed display treatment with a cut-through signal motif in the first “O”. The symbol is a compact angular monster eye formed from two opposing broadcast brackets, designed to work as a large header mark and favicon without relying on text.

### Signature Brand Color

**Monster Blue — `#00B8FF`**, used as a focused signal color rather than a decorative gradient.

## Style Decisions

- The site should feel like a premium streaming/entertainment service: dark cinematic base, vivid electric accent color, confident display typography, and high-contrast media-led composition.
- Headlines use a bold geometric or condensed sans at display scale; body copy stays clean and restrained, with hierarchy coming from scale and weight rather than default styling.
- All visible copy must sound product-specific and benefit-led, never placeholder or generic; buttons should communicate a clear action tied to the service.

## Foundation boundary

This direction is documented for future surface work. The current milestone remains foundation-only: layout primitives, design tokens, accessibility, theme, media primitives, and validation. No authentication, database, IPTV data, subscriptions, Control Hub, payments, or real streams are being implemented here.
