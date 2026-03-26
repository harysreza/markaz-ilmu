"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, CheckCircle, XCircle, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentStatusBadge } from "@/components/admin/content-status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface QA { id: string; question: string; answer: string | null; category: string; askedBy: string; answeredBy: string; status: string; createdAt: Date }

interface Props { pending: QA[]; published: QA[]; rejected: QA[] }

export function TanyaJawabClient({ pending: initialPending, published: initialPublished, rejected: initialRejected }: Props) {
  const [pending, setPending] = useState(initialPending)
  const [published, setPublished] = useState(initialPublished)
  const [rejected, setRejected] = useState(initialRejected)
  const [activeTab, setActiveTab] = useState<"pending" | "published" | "rejected">("pending")
  const [answerModal, setAnswerModal] = useState<QA | null>(null)
  const [answer, setAnswer] = useState("")
  const [answeredBy, setAnsweredBy] = useState("Lajnah Ilmiah Markaz Ilmu")
  const [submitting, setSubmitting] = useState(false)

  async function handlePublish(qa: QA) {
    setSubmitting(true)
    await fetch(`/api/admin/tanya-jawab/${qa.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...qa, answer, answeredBy, status: "answered" }),
    })
    await fetch(`/api/admin/tanya-jawab/${qa.id}/publish`, { method: "PATCH" })
    const updated = { ...qa, answer, answeredBy, status: "published" }
    setPending(prev => prev.filter(q => q.id !== qa.id))
    setPublished(prev => [updated as QA, ...prev])
    setAnswerModal(null); setAnswer(""); setSubmitting(false)
  }

  async function handleReject(id: string) {
    await fetch(`/api/admin/tanya-jawab/${id}/reject`, { method: "PATCH" })
    const item = pending.find(q => q.id === id)
    if (item) {
      setPending(prev => prev.filter(q => q.id !== id))
      setRejected(prev => [{ ...item, status: "rejected" }, ...prev])
    }
  }

  const tabs = [
    { key: "pending" as const, label: "Antrian", count: pending.length, color: "text-yellow-600" },
    { key: "published" as const, label: "Dipublikasikan", count: published.length, color: "text-green-600" },
    { key: "rejected" as const, label: "Ditolak", count: rejected.length, color: "text-red-600" },
  ]

  const currentData = activeTab === "pending" ? pending : activeTab === "published" ? published : rejected

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Moderasi Tanya Jawab</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Review dan publikasikan pertanyaan dari pengguna</p>
        </div>
        <Button asChild><Link href="/admin/tanya-jawab/baru"><Plus className="w-4 h-4 mr-1" />Buat Q&amp;A Manual</Link></Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 rounded-lg p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === tab.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab.label}
            <span className={`text-xs font-semibold ${tab.color}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "pending" && pending.length === 0 ? (
        <div className="bg-background border rounded-xl p-12 text-center text-muted-foreground">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">Tidak ada pertanyaan yang menunggu</p>
          <p className="text-sm mt-1">Semua pertanyaan sudah diproses</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {activeTab === "pending" && pending.map(qa => (
            <div key={qa.id} className="bg-background border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{qa.category}</Badge>
                    <span className="text-xs text-muted-foreground">dari: <strong>{qa.askedBy}</strong></span>
                    <span className="text-xs text-muted-foreground">• {new Date(qa.createdAt).toLocaleDateString("id-ID")}</span>
                  </div>
                  <p className="font-medium text-sm mb-1">{qa.question}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" onClick={() => { setAnswerModal(qa); setAnswer(qa.answer ?? "") }}>
                    <MessageSquare className="w-3.5 h-3.5 mr-1" />
                    Jawab & Publikasikan
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleReject(qa.id)}>
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Tolak
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {activeTab !== "pending" && (
            <div className="bg-background border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pertanyaan</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Penanya</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-12 text-muted-foreground">Tidak ada data</TableCell></TableRow>
                  ) : currentData.map(qa => (
                    <TableRow key={qa.id}>
                      <TableCell><p className="text-sm line-clamp-2 max-w-md">{qa.question}</p></TableCell>
                      <TableCell><Badge variant="secondary">{qa.category}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{qa.askedBy}</TableCell>
                      <TableCell><ContentStatusBadge status={qa.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* Answer Modal */}
      <Dialog open={!!answerModal} onOpenChange={o => !o && setAnswerModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Jawab Pertanyaan</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Pertanyaan dari <strong>{answerModal?.askedBy}</strong>:</p>
              <p className="font-medium text-sm">{answerModal?.question}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Jawaban *</Label>
              <Textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Tulis jawaban..." rows={6} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Dijawab oleh</Label>
              <Select value={answeredBy} onValueChange={setAnsweredBy}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lajnah Ilmiah Markaz Ilmu">Lajnah Ilmiah Markaz Ilmu</SelectItem>
                  <SelectItem value="Tim Asatidz Markaz Ilmu">Tim Asatidz Markaz Ilmu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnswerModal(null)}>Batal</Button>
            <Button disabled={!answer.trim() || submitting} onClick={() => answerModal && handlePublish(answerModal)}>
              {submitting ? "Memproses..." : "Jawab & Publikasikan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
