// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      isIconOnly
      onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="sm"
      className={className}
      aria-label="Toggle theme"
    >
      {mounted && (
        <Icon
          icon={theme === "dark" ? "gravity-ui:moon" : "gravity-ui:sun"}
        />
      )}
    </Button>
  );
}
