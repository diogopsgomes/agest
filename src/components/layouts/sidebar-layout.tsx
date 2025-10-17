"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  ChevronsUpDown,
  FileText,
  FolderOpen,
  Home,
  LogOut,
  Package,
  User,
  Users,
} from "lucide-react";

import Link from "next/link";
import { AppIcon } from "@/components/svg/app-icon";
import { AppWordmark } from "@/components/svg/app-wordmark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
  const { isMobile } = useSidebar();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const user = {
      id: Cookies.get("id") || "",
      name: Cookies.get("name") || "",
      email: Cookies.get("email") || "",
    };

    setUser(user);
  }, []);

  return (
    <aside>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/"
                  onClick={() => setOpenMobile(false)}
                  aria-label="AGEST"
                >
                  <AppIcon />
                  <AppWordmark className="w-12!" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        <User />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link
                    href={`/utilizadores/${user.id}`}
                    onClick={() => setOpenMobile(false)}
                  >
                    <DropdownMenuItem>
                      <User />
                      Perfil
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link
                    href="/entrar"
                    onClick={() => {
                      document.cookie =
                        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      document.cookie =
                        "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      document.cookie =
                        "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      document.cookie =
                        "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                      toast.success("Sessão terminada com sucesso!");
                      setOpenMobile(false);
                    }}
                  >
                    <DropdownMenuItem>
                      <LogOut />
                      Sair
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </aside>
  );
}
