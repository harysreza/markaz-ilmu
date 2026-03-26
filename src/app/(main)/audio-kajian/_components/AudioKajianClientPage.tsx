"use client"

import { useState } from "react"
import { Play, Music, User, Calendar, Search, Share2, ArrowRight, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHero } from "@/components/shared/page-hero"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import HeroImage from "@/assets/Sholat.jpg"
import type { PublicAudio } from "@/lib/queries"

type Audio = PublicAudio

type Props = {
  audios: Audio[]
}

const CATEGORIES = ["Semua", "Akidah", "Fikih", "Akhlak", "Tafsir", "Muamalah"]

function getSpotifyEmbedUrl(type: string, id: string) {
  if (type === "playlist")
    return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`
  if (type === "show")
    return `https://open.spotify.com/embed/show/${id}?utm_source=generator&theme=0`
  if (type === "episode")
    return `https://open.spotify.com/embed/episode/${id}?utm_source=generator&theme=0`
  return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`
}

export function AudioKajianClientPage({ audios }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [selectedAudio, setSelectedAudio] = useState<Audio | null>(null)

  const filteredAudios = audios.filter((audio) => {
    const matchesSearch =
      audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.speaker.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Semua" || audio.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featuredAudio = audios[0]

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-white">
      <PageHero
        title="Audio Portal"
        description="Dengarkan kajian ilmu syar'i kapanpun dan di manapun melalui Spotify."
        backgroundImage={HeroImage}
      />

      <div className="container mx-auto px-4 -mt-24 pb-40 relative z-10">
        <div className="max-w-7xl mx-auto space-y-32">

          {/* Minimalist Filter & Search */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-primary/10 pb-16">
            <div className="space-y-6 w-full lg:max-w-xl">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em]">
                Katalog Audio Spotify
              </h2>
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Cari podcast atau playlist..."
                  className="h-16 pl-10 bg-transparent border-none text-2xl md:text-4xl font-black tracking-tighter focus:ring-0 placeholder:text-slate-200 dark:placeholder:text-slate-800 transition-all rounded-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200 dark:bg-slate-800 group-focus-within:h-0.5 group-focus-within:bg-primary transition-all" />
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative py-2 text-sm font-black uppercase tracking-widest transition-all
                    ${activeCategory === cat
                      ? "text-primary"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="cat-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Audio - Immersive Layout */}
          {!searchQuery && activeCategory === "Semua" && featuredAudio && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedAudio(featuredAudio)}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-primary/10 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={featuredAudio.image}
                    alt={featuredAudio.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-[#1DB954]/20 backdrop-blur-3xl border border-[#1DB954]/20 flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                      <Play className="h-10 w-10 fill-[#1DB954] text-[#1DB954] ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                      <Music className="h-3 w-3 text-[#1DB954]" />
                      Spotify Content
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                      Playlist Unggulan
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                      {featuredAudio.title}
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary/20 pl-6 leading-relaxed">
                      &quot;Dengarkan nasehat-nasehat penyejuk hati langsung dari genggaman Anda.&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-8 text-sm font-bold text-slate-400">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <span className="text-slate-600 dark:text-slate-300">{featuredAudio.speaker}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-primary" />
                      <span>{featuredAudio.category}</span>
                    </div>
                  </div>
                  <Button className="h-16 px-10 rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-black uppercase tracking-widest text-xs gap-3 transition-all shadow-xl shadow-[#1DB954]/20">
                    Dengarkan di Spotify <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Audio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAudios.map((audio, idx) => (
                <motion.div
                  key={audio.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all p-4"
                >
                  <div
                    className="relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedAudio(audio)}
                  >
                    <Image
                      src={audio.image}
                      alt={audio.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                      <div className="h-16 w-16 rounded-full bg-[#1DB954] text-black flex items-center justify-center shadow-xl">
                        <Play className="h-6 w-6 fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                        {audio.type}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                        {audio.category}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Calendar className="h-3.5 w-3.5" /> {audio.date}
                      </div>
                    </div>
                    <h3
                      className="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer leading-tight line-clamp-2"
                      onClick={() => setSelectedAudio(audio)}
                    >
                      {audio.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <User className="h-4 w-4 text-primary/50" />
                      {audio.speaker}
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5"
                      >
                        Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-slate-400 hover:text-primary"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredAudios.length === 0 && (
            <div className="text-center py-32 space-y-6">
              <div className="text-8xl">🎵</div>
              <h3 className="text-2xl md:text-4xl font-black text-slate-200 dark:text-slate-800">
                Audio tidak ditemukan
              </h3>
              <Button
                variant="link"
                className="text-primary font-bold"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("Semua")
                }}
              >
                Kembali ke Katalog Lengkap
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Spotify Embed Modal */}
      <AnimatePresence>
        {selectedAudio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/98 backdrop-blur-3xl"
            onClick={() => setSelectedAudio(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#121212] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5 bg-[#181818]">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden">
                    <Image
                      src={selectedAudio.image}
                      alt={selectedAudio.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm uppercase tracking-wider line-clamp-1">
                      {selectedAudio.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-bold">{selectedAudio.speaker}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-white/10 text-white"
                  onClick={() => setSelectedAudio(null)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              </div>

              <div className="p-0 bg-[#121212]">
                <iframe
                  style={{ borderRadius: "0" }}
                  src={getSpotifyEmbedUrl(selectedAudio.type, selectedAudio.spotifyId)}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>

              <div className="p-6 bg-[#181818] flex items-center justify-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Disediakan oleh Spotify
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
