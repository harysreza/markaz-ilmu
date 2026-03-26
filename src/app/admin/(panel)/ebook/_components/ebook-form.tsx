"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { upload } from "@vercel/blob/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Image as ImageIcon, X, Loader2 } from "lucide-react"

interface Ebook { id: string; title: string; author: string; thumbnail: string; fileUrl: string; fileSize: string; category: string; isReadOnline: boolean; isDownloadable: boolean; status: string }

export function EbookForm({ ebook }: { ebook?: Ebook }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [form, setForm] = useState({
    title: ebook?.title ?? "", author: ebook?.author ?? "",
    thumbnail: ebook?.thumbnail ?? "", fileUrl: ebook?.fileUrl ?? "",
    fileSize: ebook?.fileSize ?? "", category: ebook?.category ?? "Akidah",
    isReadOnline: ebook?.isReadOnline ?? true, isDownloadable: ebook?.isDownloadable ?? true,
    status: ebook?.status ?? "draft",
  })

  async function handlePdfUpload(file: File) {
    setUploadingPdf(true)
    try {
      // Use Vercel Blob client-side upload for large files
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      })

      setForm(p => ({
        ...p,
        fileUrl: blob.url,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
      }))
      setPdfFile(file)
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Gagal upload PDF")
    } finally {
      setUploadingPdf(false)
    }
  }

  async function handleImageUpload(file: File) {
    setUploadingImage(true)
    try {
      // Use Vercel Blob client-side upload
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      })

      setForm(p => ({ ...p, thumbnail: blob.url }))
      setImageFile(file)
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Gagal upload gambar")
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.fileUrl) {
      alert("Harap upload file PDF terlebih dahulu")
      return
    }

    setLoading(true)
    try {
      const url = ebook ? `/api/admin/ebook/${ebook.id}` : "/api/admin/ebook"
      await fetch(url, {
        method: ebook ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      router.push("/admin/ebook")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Gagal menyimpan e-book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-background border rounded-xl p-5 flex flex-col gap-4">
        <h2 className="font-semibold">Informasi E-Book</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>Judul Buku *</Label>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Judul buku..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Penulis *</Label>
            <Input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} placeholder="Nama penulis..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Ukuran File</Label>
            <Input value={form.fileSize} onChange={e => setForm(p => ({ ...p, fileSize: e.target.value }))} placeholder="2.4 MB" />
          </div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>Upload File PDF *</Label>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handlePdfUpload(file)
                  }}
                  disabled={uploadingPdf}
                  className="cursor-pointer"
                />
                {uploadingPdf && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-md">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                )}
              </div>
              {pdfFile && (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                  <FileText className="h-4 w-4 text-red-500" />
                  <span className="text-sm flex-1">{pdfFile.name}</span>
                  <span className="text-xs text-muted-foreground">{form.fileSize}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPdfFile(null)
                      setForm(p => ({ ...p, fileUrl: "", fileSize: "" }))
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {form.fileUrl && !pdfFile && (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                  <FileText className="h-4 w-4 text-red-500" />
                  <span className="text-sm flex-1 truncate">{form.fileUrl}</span>
                  <span className="text-xs text-muted-foreground">{form.fileSize}</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>Upload Cover Image</Label>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
                  disabled={uploadingImage}
                  className="cursor-pointer"
                />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-md">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                )}
              </div>
              {imageFile && (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm flex-1">{imageFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setImageFile(null)
                      setForm(p => ({ ...p, thumbnail: "" }))
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          {form.thumbnail && <div className="col-span-2"><img src={form.thumbnail} alt="cover" className="w-32 h-40 rounded-lg object-cover border" /></div>}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Pengaturan</h2>
          <div className="flex flex-col gap-1.5">
            <Label>Kategori</Label>
            <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Akidah","Fikih","Akhlak","Hadits","Tafsir"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Dipublikasikan</SelectItem>
                <SelectItem value="archived">Diarsip</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between py-1">
            <div><Label>Baca Online</Label><p className="text-xs text-muted-foreground">Aktifkan tombol baca</p></div>
            <Switch checked={form.isReadOnline} onCheckedChange={v => setForm(p => ({ ...p, isReadOnline: v }))} />
          </div>
          <div className="flex items-center justify-between py-1">
            <div><Label>Dapat Diunduh</Label><p className="text-xs text-muted-foreground">Aktifkan tombol unduh</p></div>
            <Switch checked={form.isDownloadable} onCheckedChange={v => setForm(p => ({ ...p, isDownloadable: v }))} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Menyimpan..." : ebook ? "Simpan Perubahan" : "Upload E-Book"}</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Batal</Button>
        </div>
      </div>
    </form>
  )
}
