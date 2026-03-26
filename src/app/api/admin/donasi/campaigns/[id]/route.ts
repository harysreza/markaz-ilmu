import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const c = await prisma.donationCampaign.findUnique({ where: { id } })
  if (!c) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(c)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const c = await prisma.donationCampaign.update({
    where: { id },
    data: {
      title: body.title, description: body.description,
      targetAmount: body.targetAmount ? parseFloat(body.targetAmount) : null,
      raisedAmount: parseFloat(body.raisedAmount ?? 0),
      posterUrl: body.posterUrl, status: body.status,
    },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "donasi", id, c.title)
  return Response.json(c)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const c = await prisma.donationCampaign.findUnique({ where: { id } })
  if (!c) return Response.json({ error: "Not found" }, { status: 404 })
  await prisma.donationCampaign.delete({ where: { id } })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "delete", "donasi", id, c.title)
  return Response.json({ success: true })
}
