# MONSTER IPTV - Design System

## Introduction

The MONSTER IPTV Design System is a comprehensive collection of design tokens, components, and guidelines that ensure consistency and quality across the entire application. This system is built on modern design principles and accessibility standards.

## Brand Identity

### Brand Colors

The MONSTER IPTV brand is defined by three primary colors that work together to create a premium, energetic visual identity.

| Color Name | Hex Value | Usage |
|---|---|---|
| Monster Blue | #00B8FF | Primary brand color, CTAs, highlights |
| Electric Blue | #0077FF | Secondary actions, accents |
| Premium Gold | #FFC300 | Premium features, special highlights |

### Brand Essence

**Positioning:** Premium IPTV streaming platform for entertainment enthusiasts who demand quality and control.

**Personality:** Modern, energetic, premium, trustworthy, innovative.

**Voice:** Direct, confident, and user-focused. Avoid generic filler phrases like "Welcome to our website" or "Get started today."

## Design Tokens

### Color System

The color system uses semantic naming to ensure consistency and maintainability. Colors are defined in `config/design-system.ts`.

#### Background Colors

- **Primary Background**: Used for main page backgrounds
- **Secondary Background**: Used for elevated surfaces
- **Elevated Background**: Used for cards and containers

#### Surface Colors

- **Primary Surface**: Main container backgrounds
- **Secondary Surface**: Secondary containers
- **Elevated Surface**: Floating elements and modals

#### Text Colors

- **Primary Text**: Main content text
- **Secondary Text**: Supporting text
- **Muted Text**: Disabled or less important text
- **Inverse Text**: Text on dark backgrounds

#### Status Colors

- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Info**: #3b82f6 (Blue)

### Spacing Scale

Consistent spacing creates visual harmony and improves usability.

| Scale | Value | Usage |
|---|---|---|
| xs | 4px | Minimal spacing |
| sm | 8px | Small gaps |
| md | 16px | Default spacing |
| lg | 24px | Large sections |
| xl | 32px | Extra large sections |
| 2xl | 48px | Major sections |
| 3xl | 64px | Page sections |
| 4xl | 96px | Hero sections |

### Typography

#### Font Families

- **Sans (Default)**: Inter - Clean, modern, highly readable
- **Display**: Poppins - Bold, distinctive headings
- **Mono**: Fira Code - Code snippets and technical content

#### Font Sizes

| Size | Value | Usage |
|---|---|---|
| xs | 12px | Labels, captions |
| sm | 14px | Small text |
| base | 16px | Body text |
| lg | 18px | Slightly larger text |
| xl | 20px | Subheadings |
| 2xl | 24px | Section headings |
| 3xl | 30px | Page headings |
| 4xl | 36px | Large headings |
| 5xl | 48px | Hero titles |
| 6xl | 60px | Extra large titles |

#### Font Weights

- **Light**: 300 - Subtle, secondary text
- **Normal**: 400 - Body text
- **Medium**: 500 - Emphasized text
- **Semibold**: 600 - Subheadings
- **Bold**: 700 - Headings
- **Extrabold**: 800 - Hero text

#### Line Heights

- **Tight**: 1.2 - Headings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.75 - Large text
- **Loose**: 2 - Extra spacing

### Border Radius

Rounded corners create a modern, friendly appearance while maintaining clarity.

| Size | Value | Usage |
|---|---|---|
| none | 0 | Sharp corners |
| sm | 4px | Small elements |
| md | 8px | Buttons, inputs |
| lg | 12px | Cards |
| xl | 16px | Large cards |
| 2xl | 24px | Modals |
| full | 9999px | Badges, avatars |

### Shadows

Shadows create depth and hierarchy in the interface.

| Level | Value | Usage |
|---|---|---|
| sm | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Subtle depth |
| md | 0 4px 6px -1px rgb(0 0 0 / 0.1) | Cards |
| lg | 0 10px 15px -3px rgb(0 0 0 / 0.1) | Elevated cards |
| xl | 0 20px 25px -5px rgb(0 0 0 / 0.1) | Modals |

### Z-Index Scale

Proper z-index management ensures correct layering of elements.

| Level | Value | Usage |
|---|---|---|
| hide | -1 | Hidden elements |
| base | 0 | Default layer |
| dropdown | 1000 | Dropdown menus |
| sticky | 1020 | Sticky headers |
| fixed | 1030 | Fixed elements |
| backdrop | 1040 | Modal backdrops |
| modal | 1050 | Modal dialogs |
| popover | 1060 | Popovers |
| tooltip | 1070 | Tooltips |

## Responsive Design

### Breakpoints

The application supports multiple device types with responsive breakpoints.

| Device | Breakpoint | Width |
|---|---|---|
| Mobile | - | 320px - 767px |
| Tablet | tablet | 768px - 1023px |
| Desktop | desktop | 1024px - 1919px |
| Large Desktop | largeDesktop | 1280px - 1919px |
| TV | tv | 1920px+ |

### Mobile-First Approach

All designs start with mobile and progressively enhance for larger screens. This ensures the best experience on the most constrained devices.

### Responsive Utilities

- **Grid Columns**: 1 (mobile) → 2 (tablet) → 3 (desktop) → 4 (TV)
- **Font Sizes**: Adjust across breakpoints for readability
- **Spacing**: Increase spacing on larger screens
- **Visibility**: Show/hide elements based on device type

## Animation & Motion

### Animation Durations

