import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"
import bcrypt from "bcryptjs"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  if ((session.user as { role?: string }).role !== "super_admin") return Response.json({ error: "Forbidden" }, { status: 403 })
  const { id } = await params
  const user = await prisma.adminUser.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
  })
  if (!user) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(user)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  if ((session.user as { role?: string }).role !== "super_admin") return Response.json({ error: "Forbidden" }, { status: 403 })
  const { id } = await params
  const body = await req.json()
  const updateData: Record<string, unknown> = { name: body.name, email: body.email, role: body.role, isActive: body.isActive }
  if (body.password) updateData.passwordHash = await bcrypt.hash(body.password, 12)
  const user = await prisma.adminUser.update({
    where: { id }, data: updateData,
    select: { id: true, name: true, email: true, role: true, isActive: true },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "pengguna", id, user.name)
  return Response.json(user)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  if ((session.user as { role?: string }).role !== "super_admin") return Response.json({ error: "Forbidden" }, { status: 403 })
  const { id } = await params
  const currentUserId = (session.user as { id?: string }).id ?? ""
  if (id === currentUserId) return Response.json({ error: "Tidak dapat menghapus akun sendiri" }, { status: 400 })
  const user = await prisma.adminUser.findUnique({ where: { id } })
  if (!user) return Response.json({ error: "Not found" }, { status: 404 })
  await prisma.adminUser.delete({ where: { id } })
  await logAudit(currentUserId, "delete", "pengguna", id, user.name)
  return Response.json({ success: true })
}
