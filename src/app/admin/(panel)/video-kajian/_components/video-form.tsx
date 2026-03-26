"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Video {
  id: string; title: string; speaker: string; duration: string
  category: string; youtubeId: string; isFeatured: boolean; status: string
}

export function VideoForm({ video }: { video?: Video }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: video?.title ?? "", speaker: video?.speaker ?? "",
    duration: video?.duration ?? "", category: video?.category ?? "Akidah",
    youtubeId: video?.youtubeId ?? "", isFeatured: video?.isFeatured ?? false,
    status: video?.status ?? "draft",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const url = video ? `/api/admin/video-kajian/${video.id}` : "/api/admin/video-kajian"
    await fetch(url, { method: video ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setLoading(false); router.push("/admin/video-kajian"); router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-background border rounded-xl p-5 flex flex-col gap-4">
        <h2 className="font-semibold">Informasi Video</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>Judul *</Label>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Judul video..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Pembicara *</Label>
            <Input value={form.speaker} onChange={e => setForm(p => ({ ...p, speaker: e.target.value }))} placeholder="Ustadz..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Durasi (HH:MM:SS) *</Label>
            <Input value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} placeholder="01:23:45" required />
          </div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>YouTube Video ID *</Label>
            <Input value={form.youtubeId} onChange={e => setForm(p => ({ ...p, youtubeId: e.target.value }))} placeholder="dQw4w9WgXcQ" required />
            <p className="text-xs text-muted-foreground">ID dari URL: youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong></p>
          </div>
          {form.youtubeId && (
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Preview Thumbnail:</p>
              <img src={`https://img.youtube.com/vi/${form.youtubeId}/mqdefault.jpg`} alt="thumb" className="rounded-lg w-full max-w-xs aspect-video object-cover" />
            </div>
          )}
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
                {["Akidah","Fikih","Akhlak","Tafsir","Muamalah"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
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
            <div><Label>Unggulan</Label><p className="text-xs text-muted-foreground">Tampilkan di homepage</p></div>
            <Switch checked={form.isFeatured} onCheckedChange={v => setForm(p => ({ ...p, isFeatured: v }))} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Menyimpan..." : video ? "Simpan Perubahan" : "Tambah Video"}</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Batal</Button>
        </div>
      </div>
    </form>
  )
}
