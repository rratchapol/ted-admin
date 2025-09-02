"use client";

import { Calendar, Home, Inbox, Search, Settings, Users, FileText, Image, Newspaper, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const menuItems = [
  {
    title: "แดชบอร์ด",
    url: "/",
    icon: Home,
  },
  {
    title: "จัดการผู้ใช้",
    url: "/users",
    icon: Users,
  },
  {
    title: "หน้าแรก/Popup",
    url: "/homepage",
    icon: Calendar,
  },
  {
    title: "จัดการแบนเนอร์",
    url: "/banners",
    icon: Image,
  },
  {
    title: "จัดการเนื้อหา",
    url: "/content",
    icon: FileText,
  },
  {
    title: "จัดการข่าวสาร",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "สถิติการเข้าชม",
    url: "/statistics",
    icon: BarChart3,
  },
  {
    title: "ระบบค้นหา",
    url: "/search",
    icon: Search,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <Inbox className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-semibold">CMS Admin</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
            <SidebarMenuButton asChild>
              <a href="/settings">
                <Settings className="h-4 w-4" />
                <span>ตั้งค่า</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
