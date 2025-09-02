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
import { Plus, Search, Edit, Trash2, Upload, Eye, BarChart, Image as ImageIcon, GripVertical } from "lucide-react";

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  position: "header" | "sidebar" | "footer" | "popup";
  status: "active" | "inactive";
  startDate: string;
  endDate: string;
  clicks: number;
  views: number;
  order: number;
}

const mockBanners: Banner[] = [
  {
    id: 1,
    title: "แบนเนอร์ประชาสัมพันธ์",
    description: "ประชาสัมพันธ์กิจกรรมประจำปี",
    imageUrl: "/api/placeholder/400/200",
    linkUrl: "https://example.com/event",
    position: "header",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    clicks: 245,
    views: 1520,
    order: 1,
  },
  {
    id: 2,
    title: "โปรโมชันพิเศษ",
    description: "ส่วนลดสำหรับสมาชิกใหม่",
    imageUrl: "/api/placeholder/400/200",
    linkUrl: "https://example.com/promotion",
    position: "sidebar",
    status: "active",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    clicks: 189,
    views: 890,
    order: 2,
  },
  {
    id: 3,
    title: "ข่าวสารอัปเดต",
    description: "ข้อมูลข่าวสารล่าสุด",
    imageUrl: "/api/placeholder/400/200",
    linkUrl: "https://example.com/news",
    position: "popup",
    status: "inactive",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    clicks: 67,
    views: 345,
    order: 3,
  },
];

const positionOptions = [
  { value: "header", label: "ส่วนหัว" },
  { value: "sidebar", label: "แถบข้าง" },
  { value: "footer", label: "ส่วนท้าย" },
  { value: "popup", label: "ป๊อปอัป" },
];

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>("all");

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === "all" || banner.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  const handleAddBanner = () => {
    setEditingBanner(null);
    setIsDialogOpen(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setIsDialogOpen(true);
  };

  const handleDeleteBanner = (bannerId: number) => {
    setBanners(banners.filter(banner => banner.id !== bannerId));
  };

  const toggleBannerStatus = (bannerId: number) => {
    setBanners(banners.map(banner =>
      banner.id === bannerId
        ? { ...banner, status: banner.status === "active" ? "inactive" : "active" }
        : banner
    ));
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
                    <BreadcrumbPage>จัดการแบนเนอร์</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">จัดการแบนเนอร์</h1>
                <p className="text-muted-foreground">
                  จัดการแบนเนอร์โฆษณาและแสดงสถิติการคลิก
                </p>
              </div>
              <Button onClick={handleAddBanner}>
                <Plus className="mr-2 h-4 w-4" />
                เพิ่มแบนเนอร์
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">แบนเนอร์ทั้งหมด</CardTitle>
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{banners.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">แบนเนอร์ที่ใช้งาน</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {banners.filter(b => b.status === "active").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">คลิกรวม</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {banners.reduce((sum, banner) => sum + banner.clicks, 0).toLocaleString()}
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
                    {banners.reduce((sum, banner) => sum + banner.views, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>รายการแบนเนอร์</CardTitle>
                <CardDescription>
                  จัดการแบนเนอร์โฆษณาและติดตามประสิทธิภาพ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาแบนเนอร์..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="ตำแหน่ง" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      {positionOptions.map((position) => (
                        <SelectItem key={position.value} value={position.value}>
                          {position.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ลำดับ</TableHead>
                      <TableHead>รูปภาพ</TableHead>
                      <TableHead>ชื่อแบนเนอร์</TableHead>
                      <TableHead>ตำแหน่ง</TableHead>
                      <TableHead>วันที่แสดง</TableHead>
                      <TableHead>คลิก/วิว</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead className="text-right">การดำเนินการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBanners.map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <GripVertical className="h-4 w-4 text-muted-foreground mr-2" />
                            {banner.order}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-16 h-10 bg-muted rounded overflow-hidden">
                            <img
                              src={banner.imageUrl}
                              alt={banner.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{banner.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {banner.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {positionOptions.find(p => p.value === banner.position)?.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{banner.startDate}</div>
                            <div className="text-muted-foreground">ถึง {banner.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{banner.clicks.toLocaleString()} คลิก</div>
                            <div className="text-muted-foreground">{banner.views.toLocaleString()} วิว</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={banner.status === "active"}
                              onCheckedChange={() => toggleBannerStatus(banner.id)}
                            />
                            <Badge
                              variant={banner.status === "active" ? "default" : "secondary"}
                            >
                              {banner.status === "active" ? "ใช้งาน" : "ปิด"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditBanner(banner)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteBanner(banner.id)}
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

      {/* Add/Edit Banner Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingBanner ? "แก้ไขแบนเนอร์" : "เพิ่มแบนเนอร์ใหม่"}
            </DialogTitle>
            <DialogDescription>
              กรอกข้อมูลแบนเนอร์และกำหนดตำแหน่งการแสดง
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                ชื่อแบนเนอร์
              </Label>
              <Input
                id="title"
                defaultValue={editingBanner?.title || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                คำอธิบาย
              </Label>
              <Textarea
                id="description"
                defaultValue={editingBanner?.description || ""}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                รูปภาพ
              </Label>
              <div className="col-span-3">
                <Input type="file" accept="image/*,video/*" />
                <p className="text-sm text-muted-foreground mt-1">
                  รองรับไฟล์: JPG, PNG, GIF, MP4
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkUrl" className="text-right">
                ลิงก์
              </Label>
              <Input
                id="linkUrl"
                type="url"
                defaultValue={editingBanner?.linkUrl || ""}
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                ตำแหน่ง
              </Label>
              <Select defaultValue={editingBanner?.position || ""}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="เลือกตำแหน่ง" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((position) => (
                    <SelectItem key={position.value} value={position.value}>
                      {position.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                วันที่เริ่ม
              </Label>
              <Input
                id="startDate"
                type="date"
                defaultValue={editingBanner?.startDate || ""}
                className="col-span-1"
              />
              <Label htmlFor="endDate" className="text-right">
                วันที่สิ้นสุด
              </Label>
              <Input
                id="endDate"
                type="date"
                defaultValue={editingBanner?.endDate || ""}
                className="col-span-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {editingBanner ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มแบนเนอร์"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
