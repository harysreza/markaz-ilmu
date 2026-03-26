import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const video = await prisma.video.findUnique({ where: { id } })
  if (!video) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(video)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const old = await prisma.video.findUnique({ where: { id } })
  if (!old) return Response.json({ error: "Not found" }, { status: 404 })

  const video = await prisma.video.update({
    where: { id },
    data: {
      title: body.title,
      speaker: body.speaker,
      duration: body.duration,
      category: body.category,
      youtubeId: body.youtubeId,
      isFeatured: body.isFeatured,
      status: body.status,
      publishedAt: body.status === "published" && !old.publishedAt ? new Date() : old.publishedAt,
    },
  })

  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "video-kajian", video.id, video.title, {
    oldValue: old,
    newValue: video,
  })
  return Response.json(video)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const video = await prisma.video.findUnique({ where: { id } })
  if (!video) return Response.json({ error: "Not found" }, { status: 404 })

  await prisma.video.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "video-kajian", id, video.title)
  return Response.json({ success: true })
}
