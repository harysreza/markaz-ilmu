"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Pencil, Trash2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Article {
  id: string
  title: string
  slug: string
  category: string
  author: string
  status: string
  isTrending: boolean
  views: number
  updatedAt: Date
}

export function ArtikelClient({ initialData }: { initialData: Article[] }) {
  const [articles, setArticles] = useState(initialData)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = articles.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || a.status === statusFilter
    const matchCategory = categoryFilter === "all" || a.category === categoryFilter
    return matchSearch && matchStatus && matchCategory
  })

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/artikel/${deleteId}`, { method: "DELETE" })
    setArticles((prev) => prev.filter((a) => a.id !== deleteId))
    setDeleteId(null)
    setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Artikel</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{articles.length} total artikel</p>
        </div>
        <Button asChild>
          <Link href="/admin/artikel/baru">
            <Plus className="w-4 h-4 mr-1" />
            Tambah Artikel
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Cari judul atau penulis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="published">Dipublikasikan</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Diarsip</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Akidah">Akidah</SelectItem>
            <SelectItem value="Manhaj">Manhaj</SelectItem>
            <SelectItem value="Fikih">Fikih</SelectItem>
            <SelectItem value="Akhlak">Akhlak</SelectItem>
            <SelectItem value="Do'a & Dzikir">Do&apos;a & Dzikir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  Tidak ada artikel ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm line-clamp-1">{article.title}</span>
                      <span className="text-xs text-muted-foreground">{article.slug}</span>
                    </div>
                    {article.isTrending && (
                      <Badge variant="outline" className="mt-1 text-xs gap-1">
                        <TrendingUp className="w-3 h-3" /> Trending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{article.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{article.author}</TableCell>
                  <TableCell>
                    <ContentStatusBadge status={article.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{article.views.toLocaleString("id-ID")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/admin/artikel/${article.id}/edit`}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(article.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Hapus Artikel?"
        description="Artikel yang dihapus tidak dapat dikembalikan. Lanjutkan?"
        confirmLabel="Hapus"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  )
}