| Duration | Value | Usage |
|---|---|---|
| Fast | 100ms | Quick feedback |
| Base | 200ms | Standard transitions |
| Slow | 300ms | Modals, drawers |
| Slower | 500ms | Page transitions |

### Easing Functions

| Easing | Curve | Usage |
|---|---|---|
| Linear | linear | Continuous motion |
| Ease In | cubic-bezier(0.4, 0, 1, 1) | Accelerating |
| Ease Out | cubic-bezier(0, 0, 0.2, 1) | Decelerating |
| Ease In Out | cubic-bezier(0.4, 0, 0.2, 1) | Smooth transitions |
| Ease Out Back | cubic-bezier(0.23, 1, 0.32, 1) | Snappy, playful |
| Ease In Out Back | cubic-bezier(0.77, 0, 0.175, 1) | Smooth, bouncy |

### Animation Guidelines

**Respect Motion Preferences:** All animations respect the `prefers-reduced-motion` media query for accessibility.

**Keep Animations Snappy:** Most UI animations should complete within 100-300ms. Slower animations feel sluggish.

**Use GPU-Accelerated Properties:** Animate only `transform` and `opacity` for smooth 60fps animations.

**Entrance Animations:** Use scale from 0.95 with opacity 0, never from scale 0.

**Stagger Grouped Items:** Stagger entrance animations by 30-80ms per item for cascading effect.

## Components

### Foundation Components

Foundation components are the building blocks of the interface and should be used consistently throughout the application.

**Button:** Primary action trigger with variants for different contexts (default, outline, ghost, destructive).

**Input:** Text input field with validation states and error handling.

**Card:** Container for related content with consistent spacing and shadows.

**Badge:** Small label for categorization or status indication.

**Modal:** Overlay dialog for important user interactions.

**Drawer:** Side panel for navigation or additional options.

**Tabs:** Organize content into separate views.

**Toast:** Temporary notification for user feedback.

### Layout Components

Layout components provide structure and organization for page layouts.

**Container:** Centered content wrapper with responsive padding.

**Stack:** Vertical flex container with consistent gap.

**Row:** Horizontal flex container with alignment options.

**Grid:** Responsive grid layout with automatic column adjustment.

**Section:** Page section with background and spacing variants.

## Accessibility

### WCAG 2.1 Compliance

The design system targets WCAG 2.1 Level AA compliance as a minimum, with AAA compliance for critical elements.

### Color Contrast

Minimum contrast ratios for text:

- **Normal Text**: 4.5:1 (AA) / 7:1 (AAA)
- **Large Text** (18pt+ or 14pt+ bold): 3:1 (AA) / 4.5:1 (AAA)

### Focus Management

- **Focus Outline**: 2px solid Monster Blue (#00B8FF)
- **Focus Offset**: 2px from element
- **Visible Focus**: Always visible, never removed

### Keyboard Navigation

All interactive elements must be keyboard accessible:

- **Tab**: Navigate forward
- **Shift+Tab**: Navigate backward
- **Enter/Space**: Activate buttons
- **Arrow Keys**: Navigate within components
- **Escape**: Close modals/dropdowns

### Screen Reader Support

- Use semantic HTML elements
- Provide descriptive ARIA labels
- Use `aria-describedby` for additional context
- Announce dynamic changes with `aria-live`

### Touch Targets

Minimum touch target size: 44px × 44px (WCAG 2.1 Level AAA)

## Theming

### Monster Dark Theme

The default dark theme provides a premium, modern appearance suitable for streaming content.

- **Background**: oklch(0.141 0.005 285.823) - Deep dark
- **Surface**: oklch(0.21 0.006 285.885) - Elevated dark
- **Text**: oklch(0.85 0.005 65) - Light text
- **Brand Color**: #00B8FF - Monster Blue

### Monster Light Theme

An alternative light theme for users who prefer lighter interfaces.

- **Background**: oklch(1 0 0) - White
- **Surface**: oklch(0.98 0.001 286.375) - Light gray
- **Text**: oklch(0.235 0.015 65) - Dark text
- **Brand Color**: #0077FF - Electric Blue

## Implementation

### Using Design Tokens

All design tokens are centralized in `client/src/config/design-system.ts`. Import and use them in your components:

```typescript
import { BRAND_COLORS, SEMANTIC_COLORS, SPACING } from "@/config/design-system";
```

### CSS Variables

Design tokens are also available as CSS variables in `client/src/index.css`:

```css
:root {
  --primary: var(--color-blue-700);
  --spacing-md: 1rem;
  --radius-lg: 0.75rem;
}
```

### Tailwind Integration

Tailwind CSS is configured to use the design system tokens:

```jsx
<div className="bg-background text-foreground p-md rounded-lg shadow-md">
  Content
</div>
```

## Best Practices

### Consistency

- Always use design tokens instead of hardcoding values
- Use semantic color names instead of specific colors
- Follow spacing scale for all margins and padding

### Accessibility

- Ensure sufficient color contrast
- Provide keyboard navigation
- Use semantic HTML
- Include ARIA labels where necessary
- Test with screen readers

### Performance

- Use CSS variables for theming
- Minimize animation complexity
- Lazy load images
- Optimize bundle size

### Maintainability

- Document design decisions
- Keep components modular
- Use consistent naming conventions
- Extract reusable patterns

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref)
- [Accessible Color Contrast](https://webaim.org/articles/contrast)
- [Animation Best Practices](https://www.smashingmagazine.com/2021/09/animation-design-system)
