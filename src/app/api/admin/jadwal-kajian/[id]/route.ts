import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(event)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const event = await prisma.event.update({
    where: { id },
    data: {
      title: body.title, speaker: body.speaker, date: body.date, time: body.time,
      location: body.location, isOnline: body.isOnline, isFree: body.isFree,
      registrationUrl: body.registrationUrl || null, posterUrl: body.posterUrl,
      description: body.description, status: body.status,
    },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "jadwal-kajian", event.id, event.title)
  return Response.json(event)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) return Response.json({ error: "Not found" }, { status: 404 })
  await prisma.event.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "jadwal-kajian", id, event.title)
  return Response.json({ success: true })
}
