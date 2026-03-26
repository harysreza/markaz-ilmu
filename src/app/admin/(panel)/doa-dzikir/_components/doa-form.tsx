"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Doa { id: string; title: string; category: string; arabic: string; latin: string; translation: string; source: string; order: number; status: string }

export function DoaForm({ doa }: { doa?: Doa }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: doa?.title ?? "", category: doa?.category ?? "Harian",
    arabic: doa?.arabic ?? "", latin: doa?.latin ?? "",
    translation: doa?.translation ?? "", source: doa?.source ?? "",
    order: doa?.order ?? 0, status: doa?.status ?? "draft",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const url = doa ? `/api/admin/doa-dzikir/${doa.id}` : "/api/admin/doa-dzikir"
    await fetch(url, { method: doa ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setLoading(false); router.push("/admin/doa-dzikir"); router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Teks Do&apos;a</h2>
          <div className="flex flex-col gap-1.5">
            <Label>Judul *</Label>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Nama do'a atau dzikir..." required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Teks Arab *</Label>
            <Textarea
              value={form.arabic}
              onChange={e => setForm(p => ({ ...p, arabic: e.target.value }))}
              placeholder="اَللّٰهُمَّ..."
              rows={4}
              required
              dir="rtl"
              className="font-arabic text-lg text-right leading-loose"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Latin (Transliterasi) *</Label>
            <Textarea value={form.latin} onChange={e => setForm(p => ({ ...p, latin: e.target.value }))} placeholder="Allahumma..." rows={3} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Terjemahan (Indonesia) *</Label>
            <Textarea value={form.translation} onChange={e => setForm(p => ({ ...p, translation: e.target.value }))} placeholder="Ya Allah..." rows={3} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Sumber *</Label>
            <Input value={form.source} onChange={e => setForm(p => ({ ...p, source: e.target.value }))} placeholder="HR. Bukhari No. 6312" required />
          </div>
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
                <SelectItem value="Harian">Harian</SelectItem>
                <SelectItem value="Pagi">Pagi</SelectItem>
                <SelectItem value="Petang">Petang</SelectItem>
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
          <div className="flex flex-col gap-1.5">
            <Label>Urutan</Label>
            <Input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))} placeholder="0" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Menyimpan..." : doa ? "Simpan Perubahan" : "Tambah Do'a"}</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Batal</Button>
        </div>
      </div>
    </form>
  )
}
