import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const audio = await prisma.audio.findUnique({ where: { id } })
  if (!audio) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(audio)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const old = await prisma.audio.findUnique({ where: { id } })
  if (!old) return Response.json({ error: "Not found" }, { status: 404 })

  const audio = await prisma.audio.update({
    where: { id },
    data: {
      title: body.title,
      speaker: body.speaker,
      category: body.category,
      image: body.image,
      type: body.type,
      spotifyId: body.spotifyId,
      isFeatured: body.isFeatured,
      status: body.status,
      publishedAt: body.status === "published" && !old.publishedAt ? new Date() : old.publishedAt,
    },
  })

  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "audio-kajian", audio.id, audio.title, {
    oldValue: old,
    newValue: audio,
  })
  return Response.json(audio)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const audio = await prisma.audio.findUnique({ where: { id } })
  if (!audio) return Response.json({ error: "Not found" }, { status: 404 })

  await prisma.audio.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "audio-kajian", id, audio.title)
  return Response.json({ success: true })
}
