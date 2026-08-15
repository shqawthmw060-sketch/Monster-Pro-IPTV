/**
 * MONSTER IPTV form foundation — password visibility control with explicit labels,
 * logical end positioning, and keyboard-accessible interaction.
 */

import React, { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type"> {
  showLabel?: string;
  hideLabel?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(
  {
    className,
    id: providedId,
    showLabel = "Show password",
    hideLabel = "Hide password",
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = providedId ?? `password-${generatedId}`;
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        ref={ref}
        id={inputId}
        type={visible ? "text" : "password"}
        className={cn("pe-11", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute end-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        aria-controls={inputId}
        onClick={() => setVisible(current => !current)}
      >
        {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </Button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";
