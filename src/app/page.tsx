"use client";

import { AppSidebar } from "@/components/layout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, FileText, Image, Newspaper, Eye, Search, TrendingUp, TrendingDown } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "ผู้ใช้งานทั้งหมด",
      value: "248",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "บทความที่เผยแพร่",
      value: "1,234",
      change: "+8%",
      changeType: "positive" as const,
      icon: FileText,
    },
    {
      title: "แบนเนอร์ที่ใช้งาน",
      value: "12",
      change: "0%",
      changeType: "neutral" as const,
      icon: Image,
    },
    {
      title: "ข่าวสารใหม่",
      value: "56",
      change: "+23%",
      changeType: "positive" as const,
      icon: Newspaper,
    },
    {
      title: "การเข้าชมวันนี้",
      value: "8,345",
      change: "+15%",
      changeType: "positive" as const,
      icon: Eye,
    },
    {
      title: "การค้นหาทั้งหมด",
      value: "1,890",
      change: "+7%",
      changeType: "positive" as const,
      icon: Search,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      หน้าแรก
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>แดชบอร์ด</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">แดชบอร์ด</h1>
              <p className="text-muted-foreground">
                ภาพรวมของระบบจัดการเนื้อหา
              </p>
            </div>

            {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="ml-1">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>การดำเนินการล่าสุด</CardTitle>
                  <CardDescription>
                    กิจกรรมที่เกิดขึ้นใหม่ในระบบ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">เพิ่มบทความใหม่: "ข่าวประชาสัมพันธ์"</p>
                        <p className="text-xs text-muted-foreground">5 นาทีที่แล้ว</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">อัพเดทแบนเนอร์หน้าแรก</p>
                        <p className="text-xs text-muted-foreground">15 นาทีที่แล้ว</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">ผู้ใช้ใหม่ลงทะเบียน</p>
                        <p className="text-xs text-muted-foreground">30 นาทีที่แล้ว</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>สถิติการเข้าชม</CardTitle>
                  <CardDescription>
                    ข้อมูลการเข้าชมเว็บไซต์ในช่วง 7 วันที่ผ่านมา
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">หน้าแรก</span>
                      <span className="text-sm font-medium">12,345 ครั้ง</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ข่าวสาร</span>
                      <span className="text-sm font-medium">8,234 ครั้ง</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">เอกสาร</span>
                      <span className="text-sm font-medium">5,123 ครั้ง</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ติดต่อ</span>
                      <span className="text-sm font-medium">2,456 ครั้ง</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="bg-primary hover:bg-primary/90">
                เพิ่มข่าวสาร
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                จัดการเนื้อหา
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                ดูสถิติ
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
