"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Pencil, Trash2, MapPin, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Event { id: string; title: string; speaker: string; date: string; time: string; location: string; isOnline: boolean; isFree: boolean; status: string }

export function JadwalKajianClient({ initialData }: { initialData: Event[] }) {
  const [events, setEvents] = useState(initialData)
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = events.filter(e => !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.speaker.toLowerCase().includes(search.toLowerCase()))

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/jadwal-kajian/${deleteId}`, { method: "DELETE" })
    setEvents(prev => prev.filter(e => e.id !== deleteId))
    setDeleteId(null); setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Jadwal Kajian</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{events.length} total event</p>
        </div>
        <Button asChild><Link href="/admin/jadwal-kajian/baru"><Plus className="w-4 h-4 mr-1" />Buat Event</Link></Button>
      </div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Cari judul atau pembicara..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Event</TableHead>
              <TableHead>Pembicara</TableHead>
              <TableHead>Tanggal & Waktu</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Tidak ada event</TableCell></TableRow>
            ) : filtered.map(event => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm line-clamp-1">{event.title}</span>
                    <div className="flex gap-1">
                      {event.isOnline && <Badge variant="outline" className="text-xs gap-1"><Wifi className="w-3 h-3" />Online</Badge>}
                      {event.isFree && <Badge variant="secondary" className="text-xs">Gratis</Badge>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{event.speaker}</TableCell>
                <TableCell className="text-sm">
                  <div>{event.date}</div>
                  <div className="text-muted-foreground">{event.time} WIB</div>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </span>
                </TableCell>
                <TableCell><ContentStatusBadge status={event.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" asChild><Link href={`/admin/jadwal-kajian/${event.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link></Button>
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(event.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)} title="Hapus Event?" description="Event yang dihapus tidak dapat dikembalikan." confirmLabel="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
