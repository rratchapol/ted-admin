"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Eye, Download, Users, TrendingUp, BarChart3, Globe, FileText } from "lucide-react";

interface PageVisit {
  id: number;
  page: string;
  url: string;
  visits: number;
  uniqueVisitors: number;
  avgTimeOnPage: string;
  bounceRate: string;
  downloads: number;
}

interface FileDownload {
  id: number;
  fileName: string;
  fileType: string;
  downloads: number;
  page: string;
  lastDownload: string;
}

interface VisitorStats {
  date: string;
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

const mockPageVisits: PageVisit[] = [
  {
    id: 1,
    page: "หน้าแรก",
    url: "/",
    visits: 15420,
    uniqueVisitors: 8934,
    avgTimeOnPage: "02:45",
    bounceRate: "34.2%",
    downloads: 0,
  },
  {
    id: 2,
    page: "ข่าวสาร",
    url: "/news",
    visits: 8765,
    uniqueVisitors: 5432,
    avgTimeOnPage: "03:22",
    bounceRate: "28.7%",
    downloads: 234,
  },
  {
    id: 3,
    page: "เอกสารดาวน์โหลด",
    url: "/documents",
    visits: 5234,
    uniqueVisitors: 3876,
    avgTimeOnPage: "01:58",
    bounceRate: "45.6%",
    downloads: 1567,
  },
  {
    id: 4,
    page: "ติดต่อเรา",
    url: "/contact",
    visits: 3456,
    uniqueVisitors: 2987,
    avgTimeOnPage: "01:23",
    bounceRate: "52.3%",
    downloads: 12,
  },
  {
    id: 5,
    page: "เกี่ยวกับเรา",
    url: "/about",
    visits: 2345,
    uniqueVisitors: 1876,
    avgTimeOnPage: "02:15",
    bounceRate: "38.9%",
    downloads: 45,
  },
];

const mockFileDownloads: FileDownload[] = [
  {
    id: 1,
    fileName: "คู่มือการใช้งาน.pdf",
    fileType: "PDF",
    downloads: 1245,
    page: "เอกสาร",
    lastDownload: "2024-03-15 14:30",
  },
  {
    id: 2,
    fileName: "แบบฟอร์มสมัคร.docx",
    fileType: "DOCX",
    downloads: 892,
    page: "ข่าวสาร",
    lastDownload: "2024-03-15 13:45",
  },
  {
    id: 3,
    fileName: "ตารางกิจกรรม.xlsx",
    fileType: "XLSX",
    downloads: 567,
    page: "กิจกรรม",
    lastDownload: "2024-03-15 11:20",
  },
  {
    id: 4,
    fileName: "งบประมาณ.pdf",
    fileType: "PDF",
    downloads: 345,
    page: "การเงิน",
    lastDownload: "2024-03-15 09:15",
  },
  {
    id: 5,
    fileName: "รูปภาพกิจกรรม.zip",
    fileType: "ZIP",
    downloads: 234,
    page: "แกลเลอรี่",
    lastDownload: "2024-03-14 16:40",
  },
];

const mockVisitorStats: VisitorStats[] = [
  { date: "2024-03-15", visits: 1245, uniqueVisitors: 834, pageViews: 2890 },
  { date: "2024-03-14", visits: 1156, uniqueVisitors: 756, pageViews: 2654 },
  { date: "2024-03-13", visits: 1398, uniqueVisitors: 923, pageViews: 3124 },
  { date: "2024-03-12", visits: 1089, uniqueVisitors: 645, pageViews: 2456 },
  { date: "2024-03-11", visits: 1567, uniqueVisitors: 1034, pageViews: 3567 },
  { date: "2024-03-10", visits: 1234, uniqueVisitors: 789, pageViews: 2890 },
  { date: "2024-03-09", visits: 1098, uniqueVisitors: 678, pageViews: 2456 },
];

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedPage, setSelectedPage] = useState("all");

  const totalVisits = mockPageVisits.reduce((sum, page) => sum + page.visits, 0);
  const totalUniqueVisitors = mockPageVisits.reduce((sum, page) => sum + page.uniqueVisitors, 0);
  const totalDownloads = mockFileDownloads.reduce((sum, file) => sum + file.downloads, 0);
  const totalPageViews = mockVisitorStats.reduce((sum, stat) => sum + stat.pageViews, 0);

  const filteredPages = selectedPage === "all" 
    ? mockPageVisits 
    : mockPageVisits.filter(page => page.url.includes(selectedPage));

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
                    <BreadcrumbLink href="/">
                      หน้าแรก
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>สถิติการเข้าชม</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">สถิติการเข้าชม</h1>
                <p className="text-muted-foreground">
                  ข้อมูลการเข้าชมและดาวน์โหลดไฟล์
                </p>
              </div>
              <div className="flex space-x-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">วันนี้</SelectItem>
                    <SelectItem value="7days">7 วัน</SelectItem>
                    <SelectItem value="30days">30 วัน</SelectItem>
                    <SelectItem value="90days">90 วัน</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  ส่งออกรายงาน
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">การเข้าชมทั้งหมด</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> จากเดือนที่แล้ว
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ผู้เข้าชมเฉพาะ</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUniqueVisitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8%</span> จากเดือนที่แล้ว
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ดาวน์โหลดไฟล์</CardTitle>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15%</span> จากเดือนที่แล้ว
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">หน้าที่ดูทั้งหมด</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+5%</span> จากเดือนที่แล้ว
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Statistics */}
            <Tabs defaultValue="pages" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pages">สถิติแต่ละหน้า</TabsTrigger>
                <TabsTrigger value="downloads">ดาวน์โหลดไฟล์</TabsTrigger>
                <TabsTrigger value="trends">แนวโน้ม</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>สถิติการเข้าชมแต่ละหน้า</CardTitle>
                    <CardDescription>
                      ข้อมูลการเข้าชมแยกตามหน้า
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Label htmlFor="pageFilter">กรองตามหน้า:</Label>
                      <Select value={selectedPage} onValueChange={setSelectedPage}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="news">ข่าวสาร</SelectItem>
                          <SelectItem value="documents">เอกสาร</SelectItem>
                          <SelectItem value="contact">ติดต่อ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>หน้า</TableHead>
                          <TableHead>URL</TableHead>
                          <TableHead className="text-right">การเข้าชม</TableHead>
                          <TableHead className="text-right">ผู้เข้าชมเฉพาะ</TableHead>
                          <TableHead className="text-right">เวลาอยู่หน้า</TableHead>
                          <TableHead className="text-right">Bounce Rate</TableHead>
                          <TableHead className="text-right">ดาวน์โหลด</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPages.map((page) => (
                          <TableRow key={page.id}>
                            <TableCell className="font-medium">{page.page}</TableCell>
                            <TableCell className="text-muted-foreground">{page.url}</TableCell>
                            <TableCell className="text-right">{page.visits.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{page.uniqueVisitors.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{page.avgTimeOnPage}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={parseFloat(page.bounceRate) > 50 ? "destructive" : "default"}>
                                {page.bounceRate}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{page.downloads.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="downloads" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>สถิติการดาวน์โหลดไฟล์</CardTitle>
                    <CardDescription>
                      ข้อมูลการดาวน์โหลดไฟล์แยกตามประเภท
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ชื่อไฟล์</TableHead>
                          <TableHead>ประเภท</TableHead>
                          <TableHead>หน้าที่อยู่</TableHead>
                          <TableHead className="text-right">จำนวนดาวน์โหลด</TableHead>
                          <TableHead>ดาวน์โหลดล่าสุด</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockFileDownloads.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">{file.fileName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{file.fileType}</Badge>
                            </TableCell>
                            <TableCell>{file.page}</TableCell>
                            <TableCell className="text-right">{file.downloads.toLocaleString()}</TableCell>
                            <TableCell>{file.lastDownload}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>แนวโน้มการเข้าชม</CardTitle>
                    <CardDescription>
                      กราฟแสดงแนวโน้มการเข้าชมใน 7 วันที่ผ่านมา
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockVisitorStats.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{stat.date}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(stat.date).toLocaleDateString('th-TH', { 
                                  weekday: 'long'
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold">{stat.visits}</div>
                              <div className="text-xs text-muted-foreground">การเข้าชม</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold">{stat.uniqueVisitors}</div>
                              <div className="text-xs text-muted-foreground">ผู้เข้าชมเฉพาะ</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold">{stat.pageViews}</div>
                              <div className="text-xs text-muted-foreground">หน้าที่ดู</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
