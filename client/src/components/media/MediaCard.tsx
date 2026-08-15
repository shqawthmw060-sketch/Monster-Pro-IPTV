/**
 * MONSTER IPTV media foundation — poster-led cards with electric-blue focus,
 * accessible activation, and no fabricated content or ratings.
 */

import React from "react";
import { Play, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/image/Image";
import { cn } from "@/lib/utils";

export interface MediaCardProps {
  title: string;
  poster: string;
  alt?: string;
  type?: "movie" | "series" | "channel";
  rating?: number;
  meta?: string;
  description?: string;
  live?: boolean;
  className?: string;
  onSelect?: () => void;
}

const typeLabels: Record<NonNullable<MediaCardProps["type"]>, string> = {
  movie: "Movie",
  series: "Series",
  channel: "Channel",
};

export function MediaCard({
  title,
  poster,
  alt,
  type,
  rating,
  meta,
  description,
  live = false,
  className,
  onSelect,
}: MediaCardProps) {
  const interactive = Boolean(onSelect);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onSelect || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onSelect();
  };

  return (
    <Card
      className={cn(
        "group min-w-0 overflow-hidden border-border/70 bg-card transition-[transform,box-shadow,border-color] duration-200",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-lg focus-visible:border-brand focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand)_24%,transparent)]",
        className
      )}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Open ${title}` : undefined}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <Image
          src={poster}
          alt={alt ?? `${title} poster`}
          variant="poster"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {live ? (
            <Badge variant="destructive">Live</Badge>
          ) : type ? (
            <Badge variant="secondary">{typeLabels[type]}</Badge>
          ) : null}
          {typeof rating === "number" ? (
            <Badge className="gap-1 bg-black/70 text-white backdrop-blur-sm">
              <Star aria-hidden="true" className="size-3 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </Badge>
          ) : null}
        </div>
        {interactive ? (
          <span className="absolute bottom-3 end-3 inline-flex size-9 items-center justify-center rounded-full bg-brand text-brand-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Play aria-hidden="true" className="ms-0.5 size-4 fill-current" />
            <span className="sr-only">Open {title}</span>
          </span>
        ) : null}
      </div>
      <CardContent className="space-y-1.5 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-card-foreground">
          {title}
        </h3>
        {meta ? <p className="text-xs text-muted-foreground">{meta}</p> : null}
        {description ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
