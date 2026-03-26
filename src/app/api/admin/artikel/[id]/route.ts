import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(article)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const old = await prisma.article.findUnique({ where: { id } })
  if (!old) return Response.json({ error: "Not found" }, { status: 404 })

  const article = await prisma.article.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      category: body.category,
      content: body.content,
      summary: body.summary,
      thumbnail: body.thumbnail,
      author: body.author,
      isTrending: body.isTrending,
      status: body.status,
      publishedAt: body.status === "published" && !old.publishedAt ? new Date() : old.publishedAt,
    },
  })

  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "artikel", article.id, article.title, {
    oldValue: old,
    newValue: article,
  })
  return Response.json(article)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) return Response.json({ error: "Not found" }, { status: 404 })

  await prisma.article.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "artikel", id, article.title)
  return Response.json({ success: true })
}
