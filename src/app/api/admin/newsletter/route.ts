import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const limit = parseInt(searchParams.get("limit") ?? "30")
  const skip = (page - 1) * limit
  const [data, total] = await Promise.all([
    prisma.newsletterSubscriber.findMany({ skip, take: limit, orderBy: { subscribedAt: "desc" } }),
    prisma.newsletterSubscriber.count(),
  ])
  return Response.json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.email) return Response.json({ error: "Email wajib diisi" }, { status: 400 })
  const sub = await prisma.newsletterSubscriber.upsert({
    where: { email: body.email },
    update: { isActive: true },
    create: { email: body.email, sourcePage: body.sourcePage || null },
  })
  return Response.json(sub, { status: 201 })
}
