"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Doa { id: string; title: string; category: string; arabic: string; source: string; status: string; order: number }

export function DoaDzikirClient({ initialData }: { initialData: Doa[] }) {
  const [duas, setDuas] = useState(initialData)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = duas.filter(d => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === "all" || d.category === categoryFilter
    return matchSearch && matchCat
  })

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/doa-dzikir/${deleteId}`, { method: "DELETE" })
    setDuas(prev => prev.filter(d => d.id !== deleteId))
    setDeleteId(null); setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Do&apos;a & Dzikir</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{duas.length} total item</p>
        </div>
        <Button asChild><Link href="/admin/doa-dzikir/baru"><Plus className="w-4 h-4 mr-1" />Tambah Do&apos;a</Link></Button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Cari judul..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Harian">Harian</SelectItem>
            <SelectItem value="Pagi">Pagi</SelectItem>
            <SelectItem value="Petang">Petang</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Teks Arab (preview)</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Sumber</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Tidak ada do&apos;a/dzikir</TableCell></TableRow>
            ) : filtered.map((doa, i) => (
              <TableRow key={doa.id}>
                <TableCell className="text-muted-foreground text-sm">{i + 1}</TableCell>
                <TableCell><span className="font-medium text-sm">{doa.title}</span></TableCell>
                <TableCell>
                  <span className="font-arabic text-sm text-right block max-w-xs truncate" dir="rtl">
                    {doa.arabic.slice(0, 50)}{doa.arabic.length > 50 ? "..." : ""}
                  </span>
                </TableCell>
                <TableCell><Badge variant="secondary">{doa.category}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">{doa.source}</TableCell>
                <TableCell><ContentStatusBadge status={doa.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" asChild><Link href={`/admin/doa-dzikir/${doa.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link></Button>
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(doa.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)} title="Hapus Do'a?" description="Item yang dihapus tidak dapat dikembalikan." confirmLabel="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
