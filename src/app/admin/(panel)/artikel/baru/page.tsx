import { ArtikelForm } from "../_components/artikel-form"

export const metadata = { title: "Tambah Artikel" }

export default function ArtikelBaruPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tambah Artikel Baru</h1>
      <ArtikelForm />
    </div>
  )
}
