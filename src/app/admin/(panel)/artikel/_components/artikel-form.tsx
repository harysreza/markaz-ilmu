"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Article {
  id: string
  title: string
  slug: string
  category: string
  content: string
  summary: string
  thumbnail: string
  author: string
  isTrending: boolean
  status: string
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim()
}

export function ArtikelForm({ article }: { article?: Article }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    category: article?.category ?? "Akidah",
    content: article?.content ?? "",
    summary: article?.summary ?? "",
    thumbnail: article?.thumbnail ?? "",
    author: article?.author ?? "",
    isTrending: article?.isTrending ?? false,
    status: article?.status ?? "draft",
  })

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === slugify(prev.title) || prev.slug === "" ? slugify(title) : prev.slug,
    }))
  }

  async function handleSubmit(e: React.FormEvent, publishNow?: boolean) {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, status: publishNow ? "published" : form.status }
    const url = article ? `/api/admin/artikel/${article.id}` : "/api/admin/artikel"
    const method = article ? "PUT" : "POST"
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    setLoading(false)
    router.push("/admin/artikel")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Informasi Dasar</h2>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Judul Artikel *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Judul artikel..."
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              placeholder="judul-artikel"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="summary">Ringkasan *</Label>
            <Textarea
              id="summary"
              value={form.summary}
              onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
              placeholder="Ringkasan singkat artikel..."
              rows={3}
              required
            />
          </div>
        </div>

        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Konten Artikel</h2>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Isi Konten (HTML) *</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              placeholder="<p>Konten artikel dalam format HTML...</p>"
              rows={16}
              required
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Gunakan tag HTML: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;blockquote&gt;, &lt;strong&gt;
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-4">
        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Pengaturan</h2>

          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Dipublikasikan</SelectItem>
                <SelectItem value="archived">Diarsip</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Kategori *</Label>
            <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Akidah">Akidah</SelectItem>
                <SelectItem value="Manhaj">Manhaj</SelectItem>
                <SelectItem value="Fikih">Fikih</SelectItem>
                <SelectItem value="Akhlak">Akhlak</SelectItem>
                <SelectItem value="Do'a & Dzikir">Do&apos;a & Dzikir</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="author">Penulis *</Label>
            <Input
              id="author"
              value={form.author}
              onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
              placeholder="Ustadz..."
              required
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <Label className="font-medium">Trending</Label>
              <p className="text-xs text-muted-foreground">Tampilkan badge trending</p>
            </div>
            <Switch
              checked={form.isTrending}
              onCheckedChange={(v) => setForm((p) => ({ ...p, isTrending: v }))}
            />
          </div>
        </div>

        <div className="bg-background border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Thumbnail</h2>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="thumbnail">URL Gambar</Label>
            <Input
              id="thumbnail"
              value={form.thumbnail}
              onChange={(e) => setForm((p) => ({ ...p, thumbnail: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          {form.thumbnail && (
            <img src={form.thumbnail} alt="Preview" className="rounded-lg w-full aspect-video object-cover" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={loading} variant="outline">
            {loading ? "Menyimpan..." : "Simpan Draft"}
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={(e) => handleSubmit(e, true)}
          >
            {loading ? "Memproses..." : "Publikasikan"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Batal
          </Button>
        </div>
      </div>
    </form>
  )
}
