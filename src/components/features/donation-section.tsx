"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Heart, ArrowRight, Share2, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Donasi2Img from "@/assets/Donasi2.jpg"

export function DonationSection() {
  return (
    <section className="container mx-auto px-4 py-16 overflow-hidden">
      <div className="relative group">
        {/* Background Image with Overlays */}
        <div className="absolute">
          <Image
            src={Donasi2Img}
            alt="Donation Background"
            fill
            className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-16 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                Sedekah Jariyah <br />
                <span className="text-emerald-500 italic">Membangun Ummat</span>
              </h2>
              <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                Salurkan infaq terbaik Anda untuk mendukung dakwah digital, penyebaran kitab, dan fasilitas tholabul 'ilmi.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/donasi">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all font-black uppercase tracking-widest gap-3 shadow-2xl shadow-emerald-500/20 border-none">
                  Donasi Sekarang <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" className="h-16 px-10 rounded-2xl border border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest gap-3 backdrop-blur-sm">
                <Share2 className="h-5 w-5 text-emerald-400" />
                Bagikan
              </Button>
            </div>
          </div>

          {/* Right Side Feature */}
          <div className="hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative p-8 rounded-2xl bg-emerald-800/75 border border-white/10 backdrop-blur-xl space-y-8"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm italic">Ta'awun Dakwah</h4>
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">Markaz Ilmu Official</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-emerald-400">Total Ta'awun</span>
                  <span className="text-white">Rp. 100.000.000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">Update Terakhir</p>
                  <p className="text-xs font-bold text-white uppercase tracking-tighter">29 Januari 2026 / 17 Rajab 1447</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
