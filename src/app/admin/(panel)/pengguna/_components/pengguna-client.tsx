"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AdminUser { id: string; name: string; email: string; role: string; isActive: boolean; lastLoginAt: Date | null; createdAt: Date }

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin", admin: "Admin", moderator: "Moderator",
  content_editor: "Content Editor", viewer: "Viewer",
}

const roleColors: Record<string, string> = {
  super_admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  admin: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  moderator: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  content_editor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  viewer: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

export function PenggunaClient({ initialData, currentUserId }: { initialData: AdminUser[]; currentUserId: string }) {
  const [users, setUsers] = useState(initialData)
  const [modal, setModal] = useState<{ mode: "create" | "edit"; user?: AdminUser } | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "content_editor", isActive: true })

  function openCreate() {
    setForm({ name: "", email: "", password: "", role: "content_editor", isActive: true })
    setModal({ mode: "create" })
  }

  function openEdit(user: AdminUser) {
    setForm({ name: user.name, email: user.email, password: "", role: user.role, isActive: user.isActive })
    setModal({ mode: "edit", user })
  }

  async function handleSave() {
    setSaving(true)
    if (modal?.mode === "create") {
      const res = await fetch("/api/admin/pengguna", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const created = await res.json()
      if (!res.ok) { alert(created.error || "Gagal membuat pengguna"); setSaving(false); return }
      setUsers(prev => [created, ...prev])
    } else if (modal?.user) {
      const payload: Record<string, unknown> = { name: form.name, email: form.email, role: form.role, isActive: form.isActive }
      if (form.password) payload.password = form.password
      const res = await fetch(`/api/admin/pengguna/${modal.user.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const updated = await res.json()
      setUsers(prev => prev.map(u => u.id === modal.user!.id ? { ...u, ...updated } : u))
    }
    setSaving(false); setModal(null)
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/pengguna/${deleteId}`, { method: "DELETE" })
    setUsers(prev => prev.filter(u => u.id !== deleteId))
    setDeleteId(null); setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{users.length} pengguna admin terdaftar</p>
        </div>
        <Button onClick={openCreate}><Plus className="w-4 h-4 mr-1" />Tambah Pengguna</Button>
      </div>

      <div className="bg-background border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pengguna</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Login Terakhir</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm flex items-center gap-1">
                        {user.name}
                        {user.id === currentUserId && <span className="text-xs text-muted-foreground">(kamu)</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                    {user.role === "super_admin" && <ShieldCheck className="w-3 h-3" />}
                    {roleLabels[user.role] ?? user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "default" : "secondary"}>{user.isActive ? "Aktif" : "Nonaktif"}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(user)}><Pencil className="w-3.5 h-3.5" /></Button>
                    {user.id !== currentUserId && (
                      <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(user.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!modal} onOpenChange={o => !o && setModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{modal?.mode === "create" ? "Tambah Pengguna Baru" : "Edit Pengguna"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Nama Lengkap *</Label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Nama..." />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email *</Label>
              <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@markaz-ilmu.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{modal?.mode === "create" ? "Password *" : "Password (kosongkan jika tidak diubah)"}</Label>
              <Input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={v => setForm(p => ({ ...p, role: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between py-1">
              <Label>Akun Aktif</Label>
              <Switch checked={form.isActive} onCheckedChange={v => setForm(p => ({ ...p, isActive: v }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModal(null)}>Batal</Button>
            <Button disabled={saving} onClick={handleSave}>{saving ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)} title="Hapus Pengguna?" description="Pengguna yang dihapus tidak dapat dikembalikan. Semua audit log mereka akan tetap tersimpan." confirmLabel="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  )
}
