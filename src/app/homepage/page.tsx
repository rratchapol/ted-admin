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
import { Plus, Search, Edit, Trash2, Upload, Calendar, Image as ImageIcon, Eye, MousePointer } from "lucide-react";

interface PopupEvent {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageType: "static" | "animated";
  linkUrl: string;
  position: "center" | "top" | "bottom" | "left" | "right";
  displayType: "popup" | "banner" | "notification";
  status: "active" | "inactive" | "scheduled";
  startDate: string;
  endDate: string;
  priority: number;
  showFrequency: "once" | "daily" | "always";
  targetPages: string[];
  clicks: number;
  views: number;
}

interface HomepageSection {
  id: number;
  name: string;
  type: "hero" | "news" | "events" | "gallery" | "links";
  content: any;
  order: number;
  visible: boolean;
}

const mockPopupEvents: PopupEvent[] = [
  {
    id: 1,
    title: "ประกาศสำคัญ - การปิดระบบชั่วคราว",
    description: "ระบบจะปิดปรับปรุงในวันที่ 20 มีนาคม 2024",
    imageUrl: "/api/placeholder/400/300",
    imageType: "static",
    linkUrl: "https://example.com/maintenance",
    position: "center",
    displayType: "popup",
    status: "active",
    startDate: "2024-03-15T09:00:00",
    endDate: "2024-03-20T18:00:00",
    priority: 1,
    showFrequency: "daily",
    targetPages: ["/", "/news", "/contact"],
    clicks: 234,
    views: 1567,
  },
  {
    id: 2,
    title: "งานฉลองปีใหม่ 2024",
    description: "ร่วมงานฉลองปีใหม่ 31 ธันวาคม 2024",
    imageUrl: "/api/placeholder/400/300",
    imageType: "animated",
    linkUrl: "https://example.com/newyear",
    position: "top",
    displayType: "banner",
    status: "scheduled",
    startDate: "2024-12-30T00:00:00",
    endDate: "2025-01-02T23:59:59",
    priority: 2,
    showFrequency: "always",
    targetPages: ["/"],
    clicks: 0,
    views: 0,
  },
  {
    id: 3,
    title: "อัปเดตระบบใหม่",
    description: "ระบบมีฟีเจอร์ใหม่ให้ใช้งาน",
    imageUrl: "/api/placeholder/400/300",
    imageType: "static",
    linkUrl: "https://example.com/update",
    position: "bottom",
    displayType: "notification",
    status: "inactive",
    startDate: "2024-03-10T10:00:00",
    endDate: "2024-03-25T17:00:00",
    priority: 3,
    showFrequency: "once",
    targetPages: ["/", "/news"],
    clicks: 89,
    views: 456,
  },
];

const mockHomepageSections: HomepageSection[] = [
  {
    id: 1,
    name: "ส่วนหัวหลัก (Hero Section)",
    type: "hero",
    content: {
      title: "ยินดีต้อนรับสู่เว็บไซต์ของเรา",
      subtitle: "ศูนย์กลางข้อมูลและบริการออนไลน์",
      backgroundImage: "/api/placeholder/1200/600",
      buttons: [
        { text: "เริ่มต้นใช้งาน", link: "/start" },
        { text: "เรียนรู้เพิ่มเติม", link: "/learn" }
      ]
    },
    order: 1,
    visible: true,
  },
  {
    id: 2,
    name: "ข่าวสารล่าสุด",
    type: "news",
    content: {
      title: "ข่าวสารและประกาศ",
      showCount: 4,
      showImages: true,
    },
    order: 2,
    visible: true,
  },
  {
    id: 3,
    name: "กิจกรรมใหม่",
    type: "events",
    content: {
      title: "กิจกรรมที่กำลังจะมาถึง",
      showCount: 3,
      calendarView: false,
    },
    order: 3,
    visible: true,
  },
  {
    id: 4,
    name: "แกลเลอรี่รูปภาพ",
    type: "gallery",
    content: {
      title: "ภาพกิจกรรม",
      images: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
      ],
      showCount: 6,
    },
    order: 4,
    visible: false,
  },
];

const positionOptions = [
  { value: "center", label: "กึ่งกลาง" },
  { value: "top", label: "ด้านบน" },
  { value: "bottom", label: "ด้านล่าง" },
  { value: "left", label: "ด้านซ้าย" },
  { value: "right", label: "ด้านขวา" },
];

