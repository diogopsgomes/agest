"use client";

import Link from "next/link";
import { FileText, FolderOpen, Home, Package, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppIcon } from "@/components/svg/app-icon";
import { AppWordmark } from "@/components/svg/app-wordmark";

const items = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Serviços",
    url: "/servicos",
    icon: Package,
  },
  {
    title: "Portfólio",
    url: "/portfolio",
    icon: FolderOpen,
  },
  {
    title: "Orçamentos",
    url: "/orcamentos",
    icon: FileText,
  },
  {
    title: "Utilizadores",
    url: "/utilizadores",
    icon: Users,
  },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <aside>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                onClick={() => setOpenMobile(false)}
              >
                <AppIcon />
                <AppWordmark className="w-12!" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                    >
                      <Link
                        href={item.url}
                        onClick={() => setOpenMobile(false)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </aside>
  );
}
