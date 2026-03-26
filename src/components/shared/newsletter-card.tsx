"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsletterCard() {
  const [email, setEmail] = React.useState("")

  return (
    
      <motion.div initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} className="bg-white dark:bg-emerald-900 rounded-2xl p-8 md:p-10 space-y-8 border border-slate-100 dark:border-white/5">
        <div className="space-y-6 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Subscription</span>
            <div className="h-px w-8 bg-primary/20" />
          </div>
          
          <div className="space-y-3">
            <h4 className="text-3xl md:text-4xl font-display italic uppercase leading-[0.9] tracking-tighter text-slate-900 dark:text-white">
              Update <br />
              <span className="text-primary italic">Ilmu Syar'i</span>
            </h4>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-[240px] mx-auto text-balance">
              Dapatkan mutiara faedah dan jadwal kajian langsung di inbox Anda.
            </p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email anda..."
              className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 px-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:ring-2 ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:italic"
            />
          </div>
          
          <Button className="w-full py-7 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] text-[10px] border-none group transition-all duration-300 relative">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Berlangganan <Send className="h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </Button>
        </form>

        <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50">
          <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.3em]">
            Bersama <span className="text-primary/60 italic font-medium">3S: Sunnah, Soft Skill, Sahabat</span>
          </p>
        </div>

        {/* Subtle blur decoration */}
        <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      </motion.div> 
  )
}
