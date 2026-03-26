import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"
import { del } from "@vercel/blob"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const ebook = await prisma.ebook.findUnique({ where: { id } })
  if (!ebook) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(ebook)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const old = await prisma.ebook.findUnique({ where: { id } })
  if (!old) return Response.json({ error: "Not found" }, { status: 404 })

  const ebook = await prisma.ebook.update({
    where: { id },
    data: {
      title: body.title,
      author: body.author,
      thumbnail: body.thumbnail,
      fileUrl: body.fileUrl,
      fileSize: body.fileSize,
      category: body.category,
      isReadOnline: body.isReadOnline,
      isDownloadable: body.isDownloadable,
      status: body.status,
      publishedAt: body.status === "published" && !old.publishedAt ? new Date() : old.publishedAt,
    },
  })

  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "ebook", ebook.id, ebook.title, {
    oldValue: old,
    newValue: ebook,
  })
  return Response.json(ebook)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const ebook = await prisma.ebook.findUnique({ where: { id } })
  if (!ebook) return Response.json({ error: "Not found" }, { status: 404 })

  // Hapus file dari Vercel Blob jika ada
  try {
    if (ebook.fileUrl && ebook.fileUrl.includes("blob.vercel-storage.com")) {
      await del(ebook.fileUrl)
    }
    if (ebook.thumbnail && ebook.thumbnail.includes("blob.vercel-storage.com")) {
      await del(ebook.thumbnail)
    }
  } catch (error) {
    console.error("Error deleting blob files:", error)
    // Lanjutkan hapus dari database meskipun gagal hapus blob
  }

  await prisma.ebook.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "ebook", id, ebook.title)
  return Response.json({ success: true })
}
