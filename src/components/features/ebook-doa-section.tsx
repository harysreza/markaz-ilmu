"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import QuranImg from "@/assets/Al Qur'an.jpg"
import TowerImg from "@/assets/Tower.jpg"
import DaunImg from "@/assets/Daun.jpg"
import Link from "next/link"
import Image from "next/image"
import type { PublicEbook } from "@/lib/queries"

const COVER_IMAGES = [QuranImg, TowerImg, DaunImg]

type Props = {
  ebooks: PublicEbook[]
}

export function EBookDoaSection({ ebooks }: Props) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/20" />
      <div className="container mx-auto px-4 relative z-10 space-y-16">
        {/* E-Book Horizontal Scroll */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-6">
            <div className="space-y-1">
              <h2 className="text-3xl md:text-5xl font-display italic uppercase text-slate-900 dark:text-white tracking-tight leading-none">Katalog <span className="text-primary">E-Book</span></h2>
              <p className="text-muted-foreground font-medium">Download kitab-kitab syar&apos;i ringkas sebagai bekal harian dan referensi belajar Anda.</p>
            </div>
            <Link href="/ebook">
              <Button variant="ghost" className="font-bold text-primary hover:bg-primary/5 gap-2 rounded-xl group transition-all">
                LIHAT SELENGKAPNYA <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <ScrollArea className="w-full whitespace-nowrap rounded-xl">
            <div className="flex w-max space-x-8 p-4">
              {ebooks.map((book, idx) => (
                <Link href="/ebook" key={book.id} className="w-[220px] group cursor-pointer block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/20 dark:border-white/5 bg-slate-900 shadow-2xl transition-all duration-500">
                    <Image
                      src={COVER_IMAGES[idx % COVER_IMAGES.length]}
                      alt={book.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="220px"
                    />
                  </div>
                  <div className="mt-6 space-y-2 px-1">
                    <h3 className="text-base font-black leading-tight break-words whitespace-normal line-clamp-2 uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest break-words whitespace-normal leading-relaxed">{book.author}</p>
                  </div>
                </Link>
              ))}
              {/* Skeleton placeholders */}
              {[1, 2].map((i) => (
                <div key={i} className="w-[220px] opacity-20 group">
                  <div className="aspect-[3/4] bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-4">
                    <BookOpen className="h-10 w-10 text-primary/40" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Segera Hadir</span>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}
