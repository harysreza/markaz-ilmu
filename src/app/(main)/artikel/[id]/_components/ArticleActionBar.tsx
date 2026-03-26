"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArticleActionBar() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-100 dark:border-slate-800">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="group flex items-center gap-2 font-bold text-slate-600 dark:text-slate-400 hover:text-primary rounded-xl"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Kembali
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-xl border-slate-200 dark:border-white/5 hover:bg-primary/5 hover:text-primary transition-all shadow-sm"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-xl border-slate-200 dark:border-white/5 hover:bg-primary/5 hover:text-primary transition-all shadow-sm"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
