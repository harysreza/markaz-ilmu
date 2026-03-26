"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MessageSquare, Clock, Flame } from "lucide-react"
import Link from "next/link"
import type { PublicArticle } from "@/lib/queries"

type Props = {
  articles: PublicArticle[]
  currentArticleId?: string
}

export function PopularArticles({ articles, currentArticleId }: Props) {
  const trendingArticles = articles
    .filter((a) => a.isTrending && a.id !== currentArticleId)
    .slice(0, 5)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Akidah":
        return "bg-emerald-600 shadow-emerald-600/20"
      case "Manhaj":
        return "bg-blue-600 shadow-blue-600/20"
      case "Fikih":
        return "bg-amber-600 shadow-amber-600/20"
      case "Akhlak":
      case "Akhlak & Nasihat":
        return "bg-rose-600 shadow-rose-600/20"
      case "Do'a & Dzikir":
        return "bg-indigo-600 shadow-indigo-600/20"
      default:
        return "bg-primary shadow-primary/20"
    }
  }

  if (trendingArticles.length === 0) return null

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-2xl font-display italic uppercase text-slate-900 dark:text-white shrink-0 tracking-wider leading-none">Populer</h3>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Paling banyak dibaca</p>
        </div>
        <div className="h-px flex-grow bg-slate-100 dark:bg-white/5" />
      </div>

      <div className="space-y-10">
        {trendingArticles.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/artikel/${item.id}`} className="group block relative">
              <div className="flex gap-6 items-start">
                <div className="relative shrink-0 pt-1">
                  <span className="text-5xl font-display italic text-slate-400 dark:text-slate-600 group-hover:text-primary/40 transition-colors leading-none">
                    0{index + 1}
                  </span>
                </div>
                <div className="space-y-2.5 flex-grow">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>

                  <div className="flex items-center flex-wrap gap-4 pt-1">
                    <div className="flex items-center gap-2">
                       <span className={`h-1.5 w-1.5 rounded-full ${getCategoryColor(item.category)}`} />
                       <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="h-3 w-3" />
                        <span>12</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(item.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
