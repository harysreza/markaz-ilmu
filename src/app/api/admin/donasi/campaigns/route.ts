import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET() {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const data = await prisma.donationCampaign.findMany({ orderBy: { createdAt: "desc" } })
  return Response.json({ data })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const campaign = await prisma.donationCampaign.create({
    data: {
      title: body.title, description: body.description || null,
      targetAmount: body.targetAmount ? parseFloat(body.targetAmount) : null,
      raisedAmount: 0, posterUrl: body.posterUrl || null, status: body.status ?? "active",
    },
  })
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "create", "donasi", campaign.id, campaign.title)
  return Response.json(campaign, { status: 201 })
}