const displayTypeOptions = [
  { value: "popup", label: "ป๊อปอัป" },
  { value: "banner", label: "แบนเนอร์" },
  { value: "notification", label: "การแจ้งเตือน" },
];

const showFrequencyOptions = [
  { value: "once", label: "แสดงครั้งเดียว" },
  { value: "daily", label: "แสดงทุกวัน" },
  { value: "always", label: "แสดงเสมอ" },
];

export default function HomepagePage() {
  const [popupEvents, setPopupEvents] = useState<PopupEvent[]>(mockPopupEvents);
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(mockHomepageSections);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupDialogOpen, setIsPopupDialogOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<PopupEvent | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredPopups = popupEvents.filter(popup => {
    const matchesSearch = popup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      popup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || popup.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddPopup = () => {
    setEditingPopup(null);
    setIsPopupDialogOpen(true);
  };

  const handleEditPopup = (popup: PopupEvent) => {
    setEditingPopup(popup);
    setIsPopupDialogOpen(true);
  };

  const handleDeletePopup = (popupId: number) => {
    setPopupEvents(popupEvents.filter(popup => popup.id !== popupId));
  };

  const togglePopupStatus = (popupId: number) => {
    setPopupEvents(popupEvents.map(popup =>
      popup.id === popupId
        ? { ...popup, status: popup.status === "active" ? "inactive" : "active" }
        : popup
    ));
  };

  const toggleSectionVisibility = (sectionId: number) => {
    setHomepageSections(homepageSections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">ใช้งาน</Badge>;
      case "inactive":
        return <Badge variant="secondary">ปิด</Badge>;
      case "scheduled":
        return <Badge variant="outline">กำหนดเวลา</Badge>;
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
                    <BreadcrumbPage>จัดการหน้าแรก/Popup</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">จัดการหน้าแรก/Popup</h1>
                <p className="text-muted-foreground">
                  จัดการเนื้อหาหน้าแรกและป๊อปอัปเหตุการณ์สำคัญ
                </p>
              </div>
              <Button onClick={handleAddPopup}>
                <Plus className="mr-2 h-4 w-4" />
                เพิ่ม Popup/Event
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Popup ทั้งหมด</CardTitle>
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{popupEvents.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">กำลังใช้งาน</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {popupEvents.filter(p => p.status === "active").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">คลิกรวม</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {popupEvents.reduce((sum, popup) => sum + popup.clicks, 0).toLocaleString()}
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
                    {popupEvents.reduce((sum, popup) => sum + popup.views, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="popups" className="space-y-4">
              <TabsList>
                <TabsTrigger value="popups">Popup/Events</TabsTrigger>
                <TabsTrigger value="homepage">จัดการหน้าแรก</TabsTrigger>
              </TabsList>
              
              <TabsContent value="popups" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>รายการ Popup และ Events</CardTitle>
                    <CardDescription>
                      จัดการป๊อปอัปและเหตุการณ์สำคัญ
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ค้นหา popup..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                      />
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="สถานะ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="active">ใช้งาน</SelectItem>
                          <SelectItem value="inactive">ปิด</SelectItem>
                          <SelectItem value="scheduled">กำหนดเวลา</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>รูปภาพ</TableHead>
                          <TableHead>ชื่อเหตุการณ์</TableHead>
                          <TableHead>ประเภท</TableHead>
                          <TableHead>ตำแหน่ง</TableHead>
                          <TableHead>ระยะเวลา</TableHead>
                          <TableHead>คลิก/วิว</TableHead>
                          <TableHead>สถานะ</TableHead>
                          <TableHead className="text-right">การดำเนินการ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPopups.map((popup) => (
                          <TableRow key={popup.id}>
                            <TableCell>
                              <div className="w-16 h-12 bg-muted rounded overflow-hidden relative">
                                <img
                                  src={popup.imageUrl}
                                  alt={popup.title}
                                  className="w-full h-full object-cover"
                                />
                                {popup.imageType === "animated" && (
                                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{popup.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {popup.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {displayTypeOptions.find(t => t.value === popup.displayType)?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {positionOptions.find(p => p.value === popup.position)?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{formatDateTime(popup.startDate)}</div>
                                <div className="text-muted-foreground">ถึง {formatDateTime(popup.endDate)}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{popup.clicks.toLocaleString()} คลิก</div>
                                <div className="text-muted-foreground">{popup.views.toLocaleString()} วิว</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={popup.status === "active"}
                                  onCheckedChange={() => togglePopupStatus(popup.id)}
                                />
                                {getStatusBadge(popup.status)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditPopup(popup)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeletePopup(popup.id)}
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
              </TabsContent>
              
              <TabsContent value="homepage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>จัดการส่วนต่างๆ ของหน้าแรก</CardTitle>
                    <CardDescription>
                      กำหนดการแสดงผลและเรียงลำดับส่วนต่างๆ ของหน้าแรก
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {homepageSections.map((section) => (
                        <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-muted-foreground">
                              #{section.order}
                            </div>
                            <div>
                              <div className="font-medium">{section.name}</div>
                              <div className="text-sm text-muted-foreground">
                                ประเภท: {section.type}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={section.visible}
                                onCheckedChange={() => toggleSectionVisibility(section.id)}
                              />
                              <Badge variant={section.visible ? "default" : "secondary"}>
                                {section.visible ? "แสดง" : "ซ่อน"}
                              </Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
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

      {/* Add/Edit Popup Dialog */}
      <Dialog open={isPopupDialogOpen} onOpenChange={setIsPopupDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPopup ? "แก้ไข Popup/Event" : "เพิ่ม Popup/Event ใหม่"}
            </DialogTitle>
            <DialogDescription>
              สร้างหรือแก้ไขป๊อปอัปและเหตุการณ์สำคัญ
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">เนื้อหา</TabsTrigger>
              <TabsTrigger value="media">รูปภาพ</TabsTrigger>
              <TabsTrigger value="display">การแสดงผล</TabsTrigger>
              <TabsTrigger value="schedule">กำหนดการ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  ชื่อเหตุการณ์
                </Label>
                <Input
                  id="title"
                  defaultValue={editingPopup?.title || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  คำอธิบาย
                </Label>
                <Textarea
                  id="description"
                  defaultValue={editingPopup?.description || ""}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkUrl" className="text-right">
                  ลิงก์
                </Label>
                <Input
                  id="linkUrl"
                  type="url"
                  defaultValue={editingPopup?.linkUrl || ""}
                  className="col-span-3"
                  placeholder="https://example.com"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  ประเภทรูปภาพ
                </Label>
                <Select defaultValue={editingPopup?.imageType || "static"}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static">รูปภาพนิ่ง</SelectItem>
                    <SelectItem value="animated">รูปภาพเคลื่อนไหว (GIF/Video)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  อัปโหลดรูปภาพ
                </Label>
                <div className="col-span-3">
                  <Input type="file" accept="image/*,video/*" />
                  <p className="text-sm text-muted-foreground mt-1">
                    รองรับไฟล์: JPG, PNG, GIF, MP4 (สูงสุด 10MB)
                  </p>
                  {editingPopup?.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={editingPopup.imageUrl}
                        alt="รูปภาพปัจจุบัน"
                        className="w-32 h-24 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="display" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  ประเภทการแสดง
                </Label>
                <Select defaultValue={editingPopup?.displayType || "popup"}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {displayTypeOptions.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  ตำแหน่ง
                </Label>
                <Select defaultValue={editingPopup?.position || "center"}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
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
                <Label className="text-right">
                  ความถี่การแสดง
                </Label>
                <Select defaultValue={editingPopup?.showFrequency || "once"}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {showFrequencyOptions.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  ลำดับความสำคัญ
                </Label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  max="10"
                  defaultValue={editingPopup?.priority || 1}
                  className="col-span-3"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  วันที่เริ่ม
                </Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  defaultValue={editingPopup?.startDate.slice(0, 16) || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  วันที่สิ้นสุด
                </Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  defaultValue={editingPopup?.endDate.slice(0, 16) || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  หน้าที่แสดง
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="homepage" defaultChecked />
                    <Label htmlFor="homepage">หน้าแรก</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="newspage" />
                    <Label htmlFor="newspage">หน้าข่าวสาร</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="contactpage" />
                    <Label htmlFor="contactpage">หน้าติดต่อ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="allpages" />
                    <Label htmlFor="allpages">ทุกหน้า</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button type="submit">
              {editingPopup ? "บันทึกการเปลี่ยนแปลง" : "เพิ่ม Popup/Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
