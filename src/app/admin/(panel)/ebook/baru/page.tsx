import { EbookForm } from "../_components/ebook-form"
export const metadata = { title: "Upload E-Book" }
export default function EbookBaruPage() {
  return <div><h1 className="text-2xl font-bold mb-6">Upload E-Book Baru</h1><EbookForm /></div>
}
