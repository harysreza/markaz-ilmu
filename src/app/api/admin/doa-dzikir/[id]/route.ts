import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const doa = await prisma.doaDzikir.findUnique({ where: { id } })
  if (!doa) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(doa)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const old = await prisma.doaDzikir.findUnique({ where: { id } })
  if (!old) return Response.json({ error: "Not found" }, { status: 404 })

  const doa = await prisma.doaDzikir.update({
    where: { id },
    data: {
      title: body.title,
      category: body.category,
      arabic: body.arabic,
      latin: body.latin,
      translation: body.translation,
      source: body.source,
      order: body.order,
      status: body.status,
    },
  })

  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "doa-dzikir", doa.id, doa.title, {
    oldValue: old,
    newValue: doa,
  })
  return Response.json(doa)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const doa = await prisma.doaDzikir.findUnique({ where: { id } })
  if (!doa) return Response.json({ error: "Not found" }, { status: 404 })

  await prisma.doaDzikir.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "doa-dzikir", id, doa.title)
  return Response.json({ success: true })
}
