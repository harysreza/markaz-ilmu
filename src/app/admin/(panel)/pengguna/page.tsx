import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PenggunaClient } from "./_components/pengguna-client"
export const metadata = { title: "Pengguna" }
export default async function PenggunaPage() {
  const session = await auth()
  if (!session?.user || (session.user as { role?: string }).role !== "super_admin") redirect("/admin/dashboard")
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
  })
  return <PenggunaClient initialData={users} currentUserId={(session.user as { id?: string }).id ?? ""} />
}
