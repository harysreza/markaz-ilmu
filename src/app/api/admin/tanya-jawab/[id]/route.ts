import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const qa = await prisma.qA.findUnique({ where: { id } })
  if (!qa) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(qa)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const old = await prisma.qA.findUnique({ where: { id } })
  const qa = await prisma.qA.update({
    where: { id },
    data: {
      question: body.question, answer: body.answer, category: body.category,
      askedBy: body.askedBy, answeredBy: body.answeredBy, status: body.status,
      publishedAt: body.status === "published" && !old?.publishedAt ? new Date() : old?.publishedAt,
    },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "tanya-jawab", qa.id, qa.question.slice(0, 60))
  return Response.json(qa)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const qa = await prisma.qA.findUnique({ where: { id } })
  if (!qa) return Response.json({ error: "Not found" }, { status: 404 })
  await prisma.qA.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "tanya-jawab", id, qa.question.slice(0, 60))
  return Response.json({ success: true })
}
