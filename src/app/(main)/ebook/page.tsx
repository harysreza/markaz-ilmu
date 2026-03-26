import type { Metadata } from "next"
import { getPublishedEbooks } from "@/lib/queries"
import { EBookClientPage } from "./_components/EBookClientPage"

export const metadata: Metadata = {
  title: "Katalog E-Book",
  description:
    "Temukan koleksi kitab dan ringkasan ilmu terbaik yang telah dikurasi. Tersedia secara gratis untuk kemaslahatan dakwah.",
}

export default async function EBookPage() {
  const ebooks = await getPublishedEbooks()
  return <EBookClientPage ebooks={ebooks} />
}
