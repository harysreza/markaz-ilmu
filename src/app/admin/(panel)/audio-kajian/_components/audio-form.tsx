"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Audio { id: string; title: string; speaker: string; category: string; image: string; type: string; spotifyId: string; isFeatured: boolean; status: string }

export function AudioForm({ audio }: { audio?: Audio }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: audio?.title ?? "", speaker: audio?.speaker ?? "",
    category: audio?.category ?? "Akidah", image: audio?.image ?? "",
    type: audio?.type ?? "episode", spotifyId: audio?.spotifyId ?? "",
    isFeatured: audio?.isFeatured ?? false, status: audio?.status ?? "draft",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const url = audio ? `/api/admin/audio-kajian/${audio.id}` : "/api/admin/audio-kajian"
    await fetch(url, { method: audio ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setLoading(false); router.push("/admin/audio-kajian"); router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-background border rounded-xl p-5 flex flex-col gap-4">
        <h2 className="font-semibold">Informasi Audio</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>Judul *</Label>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Judul audio..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Pembicara *</Label>
            <Input value={form.speaker} onChange={e => setForm(p => ({ ...p, speaker: e.target.value }))} placeholder="Ustadz..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Tipe</Label>
            <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="episode">Episode</SelectItem>
                <SelectItem value="playlist">Playlist</SelectItem>
                <SelectItem value="show">Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>Spotify ID *</Label>
            <Input value={form.spotifyId} onChange={e => setForm(p => ({ ...p, spotifyId: e.target.value }))} placeholder="Spotify ID..." required />
            <p className="text-xs text-muted-foreground">ID dari URL Spotify: open.spotify.com/{form.type}/<strong>ID</strong></p>
          </div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>URL Cover Image</Label>
            <Input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." />
          </div>
          {form.image && <div className="col-span-2"><img src={form.image} alt="cover" className="w-24 h-24 rounded-lg object-cover" /></div>}
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
          <Button type="submit" disabled={loading}>{loading ? "Menyimpan..." : audio ? "Simpan Perubahan" : "Tambah Audio"}</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Batal</Button>
        </div>
      </div>
    </form>
  )
}
