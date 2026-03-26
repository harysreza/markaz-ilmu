import { prisma } from "@/lib/prisma"
import { EbookClient } from "./_components/ebook-client"
export const metadata = { title: "E-Book" }
export default async function EbookPage() {
  const ebooks = await prisma.ebook.findMany({ orderBy: { updatedAt: "desc" } })
  return <EbookClient initialData={ebooks} />
}
