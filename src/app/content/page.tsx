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
import { Plus, Search, Edit, Trash2, Upload, FileText, Download, Eye } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  status: "draft" | "published" | "archived";
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  attachments: Attachment[];
}

interface Attachment {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
  downloads: number;
}

const mockContent: ContentItem[] = [
  {
    id: 1,
    title: "คู่มือการใช้งานระบบ",
    slug: "user-manual",
    content: "<h1>คู่มือการใช้งาน</h1><p>เนื้อหาคู่มือการใช้งานระบบ...</p>",
    category: "documents",
    status: "published",
    author: "ผู้ดูแลระบบ",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-15",
    views: 1245,
    attachments: [
      {
        id: 1,
        name: "manual.pdf",
        type: "application/pdf",
        size: "2.5 MB",
        url: "/files/manual.pdf",
        downloads: 234,
      },
      {
        id: 2,
        name: "examples.zip",
        type: "application/zip",
        size: "1.2 MB",
        url: "/files/examples.zip",
        downloads: 156,
      },
    ],
  },
  {
    id: 2,
    title: "นโยบายความเป็นส่วนตัว",
    slug: "privacy-policy",
    content: "<h1>นโยบายความเป็นส่วนตัว</h1><p>เนื้อหานโยบาย...</p>",
    category: "legal",
    status: "published",
    author: "ฝ่ายกฎหมาย",
    createdAt: "2024-02-15",
    updatedAt: "2024-02-20",
    views: 867,
    attachments: [],
  },
  {
    id: 3,
    title: "แผนการดำเนินงาน 2024",
    slug: "business-plan-2024",
    content: "<h1>แผนการดำเนินงาน</h1><p>รายละเอียดแผน...</p>",
    category: "planning",
    status: "draft",
    author: "ฝ่ายวางแผน",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-12",
    views: 123,
    attachments: [
      {
        id: 3,
        name: "plan_2024.pptx",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        size: "5.8 MB",
        url: "/files/plan_2024.pptx",
        downloads: 45,
      },
    ],
  },
];

const categoryOptions = [
  { value: "documents", label: "เอกสาร" },
  { value: "legal", label: "กฎหมาย" },
  { value: "planning", label: "การวางแผน" },
  { value: "policy", label: "นโยบาย" },
  { value: "guidelines", label: "แนวทาง" },
];

const allowedFileTypes = [
  ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", 
  ".pdf", ".zip", ".rar", ".png", ".jpg", ".gif"
];

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddContent = () => {
    setEditingContent(null);
    setIsDialogOpen(true);
  };

  const handleEditContent = (item: ContentItem) => {
    setEditingContent(item);
    setIsDialogOpen(true);
  };

  const handleDeleteContent = (contentId: number) => {
    setContent(content.filter(item => item.id !== contentId));
  };

  const toggleContentStatus = (contentId: number) => {
    setContent(content.map(item =>
      item.id === contentId
        ? { 
            ...item, 
            status: item.status === "published" ? "draft" : "published" 
          }
        : item
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="default">เผยแพร่</Badge>;
      case "draft":
        return <Badge variant="secondary">ร่าง</Badge>;
      case "archived":
        return <Badge variant="outline">เก็บถาวร</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
                    <BreadcrumbPage>จัดการเนื้อหา</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">จัดการเนื้อหา</h1>
                <p className="text-muted-foreground">
                  จัดการเนื้อหาและเอกสารแนบ
                </p>
              </div>
              <Button onClick={handleAddContent}>
                <Plus className="mr-2 h-4 w-4" />
                เพิ่มเนื้อหา
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">เนื้อหาทั้งหมด</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{content.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">เผยแพร่แล้ว</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {content.filter(item => item.status === "published").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ดาวน์โหลดรวม</CardTitle>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {content.reduce((sum, item) => 
                      sum + item.attachments.reduce((attSum, att) => attSum + att.downloads, 0), 0
                    ).toLocaleString()}
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
                    {content.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>รายการเนื้อหา</CardTitle>
                <CardDescription>
                  จัดการเนื้อหาและไฟล์แนบต่างๆ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาเนื้อหา..."
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
                      <SelectItem value="archived">เก็บถาวร</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อเนื้อหา</TableHead>
                      <TableHead>หมวดหมู่</TableHead>
                      <TableHead>ผู้เขียน</TableHead>
                      <TableHead>ไฟล์แนบ</TableHead>
                      <TableHead>วิว/ดาวน์โหลด</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead>อัปเดต</TableHead>
                      <TableHead className="text-right">การดำเนินการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">
                              /{item.slug}
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
                            {item.attachments.length > 0 ? (
                              <div className="space-y-1">
                                {item.attachments.map((attachment) => (
                                  <div key={attachment.id} className="flex items-center space-x-1">
                                    <span className="text-xs">{attachment.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      ({attachment.size})
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">ไม่มีไฟล์</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{item.views.toLocaleString()} วิว</div>
                            <div className="text-muted-foreground">
                              {item.attachments.reduce((sum, att) => sum + att.downloads, 0)} ดาวน์โหลด
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={item.status === "published"}
                              onCheckedChange={() => toggleContentStatus(item.id)}
                            />
                            {getStatusBadge(item.status)}
                          </div>
                        </TableCell>
                        <TableCell>{item.updatedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditContent(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteContent(item.id)}
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

      {/* Add/Edit Content Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingContent ? "แก้ไขเนื้อหา" : "เพิ่มเนื้อหาใหม่"}
            </DialogTitle>
            <DialogDescription>
              สร้างหรือแก้ไขเนื้อหาพร้อมไฟล์แนบ
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">เนื้อหา</TabsTrigger>
              <TabsTrigger value="attachments">ไฟล์แนบ</TabsTrigger>
              <TabsTrigger value="settings">ตั้งค่า</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  ชื่อเนื้อหา
                </Label>
                <Input
                  id="title"
                  defaultValue={editingContent?.title || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  URL Slug
                </Label>
                <Input
                  id="slug"
                  defaultValue={editingContent?.slug || ""}
                  className="col-span-3"
                  placeholder="url-friendly-name"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  เนื้อหา
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="content"
                    defaultValue={editingContent?.content || ""}
                    rows={10}
                    placeholder="เขียนเนื้อหาที่นี่... รองรับ HTML"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    รองรับ HTML, Markdown และการแนบไฟล์มัลติมีเดีย
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="attachments" className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-foreground">
                        อัปโหลดไฟล์แนบ
                      </span>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept={allowedFileTypes.join(",")}
                        className="hidden"
                      />
                    </Label>
                    <p className="mt-2 text-xs text-muted-foreground">
                      รองรับไฟล์: {allowedFileTypes.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
              
              {editingContent?.attachments && editingContent.attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>ไฟล์แนบปัจจุบัน</Label>
                  {editingContent.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{attachment.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({attachment.size})
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  หมวดหมู่
                </Label>
                <Select defaultValue={editingContent?.category || ""}>
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
                <Label htmlFor="status" className="text-right">
                  สถานะ
                </Label>
                <Select defaultValue={editingContent?.status || "draft"}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">ร่าง</SelectItem>
                    <SelectItem value="published">เผยแพร่</SelectItem>
                    <SelectItem value="archived">เก็บถาวร</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  ผู้เขียน
                </Label>
                <Input
                  id="author"
                  defaultValue={editingContent?.author || ""}
                  className="col-span-3"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button type="submit">
              {editingContent ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มเนื้อหา"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
