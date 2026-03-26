"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QAForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    question: "", answer: "", category: "Fikih",
    askedBy: "Anonim", answeredBy: "Lajnah Ilmiah Markaz Ilmu",
    status: "published",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await fetch("/api/admin/tanya-jawab", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setLoading(false); router.push("/admin/tanya-jawab"); router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-background border rounded-xl p-5 flex flex-col gap-4">
        <h2 className="font-semibold">Pertanyaan & Jawaban</h2>
        <div className="flex flex-col gap-1.5">
          <Label>Pertanyaan *</Label>
          <Textarea value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} placeholder="Tulis pertanyaan..." rows={4} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Jawaban *</Label>
          <Textarea value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} placeholder="Tulis jawaban..." rows={8} required />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Informasi</h2>
          <div className="flex flex-col gap-1.5">
            <Label>Kategori</Label>
            <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Akidah","Fikih","Akhlak","Muamalah"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Penanya</Label>
            <Input value={form.askedBy} onChange={e => setForm(p => ({ ...p, askedBy: e.target.value }))} placeholder="Nama penanya..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Dijawab Oleh</Label>
            <Input value={form.answeredBy} onChange={e => setForm(p => ({ ...p, answeredBy: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Dipublikasikan</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Menyimpan..." : "Publikasikan Q&A"}</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Batal</Button>
        </div>
      </div>
    </form>
  )
}
