/**
 * MONSTER IPTV - Image System
 *
 * Centralized image component with lazy loading, error handling, and fallbacks.
 */

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// IMAGE TYPES
// ============================================================================

export type ImageVariant =
  | "poster"
  | "backdrop"
  | "avatar"
  | "logo"
  | "placeholder"
  | "thumbnail";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  variant?: ImageVariant;
  fallback?: string;
  loading?: "lazy" | "eager";
  onLoadComplete?: () => void;
  onError?: () => void;
}

// ============================================================================
// IMAGE COMPONENT
// ============================================================================

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      variant = "placeholder",
      fallback,
      loading = "lazy",
      onLoadComplete,
      onError,
      className,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [fallbackFailed, setFallbackFailed] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
      setImageSrc(src);
      setHasError(false);
      setFallbackFailed(false);
      setIsLoading(true);
    }, [src]);

    const handleLoad = () => {
      setIsLoading(false);
      onLoadComplete?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      if (fallback && imageSrc !== fallback) {
        setImageSrc(fallback);
      } else {
        setFallbackFailed(true);
      }
      onError?.();
    };

    const variantClasses = {
      poster: "aspect-video object-cover",
      backdrop: "w-full h-64 object-cover",
      avatar: "w-10 h-10 rounded-full object-cover",
      logo: "h-8 object-contain",
      placeholder: "w-full h-auto object-contain",
      thumbnail: "w-full h-32 object-cover",
    };

    return (
      <div
        className="relative overflow-hidden"
        aria-busy={isLoading}
        data-image-state={
          isLoading ? "loading" : fallbackFailed ? "fallback-failed" : "ready"
        }
      >
        {isLoading && (
          <Skeleton
            className={cn("absolute inset-0", variantClasses[variant])}
          />
        )}
        <img
          ref={ref}
          src={imageSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            variantClasses[variant],
            className
          )}
          {...props}
        />
        {hasError && (!fallback || fallbackFailed) && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted px-3 text-center">
            <span className="text-xs text-muted-foreground" role="status">
              Image not available
            </span>
          </div>
        )}
      </div>
    );
  }
);
Image.displayName = "Image";

// ============================================================================
// POSTER IMAGE
// ============================================================================

interface PosterProps extends Omit<ImageProps, "variant"> {
  title?: string;
}

export const Poster = React.forwardRef<HTMLImageElement, PosterProps>(
  ({ title, alt, ...props }, ref) => (
    <Image
      ref={ref}
      variant="poster"
      alt={alt || title || "Poster"}
      {...props}
    />
  )
);
Poster.displayName = "Poster";

// ============================================================================
// BACKDROP IMAGE
// ============================================================================

interface BackdropProps extends Omit<ImageProps, "variant"> {
  overlay?: boolean;
  overlayOpacity?: number;
}

export const Backdrop = React.forwardRef<HTMLImageElement, BackdropProps>(
  ({ overlay = true, overlayOpacity = 0.4, className, ...props }, ref) => (
    <div className="relative">
      <Image
        ref={ref}
        variant="backdrop"
        className={cn("w-full", className)}
        {...props}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  )
);
Backdrop.displayName = "Backdrop";

// ============================================================================
// AVATAR IMAGE
// ============================================================================

interface AvatarImageProps extends Omit<ImageProps, "variant"> {
  size?: "sm" | "md" | "lg";
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    return (
      <Image
        ref={ref}
        variant="avatar"
        className={cn("rounded-full", sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

// ============================================================================
// LOGO IMAGE
// ============================================================================

interface LogoProps extends Omit<ImageProps, "variant"> {
  size?: "sm" | "md" | "lg";
}

export const LogoImage = React.forwardRef<HTMLImageElement, LogoProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-6",
      md: "h-8",
      lg: "h-10",
    };

    return (
      <Image
        ref={ref}
        variant="logo"
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
LogoImage.displayName = "LogoImage";

// ============================================================================
// THUMBNAIL IMAGE
// ============================================================================

interface ThumbnailProps extends Omit<ImageProps, "variant"> {
  title?: string;
}

export const Thumbnail = React.forwardRef<HTMLImageElement, ThumbnailProps>(
  ({ title, alt, ...props }, ref) => (
    <Image
      ref={ref}
      variant="thumbnail"
      alt={alt || title || "Thumbnail"}
      {...props}
    />
  )
);
Thumbnail.displayName = "Thumbnail";
