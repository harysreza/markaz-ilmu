import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const b = await prisma.bankAccount.findUnique({ where: { id } })
  if (!b) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(b)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const b = await prisma.bankAccount.update({
    where: { id },
    data: {
      bankName: body.bankName, accountNumber: body.accountNumber,
      accountName: body.accountName, whatsappNumber: body.whatsappNumber,
      isActive: body.isActive,
    },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "bank-account", id, b.bankName)
  return Response.json(b)
}
