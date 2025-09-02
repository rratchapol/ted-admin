"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Edit, Trash2, UserPlus } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  permissions: string[];
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "ผู้ดูแลระบบ",
    email: "admin@example.com",
    role: "Super Admin",
    status: "active",
    permissions: ["all"],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "เจ้าหน้าที่เนื้อหา",
    email: "content@example.com",
    role: "Content Manager",
    status: "active",
    permissions: ["content", "news", "banners"],
    createdAt: "2024-02-10",
  },
  {
    id: 3,
    name: "เจ้าหน้าที่ข่าวสาร",
    email: "news@example.com",
    role: "News Editor",
    status: "active",
    permissions: ["news"],
    createdAt: "2024-02-20",
  },
];

const roleOptions = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "content_manager", label: "Content Manager" },
  { value: "news_editor", label: "News Editor" },
  { value: "viewer", label: "Viewer" },
];

const permissionOptions = [
  { value: "users", label: "จัดการผู้ใช้" },
  { value: "content", label: "จัดการเนื้อหา" },
  { value: "news", label: "จัดการข่าวสาร" },
  { value: "banners", label: "จัดการแบนเนอร์" },
  { value: "homepage", label: "จัดการหน้าแรก" },
  { value: "statistics", label: "ดูสถิติ" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
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
                    <BreadcrumbPage>จัดการผู้ใช้</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">จัดการผู้ใช้</h1>
                <p className="text-muted-foreground">
                  จัดการบัญชีผู้ใช้และกำหนดสิทธิ์การใช้งาน
                </p>
              </div>
              <Button onClick={handleAddUser}>
                <UserPlus className="mr-2 h-4 w-4" />
                เพิ่มผู้ใช้
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>รายการผู้ใช้</CardTitle>
                <CardDescription>
                  ผู้ใช้ทั้งหมดในระบบและสิทธิ์การใช้งาน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาผู้ใช้..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อผู้ใช้</TableHead>
                      <TableHead>อีเมล</TableHead>
                      <TableHead>บทบาท</TableHead>
                      <TableHead>สิทธิ์</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead>วันที่สร้าง</TableHead>
                      <TableHead className="text-right">การดำเนินการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.includes("all") ? (
                              <Badge variant="default">ทั้งหมด</Badge>
                            ) : (
                              user.permissions.map((permission) => (
                                <Badge key={permission} variant="secondary" className="text-xs">
                                  {permissionOptions.find(p => p.value === permission)?.label || permission}
                                </Badge>
                              ))
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={user.status === "active"}
                              onCheckedChange={() => toggleUserStatus(user.id)}
                            />
                            <Badge
                              variant={user.status === "active" ? "default" : "secondary"}
                            >
                              {user.status === "active" ? "ใช้งาน" : "ระงับ"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
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

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้ใหม่"}
            </DialogTitle>
            <DialogDescription>
              กรอกข้อมูลผู้ใช้และกำหนดสิทธิ์การใช้งาน
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                ชื่อ
              </Label>
              <Input
                id="name"
                defaultValue={editingUser?.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                อีเมล
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={editingUser?.email || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                บทบาท
              </Label>
              <Select defaultValue={editingUser?.role || ""}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="เลือกบทบาท" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">สิทธิ์</Label>
              <div className="col-span-3 space-y-2">
                {permissionOptions.map((permission) => (
                  <div key={permission.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={permission.value}
                      defaultChecked={editingUser?.permissions.includes(permission.value)}
                      className="rounded border border-input"
                    />
                    <Label htmlFor={permission.value} className="text-sm">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {editingUser ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มผู้ใช้"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
