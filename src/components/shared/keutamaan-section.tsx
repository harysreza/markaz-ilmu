"use client"

import * as React from "react"

interface KeutamaanSectionProps {
  quote: string
  source: string
  title?: string
  subtitle?: string
}

export function KeutamaanSection({ 
  quote, 
  source, 
  title = "Keutamaan", 
  subtitle 
}: KeutamaanSectionProps) {
  return (
    <section className="py-24 border-t bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 text-center space-y-10">
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-1.5 w-1.5 bg-primary/20 rounded-full" />
          ))}
        </div>
        
        <h2 className="text-3xl font-display italic uppercase tracking-[0.2em] text-primary/40">
          {title}
        </h2>
        
        <blockquote className="text-3xl md:text-5xl font-script text-primary/80 leading-tight max-w-3xl mx-auto">
          "{quote}"
        </blockquote>

        <div className="flex flex-col items-center gap-6 pt-10">
          <div className="h-16 w-px bg-gradient-to-b from-primary/50 to-transparent" />
          <div className="space-y-1 text-center">
            <div className={`text-xs font-black tracking-[0.5em] uppercase ${subtitle ? 'text-primary' : 'text-primary/60'}`}>
              {source}
            </div>
            {subtitle && (
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
