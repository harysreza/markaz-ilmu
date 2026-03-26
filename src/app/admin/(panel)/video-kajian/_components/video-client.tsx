"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Pencil, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Video {
  id: string; title: string; speaker: string; duration: string
  category: string; youtubeId: string; isFeatured: boolean
  status: string; views: string; updatedAt: Date
}

export function VideoKajianClient({ initialData }: { initialData: Video[] }) {
  const [videos, setVideos] = useState(initialData)
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = videos.filter(v => !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.speaker.toLowerCase().includes(search.toLowerCase()))

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/video-kajian/${deleteId}`, { method: "DELETE" })
    setVideos(prev => prev.filter(v => v.id !== deleteId))
    setDeleteId(null); setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Video Kajian</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{videos.length} total video</p>
        </div>
        <Button asChild><Link href="/admin/video-kajian/baru"><Plus className="w-4 h-4 mr-1" />Tambah Video</Link></Button>
      </div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Cari judul atau pembicara..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Pembicara</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Tidak ada video</TableCell></TableRow>
            ) : filtered.map(video => (
              <TableRow key={video.id}>
                <TableCell>
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-20 rounded object-cover aspect-video"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm line-clamp-2">{video.title}</span>
                    {video.isFeatured && <Badge variant="outline" className="text-xs gap-1 w-fit"><Star className="w-3 h-3" />Unggulan</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{video.speaker}</TableCell>
                <TableCell><Badge variant="secondary">{video.category}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{video.duration}</TableCell>
                <TableCell><ContentStatusBadge status={video.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" asChild>
                      <Link href={`/admin/video-kajian/${video.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(video.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)} title="Hapus Video?" description="Video yang dihapus tidak dapat dikembalikan." confirmLabel="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
