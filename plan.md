# 🗺️ Blueprint Project: Web Kajian Multimedia (React/Next.js)



Dokumen ini berisi rencana struktur, layout, dan spesifikasi teknis untuk website kajian yang berfokus pada konten **Teks, Gambar, Audio, dan Video** dengan target audiens lintas generasi (Anak Muda & Orang Tua).



---



## 1. Arsitektur Informasi (Navigasi Utama)

Struktur menu didasarkan pada topik (Taxonomy) untuk memudahkan pencarian ilmu:



- **[Logo Beranda]**

- **Belajar** (Dropdown):

  - Akidah

  - Manhaj

  - Fikih

  - Akhlak & Nasihat

- **Program**: (Dauroh, Jadwal Kajian Rutin, Informasi Donasi)

- **Do'a & Dzikir**: (Dzikir Pagi Petang, Do'a Shahih Harian)

- **E-Book**: (Katalog PDF & Viewer Interaktif)



---



## 2. Rencana Layout Halaman Utama (Homepage)



### A. Section: Top Navigation & Utility

- **Sticky Navbar**: Tetap di atas saat scroll.

- **Accessibility Tools**: 

  - Tombol `A- | A+` untuk mengubah ukuran font secara global.

  - Dark Mode Toggle.

- **Search Bar**: Pencarian cerdas berbasis kata kunci hadits atau judul materi.



### B. Section: Hero Content (Bento Grid)

Menggunakan layout kotak-kotak modern untuk menonjolkan materi utama:

- **Kotak Utama (Video/Featured)**: Video kajian terbaru atau streaming yang sedang berlangsung.

- **Kotak Samping 1 (Image)**: Poster jadwal kajian pekan ini.

- **Kotak Samping 2 (Quick Link)**: Shortcut ke menu "Dzikir Pagi Petang".



### C. Section: Multiformat Discovery Feed

Daftar konten terbaru dengan filter tipe media:

- **Filter Tabs**: [Semua] [Teks] [Video] [Audio].

- **Grid Card System**:

  - **Header Card**: Thumbnail (Gambar/Preview Video).

  - **Body Card**: Judul, Kategori (Badge), dan Ringkasan singkat.

  - **Footer Card**: Indikator media (Icon 📺, 🎧, 📄) dan Tombol Share WhatsApp.



### D. Section: E-Book & Do'a (Horizontal Scroll)

- Layout rak buku untuk E-book.

- Kartu Do'a dengan teks Arab yang besar (Optimasi untuk pengguna lanjut usia).