import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"
import bcrypt from "bcryptjs"

export async function GET() {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const role = (session.user as { role?: string }).role
  if (role !== "super_admin") return Response.json({ error: "Forbidden" }, { status: 403 })
  const data = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
  })
  return Response.json({ data })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const role = (session.user as { role?: string }).role
  if (role !== "super_admin") return Response.json({ error: "Forbidden" }, { status: 403 })
  const body = await req.json()
  const existing = await prisma.adminUser.findUnique({ where: { email: body.email } })
  if (existing) return Response.json({ error: "Email sudah digunakan" }, { status: 409 })
  const passwordHash = await bcrypt.hash(body.password, 12)
  const user = await prisma.adminUser.create({
    data: { name: body.name, email: body.email, passwordHash, role: body.role ?? "content_editor", isActive: true },
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "create", "pengguna", user.id, user.name)
  return Response.json(user, { status: 201 })
}
