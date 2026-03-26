"use client"

import { useState } from "react"
import { Play, ArrowRight, User, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { PublicVideo } from "@/lib/queries"

type Props = {
  videos: PublicVideo[]
}

export function VideoPortalSection({ videos }: Props) {
  const [activeVideo, setActiveVideo] = useState(videos[0] ?? null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleVideoSelect = (video: PublicVideo) => {
    setActiveVideo(video)
    setIsPlaying(false)
  }

  if (!activeVideo) return null

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-slate-100 dark:border-white/5 pb-6">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-black text-primary uppercase tracking-[0.4em] block"
            >
              Video Portal
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none"
            >
              Kajian Ilmiah
            </motion.h2>
          </div>
        </div>

        {/* Main Immersive Layout */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Cinematic Preview / Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 relative group"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:shadow-primary/10">
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key={`player-${activeVideo.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full bg-black"
                  >
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`thumb-${activeVideo.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activeVideo.thumbnail}
                      alt={activeVideo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white scale-90 hover:scale-110 transition-transform duration-500 shadow-2xl ring-1 ring-white/30"
                      >
                        <Play className="h-8 w-8 md:h-10 md:w-10 fill-current ml-1" />
                      </button>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between pointer-events-none">
                      <div className="space-y-4 max-w-xl">
                        <div className="flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-white border-none font-black text-[8px] uppercase tracking-widest backdrop-blur-md">
                            {activeVideo.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                          {activeVideo.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-white/60 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-primary" /> {activeVideo.speaker}</span>
                          <span>•</span>
                          <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> {activeVideo.duration}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Selection List */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Materi Pilihan</h4>
            <div className="space-y-6">
              {videos.slice(0, 4).map((video, idx) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`group w-full text-left transition-all relative py-4 border-b border-slate-100 dark:border-white/5 last:border-none flex items-start gap-6
                    ${activeVideo.id === video.id ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
                >
                  <div className="text-[10px] font-black font-mono text-primary pt-1">
                    0{idx + 1}
                  </div>
                  <div className="space-y-2 flex-grow min-w-0">
                    <h5 className={`text-lg font-black leading-tight truncate transition-colors ${activeVideo.id === video.id ? "text-primary" : "text-slate-900 dark:text-white"}`}>
                      {video.title}
                    </h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{video.speaker}</p>
                  </div>
                  {activeVideo.id === video.id && (
                    <motion.div layoutId="video-active-pills" className="absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-full" />
                  )}
                  <div className={`transition-transform duration-500 ${activeVideo.id === video.id ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-8">
              <Link href="/video-kajian">
                <Button className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px] gap-3 shadow-xl hover:bg-primary transition-all">
                  Eksplorasi Katalog <Play className="h-3.5 w-3.5 fill-current" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
