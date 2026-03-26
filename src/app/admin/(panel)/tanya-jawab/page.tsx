import { prisma } from "@/lib/prisma"
import { TanyaJawabClient } from "./_components/tanya-jawab-client"
export const metadata = { title: "Tanya Jawab" }
export default async function TanyaJawabPage() {
  const [pending, published, rejected] = await Promise.all([
    prisma.qA.findMany({ where: { status: "pending" }, orderBy: { createdAt: "desc" } }),
    prisma.qA.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" } }),
    prisma.qA.findMany({ where: { status: "rejected" }, orderBy: { updatedAt: "desc" } }),
  ])
  return <TanyaJawabClient pending={pending} published={published} rejected={rejected} />
}
