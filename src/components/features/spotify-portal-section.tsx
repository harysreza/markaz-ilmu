"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Music, ArrowRight, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { PublicAudio } from "@/lib/queries"

type Props = {
  audios: PublicAudio[]
}

export function SpotifyPortalSection({ audios }: Props) {
  const [activeAudio, setActiveAudio] = useState(audios[0] ?? null)

  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  if (!activeAudio) return null

  return (
    <section className="relative py-40 overflow-hidden bg-slate-950">
      {/* Immersive Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src={activeAudio.image}
          className="w-full h-full object-cover opacity-20 blur-[100px] grayscale"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-24">

          {/* Audio Visualizer / Artwork Card */}
          <div className="w-full lg:w-1/2">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative aspect-square max-w-md mx-auto group"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all duration-700" />
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <img src={activeAudio.image} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                 <div className="absolute top-8 left-8 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                    <Music className="h-4 w-4 text-[#1DB954]" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Listen on Spotify</span>
                 </div>

                 <motion.div
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute bottom-12 right-12 h-20 w-20 rounded-full bg-[#1DB954] flex items-center justify-center shadow-[0_0_50px_rgba(29,185,84,0.4)]"
                 >
                    <Play className="h-8 w-8 text-black fill-current ml-1" />
                 </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-12 bg-primary/40" />
                <span className="text-sm font-black text-primary uppercase tracking-[0.4em]">Audio Portal</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter"
              >
                Kajian Ilmu <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">di Spotify</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl"
              >
                Dengarkan rekaman audio kajian, podcast islami, dan bacaan Al-Qur&apos;an secara eksklusif melalui platform Spotify Markaz Ilmu.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audios.slice(0, 4).map((audio, idx) => (
                <motion.button
                  key={audio.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveAudio(audio)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group
                    ${activeAudio.id === audio.id
                      ? "bg-white/10 border-primary/50 shadow-lg shadow-primary/10"
                      : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"}`}
                >
                  <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={audio.image} className="h-full w-full object-cover" alt="" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className={`text-sm font-black truncate ${activeAudio.id === audio.id ? "text-primary" : "text-white"}`}>
                      {audio.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">
                      {audio.speaker}
                    </p>
                  </div>
                  <div className={`h-8 w-8 rounded-full border border-white/10 flex items-center justify-center transition-colors
                    ${activeAudio.id === audio.id ? "bg-primary border-primary text-white" : "text-slate-500 group-hover:text-white"}`}>
                    <Volume2 className="h-4 w-4" />
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-6">
              <Link href="/audio-kajian">
                <Button className="h-16 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs gap-3 hover:bg-primary hover:text-white transition-all">
                  Lihat Semua Audio <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 w-12 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="" />
                  </div>
                ))}
                <div className="h-12 w-12 rounded-full border-2 border-slate-950 bg-primary/20 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-primary">
                  1K+
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Listeners Monthly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
