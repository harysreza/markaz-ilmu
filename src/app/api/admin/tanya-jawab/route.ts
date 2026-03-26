import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const limit = parseInt(searchParams.get("limit") ?? "20")
  const search = searchParams.get("search") ?? ""
  const status = searchParams.get("status") ?? ""
  const skip = (page - 1) * limit
  const where: Record<string, unknown> = {}
  if (search) where.OR = [{ question: { contains: search } }, { askedBy: { contains: search } }]
  if (status) where.status = status
  const [data, total] = await Promise.all([
    prisma.qA.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.qA.count({ where }),
  ])
  return Response.json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const qa = await prisma.qA.create({
    data: {
      question: body.question, answer: body.answer || null,
      category: body.category, askedBy: body.askedBy ?? "Anonim",
      askerEmail: body.askerEmail || null,
      answeredBy: body.answeredBy ?? "Lajnah Ilmiah Markaz Ilmu",
      status: body.status ?? "pending",
      publishedAt: body.status === "published" ? new Date() : null,
    },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "create", "tanya-jawab", qa.id, qa.question.slice(0, 60))
  return Response.json(qa, { status: 201 })
}
