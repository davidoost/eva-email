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

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      isIconOnly
      onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="sm"
      className={className}
    >
      <Icon
        icon={theme === "dark" ? `hugeicons:moon-02` : `hugeicons:sun-01`}
      />
    </Button>
  );
}
