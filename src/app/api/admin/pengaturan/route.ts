import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logAudit } from "@/lib/admin-helpers"

export async function GET() {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const settings = await prisma.siteSetting.findMany()
  const obj = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return Response.json(obj)
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const updates = Object.entries(body as Record<string, string>)
  await Promise.all(
    updates.map(([key, value]) =>
      prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })
    )
  )
  const userId = (session.user as { id?: string }).id ?? ""
  await logAudit(userId, "update", "pengaturan", "site", "Site Settings")
  return Response.json({ success: true })
}
