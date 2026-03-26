import type { Metadata } from "next"
import { getPublishedArticles } from "@/lib/queries"
import { ArtikelClientPage } from "./_components/ArtikelClientPage"

export const metadata: Metadata = {
  title: "Perpustakaan Artikel",
  description:
    "Kumpulan artikel pilihan untuk memperdalam pemahaman agama, akhlak, dan manhaj sesuai tuntunan Al-Qur'an dan Sunnah.",
}

export default async function ArtikelPage() {
  const articles = await getPublishedArticles()
  const categories = ["Semua", ...new Set(articles.map((a) => a.category))]

  return <ArtikelClientPage articles={articles} categories={categories} />
}
