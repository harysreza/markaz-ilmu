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
  const category = searchParams.get("category") ?? ""
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}
  if (search) where.OR = [{ title: { contains: search } }, { translation: { contains: search } }]
  if (status) where.status = status
  if (category) where.category = category

  const [data, total] = await Promise.all([
    prisma.doaDzikir.findMany({ where, skip, take: limit, orderBy: { order: "asc" } }),
    prisma.doaDzikir.count({ where }),
  ])

  return Response.json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const doa = await prisma.doaDzikir.create({
    data: {
      title: body.title,
      category: body.category,
      arabic: body.arabic,
      latin: body.latin,
      translation: body.translation,
      source: body.source,
      order: body.order ?? 0,
      status: body.status ?? "draft",
    },
  })

  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "create", "doa-dzikir", doa.id, doa.title)
  return Response.json(doa, { status: 201 })
}
