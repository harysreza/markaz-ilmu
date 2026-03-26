"use client"

import { useState } from "react"
import { Building2, Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

interface Campaign { id: string; title: string; description: string | null; targetAmount: number | null; raisedAmount: number; status: string }
interface BankAccount { id: string; bankName: string; accountNumber: string; accountName: string; whatsappNumber: string; isActive: boolean }

export function DonasiClient({ campaigns: initial, bankAccounts: initialBanks }: { campaigns: Campaign[]; bankAccounts: BankAccount[] }) {
  const [campaigns, setCampaigns] = useState(initial)
  const [banks, setBanks] = useState(initialBanks)
  const [editBank, setEditBank] = useState<BankAccount | null>(null)
  const [bankForm, setBankForm] = useState({ bankName: "", accountNumber: "", accountName: "", whatsappNumber: "", isActive: true })
  const [saving, setSaving] = useState(false)
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [campaignForm, setCampaignForm] = useState({ title: "", description: "", targetAmount: "", status: "active" })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function saveBank() {
    setSaving(true)
    if (editBank) {
      const res = await fetch(`/api/admin/donasi/bank-accounts/${editBank.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankForm),
      })
      const updated = await res.json()
      setBanks(prev => prev.map(b => b.id === editBank.id ? updated : b))
      setEditBank(null)
    }
    setSaving(false)
  }

  async function createCampaign() {
    setSaving(true)
    const res = await fetch("/api/admin/donasi/campaigns", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaignForm),
    })
    const created = await res.json()
    setCampaigns(prev => [created, ...prev])
    setShowNewCampaign(false)
    setCampaignForm({ title: "", description: "", targetAmount: "", status: "active" })
    setSaving(false)
  }

  async function deleteCampaign() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/donasi/campaigns/${deleteId}`, { method: "DELETE" })
    setCampaigns(prev => prev.filter(c => c.id !== deleteId))
    setDeleteId(null); setDeleting(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Manajemen Donasi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaigns */}
        <div className="bg-background border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Kampanye Donasi</h2>
            <Button size="sm" onClick={() => setShowNewCampaign(true)}><Plus className="w-3.5 h-3.5 mr-1" />Buat Kampanye</Button>
          </div>
          {showNewCampaign && (
            <div className="border rounded-lg p-4 mb-4 flex flex-col gap-3 bg-muted/30">
              <div className="flex flex-col gap-1.5">
                <Label>Judul Kampanye *</Label>
                <Input value={campaignForm.title} onChange={e => setCampaignForm(p => ({ ...p, title: e.target.value }))} placeholder="Nama kampanye..." />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Deskripsi</Label>
                <Textarea value={campaignForm.description} onChange={e => setCampaignForm(p => ({ ...p, description: e.target.value }))} rows={2} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Target (Rp, opsional)</Label>
                <Input type="number" value={campaignForm.targetAmount} onChange={e => setCampaignForm(p => ({ ...p, targetAmount: e.target.value }))} placeholder="10000000" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" disabled={!campaignForm.title || saving} onClick={createCampaign}>{saving ? "..." : "Simpan"}</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowNewCampaign(false)}>Batal</Button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {campaigns.map(c => (
              <div key={c.id} className="border rounded-lg p-3 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{c.title}</p>
                    <ContentStatusBadge status={c.status} />
                  </div>
                  {c.description && <p className="text-xs text-muted-foreground line-clamp-1">{c.description}</p>}
                  {c.targetAmount && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: Rp {c.targetAmount.toLocaleString("id-ID")} • Terkumpul: Rp {c.raisedAmount.toLocaleString("id-ID")}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive shrink-0" onClick={() => setDeleteId(c.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="bg-background border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">Rekening Bank</h2>
          </div>
          {editBank ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>Nama Bank</Label>
                <Input value={bankForm.bankName} onChange={e => setBankForm(p => ({ ...p, bankName: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Nomor Rekening</Label>
                <Input value={bankForm.accountNumber} onChange={e => setBankForm(p => ({ ...p, accountNumber: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Nama Rekening</Label>
                <Input value={bankForm.accountName} onChange={e => setBankForm(p => ({ ...p, accountName: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Nomor WhatsApp Konfirmasi</Label>
                <Input value={bankForm.whatsappNumber} onChange={e => setBankForm(p => ({ ...p, whatsappNumber: e.target.value }))} placeholder="+62812..." />
              </div>
              <div className="flex gap-2">
                <Button size="sm" disabled={saving} onClick={saveBank}><Save className="w-3.5 h-3.5 mr-1" />{saving ? "Menyimpan..." : "Simpan"}</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditBank(null)}>Batal</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {banks.map(b => (
                <div key={b.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{b.bankName}</p>
                        {b.isActive && <Badge variant="default" className="text-xs">Aktif</Badge>}
                      </div>
                      <p className="font-mono text-sm">{b.accountNumber}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.accountName}</p>
                      <p className="text-xs text-muted-foreground">WA: {b.whatsappNumber}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => { setEditBank(b); setBankForm({ bankName: b.bankName, accountNumber: b.accountNumber, accountName: b.accountName, whatsappNumber: b.whatsappNumber, isActive: b.isActive }) }}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)} title="Hapus Kampanye?" description="Kampanye yang dihapus tidak dapat dikembalikan." confirmLabel="Hapus" onConfirm={deleteCampaign} loading={deleting} />
    </div>
  )
}
