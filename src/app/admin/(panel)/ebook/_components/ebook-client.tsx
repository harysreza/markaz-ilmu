"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Pencil, Trash2, BookOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Ebook {
  id: string; title: string; author: string; thumbnail: string
  fileUrl: string; fileSize: string; category: string
  downloadCount: number; status: string
}

export function EbookClient({ initialData }: { initialData: Ebook[] }) {
  const [ebooks, setEbooks] = useState(initialData)
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = ebooks.filter(e => !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.author.toLowerCase().includes(search.toLowerCase()))

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/ebook/${deleteId}`, { method: "DELETE" })
    setEbooks(prev => prev.filter(e => e.id !== deleteId))
    setDeleteId(null); setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen E-Book</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{ebooks.length} total e-book</p>
        </div>
        <Button asChild><Link href="/admin/ebook/baru"><Plus className="w-4 h-4 mr-1" />Upload E-Book</Link></Button>
      </div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Cari judul atau penulis..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Ukuran</TableHead>
              <TableHead>Unduhan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Tidak ada e-book</TableCell></TableRow>
            ) : filtered.map(ebook => (
              <TableRow key={ebook.id}>
                <TableCell>
                  {ebook.thumbnail ? (
                    <img src={ebook.thumbnail} alt={ebook.title} className="w-10 h-14 rounded object-cover" />
                  ) : (
                    <div className="w-10 h-14 rounded bg-muted flex items-center justify-center"><BookOpen className="w-4 h-4 text-muted-foreground" /></div>
                  )}
                </TableCell>
                <TableCell><span className="font-medium text-sm line-clamp-2">{ebook.title}</span></TableCell>
                <TableCell className="text-sm text-muted-foreground">{ebook.author}</TableCell>
                <TableCell><Badge variant="secondary">{ebook.category}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{ebook.fileSize}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-3.5 h-3.5" />{ebook.downloadCount}
                  </span>
                </TableCell>
                <TableCell><ContentStatusBadge status={ebook.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" asChild><Link href={`/admin/ebook/${ebook.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link></Button>
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(ebook.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)} title="Hapus E-Book?" description="E-Book yang dihapus tidak dapat dikembalikan." confirmLabel="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
