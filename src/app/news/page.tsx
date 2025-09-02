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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Upload, Calendar, Eye, Rss } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  icon: string;
  status: "draft" | "published" | "scheduled";
  publishDate: string;
  author: string;
  views: number;
  attachments: Attachment[];
  rssIncluded: boolean;
}

interface Attachment {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "ประกาศข่าวสำคัญประจำเดือน",
    summary: "ข่าวสารประจำเดือนมีนาคม 2024",
    content: "<h1>ข่าวสำคัญ</h1><p>รายละเอียดข่าว...</p>",
    category: "announcement",
    tags: ["ประกาศ", "สำคัญ"],
    featuredImage: "/api/placeholder/400/200",
    icon: "📢",
    status: "published",
    publishDate: "2024-03-15T09:00:00",
    author: "ฝ่ายประชาสัมพันธ์",
    views: 2345,
    attachments: [
      {
        id: 1,
        name: "announcement.pdf",
        type: "application/pdf",
        size: "1.2 MB",
        url: "/files/announcement.pdf",
      },
    ],
    rssIncluded: true,
  },
  {
    id: 2,
    title: "กิจกรรมประจำปี 2024",
    summary: "ตารางกิจกรรมสำคัญประจำปี",
    content: "<h1>กิจกรรม</h1><p>รายละเอียดกิจกรรม...</p>",
    category: "events",
    tags: ["กิจกรรม", "2024"],
    featuredImage: "/api/placeholder/400/200",
    icon: "🎉",
    status: "scheduled",
    publishDate: "2024-04-01T10:00:00",
    author: "ฝ่ายกิจกรรม",
    views: 567,
    attachments: [],
    rssIncluded: true,
  },
  {
    id: 3,
    title: "อัปเดตระบบใหม่",
    summary: "การปรับปรุงระบบในเดือนมีนาคม",
    content: "<h1>อัปเดต</h1><p>รายละเอียดการอัปเดต...</p>",
    category: "updates",
    tags: ["ระบบ", "อัปเดต"],
    featuredImage: "/api/placeholder/400/200",
    icon: "⚙️",
    status: "draft",
    publishDate: "2024-03-20T14:00:00",
    author: "ฝ่าย IT",
    views: 123,
    attachments: [],
    rssIncluded: false,
  },
];

