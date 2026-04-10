"use client";

import { Toast } from "@heroui/react";
import { RouterProvider } from "react-aria-components";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import "@/lib/iconify";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toast.Provider placement="bottom end" />
        {children}
      </ThemeProvider>
    </RouterProvider>
  );
}
