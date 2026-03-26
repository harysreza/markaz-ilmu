import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="h-32 w-32 rounded-3xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-200 dark:text-slate-800">
          <BookOpen className="h-16 w-16" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            E-Book Tidak Ditemukan
          </h1>
          <p className="text-slate-500 font-medium">
            E-book yang Anda cari tidak tersedia atau fitur baca online belum diaktifkan untuk e-book ini.
          </p>
        </div>
        <Button asChild variant="default" className="rounded-xl font-bold">
          <Link href="/ebook">
            Kembali ke Katalog E-Book
          </Link>
        </Button>
      </div>
    </div>
  )
}
