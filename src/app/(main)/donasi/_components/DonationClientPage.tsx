"use client"

import DonasiImg from "@/assets/Donasi.jpeg"
import Donasi2Img from "@/assets/Donasi2.jpg"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, Copy, CreditCard } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import type { PublicBankAccount } from "@/lib/queries"

type Props = {
  bankAccounts: PublicBankAccount[]
}

export function DonationClientPage({ bankAccounts }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHero
        title="Infaq & Donasi"
        description="Salurkan amal jariyah Anda untuk mendukung dakwah dan operasional Markaz Ilmu."
        backgroundImage={Donasi2Img}
      />

      <section className="container mx-auto px-4 -mt-24 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: Poster & Description */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-[4/5] md:aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10"
              >
                <Image
                  src={DonasiImg}
                  alt="Poster Donasi"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                  Berbagi Kebaikan, <br />
                  <span className="text-primary italic">Membangun Peradaban</span>
                </h2>
              </div>
            </div>

            {/* Right: Donation Methods */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 md:p-10 backdrop-blur-xl sticky top-32"
              >
                <div className="space-y-8">
                  <div className="text-center md:text-left space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                      Rekening Donasi
                    </p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                      Metode Transfer
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {bankAccounts.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Informasi rekening akan segera diperbarui.
                      </p>
                    ) : (
                      bankAccounts.map((acc) => (
                        <div
                          key={acc.id}
                          className="group relative p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <CreditCard className="h-5 w-5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                  {acc.bankName}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                  {acc.accountNumber}
                                </p>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                  a.n {acc.accountName}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl h-12 w-12 hover:bg-primary/10 hover:text-primary transition-all"
                              onClick={() => handleCopy(acc.accountNumber)}
                            >
                              {copied === acc.accountNumber ? (
                                <Check className="h-5 w-5" />
                              ) : (
                                <Copy className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-8 border-t border-slate-100 dark:border-white/10">
                    <div className="flex flex-col items-center gap-6">
                      <div className="text-center space-y-2">
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          Konfirmasi Donasi
                        </p>
                        <p className="text-sm text-muted-foreground max-w-[200px]">
                          Silahkan kirim bukti transfer Anda melalui WhatsApp Admin
                        </p>
                        <Button
                          className="w-full mt-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold uppercase tracking-widest text-[12px]"
                          onClick={() => {
                            const wa = bankAccounts[0]?.whatsappNumber
                            if (wa) window.open(`https://wa.me/${wa.replace(/\D/g, "")}`, "_blank")
                          }}
                        >
                          Hubungi WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
