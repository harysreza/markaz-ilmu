import { prisma } from "@/lib/prisma"
import { JadwalKajianClient } from "./_components/jadwal-client"
export const metadata = { title: "Jadwal Kajian" }
export default async function JadwalKajianPage() {
  const events = await prisma.event.findMany({ orderBy: { date: "asc" } })
  return <JadwalKajianClient initialData={events} />
}
