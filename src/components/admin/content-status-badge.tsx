import { Badge } from "@/components/ui/badge"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  published: { label: "Dipublikasikan", variant: "default" },
  draft: { label: "Draft", variant: "secondary" },
  archived: { label: "Diarsip", variant: "outline" },
  pending: { label: "Menunggu", variant: "secondary" },
  in_review: { label: "Ditinjau", variant: "secondary" },
  answered: { label: "Dijawab", variant: "secondary" },
  rejected: { label: "Ditolak", variant: "destructive" },
  upcoming: { label: "Mendatang", variant: "default" },
  ongoing: { label: "Berlangsung", variant: "default" },
  completed: { label: "Selesai", variant: "secondary" },
  cancelled: { label: "Dibatalkan", variant: "destructive" },
  active: { label: "Aktif", variant: "default" },
  paused: { label: "Dijeda", variant: "secondary" },
}

export function ContentStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? { label: status, variant: "outline" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
