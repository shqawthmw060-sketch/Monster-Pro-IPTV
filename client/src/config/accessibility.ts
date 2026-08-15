/**
 * MONSTER IPTV - Accessibility Configuration
 *
 * Accessibility utilities and WCAG 2.1 compliance helpers.
 */

// ============================================================================
// WCAG CONTRAST RATIOS
// ============================================================================

export const CONTRAST_RATIOS = {
  // WCAG AA (minimum)
  AA: {
    normal: 4.5, // For normal text
    large: 3, // For large text (18pt+ or 14pt+ bold)
  },
  // WCAG AAA (enhanced)
  AAA: {
    normal: 7,
    large: 4.5,
  },
} as const;

// ============================================================================
// FOCUS MANAGEMENT
// ============================================================================

export const FOCUS_STYLES = {
  outlineWidth: "2px",
  outlineColor: "#00B8FF", // Monster Blue
  outlineOffset: "2px",
  outlineStyle: "solid",
} as const;

export const FOCUS_VISIBLE_CLASS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8FF]";

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  TAB: "Tab",
  SHIFT_TAB: "Shift+Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
} as const;

// ============================================================================
// ARIA ROLES
// ============================================================================

export const ARIA_ROLES = {
  // Landmark roles
  MAIN: "main",
  NAVIGATION: "navigation",
  REGION: "region",
  COMPLEMENTARY: "complementary",
  CONTENTINFO: "contentinfo",
  BANNER: "banner",

  // Widget roles
  BUTTON: "button",
  LINK: "link",
  MENUITEM: "menuitem",
  MENUITEMCHECKBOX: "menuitemcheckbox",
  MENUITEMRADIO: "menuitemradio",
  TAB: "tab",
  TABPANEL: "tabpanel",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  SWITCH: "switch",
  SLIDER: "slider",
  SPINBUTTON: "spinbutton",
  SEARCHBOX: "searchbox",
  COMBOBOX: "combobox",
  LISTBOX: "listbox",
  OPTION: "option",
  DIALOG: "dialog",
  ALERTDIALOG: "alertdialog",
  TOOLTIP: "tooltip",
  PROGRESSBAR: "progressbar",
  STATUS: "status",
  ALERT: "alert",

  // Structure roles
  LIST: "list",
  LISTITEM: "listitem",
  TABLE: "table",
  ROWGROUP: "rowgroup",
  ROW: "row",
  COLUMNHEADER: "columnheader",
  ROWHEADER: "rowheader",
  CELL: "cell",
  DEFINITION: "definition",
  TERM: "term",
} as const;

// ============================================================================
// ARIA ATTRIBUTES
// ============================================================================

export const ARIA_ATTRIBUTES = {
  // Relationships
  ARIA_LABELLEDBY: "aria-labelledby",
  ARIA_DESCRIBEDBY: "aria-describedby",
  ARIA_OWNS: "aria-owns",
  ARIA_CONTROLS: "aria-controls",
  ARIA_FLOWTO: "aria-flowto",

  // Widget attributes
  ARIA_CHECKED: "aria-checked",
  ARIA_DISABLED: "aria-disabled",
  ARIA_EXPANDED: "aria-expanded",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_INVALID: "aria-invalid",
  ARIA_PRESSED: "aria-pressed",
  ARIA_READONLY: "aria-readonly",
  ARIA_REQUIRED: "aria-required",
  ARIA_SELECTED: "aria-selected",

  // Live region attributes
  ARIA_LIVE: "aria-live",
  ARIA_ATOMIC: "aria-atomic",
  ARIA_RELEVANT: "aria-relevant",
  ARIA_BUSY: "aria-busy",

  // Drag and drop
  ARIA_DROPEFFECT: "aria-dropeffect",
  ARIA_GRABBED: "aria-grabbed",

  // Range attributes
  ARIA_VALUEMIN: "aria-valuemin",
  ARIA_VALUEMAX: "aria-valuemax",
  ARIA_VALUENOW: "aria-valuenow",
  ARIA_VALUETEXT: "aria-valuetext",

  // Other
  ARIA_LABEL: "aria-label",
  ARIA_CURRENT: "aria-current",
  ARIA_SORT: "aria-sort",
  ARIA_ORIENTATION: "aria-orientation",
  ARIA_LEVEL: "aria-level",
  ARIA_POSINSET: "aria-posinset",
  ARIA_SETSIZE: "aria-setsize",
  ARIA_COLSPAN: "aria-colspan",
  ARIA_ROWSPAN: "aria-rowspan",
} as const;

