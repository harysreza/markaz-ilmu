"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Event { id: string; title: string; speaker: string; date: string; time: string; location: string; isOnline: boolean; isFree: boolean; registrationUrl: string | null; posterUrl: string; description: string; status: string }

export function JadwalForm({ event }: { event?: Event }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: event?.title ?? "", speaker: event?.speaker ?? "",
    date: event?.date ?? "", time: event?.time ?? "",
    location: event?.location ?? "", isOnline: event?.isOnline ?? false,
    isFree: event?.isFree ?? true, registrationUrl: event?.registrationUrl ?? "",
    posterUrl: event?.posterUrl ?? "", description: event?.description ?? "",
    status: event?.status ?? "upcoming",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const url = event ? `/api/admin/jadwal-kajian/${event.id}` : "/api/admin/jadwal-kajian"
    await fetch(url, { method: event ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setLoading(false); router.push("/admin/jadwal-kajian"); router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Detail Event</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label>Judul Event *</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Nama kajian..." required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Pembicara *</Label>
              <Input value={form.speaker} onChange={e => setForm(p => ({ ...p, speaker: e.target.value }))} placeholder="Ustadz..." required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Mendatang</SelectItem>
                  <SelectItem value="ongoing">Berlangsung</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Tanggal *</Label>
              <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Waktu *</Label>
              <Input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} required />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label>Lokasi *</Label>
              <Input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="Nama masjid / kota / link zoom..." required />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label>Deskripsi *</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Deskripsi kajian..." rows={4} required />
            </div>
            {!form.isFree && (
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label>Link Pendaftaran</Label>
                <Input value={form.registrationUrl} onChange={e => setForm(p => ({ ...p, registrationUrl: e.target.value }))} placeholder="https://forms.google.com/..." />
              </div>
            )}
          </div>
        </div>
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Poster</h2>
          <div className="flex flex-col gap-1.5">
            <Label>URL Poster</Label>
            <Input value={form.posterUrl} onChange={e => setForm(p => ({ ...p, posterUrl: e.target.value }))} placeholder="https://..." />
          </div>
          {form.posterUrl && <img src={form.posterUrl} alt="poster" className="rounded-lg w-full max-w-xs" />}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Opsi Event</h2>
          <div className="flex items-center justify-between py-1">
            <div><Label>Event Online</Label><p className="text-xs text-muted-foreground">Kajian via Zoom/YouTube</p></div>
            <Switch checked={form.isOnline} onCheckedChange={v => setForm(p => ({ ...p, isOnline: v }))} />
          </div>
          <div className="flex items-center justify-between py-1">
            <div><Label>Gratis</Label><p className="text-xs text-muted-foreground">Tidak ada biaya pendaftaran</p></div>
            <Switch checked={form.isFree} onCheckedChange={v => setForm(p => ({ ...p, isFree: v }))} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Menyimpan..." : event ? "Simpan Perubahan" : "Buat Event"}</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Batal</Button>
        </div>
      </div>
    </form>
  )
}
