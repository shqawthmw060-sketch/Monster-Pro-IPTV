/**
 * MONSTER IPTV - Responsive Configuration
 *
 * Breakpoints and responsive utilities for different device types.
 */

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  mobile: 320,
  mobileLg: 480,
  tablet: 768,
  tabletLg: 1024,
  desktop: 1280,
  desktopLg: 1536,
  tv: 1920,
  tv4k: 3840,
} as const;

// ============================================================================
// MEDIA QUERIES
// ============================================================================

export const MEDIA_QUERIES = {
  // Mobile first approach
  mobile: `(max-width: ${BREAKPOINTS.mobileLg - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
  tv: `(min-width: ${BREAKPOINTS.tv}px)`,
  tv4k: `(min-width: ${BREAKPOINTS.tv4k}px)`,

  // Range queries
  mobileOnly: `(max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tabletOnly: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktopOnly: `(min-width: ${BREAKPOINTS.desktop}px) and (max-width: ${BREAKPOINTS.tv - 1}px)`,

  // Orientation
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)",

  // Touch
  touchDevice: "(hover: none) and (pointer: coarse)",
  hoverDevice: "(hover: hover) and (pointer: fine)",

  // Accessibility
  reducedMotion: "(prefers-reduced-motion: reduce)",
  prefersLight: "(prefers-color-scheme: light)",
  prefersDark: "(prefers-color-scheme: dark)",

  // High DPI
  highDpi: "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
} as const;

// ============================================================================
// DEVICE DETECTION HELPERS
// ============================================================================

export function getDeviceType(
  width: number
): "mobile" | "tablet" | "desktop" | "tv" {
  if (width < BREAKPOINTS.tablet) return "mobile";
  if (width < BREAKPOINTS.desktop) return "tablet";
  if (width < BREAKPOINTS.tv) return "desktop";
  return "tv";
}

export function isMobile(width: number): boolean {
  return width < BREAKPOINTS.tablet;
}

export function isTablet(width: number): boolean {
  return width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
}

export function isDesktop(width: number): boolean {
  return width >= BREAKPOINTS.desktop && width < BREAKPOINTS.tv;
}

export function isTV(width: number): boolean {
  return width >= BREAKPOINTS.tv;
}

// ============================================================================
// RESPONSIVE GRID COLUMNS
// ============================================================================

export const GRID_COLUMNS = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  tv: 4,
} as const;

// ============================================================================
// RESPONSIVE SPACING
// ============================================================================

export const RESPONSIVE_SPACING = {
  mobile: "1rem",
  tablet: "1.5rem",
  desktop: "2rem",
  tv: "3rem",
} as const;

// ============================================================================
// RESPONSIVE FONT SIZES
// ============================================================================

export const RESPONSIVE_FONT_SIZES = {
  h1: {
    mobile: "1.875rem", // 30px
    tablet: "2.25rem", // 36px
    desktop: "3rem", // 48px
  },
  h2: {
    mobile: "1.5rem", // 24px
    tablet: "1.875rem", // 30px
    desktop: "2.25rem", // 36px
  },
  h3: {
    mobile: "1.25rem", // 20px
    tablet: "1.5rem", // 24px
    desktop: "1.875rem", // 30px
  },
  body: {
    mobile: "0.875rem", // 14px
    tablet: "1rem", // 16px
    desktop: "1rem", // 16px
  },
} as const;

// ============================================================================
// CONTAINER QUERIES
// ============================================================================

export const CONTAINER_SIZES = {
  sm: "20rem", // 320px
  md: "28rem", // 448px
  lg: "42rem", // 672px
  xl: "64rem", // 1024px
  "2xl": "80rem", // 1280px
} as const;

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

export const RESPONSIVE_CLASSES = {
  // Hide on specific breakpoints
  hideOnMobile: "hidden md:block",
  hideOnTablet: "md:hidden lg:block",
  hideOnDesktop: "lg:hidden",
  hideOnTV: "xl:hidden",

  // Show on specific breakpoints
  showOnMobile: "md:hidden",
  showOnTablet: "hidden md:block lg:hidden",
  showOnDesktop: "hidden lg:block xl:hidden",
  showOnTV: "hidden xl:block",

  // Responsive padding
  paddingMobile: "px-4 py-4",
  paddingTablet: "md:px-6 md:py-6",
  paddingDesktop: "lg:px-8 lg:py-8",

  // Responsive grid
  gridMobile: "grid-cols-1",
  gridTablet: "md:grid-cols-2",
  gridDesktop: "lg:grid-cols-3",
  gridTV: "xl:grid-cols-4",
} as const;

// ============================================================================
// ASPECT RATIOS
// ============================================================================

export const ASPECT_RATIOS = {
  square: "aspect-square",
  video: "aspect-video", // 16:9
  poster: "aspect-[2/3]", // Movie poster
  backdrop: "aspect-[16/9]", // Backdrop
  thumbnail: "aspect-[4/3]", // Thumbnail
  banner: "aspect-[21/9]", // Wide banner
} as const;
