# Panduan Versioning

Dokumen ini menjelaskan standar penomoran versi yang digunakan pada project frontend.

## Semantic Versioning (SemVer)

Semua project mengikuti standar [Semantic Versioning 2.0.0](https://semver.org/) dengan format:

```
MAJOR.MINOR.PATCH
```

**Contoh:** `1.2.3`

---

## Kapan Menaikkan Versi

| Komponen  | Kapan Dinaikkan                              | Contoh Perubahan                                     |
| --------- | -------------------------------------------- | ---------------------------------------------------- |
| **MAJOR** | Perubahan yang tidak kompatibel ke belakang  | Mengubah struktur API, menghapus fitur, breaking UI  |
| **MINOR** | Menambah fitur baru yang kompatibel          | Fitur baru, halaman baru, komponen baru              |
| **PATCH** | Perbaikan bug yang kompatibel ke belakang    | Bug fixes, typo, security patches, optimasi kecil    |

### Contoh Praktis

```
1.0.0 → 1.0.1  (PATCH) : Fix bug pada form validation
1.0.1 → 1.1.0  (MINOR) : Tambah fitur dark mode
1.1.0 → 2.0.0  (MAJOR) : Redesign total UI, breaking changes pada komponen
```

---

## Tahapan Pengembangan

### Versi Awal (0.x.x)

Gunakan versi `0.x.x` selama tahap pengembangan aktif:

```
0.1.0 → MVP / Prototype awal
0.2.0 → Penambahan fitur signifikan
0.x.1 → Perbaikan bug
```

> ⚠️ Selama versi `0.x.x`, API/struktur dianggap belum stabil dan dapat berubah kapan saja.

### Versi Stabil (1.0.0+)

Naikkan ke `1.0.0` ketika:
- Aplikasi sudah production-ready
- Fitur inti sudah lengkap
- API/struktur sudah stabil

---

## Label Pre-release

Untuk versi yang belum siap rilis penuh, gunakan label:

| Label   | Keterangan                                | Contoh            |
| ------- | ----------------------------------------- | ----------------- |
| `alpha` | Tahap awal, fitur belum lengkap           | `1.0.0-alpha.1`   |
| `beta`  | Fitur lengkap, masih dalam testing        | `1.0.0-beta.1`    |
| `rc`    | Release Candidate, kandidat rilis final   | `1.0.0-rc.1`      |

### Urutan Pre-release

```
1.0.0-alpha.1 → 1.0.0-alpha.2 → 1.0.0-beta.1 → 1.0.0-rc.1 → 1.0.0
```

---

## Cara Update Versi

### Menggunakan npm CLI

```bash
# Patch: 1.0.0 → 1.0.1
npm version patch

# Minor: 1.0.0 → 1.1.0
npm version minor

# Major: 1.0.0 → 2.0.0
npm version major

# Pre-release alpha
npm version prerelease --preid=alpha

# Pre-release beta
npm version prerelease --preid=beta
```

### Menggunakan yarn

```bash
yarn version --patch
yarn version --minor
yarn version --major
```

### Manual

Edit field `version` di `package.json`:

```json
{
  "name": "nama-project",
  "version": "1.1.0"
}
```

---

## Checklist Rilis

Sebelum merilis versi baru, pastikan:

- [ ] Semua tests passed
- [ ] Build production berhasil: `npm run build`
- [ ] Update `CHANGELOG.md` dengan perubahan
- [ ] Update versi di `package.json`
- [ ] Commit dengan pesan: `chore: release vX.X.X`
- [ ] Buat git tag: `git tag vX.X.X`
- [ ] Push changes dan tag: `git push && git push --tags`
- [ ] Buat release notes di GitHub/GitLab (jika ada)

---

## Contoh Alur Versioning Project

```
0.1.0  → Setup project, komponen dasar
0.2.0  → Halaman utama selesai
0.2.1  → Bug fix minor
0.3.0  → Tambah autentikasi
0.4.0  → Tambah dashboard
1.0.0  → Rilis production pertama ✓
1.0.1  → Hotfix bug login
1.1.0  → Tambah fitur notifikasi
1.2.0  → Tambah halaman settings
2.0.0  → Redesign UI (breaking changes)
```

---

## Git Branching & Versioning

Rekomendasi integrasi dengan git branching:

| Branch        | Versi                  | Keterangan                    |
| ------------- | ---------------------- | ----------------------------- |
| `main`        | Versi stabil (1.x.x)   | Production-ready              |
| `develop`     | Versi next (1.x+1.0)   | Development integration       |
| `feature/*`   | -                      | Fitur baru                    |
| `hotfix/*`    | Patch (1.x.x+1)        | Perbaikan urgent              |
| `release/*`   | Pre-release            | Persiapan rilis               |

---

## Best Practices

1. **Konsisten** - Selalu ikuti aturan SemVer
2. **Dokumentasi** - Update CHANGELOG.md setiap rilis
3. **Tag Git** - Buat tag untuk setiap versi rilis
4. **Komunikasi** - Informasikan tim tentang breaking changes
5. **Review** - Lakukan code review sebelum rilis

---

## Referensi

- [Semantic Versioning 2.0.0](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [npm version documentation](https://docs.npmjs.com/cli/v8/commands/npm-version)
