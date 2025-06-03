import { Metadata } from "next";

import { cookies } from "next/headers";
import { Header } from "@/components/layouts/header-layout";
import { AppSidebar } from "@/components/layouts/sidebar-layout";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import "../globals.css";

export const metadata: Metadata = {
  title: "AGEST",
  description: "Gestão de Agências",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset className="px-5">
          <Header />
          <main className="py-2.5">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
