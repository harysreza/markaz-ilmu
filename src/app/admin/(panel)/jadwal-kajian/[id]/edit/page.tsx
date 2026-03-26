import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { JadwalForm } from "../../_components/jadwal-form"
export const metadata = { title: "Edit Event" }
export default async function EditJadwalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) notFound()
  return <div><h1 className="text-2xl font-bold mb-6">Edit Event Kajian</h1><JadwalForm event={event} /></div>
}
