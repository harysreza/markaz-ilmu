# 📚 Markaz Ilmu - Islamic Knowledge Platform

<div align="center">

**Platform Ilmu Syar'i Multimedia dengan Admin Panel Terintegrasi**

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

<!-- [Demo](#) • [Dokumentasi](./docs) • [Lapor Bug](https://github.com/yourusername/markaz-ilmu/issues) -->

</div>

<!-- ---

## 🌟 Tentang Markaz Ilmu

**Markaz Ilmu** (مَرْكَزُ الْعِلْمِ - Center of Knowledge) adalah platform web modern untuk menyebarkan ilmu syar'i dalam berbagai format multimedia. Dirancang khusus untuk audiens lintas generasi dengan fokus pada aksesibilitas, kemudahan navigasi, dan pengalaman pengguna yang inklusif. -->

<!-- ### 🎯 Tujuan Platform

- Mempermudah akses konten kajian Islam berkualitas
- Menyediakan berbagai format media (teks, audio, video) untuk berbagai preferensi belajar
- Memfasilitasi tanya jawab keagamaan dengan ustadz
- Mendukung transparansi dan kemudahan dalam berdonasi
- Menyediakan tools ibadah praktis (jadwal sholat, doa-dzikir) -->

---

## ✨ Fitur Utama

### 🔹 Portal Publik

- **Jadwal Kajian** — Kalender kajian rutin (offline/online)
- **Jadwal Sholat** — Waktu sholat otomatis berdasarkan lokasi
- **Doa & Dzikir** — Koleksi doa harian dengan teks Arab, transliterasi, dan terjemahan
- **Artikel** — Konten kajian dalam bentuk teks dengan kategori (Fiqih, Akidah, Akhlak, dll)
- **E-Book** — Library digital untuk baca online atau download PDF
- **Video Kajian** — Integrasi YouTube untuk kajian video dari ustadz pilihan

### 🔹 Admin Panel (CMS)

Panel administrasi lengkap dengan Role-Based Access Control (RBAC):

- **Dashboard Analytics** — Statistik views, engagement, dan aktivitas pengguna
- **Content Management** — CRUD untuk semua jenis konten (artikel, video, audio, ebook, doa)
- **User Management** — Kelola admin dan moderator dengan role berbeda
- **Moderation System** — Review dan approve pertanyaan Q&A
- **Donation Monitoring** — Tracking dan konfirmasi donasi
- **Configuration** — Pengaturan bank account, social links, featured content
- **Audit Logging** — Tracking semua aktivitas admin untuk accountability
- **Newsletter** — Broadcast email ke subscribers (upcoming)

**Role Hierarchy:**

- 👑 Super Admin (full access)
- 🛡️ Admin (manage content)
- ⚖️ Moderator (Q&A moderation)
- ✏️ Content Editor (create/edit only)
- 👁️ Viewer (read-only analytics)

### 🔹 Accessibility Features

Platform ini dirancang untuk **semua kalangan**, termasuk lansia:

- ⚙️ **Font Scaling** (A-/A+) untuk kemudahan membaca
- 🌙 **Dark Mode** mengurangi kelelahan mata
- 📱 **Responsive Design** optimal di semua perangkat
- 🎨 **High Contrast Mode** untuk pengguna dengan gangguan penglihatan
- ⌨️ **Keyboard Navigation** support untuk accessibility tools

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js 15.1.6](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod validation

### Backend

- **Database:** SQLite ([Prisma ORM](https://www.prisma.io/))
- **Authentication:** [NextAuth.js v5](https://authjs.dev/)
- **File Storage:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **API:** Next.js API Routes (RESTful)

### DevOps

- **Deployment:** Vercel
- **Version Control:** Git
- **Package Manager:** npm

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x atau lebih baru
- npm atau yarn
- Git

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/markaz-ilmu.git
cd markaz-ilmu

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# 4. Setup database
npm run db:push      # Create database schema
npm run db:seed      # Seed with initial data

# 5. Run development server
npm run dev
```

Buka browser dan akses:

- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin/login

### Default Admin Credentials

```
Email: admin@markazilmu.com
Password: admin123
```

⚠️ **PENTING:** Ganti password default setelah login pertama!

<!-- ---

## 📂 Struktur Proyek

```
markaz-ilmu/
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Initial data seeder
├── src/
│   ├── app/
│   │   ├── (main)/           # Public pages
│   │   │   ├── artikel/
│   │   │   ├── video-kajian/
│   │   │   ├── audio-kajian/
│   │   │   ├── ebook/
│   │   │   ├── doa-dzikir/
│   │   │   ├── jadwal-kajian/
│   │   │   ├── jadwal-sholat/
│   │   │   ├── tanya-jawab/
│   │   │   └── donasi/
│   │   ├── admin/            # Admin panel
│   │   │   ├── login/
│   │   │   └── (panel)/      # Protected admin routes
│   │   ├── api/              # API endpoints
│   │   └── layout.tsx
│   ├── components/           # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utilities & helpers
│   ├── types/                # TypeScript type definitions
│   └── middleware.ts         # NextAuth middleware
├── docs/                     # Documentation
├── .env.example              # Environment variables template
└── README.md
``` -->

---

<!-- ## 📖 Dokumentasi

- **[Software Design Document](./SDD_AdminPanel.md)** - Detailed admin panel architecture
- **[Deployment Guide](./DEPLOYMENT.md)** - Step-by-step deployment instructions
- **[Vercel Blob Setup](./VERCEL_BLOB_SETUP.md)** - File storage configuration
- **[API Documentation](./docs/API.md)** - API endpoints reference (coming soon)

--- -->

<!-- ## 🔐 Environment Variables

Buat file `.env` di root directory dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Vercel Blob (for file uploads)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Prayer Time API (optional)
PRAYER_TIME_API_KEY="your-api-key"
```

Lihat [.env.example](.env.example) untuk konfigurasi lengkap. -->

---

## 🧪 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:push          # Push schema changes to database
npm run db:seed          # Seed database with initial data
npm run db:studio        # Open Prisma Studio (database GUI)
```

---

## 📄 License

Project ini dilisensikan di bawah [MIT License](./LICENSE).

<!-- ## 📧 Kontak & Support

- **Email:** support@markazilmu.com
- **Website:** https://markazilmu.com
- **Issues:** [GitHub Issues](https://github.com/yourusername/markaz-ilmu/issues) -->

---

<div align="center">

**Barakallahu fiikum** - Semoga bermanfaat untuk umat

</div>
