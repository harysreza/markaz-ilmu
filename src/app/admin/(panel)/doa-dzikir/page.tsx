import { prisma } from "@/lib/prisma"
import { DoaDzikirClient } from "./_components/doa-client"
export const metadata = { title: "Do'a & Dzikir" }
export default async function DoaDzikirPage() {
  const duas = await prisma.doaDzikir.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] })
  return <DoaDzikirClient initialData={duas} />
}
