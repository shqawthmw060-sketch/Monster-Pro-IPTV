/**
 * MONSTER IPTV layout foundation — deep-space surfaces, electric-blue accents,
 * logical properties, and TV-scale focus-friendly primitives for RTL/LTR parity.
 */

import React from "react";
import { SPACING } from "@/config/design-system";
import { cn } from "@/lib/utils";

export type LayoutSpacing = keyof typeof SPACING | string;
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type FlexJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly"
  | "stretch";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type LayoutWidth = "full" | "auto" | "screen" | "fit" | "min" | "max";
export type LayoutMaxWidth =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "screen-sm"
  | "screen-md"
  | "screen-lg"
  | "screen-xl"
  | "screen-2xl";
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface FlexLayoutProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: LayoutSpacing;
  rowGap?: LayoutSpacing;
  columnGap?: LayoutSpacing;
  wrap?: boolean | "reverse";
  width?: LayoutWidth | string;
  maxWidth?: LayoutMaxWidth | string;
  padding?: LayoutSpacing;
  responsiveDirection?: Partial<Record<Breakpoint, FlexDirection>>;
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full" | "content" | "wide";
}

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "minimal";
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "elevated" | "muted";
  spacing?: "sm" | "md" | "lg" | "xl";
}

export interface ColumnProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FlexLayoutProps {
  children?: React.ReactNode;
}

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FlexLayoutProps {
  direction?: "row" | "row-reverse";
}

export interface StackProps extends Omit<ColumnProps, "direction"> {
  direction?: "column" | "column-reverse";
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Legacy alias retained for existing callers. */
  cols?: number;
  /** Preferred name for the number of columns. */
  columns?: number;
  gap?: LayoutSpacing;
  rowGap?: LayoutSpacing;
  columnGap?: LayoutSpacing;
  responsive?: boolean;
  responsiveColumns?: Partial<Record<"base" | Breakpoint, number>>;
  width?: LayoutWidth | string;
  maxWidth?: LayoutMaxWidth | string;
  padding?: LayoutSpacing;
}

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  direction?: "vertical" | "horizontal";
}

const alignClasses: Record<FlexAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses: Record<FlexJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
  stretch: "justify-stretch",
};

const directionClasses: Record<FlexDirection, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  column: "flex-col",
  "column-reverse": "flex-col-reverse",
};

const responsiveDirectionClasses: Record<
  Breakpoint,
  Record<FlexDirection, string>
> = {
  sm: {
    row: "sm:flex-row",
    "row-reverse": "sm:flex-row-reverse",
    column: "sm:flex-col",
    "column-reverse": "sm:flex-col-reverse",
  },
  md: {
    row: "md:flex-row",
    "row-reverse": "md:flex-row-reverse",
    column: "md:flex-col",
    "column-reverse": "md:flex-col-reverse",
  },
  lg: {
    row: "lg:flex-row",
    "row-reverse": "lg:flex-row-reverse",
    column: "lg:flex-col",
    "column-reverse": "lg:flex-col-reverse",
  },
  xl: {
    row: "xl:flex-row",
    "row-reverse": "xl:flex-row-reverse",
    column: "xl:flex-col",
    "column-reverse": "xl:flex-col-reverse",
  },
  "2xl": {
    row: "2xl:flex-row",
    "row-reverse": "2xl:flex-row-reverse",
    column: "2xl:flex-col",
    "column-reverse": "2xl:flex-col-reverse",
  },
};

const widthClasses: Record<string, string> = {
  full: "w-full",
  auto: "w-auto",
  screen: "w-screen",
  fit: "w-fit",
  min: "w-min",
  max: "w-max",
};

const maxWidthClasses: Record<string, string> = {
  none: "max-w-none",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  "screen-sm": "max-w-screen-sm",
  "screen-md": "max-w-screen-md",
  "screen-lg": "max-w-screen-lg",
  "screen-xl": "max-w-screen-xl",
  "screen-2xl": "max-w-screen-2xl",
};

const spacingClasses: Record<string, string> = {
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-12",
  "3xl": "p-16",
  "4xl": "p-24",
};

const resolveToken = (value?: LayoutSpacing) => {
  if (!value) return undefined;
  return value in SPACING ? SPACING[value as keyof typeof SPACING] : value;
};

const layoutStyle = (
  gap?: LayoutSpacing,
  rowGap?: LayoutSpacing,
  columnGap?: LayoutSpacing
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  const resolvedGap = resolveToken(gap);
  const resolvedRowGap = resolveToken(rowGap);
  const resolvedColumnGap = resolveToken(columnGap);

  if (resolvedGap) style.gap = resolvedGap;
  if (resolvedRowGap) style.rowGap = resolvedRowGap;
  if (resolvedColumnGap) style.columnGap = resolvedColumnGap;

  return style;
};

const flexClasses = ({
  direction = "column",
  align = "stretch",
  justify = "start",
  wrap = false,
  width = "full",
  maxWidth,
  padding,
  responsiveDirection,
}: FlexLayoutProps) =>
  cn(
    "flex min-w-0",
    directionClasses[direction],
    alignClasses[align],
    justifyClasses[justify],
    wrap === true && "flex-wrap",
    wrap === "reverse" && "flex-wrap-reverse",
    widthClasses[width],
    !widthClasses[width] && width,
    maxWidthClasses[maxWidth ?? ""] ?? maxWidth,
    spacingClasses[padding ?? ""],
    responsiveDirection &&
      Object.entries(responsiveDirection).map(([breakpoint, value]) => {
        const bp = breakpoint as Breakpoint;
        return responsiveDirectionClasses[bp]?.[value as FlexDirection];
      })
  );

