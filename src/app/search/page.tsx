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
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Settings, BarChart3, TrendingUp, Calendar, FileText, Eye } from "lucide-react";

interface SearchQuery {
  id: number;
  query: string;
  results: number;
  timestamp: string;
  userAgent: string;
  ip: string;
  category: string;
}

interface SearchSettings {
  indexUpdate: string;
  searchFields: string[];
  resultLimit: number;
  highlightEnabled: boolean;
  fuzzySearchEnabled: boolean;
  stopWords: string[];
}

interface PopularSearch {
  query: string;
  count: number;
  trend: "up" | "down" | "stable";
}

const mockSearchQueries: SearchQuery[] = [
  {
    id: 1,
    query: "คู่มือการใช้งาน",
    results: 12,
    timestamp: "2024-03-15 14:30:25",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    ip: "192.168.1.100",
    category: "documents",
  },
  {
    id: 2,
    query: "ข่าวสาร ประชาสัมพันธ์",
    results: 8,
    timestamp: "2024-03-15 14:25:10",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    ip: "192.168.1.101",
    category: "news",
  },
  {
    id: 3,
    query: "แบบฟอร์ม สมัคร",
    results: 5,
    timestamp: "2024-03-15 14:20:45",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    ip: "192.168.1.102",
    category: "forms",
  },
  {
    id: 4,
    query: "ตารางกิจกรรม 2024",
    results: 15,
    timestamp: "2024-03-15 14:15:30",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    ip: "192.168.1.103",
    category: "events",
  },
  {
    id: 5,
    query: "ติดต่อ สอบถาม",
    results: 3,
    timestamp: "2024-03-15 14:10:15",
    userAgent: "Mozilla/5.0 (Android 14)",
    ip: "192.168.1.104",
    category: "contact",
  },
];

const mockPopularSearches: PopularSearch[] = [
  { query: "คู่มือการใช้งาน", count: 234, trend: "up" },
  { query: "ข่าวสาร", count: 189, trend: "stable" },
  { query: "แบบฟอร์ม", count: 156, trend: "up" },
  { query: "ตารางกิจกรรม", count: 123, trend: "down" },
  { query: "ติดต่อ", count: 98, trend: "stable" },
  { query: "ดาวน์โหลด", count: 87, trend: "up" },
  { query: "ประกาศ", count: 76, trend: "down" },
  { query: "นโยบาย", count: 65, trend: "stable" },
];

