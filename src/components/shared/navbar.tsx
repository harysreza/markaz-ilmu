"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun, Type, Search, Menu, ChevronDown, X, BookOpen as MarkazLogo } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFontSize } from "@/components/font-size-provider"
import { KATEGORI_BELAJAR, PROGRAM_KAMI } from "@/data/dummy"
import MarkazIlmuWhite from "@/assets/markaz-ilmu-white.png"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null)
  const { setTheme, theme } = useTheme()
  const { increaseFontSize, decreaseFontSize } = useFontSize()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return (pathname && pathname.startsWith(path)) || false
  }

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name)
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev: boolean) => !prev)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setOpenAccordion(null)
  }

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 md:bg-background/80 md:backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <div className="h-8 md:h-10 flex items-center">
              <img
                src={typeof MarkazIlmuWhite === 'string' ? MarkazIlmuWhite : MarkazIlmuWhite.src}
                alt="Markaz Ilmu"
                className="h-full w-auto object-contain dark:brightness-100 brightness-0 transition-all"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {/* <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Belajar <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {KATEGORI_BELAJAR.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Link 
              href="/jadwal-kajian" 
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/jadwal-kajian') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              Jadwal Kajian
              {isActive('/jadwal-kajian') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link>

            <Link 
              href="/jadwal-sholat" 
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/jadwal-sholat') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              Jadwal Sholat
              {isActive('/jadwal-sholat') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link>

            <Link 
              href="/doa-dzikir" 
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/doa-dzikir') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              Do&apos;a & Dzikir
              {isActive('/doa-dzikir') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link>
            <Link 
              href="/artikel" 
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/artikel') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              Artikel
              {isActive('/artikel') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link>
            <Link 
              href="/ebook" 
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/ebook') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              E-Book
              {isActive('/ebook') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link>
            <Link 
              href="/video-kajian" 
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/video-kajian') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              Video
              {isActive('/video-kajian') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link>
            {/* <Link
              href="/audio-kajian"
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/audio-kajian') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              Audio
              {isActive('/audio-kajian') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link> */}
            {/* <Link
              href="/tanya-jawab"
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive('/tanya-jawab') ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
              Tanya Jawab
              {isActive('/tanya-jawab') && (
                <motion.div layoutId="navbar-active" className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </Link> */}
            {/* <Link href="/donasi" className="text-sm font-medium text-orange-600 font-bold hover:text-orange-500 transition-colors">
              Donasi
            </Link> */}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center border rounded-xl px-3 py-1 bg-muted/50 focus-within:ring-2 ring-primary/20 transition-all">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Cari hadits, judul materi..."
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-64"
            />
          </div>

          <div className="flex items-center border-l ml-2 pl-2 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl bg-primary/5 active:scale-90 transition-transform" 
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6 text-primary" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Solid Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 w-[85%] max-w-[320px] bg-slate-50 dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <MarkazLogo className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-black text-slate-900 dark:text-white tracking-widest uppercase text-sm">Menu</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeMobileMenu}
                  className="h-10 w-10 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  {/* Search Section */}
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <input
                      type="text"
                      placeholder="Cari materi kajian..."
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium focus:ring-2 ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  {/* Belajar Accordion */}
                  {/* <div className="space-y-2">
                    <button
                      onClick={() => toggleAccordion('belajar')}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 transition-all active:scale-[0.98]"
                    >
                      <span className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">Belajar</span>
                      <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-300 ${openAccordion === 'belajar' ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openAccordion === 'belajar' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden px-2"
                        >
                          <div className="grid gap-2 py-2">
                            {KATEGORI_BELAJAR.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className="group flex flex-col p-4 rounded-xl hover:bg-primary/5 transition-all"
                              >
                                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</span>
                                <span className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{item.description}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div> */}

                  <Link
                    href="/jadwal-kajian"
                    onClick={closeMobileMenu}
                    className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                      isActive('/jadwal-kajian') 
                        ? 'bg-primary/5 border-primary/20 text-primary' 
                        : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    Jadwal Kajian
                  </Link>

                  <Link
                    href="/jadwal-sholat"
                    onClick={closeMobileMenu}
                    className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                      isActive('/jadwal-sholat') 
                        ? 'bg-primary/5 border-primary/20 text-primary' 
                        : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    Jadwal Sholat
                  </Link>

                  {/* Direct Links */}
                  <div className="space-y-2 pt-2">
                    <Link
                      href="/doa-dzikir"
                      onClick={closeMobileMenu}
                      className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                        isActive('/doa-dzikir') 
                          ? 'bg-primary/5 border-primary/20 text-primary' 
                          : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      Do&apos;a & Dzikir
                    </Link>
                    <Link
                      href="/artikel"
                      onClick={closeMobileMenu}
                      className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                        isActive('/artikel') 
                          ? 'bg-primary/5 border-primary/20 text-primary' 
                          : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      Artikel
                    </Link>
                    <Link
                      href="/ebook"
                      onClick={closeMobileMenu}
                      className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                        isActive('/ebook') 
                          ? 'bg-primary/5 border-primary/20 text-primary' 
                          : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      E-Book
                    </Link>
                    <Link
                      href="/video-kajian"
                      onClick={closeMobileMenu}
                      className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                        isActive('/video-kajian') 
                          ? 'bg-primary/5 border-primary/20 text-primary' 
                          : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      Video Kajian
                    </Link>
                    {/* <Link
                      href="/audio-kajian"
                      onClick={closeMobileMenu}
                      className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                        isActive('/audio-kajian')
                          ? 'bg-primary/5 border-primary/20 text-primary'
                          : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      Audio Kajian
                    </Link> */}
                    {/* <Link
                      href="/tanya-jawab"
                      onClick={closeMobileMenu}
                      className={`flex items-center p-4 text-sm font-black border transition-all uppercase tracking-widest rounded-2xl ${
                        isActive('/tanya-jawab')
                          ? 'bg-primary/5 border-primary/20 text-primary'
                          : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800/50 text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      Tanya Jawab
                    </Link> */}
                  </div>

                  {/* Donasi Button */}
                  {/* <div className="pt-4">
                    <Link
                      href="/donasi"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center p-5 text-sm font-black text-white bg-orange-600 rounded-2xl shadow-lg shadow-orange-600/20 active:scale-95 transition-all uppercase tracking-[0.2em]"
                    >
                      Donasi
                    </Link>
                  </div> */}
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <p className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-widest leading-relaxed">
                  Markaz Ilmu © 2026<br/>
                  <span className="text-primary/60 italic font-medium">3S: Sunnah, Soft Skill dan Sahabat</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
