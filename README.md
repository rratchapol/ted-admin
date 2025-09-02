# CMS Admin Panel

ระบบจัดการเนื้อหา (Content Management System) สำหรับการบริหารจัดการเว็บไซต์ ที่สร้างด้วย Next.js, TypeScript, Tailwind CSS และ shadcn/ui

## ✨ คุณสมบัติหลัก

### 🔐 ระบบจัดการผู้ใช้และสิทธิ์
- จัดการบัญชีผู้ใช้งาน
- กำหนดบทบาทและสิทธิ์การเข้าถึงแต่ละโมดูล
- ระบบการเข้าสู่ระบบและความปลอดภัย

### 🏠 จัดการหน้าแรกและ Popup
- จัดการเนื้อหาหน้าแรกเว็บไซต์
- สร้างและจัดการป๊อปอัปสำหรับเหตุการณ์สำคัญ
- รองรับรูปภาพนิ่งและเคลื่อนไหว (GIF, Video)
- กำหนดตำแหน่งและเวลาการแสดงผล
- เพิ่มลิงก์และติดตามสถิติการคลิก

### 🎯 ระบบจัดการแบนเนอร์
- สร้าง แก้ไข ลบ และจัดเรียงแบนเนอร์
- รองรับไฟล์รูปภาพและวิดีโอ
- กำหนดลิงก์และติดตามสถิติการคลิก
- จัดการตำแหน่งการแสดงผล (Header, Sidebar, Footer, Popup)

### 📝 ระบบจัดการเนื้อหา
- Text Editor รองรับ HTML และ Multimedia
- ระบบแนบไฟล์ (DOC, XLS, PPT, PDF, ZIP, RAR, PNG, JPG, GIF)
- จัดหมวดหมู่และแท็กเนื้อหา
- ระบบการอนุมัติและเผยแพร่
- ติดตามสถิติการดาวน์โหลดไฟล์

### 📰 ระบบจัดการข่าวสาร
- สร้างและจัดการข่าวสาร
- ระบบแนบรูปภาพและไฟล์
- กำหนดวันเผยแพร่และสถานะ
- รองรับ RSS Feed
- ระบบหมวดหมู่และแท็ก

### 📊 สถิติการเข้าชม
- แสดงจำนวนครั้งการเข้าชมแต่ละหน้า
- สถิติการดาวน์โหลดไฟล์
- ข้อมูลผู้เข้าชมเฉพาะ (Unique Visitors)
- กราฟแนวโน้มการเข้าชม
- รายงานและการส่งออกข้อมูล

### 🔍 ระบบค้นหาข้อมูล
- Basic Search และ Advanced Search
- วิเคราะห์คำค้นหายอดนิยม
- ติดตามสถิติการค้นหา
- การตั้งค่าและจัดการดัชนี
- ระบบ Stop Words และ Fuzzy Search

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Development**: Turbopack (Fast Refresh)

## 🚀 การติดตั้งและใช้งาน

### ความต้องการของระบบ
- Node.js 18+ 
- npm หรือ yarn หรือ pnpm

### การติดตั้ง

1. Clone โปรเจกต์
```bash
git clone [repository-url]
cd admin
```

2. ติดตั้ง dependencies
```bash
npm install
```

3. รันโปรเจกต์ในโหมด development
```bash
npm run dev
```

4. เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

### Scripts ที่มีให้ใช้งาน

```bash
npm run dev          # รันในโหมด development
npm run build        # Build สำหรับ production
npm run start        # รันในโหมด production
npm run lint         # ตรวจสอบ code style
```

## 📁 โครงสร้างโปรเจกต์

```
src/
├── app/                    # App Router pages
│   ├── banners/           # หน้าจัดการแบนเนอร์
│   ├── content/           # หน้าจัดการเนื้อหา
│   ├── homepage/          # หน้าจัดการหน้าแรก/Popup
│   ├── news/              # หน้าจัดการข่าวสาร
│   ├── search/            # หน้าระบบค้นหา
│   ├── statistics/        # หน้าสถิติการเข้าชม
│   ├── users/             # หน้าจัดการผู้ใช้
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard หลัก
├── components/
│   ├── layout/            # Layout components
│   │   └── app-sidebar.tsx
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## 🎨 UI/UX Design

### Dashboard Layout
- **Sidebar Navigation**: เมนูหลักแบบยุบได้
- **Header**: Breadcrumb และ controls
- **Main Content**: Area แสดงเนื้อหาหลัก

### Component Usage
- **Cards**: แสดงข้อมูลสถิติและรายการ
- **Tables**: แสดงรายการข้อมูลแบบตาราง
- **Dialogs/Modals**: สำหรับฟอร์มเพิ่ม/แก้ไขข้อมูล
- **Tabs**: แยกประเภทเนื้อหาในหน้าเดียว

### Responsive Design
- รองรับการแสดงผลบนอุปกรณ์ทุกขนาด
- Mobile-first approach
- Adaptive navigation menu

## 🔧 การปรับแต่ง

### เพิ่มหน้าใหม่
1. สร้างโฟลเดอร์ใน `src/app/`
2. เพิ่ม `page.tsx` ในโฟลเดอร์นั้น
3. อัปเดต navigation ใน `app-sidebar.tsx`

### เพิ่ม UI Components
```bash
npx shadcn@latest add [component-name]
```

### การปรับแต่ง Theme
แก้ไขไฟล์ `src/app/globals.css` สำหรับ CSS variables และ theme colors

## 📄 License

โปรเจกต์นี้เป็น Open Source และใช้ MIT License

## 🤝 การสนับสนุน

หากพบปัญหาหรือต้องการขอคุณสมบัติใหม่ กรุณาสร้าง Issue ใน GitHub Repository

---

**หมายเหตุ**: โปรเจกต์นี้เป็น Demo สำหรับแสดงความสามารถ ข้อมูลที่แสดงเป็น Mock Data เท่านั้น

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
