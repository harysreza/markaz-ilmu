"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, BookOpen, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import AtapImg from "@/assets/Atap.jpg"
import DaunImg from "@/assets/Daun.jpg"
import KetupatImg from "@/assets/Ketupat.jpg"
import TowerImg from "@/assets/Tower.jpg"
import { NewsletterCard } from "@/components/shared/newsletter-card"
import { PopularArticles } from "@/components/features/popular-articles"
import type { PublicArticle } from "@/lib/queries"

const FALLBACK_IMAGES = [AtapImg, DaunImg, KetupatImg, TowerImg]

type Props = {
  articles: PublicArticle[]
  trending: PublicArticle[]
}

export function ArticleSections({ articles, trending }: Props) {
  const latestArticles = articles.slice(0, 4)

  return (
    <section className="container mx-auto px-4 pt-20 lg:pt-32 pb-10 lg:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Latest Articles - Left Column (Main) */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-6">
            <div className="space-y-1">
              <h2 className="text-3xl md:text-5xl font-display italic uppercase text-slate-900 dark:text-white tracking-tight leading-none">Artikel <span className="text-primary">Terbaru</span></h2>
              <p className="text-muted-foreground font-medium">Update ilmu dan pengetahuan islam harian</p>
            </div>
            <Link href="/artikel">
              <Button variant="ghost" className="font-bold text-primary hover:bg-primary/5 gap-2 rounded-xl group transition-all">
                LIHAT SELENGKAPNYA <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col space-y-5"
              >
                <Link href={`/artikel/${article.id}`} className="block relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                    alt={article.title}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white border-none shadow-xl font-bold px-3 py-1">
                      {article.category}
                    </Badge>
                  </div>
                </Link>

                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {new Date(article.date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                    <span className="flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> 5 MIN READ</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed font-normal">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 italic">By {article.author}</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending Articles - Right Column (Sidebar) */}
        <div className="lg:col-span-4 space-y-16">
          <PopularArticles articles={trending} />
          <NewsletterCard />
        </div>
      </div>
    </section>
  )
}
