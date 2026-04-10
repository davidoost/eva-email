"use client";

import { buttonVariants } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";

export default function Navigation() {
  const pathname = usePathname();


  return (
    <nav className="w-full flex items-center justify-between p-4">
      <Image src="/email-logo.png" height={32} width={100} alt="EVA Email" className="dark:hidden" />
      <Image src="/email-logo-dark.png" height={32} width={100} alt="EVA Email" className="hidden dark:block" />

      <div className="flex items-center gap-2">
        <Link
          href={`/`}
          className={buttonVariants({
            variant: pathname === "/" ? "tertiary" : "ghost",
          })}
        >
          Getting Started
        </Link>
        <Link
          href={`/templates`}
          className={buttonVariants({
            variant: pathname.startsWith("/templates") ? "tertiary" : "ghost",
          })}
        >
          Templates
        </Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