const Flex = React.forwardRef<HTMLDivElement, ColumnProps>(function Flex(
  {
    children,
    className,
    style,
    direction,
    align,
    justify,
    gap,
    rowGap,
    columnGap,
    wrap,
    width,
    maxWidth,
    padding,
    responsiveDirection,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        flexClasses({
          direction,
          align,
          justify,
          wrap,
          width,
          maxWidth,
          padding,
          responsiveDirection,
        }),
        className
      )}
      style={{ ...layoutStyle(gap, rowGap, columnGap), ...style }}
      {...props}
    >
      {children}
    </div>
  );
});
Flex.displayName = "Flex";

/** Vertical layout primitive with direction, gap, alignment, justification, and responsive controls. */
export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  function Column(
    { direction = "column", gap = "md", align = "start", ...props },
    ref
  ) {
    return (
      <Flex
        ref={ref}
        direction={direction}
        gap={gap}
        align={align}
        {...props}
      />
    );
  }
);
Column.displayName = "Column";

/** Semantic vertical stack alias; implementation remains centralized in Column. */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  function Stack(
    {
      direction = "column",
      gap = "md",
      align = "start",
      justify = "start",
      ...props
    },
    ref
  ) {
    return (
      <Column
        ref={ref}
        direction={direction}
        gap={gap}
        align={align}
        justify={justify}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

/** Horizontal layout primitive with optional wrapping and logical alignment controls. */
export const Row = React.forwardRef<HTMLDivElement, RowProps>(function Row(
  {
    direction = "row",
    gap = "md",
    align = "center",
    justify = "start",
    wrap = false,
    ...props
  },
  ref
) {
  return (
    <Flex
      ref={ref}
      direction={direction}
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      {...props}
    />
  );
});
Row.displayName = "Row";

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ className, size = "lg", ...props }, ref) {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      content: "max-w-4xl",
      wide: "max-w-7xl",
      full: "max-w-none",
    };

    return (
      <div
        ref={ref}
        className={cn("container w-full", sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export const Page = React.forwardRef<HTMLDivElement, PageProps>(function Page(
  { className, variant = "default", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "min-h-screen w-full",
        variant === "default" && "bg-background",
        className
      )}
      {...props}
    />
  );
});
Page.displayName = "Page";

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section(
    { className, variant = "default", spacing = "lg", ...props },
    ref
  ) {
    const spacingClasses = {
      sm: "py-8 px-4",
      md: "py-12 px-4",
      lg: "py-16 px-4",
      xl: "py-24 px-4",
    };
    const variantClasses = {
      default: "bg-background",
      elevated: "bg-surface",
      muted: "bg-surface/50",
    };

    return (
      <section
        ref={ref}
        className={cn(
          spacingClasses[spacing],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

const clampColumns = (value: number | undefined) =>
  Math.max(1, Math.min(12, Math.round(value ?? 1)));

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    className,
    style,
    cols,
    columns,
    gap = "md",
    rowGap,
    columnGap,
    responsive = true,
    responsiveColumns,
    width = "full",
    maxWidth,
    padding,
    ...props
  },
  ref
) {
  const baseColumns = clampColumns(
    responsiveColumns?.base ?? columns ?? cols ?? 3
  );
  const responsiveValues = {
    base: baseColumns,
    sm: responsiveColumns?.sm ?? (responsive ? 2 : undefined),
    md: responsiveColumns?.md,
    lg: responsiveColumns?.lg ?? (responsive ? 3 : undefined),
    xl: responsiveColumns?.xl ?? (responsive ? 4 : undefined),
    "2xl": responsiveColumns?.["2xl"],
  };

  const gridVariables = {
    "--grid-cols-base": baseColumns,
    ...(responsiveValues.sm
      ? { "--grid-cols-sm": clampColumns(responsiveValues.sm) }
      : {}),
    ...(responsiveValues.md
      ? { "--grid-cols-md": clampColumns(responsiveValues.md) }
      : {}),
    ...(responsiveValues.lg
      ? { "--grid-cols-lg": clampColumns(responsiveValues.lg) }
      : {}),
    ...(responsiveValues.xl
      ? { "--grid-cols-xl": clampColumns(responsiveValues.xl) }
      : {}),
    ...(responsiveValues["2xl"]
      ? { "--grid-cols-2xl": clampColumns(responsiveValues["2xl"]) }
      : {}),
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-0 grid-responsive-foundation",
        widthClasses[width],
        !widthClasses[width] && width,
        maxWidthClasses[maxWidth ?? ""] ?? maxWidth,
        spacingClasses[padding ?? ""],
        className
      )}
      style={{
        ...gridVariables,
        ...layoutStyle(gap, rowGap, columnGap),
        ...style,
      }}
      {...props}
    />
  );
});
Grid.displayName = "Grid";

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  function Spacer(
    { className, size = "md", direction = "vertical", ...props },
    ref
  ) {
    const sizeClasses = {
      xs: direction === "vertical" ? "h-1" : "w-1",
      sm: direction === "vertical" ? "h-2" : "w-2",
      md: direction === "vertical" ? "h-4" : "w-4",
      lg: direction === "vertical" ? "h-6" : "w-6",
      xl: direction === "vertical" ? "h-8" : "w-8",
      "2xl": direction === "vertical" ? "h-12" : "w-12",
    };

    return (
      <div ref={ref} className={cn(sizeClasses[size], className)} {...props} />
    );
  }
);
Spacer.displayName = "Spacer";
