# 🚀 Setup Vercel Blob Storage

Panduan lengkap untuk mengkonfigurasi Vercel Blob Storage untuk upload e-book dan cover image.

## 📋 Langkah-langkah Setup

### 1. Buat Akun Vercel (Jika Belum Punya)

1. Kunjungi [vercel.com](https://vercel.com)
2. Klik **Sign Up** (bisa pakai GitHub, GitLab, atau Bitbucket)
3. Verifikasi email Anda

### 2. Deploy Project ke Vercel (Opsional tapi Direkomendasikan)

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy project
vercel
```

Atau deploy via GitHub:
1. Push code ke GitHub repository
2. Import project di [vercel.com/new](https://vercel.com/new)
3. Klik **Import** pada repository Anda

### 3. Buat Blob Store

#### Cara 1: Via Dashboard Vercel
1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project Anda
3. Klik tab **Storage**
4. Klik **Create Database**
5. Pilih **Blob**
6. Beri nama: `markaz-ilmu-files` (atau nama lain)
7. Klik **Create**

#### Cara 2: Via CLI
```bash
vercel blob create markaz-ilmu-files
```

### 4. Dapatkan Blob Token

Setelah Blob Store dibuat:

1. Buka **Storage** tab di Vercel Dashboard
2. Klik pada Blob Store yang baru dibuat
3. Pergi ke tab **Settings** atau **.env.local**
4. Copy value `BLOB_READ_WRITE_TOKEN`

Contoh token:
```
vercel_blob_rw_AbCdEfGhIjKlMnOp_1234567890abcdefghijklmnopqrstuvwxyz
```

### 5. Konfigurasi Environment Variables

#### Development (Local)

Edit file `.env`:

```bash
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxxx"
```

#### Production (Vercel)

1. Buka project di Vercel Dashboard
2. Klik **Settings** → **Environment Variables**
3. Tambahkan:
   - **Key:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** token yang Anda copy
   - **Environment:** Production, Preview, Development (pilih semua)
4. Klik **Save**

### 6. Restart Development Server

```bash
# Stop server (Ctrl+C)
# Start ulang
npm run dev
```

### 7. Test Upload

1. Buka `http://localhost:3000/admin/ebook/baru`
2. Coba upload file PDF
3. Coba upload cover image
4. Jika berhasil, file akan tersimpan di Vercel Blob!

## ✅ Verifikasi Upload Berhasil

### Cek di Vercel Dashboard:
1. Buka [vercel.com/dashboard](https://vercel.com/dashboard)
2. Pilih project → **Storage** → Blob Store Anda
3. Tab **Browse** akan menampilkan file yang sudah diupload
4. Anda bisa lihat file dalam folder:
   - `ebooks/` - untuk PDF
   - `covers/` - untuk gambar cover

### URL File:
File yang diupload akan punya URL seperti:
```
https://xxxxxxxxxx.public.blob.vercel-storage.com/ebooks/1234567890-abc123.pdf
https://xxxxxxxxxx.public.blob.vercel-storage.com/covers/1234567890-xyz789.jpg
```

## 🎯 Fitur yang Sudah Diimplementasikan

✅ Upload PDF ke Vercel Blob
✅ Upload cover image ke Vercel Blob
✅ Validasi tipe file
✅ Validasi ukuran file (PDF: 50MB, Image: 5MB)
✅ Generate nama file unik
✅ Public access untuk file
✅ Auto CDN global

## 📊 Monitoring Storage Usage

### Via Dashboard:
1. Buka Blob Store di Vercel Dashboard
2. Tab **Usage** menampilkan:
   - Total storage used
   - Bandwidth used
   - Number of files

### Free Tier Limits:
- **Storage:** 500 MB gratis
- **Bandwidth:** 5 GB/bulan gratis
- **Requests:** Unlimited

## 🔧 Troubleshooting

### Error: "Unauthorized"
- ✅ Pastikan `BLOB_READ_WRITE_TOKEN` sudah di-set di `.env`
- ✅ Restart development server setelah ubah `.env`
- ✅ Token harus dimulai dengan `vercel_blob_rw_`

### Error: "Failed to upload file"
- ✅ Cek koneksi internet
- ✅ Pastikan file tidak melebihi limit (PDF: 50MB, Image: 5MB)
- ✅ Cek console untuk error detail

### File tidak muncul di dashboard
- ✅ Tunggu beberapa detik (bisa ada delay)
- ✅ Refresh halaman Browse
- ✅ Pastikan upload berhasil (cek response dari API)

### Error saat production deploy
- ✅ Pastikan `BLOB_READ_WRITE_TOKEN` sudah di-set di Vercel Environment Variables
- ✅ Redeploy project setelah set environment variables
- ✅ Cek logs: `vercel logs [deployment-url]`

## 💡 Tips

1. **Gunakan satu Blob Store untuk semua environment** (dev, staging, production) atau pisahkan jika ingin isolasi data

2. **Backup file penting**: Vercel Blob tidak punya built-in backup, pertimbangkan backup manual file penting

3. **Monitor usage**: Cek usage secara berkala agar tidak over limit free tier

4. **Delete unused files**: Hapus file yang tidak terpakai untuk hemat storage

## 🔐 Keamanan

- ✅ Token di `.env` tidak akan ter-commit ke Git (sudah ada di `.gitignore`)
- ✅ Upload hanya bisa dilakukan oleh admin yang sudah login
- ✅ File validation mencegah upload file berbahaya
- ✅ Public access hanya untuk membaca file, bukan upload/delete

## 📞 Support

Jika ada masalah:
1. Cek [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
2. Cek [Vercel Community](https://github.com/vercel/vercel/discussions)
3. Contact Vercel Support di dashboard

---

**Status:** ✅ Terintegrasi dan siap digunakan!