const categoryOptions = [
  { value: "announcement", label: "ประกาศ" },
  { value: "events", label: "กิจกรรม" },
  { value: "updates", label: "อัปเดต" },
  { value: "news", label: "ข่าวสาร" },
  { value: "promotions", label: "โปรโมชัน" },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddNews = () => {
    setEditingNews(null);
    setIsDialogOpen(true);
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setIsDialogOpen(true);
  };

  const handleDeleteNews = (newsId: number) => {
    setNews(news.filter(item => item.id !== newsId));
  };

  const toggleNewsStatus = (newsId: number) => {
    setNews(news.map(item =>
      item.id === newsId
        ? { 
            ...item, 
            status: item.status === "published" ? "draft" : "published" 
          }
        : item
    ));
  };

  const toggleRssIncluded = (newsId: number) => {
    setNews(news.map(item =>
      item.id === newsId
        ? { ...item, rssIncluded: !item.rssIncluded }
        : item
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="default">เผยแพร่</Badge>;
      case "draft":
        return <Badge variant="secondary">ร่าง</Badge>;
      case "scheduled":
        return <Badge variant="outline">กำหนดเผยแพร่</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('th-TH');
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
                    <BreadcrumbPage>จัดการข่าวสาร</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">จัดการข่าวสาร</h1>
                <p className="text-muted-foreground">
                  จัดการข่าวสารและรองรับ RSS Feed
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Rss className="mr-2 h-4 w-4" />
                  RSS Feed
                </Button>
                <Button onClick={handleAddNews}>
                  <Plus className="mr-2 h-4 w-4" />
                  เพิ่มข่าวสาร
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ข่าวสารทั้งหมด</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{news.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">เผยแพร่แล้ว</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {news.filter(item => item.status === "published").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">RSS Feed</CardTitle>
                  <Rss className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {news.filter(item => item.rssIncluded).length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">วิวรวม</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {news.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>รายการข่าวสาร</CardTitle>
                <CardDescription>
                  จัดการข่าวสารและกำหนดวันเผยแพร่
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาข่าวสาร..."
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
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="สถานะ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="published">เผยแพร่</SelectItem>
                      <SelectItem value="draft">ร่าง</SelectItem>
                      <SelectItem value="scheduled">กำหนดเผยแพร่</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ข่าวสาร</TableHead>
                      <TableHead>หมวดหมู่</TableHead>
                      <TableHead>ผู้เขียน</TableHead>
                      <TableHead>วันเผยแพร่</TableHead>
                      <TableHead>วิว</TableHead>
                      <TableHead>RSS</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead className="text-right">การดำเนินการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNews.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                              {item.featuredImage ? (
                                <img
                                  src={item.featuredImage}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg">
                                  {item.icon}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.summary}
                              </div>
                              <div className="flex space-x-1 mt-1">
                                {item.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {categoryOptions.find(c => c.value === item.category)?.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDateTime(item.publishDate)}
                          </div>
                        </TableCell>
                        <TableCell>{item.views.toLocaleString()}</TableCell>
                        <TableCell>
                          <Switch
                            checked={item.rssIncluded}
                            onCheckedChange={() => toggleRssIncluded(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={item.status === "published"}
                              onCheckedChange={() => toggleNewsStatus(item.id)}
                            />
                            {getStatusBadge(item.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditNews(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteNews(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Add/Edit News Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingNews ? "แก้ไขข่าวสาร" : "เพิ่มข่าวสารใหม่"}
            </DialogTitle>
            <DialogDescription>
              สร้างหรือแก้ไขข่าวสารพร้อมรูปภาพและไฟล์แนบ
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">เนื้อหา</TabsTrigger>
              <TabsTrigger value="media">รูปภาพ</TabsTrigger>
              <TabsTrigger value="schedule">กำหนดการ</TabsTrigger>
              <TabsTrigger value="settings">ตั้งค่า</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  หัวข้อข่าว
                </Label>
                <Input
                  id="title"
                  defaultValue={editingNews?.title || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="summary" className="text-right">
                  สรุปข่าว
                </Label>
                <Textarea
                  id="summary"
                  defaultValue={editingNews?.summary || ""}
                  className="col-span-3"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  เนื้อหาข่าว
                </Label>
                <Textarea
                  id="content"
                  defaultValue={editingNews?.content || ""}
                  className="col-span-3"
                  rows={8}
                  placeholder="เขียนเนื้อหาข่าวที่นี่..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  แท็ก
                </Label>
                <Input
                  id="tags"
                  defaultValue={editingNews?.tags.join(", ") || ""}
                  className="col-span-3"
                  placeholder="แท็ก1, แท็ก2, แท็ก3"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  ไอคอน
                </Label>
                <Input
                  id="icon"
                  defaultValue={editingNews?.icon || ""}
                  className="col-span-3"
                  placeholder="😀 (emoji หรือ icon)"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  รูปภาพหลัก
                </Label>
                <div className="col-span-3">
                  <Input type="file" accept="image/*" />
                  {editingNews?.featuredImage && (
                    <div className="mt-2">
                      <img
                        src={editingNews.featuredImage}
                        alt="รูปภาพปัจจุบัน"
                        className="w-32 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  ไฟล์แนบ
                </Label>
                <div className="col-span-3">
                  <Input type="file" multiple />
                  <p className="text-sm text-muted-foreground mt-1">
                    รองรับไฟล์: PDF, DOC, XLS, PPT, ZIP, RAR
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publishDate" className="text-right">
                  วันที่เผยแพร่
                </Label>
                <Input
                  id="publishDate"
                  type="datetime-local"
                  defaultValue={editingNews?.publishDate.slice(0, 16) || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="autoPublish" className="text-right">
                  เผยแพร่อัตโนมัติ
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch id="autoPublish" />
                  <span className="text-sm text-muted-foreground">
                    เผยแพร่ตามวันที่กำหนด
                  </span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  หมวดหมู่
                </Label>
                <Select defaultValue={editingNews?.category || ""}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="เลือกหมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  ผู้เขียน
                </Label>
                <Input
                  id="author"
                  defaultValue={editingNews?.author || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rssIncluded" className="text-right">
                  รวมใน RSS Feed
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch 
                    id="rssIncluded" 
                    defaultChecked={editingNews?.rssIncluded || false}
                  />
                  <span className="text-sm text-muted-foreground">
                    แสดงข่าวนี้ใน RSS Feed
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button type="submit">
              {editingNews ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มข่าวสาร"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