const mockSearchSettings: SearchSettings = {
  indexUpdate: "2024-03-15 12:00:00",
  searchFields: ["title", "content", "tags", "description"],
  resultLimit: 20,
  highlightEnabled: true,
  fuzzySearchEnabled: true,
  stopWords: ["และ", "หรือ", "ที่", "ใน", "กับ", "เพื่อ", "จาก", "ไปยัง"],
};

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredQueries = mockSearchQueries.filter(query => {
    const matchesSearch = query.query.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || query.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSearches = mockSearchQueries.length;
  const averageResults = Math.round(
    mockSearchQueries.reduce((sum, query) => sum + query.results, 0) / mockSearchQueries.length
  );
  const zeroResultSearches = mockSearchQueries.filter(query => query.results === 0).length;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

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
                    <BreadcrumbPage>ระบบค้นหา</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">ระบบค้นหา</h1>
                <p className="text-muted-foreground">
                  จัดการและวิเคราะห์การค้นหาของผู้ใช้
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  ตั้งค่า
                </Button>
                <Button>
                  อัปเดตดัชนี
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">การค้นหาทั้งหมด</CardTitle>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSearches.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> จากเมื่อวาน
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ผลลัพธ์เฉลี่ย</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageResults}</div>
                  <p className="text-xs text-muted-foreground">
                    ผลลัพธ์ต่อการค้นหา
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ค้นหาไม่พบ</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{zeroResultSearches}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">{((zeroResultSearches/totalSearches)*100).toFixed(1)}%</span> ของทั้งหมด
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">อัปเดตดัชนีล่าสุด</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {new Date(mockSearchSettings.indexUpdate).toLocaleDateString('th-TH')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(mockSearchSettings.indexUpdate).toLocaleTimeString('th-TH')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Tabs defaultValue="queries" className="space-y-4">
              <TabsList>
                <TabsTrigger value="queries">การค้นหาล่าสุด</TabsTrigger>
                <TabsTrigger value="popular">คำค้นยอดนิยม</TabsTrigger>
                <TabsTrigger value="analytics">วิเคราะห์</TabsTrigger>
                <TabsTrigger value="settings">ตั้งค่า</TabsTrigger>
              </TabsList>
              
              <TabsContent value="queries" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>การค้นหาล่าสุด</CardTitle>
                    <CardDescription>
                      รายการการค้นหาทั้งหมดของผู้ใช้
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ค้นหาคำที่ผู้ใช้ค้นหา..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                      />
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="หมวดหมู่" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="documents">เอกสาร</SelectItem>
                          <SelectItem value="news">ข่าวสาร</SelectItem>
                          <SelectItem value="forms">แบบฟอร์ม</SelectItem>
                          <SelectItem value="events">กิจกรรม</SelectItem>
                          <SelectItem value="contact">ติดต่อ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>คำค้นหา</TableHead>
                          <TableHead>หมวดหมู่</TableHead>
                          <TableHead className="text-right">ผลลัพธ์</TableHead>
                          <TableHead>เวลา</TableHead>
                          <TableHead>อุปกรณ์</TableHead>
                          <TableHead>IP Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredQueries.map((query) => (
                          <TableRow key={query.id}>
                            <TableCell className="font-medium">{query.query}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{query.category}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge 
                                variant={query.results === 0 ? "destructive" : "default"}
                              >
                                {query.results}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {query.timestamp}
                            </TableCell>
                            <TableCell className="text-sm">
                              {query.userAgent.includes('iPhone') ? '📱 iPhone' :
                               query.userAgent.includes('Android') ? '📱 Android' :
                               query.userAgent.includes('Macintosh') ? '💻 Mac' :
                               '💻 Windows'}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {query.ip}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="popular" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>คำค้นยอดนิยม</CardTitle>
                    <CardDescription>
                      คำค้นหาที่ผู้ใช้ค้นหามากที่สุด
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPopularSearches.map((search, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-muted-foreground">
                              #{index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{search.query}</div>
                              <div className="text-sm text-muted-foreground">
                                {search.count} ครั้ง
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(search.trend)}
                            <Badge variant="outline">
                              {search.trend === "up" ? "เพิ่มขึ้น" : 
                               search.trend === "down" ? "ลดลง" : "คงที่"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>การวิเคราะห์คำค้นหา</CardTitle>
                      <CardDescription>
                        สถิติและแนวโน้มการค้นหา
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">คำค้นยาวเฉลี่ย</span>
                          <span className="font-medium">3.2 คำ</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">เวลาค้นหาเฉลี่ย</span>
                          <span className="font-medium">0.15 วินาที</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">อัตราคลิกผลลัพธ์</span>
                          <span className="font-medium">67.8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">การค้นหาซ้ำ</span>
                          <span className="font-medium">23.4%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>หมวดหมู่ที่ค้นหามากที่สุด</CardTitle>
                      <CardDescription>
                        การกระจายการค้นหาตามหมวดหมู่
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">เอกสาร</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-16 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">ข่าวสาร</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-12 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">กิจกรรม</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-6 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">อื่นๆ</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-3 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>ตั้งค่าระบบค้นหา</CardTitle>
                    <CardDescription>
                      กำหนดค่าการทำงานของระบบค้นหา
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="resultLimit" className="text-right">
                        จำนวนผลลัพธ์สูงสุด
                      </Label>
                      <Input
                        id="resultLimit"
                        type="number"
                        defaultValue={mockSearchSettings.resultLimit}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">
                        ฟิลด์ที่ค้นหา
                      </Label>
                      <div className="col-span-3 space-y-2">
                        {mockSearchSettings.searchFields.map((field) => (
                          <div key={field} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={field}
                              defaultChecked={true}
                              className="rounded border border-input"
                            />
                            <Label htmlFor={field} className="text-sm capitalize">
                              {field}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="stopWords" className="text-right pt-2">
                        Stop Words
                      </Label>
                      <Textarea
                        id="stopWords"
                        defaultValue={mockSearchSettings.stopWords.join(", ")}
                        className="col-span-3"
                        rows={3}
                        placeholder="คำที่จะไม่นำมาค้นหา (คั่นด้วย , )"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">ยกเลิก</Button>
                      <Button>บันทึกการตั้งค่า</Button>
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
