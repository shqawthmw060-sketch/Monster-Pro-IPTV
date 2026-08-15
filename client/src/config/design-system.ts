/**
 * MONSTER IPTV - Design System Configuration
 *
 * Centralized design tokens and semantic color definitions.
 * All colors, spacing, typography, and animations are defined here.
 * This ensures consistency across the entire application.
 */

// ============================================================================
// OFFICIAL BRAND COLORS
// ============================================================================

export const BRAND_COLORS = {
  monsterBlue: "#00B8FF",
  electricBlue: "#0077FF",
  premiumGold: "#FFC300",
} as const;

// ============================================================================
// SEMANTIC COLOR TOKENS
// ============================================================================

export const SEMANTIC_COLORS = {
  // Background
  background: {
    primary: "oklch(0.141 0.005 285.823)", // Dark theme primary
    secondary: "oklch(0.21 0.006 285.885)", // Dark theme secondary
    light: "oklch(1 0 0)", // Light theme
  },

  // Surface
  surface: {
    primary: "oklch(0.21 0.006 285.885)",
    secondary: "oklch(0.274 0.006 286.033)",
    elevated: "oklch(0.32 0.006 286.033)",
  },

  // Card
  card: {
    background: "oklch(0.21 0.006 285.885)",
    foreground: "oklch(0.85 0.005 65)",
    border: "oklch(1 0 0 / 10%)",
  },

  // Text
  text: {
    primary: "oklch(0.85 0.005 65)",
    secondary: "oklch(0.705 0.015 286.067)",
    muted: "oklch(0.552 0.016 285.938)",
    inverse: "oklch(0.235 0.015 65)",
  },

  // Status
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Brand
  brand: {
    primary: BRAND_COLORS.monsterBlue,
    secondary: BRAND_COLORS.electricBlue,
    accent: BRAND_COLORS.premiumGold,
  },

  // Border
  border: {
    default: "oklch(1 0 0 / 10%)",
    light: "oklch(1 0 0 / 5%)",
    dark: "oklch(1 0 0 / 20%)",
  },

  // Shadow
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
} as const;

// ============================================================================
// SPACING SCALE
// ============================================================================

export const SPACING = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const BORDER_RADIUS = {
  none: "0",
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
    display:
      '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  // Font sizes
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.02em",
    wider: "0.05em",
  },
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  mobile: "320px",
  tablet: "768px",
  desktop: "1024px",
  largeDesktop: "1280px",
  tv: "1920px",
} as const;

export const BREAKPOINT_PIXELS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1280,
  tv: 1920,
} as const;

// ============================================================================
// ANIMATION & TRANSITIONS
// ============================================================================

export const ANIMATIONS = {
  // Durations
  duration: {
    fast: "100ms",
    base: "200ms",
    slow: "300ms",
    slower: "500ms",
  },

  // Easing functions
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOutBack: "cubic-bezier(0.23, 1, 0.32, 1)",
    easeInOutBack: "cubic-bezier(0.77, 0, 0.175, 1)",
  },

  // Keyframes
  keyframes: {
    fadeIn: {
      from: { opacity: "0" },
      to: { opacity: "1" },
    },
    fadeOut: {
      from: { opacity: "1" },
      to: { opacity: "0" },
    },
    slideInUp: {
      from: { transform: "translateY(10px)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    slideInDown: {
      from: { transform: "translateY(-10px)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    slideInLeft: {
      from: { transform: "translateX(-10px)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    slideInRight: {
      from: { transform: "translateX(10px)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    scaleIn: {
      from: { transform: "scale(0.95)", opacity: "0" },
      to: { transform: "scale(1)", opacity: "1" },
    },
    scaleOut: {
      from: { transform: "scale(1)", opacity: "1" },
      to: { transform: "scale(0.95)", opacity: "0" },
    },
    spin: {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    pulse: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.5" },
    },
  },
} as const;

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

export const THEMES = {
  dark: {
    name: "Monster Dark",
    background: SEMANTIC_COLORS.background.primary,
    surface: SEMANTIC_COLORS.surface.primary,
    text: SEMANTIC_COLORS.text.primary,
    border: SEMANTIC_COLORS.border.default,
  },
  light: {
    name: "Monster Light",
    background: SEMANTIC_COLORS.background.light,
    surface: "oklch(0.98 0.001 286.375)",
    text: SEMANTIC_COLORS.text.inverse,
    border: "oklch(0.92 0.004 286.32)",
  },
} as const;

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINT_PIXELS.tablet - 1}px)`,
  tablet: `(min-width: ${BREAKPOINT_PIXELS.tablet}px) and (max-width: ${BREAKPOINT_PIXELS.desktop - 1}px)`,
  desktop: `(min-width: ${BREAKPOINT_PIXELS.desktop}px) and (max-width: ${BREAKPOINT_PIXELS.largeDesktop - 1}px)`,
  largeDesktop: `(min-width: ${BREAKPOINT_PIXELS.largeDesktop}px) and (max-width: ${BREAKPOINT_PIXELS.tv - 1}px)`,
  tv: `(min-width: ${BREAKPOINT_PIXELS.tv}px)`,
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const ACCESSIBILITY = {
  focusOutlineWidth: "2px",
  focusOutlineColor: BRAND_COLORS.monsterBlue,
  focusOutlineOffset: "2px",
  minTouchTarget: "44px", // Minimum touch target size
  minClickTarget: "32px", // Minimum click target size
} as const;
