import type { Metadata } from "next"
import { getPublishedDoas } from "@/lib/queries"
import { DoaDzikirClientPage } from "./_components/DoaDzikirClientPage"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Do'a & Dzikir",
  description:
    "Bekal spiritual harian untuk ketenangan hati dan perlindungan diri sesuai sunnah.",
}

export default async function DoaDzikirPage() {
  const items = await getPublishedDoas()
  return <DoaDzikirClientPage items={items} />
}
