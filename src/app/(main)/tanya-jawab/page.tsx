import type { Metadata } from "next"
import { getPublishedQA } from "@/lib/queries"
import { TanyaJawabClientPage } from "./_components/TanyaJawabClientPage"

export const metadata: Metadata = {
  title: "Konsultasi Ilmiah",
  description:
    "Ruang tanya jawab untuk memperdalam pemahaman agama berdasarkan dalil-dalil syar'i.",
}

export default async function TanyaJawabPage() {
  const qaData = await getPublishedQA()
  return <TanyaJawabClientPage qaData={qaData} />
}
