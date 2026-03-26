import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArtikelForm } from "../../_components/artikel-form"

export const metadata = { title: "Edit Artikel" }

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Artikel</h1>
      <ArtikelForm article={article} />
    </div>
  )
}
