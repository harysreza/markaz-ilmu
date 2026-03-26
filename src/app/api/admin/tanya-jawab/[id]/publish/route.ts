import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const qa = await prisma.qA.update({
    where: { id },
    data: { status: "published", publishedAt: new Date() },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "publish", "tanya-jawab", id, qa.question.slice(0, 60))
  return Response.json(qa)
}
