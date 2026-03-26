import { prisma } from "@/lib/prisma"
import { AuditLogClient } from "./_components/audit-log-client"
export const metadata = { title: "Audit Log" }
export default async function AuditLogPage() {
  const logs = await prisma.auditLog.findMany({
    take: 100,
    orderBy: { timestamp: "desc" },
    include: { actor: { select: { name: true, email: true } } },
  })
  return <AuditLogClient initialLogs={logs} />
}
