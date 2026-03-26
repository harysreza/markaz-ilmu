import { prisma } from "@/lib/prisma"
import { ArtikelClient } from "./_components/artikel-client"

export const metadata = { title: "Artikel" }

export default async function ArtikelPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
  })
  return <ArtikelClient initialData={articles} />
}
