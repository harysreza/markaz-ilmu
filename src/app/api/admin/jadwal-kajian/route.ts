import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search") ?? ""
  const status = searchParams.get("status") ?? ""
  const where: Record<string, unknown> = {}
  if (search) where.OR = [{ title: { contains: search } }, { speaker: { contains: search } }]
  if (status) where.status = status
  const data = await prisma.event.findMany({ where, orderBy: { date: "asc" } })
  return Response.json({ data })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const event = await prisma.event.create({
    data: {
      title: body.title,
      speaker: body.speaker,
      date: body.date,
      time: body.time,
      location: body.location,
      isOnline: body.isOnline ?? false,
      isFree: body.isFree ?? true,
      registrationUrl: body.registrationUrl || null,
      posterUrl: body.posterUrl || "",
      description: body.description,
      status: body.status ?? "upcoming",
    },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "create", "jadwal-kajian", event.id, event.title)
  return Response.json(event, { status: 201 })
}
