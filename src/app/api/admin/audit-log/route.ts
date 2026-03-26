import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const limit = parseInt(searchParams.get("limit") ?? "30")
  const resource = searchParams.get("resource") ?? ""
  const action = searchParams.get("action") ?? ""
  const skip = (page - 1) * limit
  const where: Record<string, unknown> = {}
  if (resource) where.resource = resource
  if (action) where.action = action
  const [data, total] = await Promise.all([
    prisma.auditLog.findMany({
      where, skip, take: limit, orderBy: { timestamp: "desc" },
      include: { actor: { select: { name: true, email: true } } },
    }),
    prisma.auditLog.count({ where }),
  ])
  return Response.json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } })
}
