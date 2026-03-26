"use client"

import { useState } from "react"
import { Search, ClipboardList } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Log {
  id: string; action: string; resource: string; resourceTitle: string
  timestamp: Date; ipAddress: string | null
  actor: { name: string; email: string }
}

const actionColors: Record<string, string> = {
  create: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  update: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  delete: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  publish: "bg-primary/10 text-primary",
  archive: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  reject: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  login: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

const actionLabels: Record<string, string> = {
  create: "Dibuat", update: "Diubah", delete: "Dihapus",
  publish: "Dipublikasikan", archive: "Diarsip", reject: "Ditolak", login: "Login",
}

export function AuditLogClient({ initialLogs }: { initialLogs: Log[] }) {
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [resourceFilter, setResourceFilter] = useState("all")

  const resources = Array.from(new Set(initialLogs.map(l => l.resource)))

  const filtered = initialLogs.filter(l => {
    const matchSearch = !search || l.resourceTitle.toLowerCase().includes(search.toLowerCase()) || l.actor.name.toLowerCase().includes(search.toLowerCase())
    const matchAction = actionFilter === "all" || l.action === actionFilter
    const matchResource = resourceFilter === "all" || l.resource === resourceFilter
    return matchSearch && matchAction && matchResource
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Rekam jejak semua aktivitas admin</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Cari judul atau nama admin..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Semua Aksi" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Aksi</SelectItem>
            {Object.entries(actionLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={resourceFilter} onValueChange={setResourceFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Semua Modul" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Modul</SelectItem>
            {resources.map(r => <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Waktu</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Aksi</TableHead>
              <TableHead>Modul</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Tidak ada log ditemukan</TableCell></TableRow>
            ) : filtered.map(log => (
              <TableRow key={log.id}>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                  <br />
                  {new Date(log.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                </TableCell>
                <TableCell>
                  <p className="font-medium text-sm">{log.actor.name}</p>
                  <p className="text-xs text-muted-foreground">{log.actor.email}</p>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${actionColors[log.action] ?? "bg-gray-100 text-gray-700"}`}>
                    {actionLabels[log.action] ?? log.action}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize text-xs">{log.resource}</Badge>
                </TableCell>
                <TableCell className="text-sm max-w-xs">
                  <p className="line-clamp-1">{log.resourceTitle}</p>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">{log.ipAddress ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t text-xs text-muted-foreground">
          Menampilkan {filtered.length} dari {initialLogs.length} entri terbaru
        </div>
      </div>
    </div>
  )
}
