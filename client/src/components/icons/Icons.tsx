/**
 * MONSTER IPTV - Icon System
 *
 * Centralized icon components using lucide-react.
 * All icons are imported from lucide-react and wrapped for consistency.
 */

import React from "react";
import {
  Home,
  Play,
  Tv,
  Film,
  Zap,
  Search,
  Heart,
  Bookmark,
  Clock,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Star,
  Share2,
  Download,
  MoreVertical,
  MoreHorizontal,
  Bell,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  Loader,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Play as PlayIcon,
  Pause,
  Volume,
  Subtitles,
  Settings as SettingsIcon,
  Wifi,
  WifiOff,
  Smartphone,
  Monitor,
  Tv as TvIcon,
  Calendar,
  Clock as ClockIcon,
  MapPin,
  Mail,
  Phone,
  Globe,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { cn } from "@/lib/utils";

// ============================================================================
// ICON WRAPPER
// ============================================================================

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

export const IconWrapper = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeValue = sizeMap[size];
    return (
      <svg
        ref={ref}
        width={sizeValue}
        height={sizeValue}
        className={cn("inline-block", className)}
        {...props}
      />
    );
  }
);
IconWrapper.displayName = "IconWrapper";

// ============================================================================
// NAVIGATION ICONS
// ============================================================================

export const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Home ref={ref} size={sizeMap[size]} {...props} />
  )
);
HomeIcon.displayName = "HomeIcon";

export const PlayIcon_ = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Play ref={ref} size={sizeMap[size]} {...props} />
  )
);
PlayIcon_.displayName = "PlayIcon";

export const TvIcon_ = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Tv ref={ref} size={sizeMap[size]} {...props} />
  )
);
TvIcon_.displayName = "TvIcon";

export const FilmIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Film ref={ref} size={sizeMap[size]} {...props} />
  )
);
FilmIcon.displayName = "FilmIcon";

export const SearchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Search ref={ref} size={sizeMap[size]} {...props} />
  )
);
SearchIcon.displayName = "SearchIcon";

export const HeartIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Heart ref={ref} size={sizeMap[size]} {...props} />
  )
);
HeartIcon.displayName = "HeartIcon";

export const BookmarkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Bookmark ref={ref} size={sizeMap[size]} {...props} />
  )
);
BookmarkIcon.displayName = "BookmarkIcon";

export const ClockIcon_ = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Clock ref={ref} size={sizeMap[size]} {...props} />
  )
);
ClockIcon_.displayName = "ClockIcon";

export const UserIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <User ref={ref} size={sizeMap[size]} {...props} />
  )
);
UserIcon.displayName = "UserIcon";

export const SettingsIcon_ = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Settings ref={ref} size={sizeMap[size]} {...props} />
  )
);
SettingsIcon_.displayName = "SettingsIcon";

export const LogOutIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <LogOut ref={ref} size={sizeMap[size]} {...props} />
  )
);
LogOutIcon.displayName = "LogOutIcon";

// ============================================================================
// UI ICONS
// ============================================================================

export const MenuIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Menu ref={ref} size={sizeMap[size]} {...props} />
  )
);
MenuIcon.displayName = "MenuIcon";

export const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <X ref={ref} size={sizeMap[size]} {...props} />
  )
);
CloseIcon.displayName = "CloseIcon";

export const ChevronRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ChevronRight ref={ref} size={sizeMap[size]} {...props} />
  )
);
ChevronRightIcon.displayName = "ChevronRightIcon";

export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ChevronLeft ref={ref} size={sizeMap[size]} {...props} />
  )
);
ChevronLeftIcon.displayName = "ChevronLeftIcon";

export const ChevronDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ChevronDown ref={ref} size={sizeMap[size]} {...props} />
  )
);
ChevronDownIcon.displayName = "ChevronDownIcon";

export const ChevronUpIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ChevronUp ref={ref} size={sizeMap[size]} {...props} />
  )
);
ChevronUpIcon.displayName = "ChevronUpIcon";

export const StarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Star ref={ref} size={sizeMap[size]} {...props} />
  )
);
StarIcon.displayName = "StarIcon";

export const ShareIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Share2 ref={ref} size={sizeMap[size]} {...props} />
  )
);
ShareIcon.displayName = "ShareIcon";

export const DownloadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Download ref={ref} size={sizeMap[size]} {...props} />
  )
);
DownloadIcon.displayName = "DownloadIcon";

export const MoreVerticalIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <MoreVertical ref={ref} size={sizeMap[size]} {...props} />
  )
);
MoreVerticalIcon.displayName = "MoreVerticalIcon";

export const MoreHorizontalIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <MoreHorizontal ref={ref} size={sizeMap[size]} {...props} />
  )
);
MoreHorizontalIcon.displayName = "MoreHorizontalIcon";

export const BellIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Bell ref={ref} size={sizeMap[size]} {...props} />
  )
);
BellIcon.displayName = "BellIcon";

export const EyeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Eye ref={ref} size={sizeMap[size]} {...props} />
  )
);
EyeIcon.displayName = "EyeIcon";

export const EyeOffIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <EyeOff ref={ref} size={sizeMap[size]} {...props} />
  )
);
EyeOffIcon.displayName = "EyeOffIcon";

export const LockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Lock ref={ref} size={sizeMap[size]} {...props} />
  )
);
LockIcon.displayName = "LockIcon";

