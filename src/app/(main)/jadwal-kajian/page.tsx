import type { Metadata } from "next"
import { getPublishedEvents } from "@/lib/queries"
import { JadwalKajianClientPage } from "./_components/JadwalKajianClientPage"

export const metadata: Metadata = {
  title: "Jadwal Kajian",
  description:
    "Daftar agenda kajian rutin dan spesial yang diselenggarakan oleh Markaz Ilmu. Tetapkan pengingat agar tidak terlewatkan.",
}

export default async function JadwalKajianPage() {
  const events = await getPublishedEvents()
  return <JadwalKajianClientPage events={events} />
}
