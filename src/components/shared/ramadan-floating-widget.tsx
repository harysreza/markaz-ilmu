"use client"

import { AnimatePresence, motion } from "framer-motion"
import { MoonStar, X } from "lucide-react"
import { useEffect, useState } from "react"

export function RamadanFloatingWidget() {
  const [daysLeft, setDaysLeft] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Estimated Ramadan 2026: February 18, 2026
  const targetDate = new Date("2026-02-18T00:00:00").getTime()

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now
      if (difference > 0) {
        setDaysLeft(Math.floor(difference / (1000 * 60 * 60 * 24)))
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000 * 60 * 60) // Update every hour
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: 100 }}
          whileHover={{ y: -5 }}
          className="fixed bottom-10 right-10 z-[100] group hidden lg:block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Circular Widget */}
          <div className="relative h-24 w-24 md:h-28 md:w-28 flex items-center justify-center">
            {/* Spinning Outer Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-3 border-dashed border-emerald-500/30 dark:border-emerald-400/20"
            />
            
            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-full bg-emerald-600 dark:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.6)]" />
            
            {/* Content Container */}
            <div className="relative flex flex-col items-center justify-center text-white">
              <span className="text-2xl md:text-3xl font-black leading-none">{daysLeft}</span>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-1">Hari Lagi</span>
              <div className="mt-1 opacity-60">
                <MoonStar className="h-3 w-3 md:h-4 md:w-4 fill-white" />
              </div>
            </div>

            {/* Floating Label on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: -10 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute right-full mr-4 whitespace-nowrap px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold shadow-2xl border border-white/20 hidden md:block"
                >
                  Menuju Ramadhan 
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-emerald-700 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>

          {/* Background Decorative Glow */}
          <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