// ============================================================================
// SEMANTIC HTML
// ============================================================================

export const SEMANTIC_HTML = {
  // Headings
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",

  // Text
  PARAGRAPH: "p",
  STRONG: "strong",
  EMPHASIS: "em",
  MARK: "mark",
  SMALL: "small",
  CODE: "code",
  PREFORMATTED: "pre",

  // Lists
  UNORDERED_LIST: "ul",
  ORDERED_LIST: "ol",
  LIST_ITEM: "li",
  DESCRIPTION_LIST: "dl",
  DESCRIPTION_TERM: "dt",
  DESCRIPTION_DEFINITION: "dd",

  // Sections
  ARTICLE: "article",
  ASIDE: "aside",
  SECTION: "section",
  HEADER: "header",
  FOOTER: "footer",
  MAIN: "main",
  NAV: "nav",

  // Tables
  TABLE: "table",
  THEAD: "thead",
  TBODY: "tbody",
  TFOOT: "tfoot",
  TR: "tr",
  TH: "th",
  TD: "td",
  CAPTION: "caption",
  COLGROUP: "colgroup",
  COL: "col",

  // Forms
  FORM: "form",
  FIELDSET: "fieldset",
  LEGEND: "legend",
  LABEL: "label",
  INPUT: "input",
  TEXTAREA: "textarea",
  SELECT: "select",
  OPTION: "option",
  BUTTON: "button",

  // Media
  FIGURE: "figure",
  FIGCAPTION: "figcaption",
  IMG: "img",
  VIDEO: "video",
  AUDIO: "audio",
  SOURCE: "source",
  TRACK: "track",

  // Links
  ANCHOR: "a",

  // Quotes
  BLOCKQUOTE: "blockquote",
  QUOTE: "q",
  CITE: "cite",
} as const;

// ============================================================================
// SCREEN READER TEXT
// ============================================================================

export const SR_ONLY_CLASS =
  "sr-only absolute w-px h-px p-0 -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0";

export function createScreenReaderText(text: string): string {
  return `<span class="${SR_ONLY_CLASS}">${text}</span>`;
}

// ============================================================================
// SKIP LINKS
// ============================================================================

export const SKIP_LINK_ID = "skip-to-main-content";
export const SKIP_LINK_CLASS =
  "absolute top-0 left-0 z-50 px-4 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 -translate-y-full focus:translate-y-0 transition-transform";

// ============================================================================
// COLOR CONTRAST UTILITIES
// ============================================================================

export function getContrastRatio(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const getLuminance = (rgb: [number, number, number]): number => {
    const [r, g, b] = rgb.map(val => {
      const v = val / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWCAGAA(
  ratio: number,
  isLargeText: boolean = false
): boolean {
  return isLargeText
    ? ratio >= CONTRAST_RATIOS.AA.large
    : ratio >= CONTRAST_RATIOS.AA.normal;
}

export function meetsWCAGAAA(
  ratio: number,
  isLargeText: boolean = false
): boolean {
  return isLargeText
    ? ratio >= CONTRAST_RATIOS.AAA.large
    : ratio >= CONTRAST_RATIOS.AAA.normal;
}

// ============================================================================
// MOTION PREFERENCES
// ============================================================================

export const MOTION_PREFERENCES = {
  REDUCE: "reduce",
  NO_PREFERENCE: "no-preference",
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function prefersColorSchemeDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// ============================================================================
// MINIMUM TOUCH TARGET SIZE
// ============================================================================

export const MIN_TOUCH_TARGET_SIZE = "44px"; // WCAG 2.1 Level AAA
export const MIN_CLICK_TARGET_SIZE = "32px"; // WCAG 2.1 Level AA

// ============================================================================
// ACCESSIBLE FORM HELPERS
// ============================================================================

export function createAccessibleFormField(
  id: string,
  label: string,
  error?: string
) {
  return {
    id,
    "aria-label": label,
    "aria-describedby": error ? `${id}-error` : undefined,
    "aria-invalid": error ? "true" : "false",
  };
}

// ============================================================================
// ACCESSIBLE BUTTON HELPERS
// ============================================================================

export function createAccessibleButton(
  label: string,
  disabled: boolean = false
) {
  return {
    "aria-label": label,
    "aria-disabled": disabled,
    disabled,
  };
}