export const UnlockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Unlock ref={ref} size={sizeMap[size]} {...props} />
  )
);
UnlockIcon.displayName = "UnlockIcon";

export const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Check ref={ref} size={sizeMap[size]} {...props} />
  )
);
CheckIcon.displayName = "CheckIcon";

export const AlertIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <AlertCircle ref={ref} size={sizeMap[size]} {...props} />
  )
);
AlertIcon.displayName = "AlertIcon";

export const InfoIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Info ref={ref} size={sizeMap[size]} {...props} />
  )
);
InfoIcon.displayName = "InfoIcon";

export const HelpIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <HelpCircle ref={ref} size={sizeMap[size]} {...props} />
  )
);
HelpIcon.displayName = "HelpIcon";

export const LoaderIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Loader ref={ref} size={sizeMap[size]} {...props} />
  )
);
LoaderIcon.displayName = "LoaderIcon";

// ============================================================================
// PLAYER ICONS
// ============================================================================

export const VolumeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Volume2 ref={ref} size={sizeMap[size]} {...props} />
  )
);
VolumeIcon.displayName = "VolumeIcon";

export const VolumeMutedIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <VolumeX ref={ref} size={sizeMap[size]} {...props} />
  )
);
VolumeMutedIcon.displayName = "VolumeMutedIcon";

export const MaximizeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Maximize ref={ref} size={sizeMap[size]} {...props} />
  )
);
MaximizeIcon.displayName = "MaximizeIcon";

export const MinimizeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Minimize ref={ref} size={sizeMap[size]} {...props} />
  )
);
MinimizeIcon.displayName = "MinimizeIcon";

export const SkipBackIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <SkipBack ref={ref} size={sizeMap[size]} {...props} />
  )
);
SkipBackIcon.displayName = "SkipBackIcon";

export const SkipForwardIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <SkipForward ref={ref} size={sizeMap[size]} {...props} />
  )
);
SkipForwardIcon.displayName = "SkipForwardIcon";

export const PauseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Pause ref={ref} size={sizeMap[size]} {...props} />
  )
);
PauseIcon.displayName = "PauseIcon";

export const SubtitlesIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Subtitles ref={ref} size={sizeMap[size]} {...props} />
  )
);
SubtitlesIcon.displayName = "SubtitlesIcon";

// ============================================================================
// DEVICE ICONS
// ============================================================================

export const SmartphoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Smartphone ref={ref} size={sizeMap[size]} {...props} />
  )
);
SmartphoneIcon.displayName = "SmartphoneIcon";

export const MonitorIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Monitor ref={ref} size={sizeMap[size]} {...props} />
  )
);
MonitorIcon.displayName = "MonitorIcon";

export const TvDeviceIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <TvIcon ref={ref} size={sizeMap[size]} {...props} />
  )
);
TvDeviceIcon.displayName = "TvDeviceIcon";

// ============================================================================
// UTILITY ICONS
// ============================================================================

export const CalendarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Calendar ref={ref} size={sizeMap[size]} {...props} />
  )
);
CalendarIcon.displayName = "CalendarIcon";

export const MapPinIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <MapPin ref={ref} size={sizeMap[size]} {...props} />
  )
);
MapPinIcon.displayName = "MapPinIcon";

export const MailIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Mail ref={ref} size={sizeMap[size]} {...props} />
  )
);
MailIcon.displayName = "MailIcon";

export const PhoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Phone ref={ref} size={sizeMap[size]} {...props} />
  )
);
PhoneIcon.displayName = "PhoneIcon";

export const GlobeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Globe ref={ref} size={sizeMap[size]} {...props} />
  )
);
GlobeIcon.displayName = "GlobeIcon";

export const TrashIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Trash2 ref={ref} size={sizeMap[size]} {...props} />
  )
);
TrashIcon.displayName = "TrashIcon";

export const EditIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Edit ref={ref} size={sizeMap[size]} {...props} />
  )
);
EditIcon.displayName = "EditIcon";

export const CopyIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Copy ref={ref} size={sizeMap[size]} {...props} />
  )
);
CopyIcon.displayName = "CopyIcon";

export const ExternalLinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ExternalLink ref={ref} size={sizeMap[size]} {...props} />
  )
);
ExternalLinkIcon.displayName = "ExternalLinkIcon";

export const ArrowRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ArrowRight ref={ref} size={sizeMap[size]} {...props} />
  )
);
ArrowRightIcon.displayName = "ArrowRightIcon";

export const ArrowLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ArrowLeft ref={ref} size={sizeMap[size]} {...props} />
  )
);
ArrowLeftIcon.displayName = "ArrowLeftIcon";

export const ArrowUpIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ArrowUp ref={ref} size={sizeMap[size]} {...props} />
  )
);
ArrowUpIcon.displayName = "ArrowUpIcon";

export const ArrowDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <ArrowDown ref={ref} size={sizeMap[size]} {...props} />
  )
);
ArrowDownIcon.displayName = "ArrowDownIcon";

export const WifiIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Wifi ref={ref} size={sizeMap[size]} {...props} />
  )
);
WifiIcon.displayName = "WifiIcon";

export const WifiOffIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <WifiOff ref={ref} size={sizeMap[size]} {...props} />
  )
);
WifiOffIcon.displayName = "WifiOffIcon";

export const ZapIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = "md", ...props }, ref) => (
    <Zap ref={ref} size={sizeMap[size]} {...props} />
  )
);
ZapIcon.displayName = "ZapIcon";
