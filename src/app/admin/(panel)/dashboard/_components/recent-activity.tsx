import { formatDistanceToNow } from "date-fns"
import { id as idLocale } from "date-fns/locale"
import { Activity } from "lucide-react"

interface Log {
  id: string
  action: string
  resource: string
  resourceTitle: string
  timestamp: Date
  actor: { name: string }
}

const actionLabels: Record<string, { label: string; color: string }> = {
  create: { label: "membuat", color: "text-green-600" },
  update: { label: "mengubah", color: "text-blue-600" },
  delete: { label: "menghapus", color: "text-red-600" },
  publish: { label: "mempublikasikan", color: "text-primary" },
  archive: { label: "mengarsip", color: "text-orange-600" },
  login: { label: "masuk", color: "text-gray-600" },
  logout: { label: "keluar", color: "text-gray-600" },
}

export function RecentActivityFeed({ logs }: { logs: Log[] }) {
  return (
    <div className="bg-background border rounded-xl p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-primary" />
        <h2 className="font-semibold">Aktivitas Terbaru</h2>
      </div>
      {logs.length === 0 ? (
        <div className="text-center text-muted-foreground text-sm py-8">
          Belum ada aktivitas tercatat
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {logs.map((log) => {
            const meta = actionLabels[log.action] ?? { label: log.action, color: "text-gray-600" }
            return (
              <div key={log.id} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-border mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{log.actor.name}</span>{" "}
                    <span className={meta.color}>{meta.label}</span>{" "}
                    <span className="text-muted-foreground">{log.resource}</span>
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{log.resourceTitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true, locale: idLocale })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
