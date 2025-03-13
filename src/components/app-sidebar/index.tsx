import Image from "next/image";
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
  return (
    <aside>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <a href="/">
                <AppIcon />
                <AppWordmark className="w-12!" />
              </a>
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
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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
