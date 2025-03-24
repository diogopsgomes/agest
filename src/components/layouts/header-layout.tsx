"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { AppBreadcrumb } from "@/components/layouts/breadcrumb-layout";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-2 py-1.5">
      <div className="flex items-center gap-2 sm:h-4">
        <SidebarTrigger className="sm:hidden" />
        <Separator
          orientation="vertical"
          className="mr-2 sm:hidden"
        />
        <AppBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
