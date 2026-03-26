"use client"

import { useState } from "react"
import { Search, Calendar, Send, CheckCircle2, ChevronRight, Quote, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PageHero } from "@/components/shared/page-hero"
import { motion, AnimatePresence } from "framer-motion"
import HeroImage from "@/assets/Kitab.jpg"
import type { PublicQA } from "@/lib/queries"

type QAItem = PublicQA

type Props = {
  qaData: QAItem[]
}

const CATEGORIES = ["Semua", "Akidah", "Fikih", "Akhlak", "Muamalah"]

export function TanyaJawabClientPage({ qaData }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showQuestionForm, setShowQuestionForm] = useState(false)

  const filteredQA = qaData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.answer ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      activeCategory === "Semua" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-white">
      <PageHero
        title="Konsultasi Ilmiah"
        description="Ruang tanya jawab untuk memperdalam pemahaman agama berdasarkan dalil-dalil syar'i."
        backgroundImage={HeroImage}
      />

      <div className="container mx-auto px-4 -mt-24 pb-48 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Elegant Search & Category Header */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-white/5 space-y-12 mb-24">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3 space-y-6">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em]">Arsip Tanya Jawab</h2>
                <div className="relative group">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Cari tema permasalahan..."
                    className="h-16 pl-10 bg-transparent border-none text-2xl md:text-3xl font-black tracking-tight focus:ring-0 placeholder:text-slate-200 transition-all rounded-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100 dark:bg-slate-800 group-focus-within:bg-primary transition-all" />
                </div>
              </div>
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                        ${activeCategory === cat ? "bg-primary text-white shadow-lg" : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setShowQuestionForm(true)}
                  className="h-14 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl hover:bg-primary hover:text-white transition-all"
                >
                  Ajukan Pertanyaan <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Dialogue Style List */}
          <div className="space-y-32">
            <AnimatePresence mode="popLayout">
              {filteredQA.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Speaker/Meta Column */}
                    <div className="lg:col-span-3 space-y-6 pt-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black">
                          {item.askedBy[0]}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Penanya</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{item.askedBy}</p>
                        </div>
                      </div>
                      <div className="space-y-2 pl-1">
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          <Calendar className="h-3.5 w-3.5" /> {item.date}
                        </div>
                        <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-black uppercase text-[8px] tracking-[0.2em] px-3 py-1">
                          {item.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-9 space-y-12">
                      <div className="space-y-6 relative">
                        <div className="absolute -left-12 top-0 text-slate-100 dark:text-slate-800 opacity-50 hidden md:block">
                          <Quote className="h-12 w-12 rotate-180" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter group-hover:text-primary transition-colors">
                          {item.question}
                        </h3>
                        <div className="max-w-3xl border-l-[6px] border-primary/20 pl-10 py-4 space-y-8">
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-serif font-medium italic">
                              {item.answer}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-8 py-6 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 md:h-14 md:w-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xl">
                                <CheckCircle2 className="h-5 w-5 md:h-7 md:w-7" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Dijawab Oleh</p>
                                <p className="text-sm md:text-lg font-black text-slate-900 dark:text-white leading-none mt-1">{item.answeredBy}</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-slate-100 dark:border-white/10 hover:bg-primary/5 hover:text-primary transition-all">
                                <Share2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredQA.length === 0 && (
            <div className="text-center py-40 border-t border-slate-100 dark:border-white/5 space-y-6">
              <div className="text-8xl">💭</div>
              <h3 className="text-2xl md:text-4xl font-black text-slate-200 dark:text-slate-800">Topik tidak ditemukan</h3>
              <p className="text-muted-foreground font-medium">Anda dapat mengajukan pertanyaan baru kepada tim asatidz kami.</p>
              <Button
                onClick={() => setShowQuestionForm(true)}
                variant="link" className="text-primary font-bold text-lg"
              >
                Tanyakan Langsung
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Elegant Modal - More Minimalist */}
      <AnimatePresence>
        {showQuestionForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/98 backdrop-blur-3xl"
            onClick={() => setShowQuestionForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQuestionForm(false)}
                className="absolute top-8 right-8 text-slate-300 hover:text-primary transition-colors"
              >
                <ChevronRight className="h-8 w-8 rotate-90" />
              </button>

              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Konsultasi Baru</h2>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Ajukan Permasalahan</h3>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Kategori</label>
                    <div className="flex flex-wrap gap-3">
                      {CATEGORIES.filter((c) => c !== "Semua").map((cat) => (
                        <Button key={cat} variant="outline" className="rounded-xl h-12 text-[10px] font-black uppercase tracking-widest border-slate-100 dark:border-white/10 hover:border-primary hover:text-primary transition-all px-6">
                          {cat}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi Pertanyaan</label>
                    <div className="relative group">
                      <Textarea
                        placeholder="Uraikan pertanyaan Anda secara detail di sini..."
                        className="min-h-[200px] bg-transparent border-none p-0 text-xl font-medium focus:ring-0 placeholder:text-slate-200 transition-all font-serif italic"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100 dark:bg-slate-800 group-focus-within:bg-primary transition-all" />
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button className="w-full h-20 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-primary hover:text-white border-none transition-all group">
                      Kirim Konsultasi <Send className="ml-4 h-5 w-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
