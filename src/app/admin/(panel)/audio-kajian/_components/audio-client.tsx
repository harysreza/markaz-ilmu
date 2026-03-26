"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Pencil, Trash2, Star, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Audio {
  id: string; title: string; speaker: string; category: string
  image: string; type: string; spotifyId: string; isFeatured: boolean; status: string
}

export function AudioKajianClient({ initialData }: { initialData: Audio[] }) {
  const [audios, setAudios] = useState(initialData)
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = audios.filter(a => !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.speaker.toLowerCase().includes(search.toLowerCase()))

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/audio-kajian/${deleteId}`, { method: "DELETE" })
    setAudios(prev => prev.filter(a => a.id !== deleteId))
    setDeleteId(null); setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Audio Kajian</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{audios.length} total audio</p>
        </div>
        <Button asChild><Link href="/admin/audio-kajian/baru"><Plus className="w-4 h-4 mr-1" />Tambah Audio</Link></Button>
      </div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Cari judul atau pembicara..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Pembicara</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Tidak ada audio</TableCell></TableRow>
            ) : filtered.map(audio => (
              <TableRow key={audio.id}>
                <TableCell>
                  {audio.image ? (
                    <img src={audio.image} alt={audio.title} className="w-12 h-12 rounded object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center"><Music className="w-5 h-5 text-muted-foreground" /></div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm line-clamp-1">{audio.title}</span>
                    {audio.isFeatured && <Badge variant="outline" className="text-xs gap-1 w-fit"><Star className="w-3 h-3" />Unggulan</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{audio.speaker}</TableCell>
                <TableCell><Badge variant="secondary" className="capitalize">{audio.type}</Badge></TableCell>
                <TableCell><Badge variant="outline">{audio.category}</Badge></TableCell>
                <TableCell><ContentStatusBadge status={audio.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" asChild>
                      <Link href={`/admin/audio-kajian/${audio.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(audio.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)} title="Hapus Audio?" description="Audio yang dihapus tidak dapat dikembalikan." confirmLabel="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
