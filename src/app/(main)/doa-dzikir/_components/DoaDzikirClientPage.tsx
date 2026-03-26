'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import {
  Search,
  Heart,
  Share2,
  BookOpen,
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import HeroImage from '@/assets/hero-doa.jpg';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { KeutamaanSection } from '@/components/shared/keutamaan-section';
import { PageHero } from '@/components/shared/page-hero';
import type { PublicDoa } from '@/lib/queries';

type DoaItem = PublicDoa;

type Props = {
  items: DoaItem[];
};

export function DoaDzikirClientPage({ items }: Props) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const containerRef = useRef<HTMLDivElement>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredItems = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchLower) ||
        item.translation.toLowerCase().includes(searchLower);
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [items, debouncedSearch, activeTab]);

  const totalPages = useMemo(
    () => Math.ceil(filteredItems.length / itemsPerPage),
    [filteredItems]
  );

  const paginatedItems = useMemo(() => {
    return filteredItems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredItems, currentPage]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('content-start');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="relative">
        <PageHero
          title="Do'a & Dzikir"
          description="Bekal spiritual harian untuk ketenangan hati dan perlindungan diri sesuai sunnah."
          backgroundImage={HeroImage}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl mx-auto group"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-all" />
            <Input
              placeholder="Cari do'a dan dzikir..."
              className="pl-16 h-14 bg-white/95 dark:bg-slate-900/95 text-foreground rounded-xl border-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] focus-visible:ring-8 focus-visible:ring-primary/20 text-xl font-medium transition-all"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </motion.div>
        </PageHero>

        {/* Main Content Area */}
        <section className="relative container mx-auto max-w-4xl -mt-32 px-4 pb-16 z-10">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + debouncedSearch + currentPage}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-4"
              >
                {paginatedItems.length > 0 ? (
                  <>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-4"
                    >
                      {paginatedItems.map((item) => (
                        <motion.div key={item.id} variants={itemVariants}>
                          <AccordionItem
                            value={`item-${item.id}`}
                            className="border-none transition-all duration-300"
                          >
                            <Card className="overflow-hidden border border-white/20 dark:border-white/5 shadow-2xl bg-white dark:bg-slate-900 md:bg-white/70 md:dark:bg-slate-900/50 md:backdrop-blur-2xl group rounded-xl">
                              <AccordionTrigger
                                hideIcon
                                className="p-0 hover:no-underline [&[data-state=open]>div>div>div:last-child]:rotate-180"
                              >
                                <div className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4">
                                  <div className="space-y-1.5 md:space-y-4">
                                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                      <Badge
                                        variant="secondary"
                                        className="bg-primary/10 text-primary border-none text-[8px] md:text-[10px] uppercase font-black tracking-[0.1em] md:tracking-[0.2em] px-2 md:px-3 py-0.5 md:py-1"
                                      >
                                        {item.category}
                                      </Badge>
                                      <span className="text-[8px] md:text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.1em] md:tracking-[0.2em] italic">
                                        {item.source}
                                      </span>
                                    </div>
                                    <h3 className="text-lg md:text-3xl font-black tracking-tight transition-colors">
                                      {item.title}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="hidden md:flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 hover:text-red-500"
                                      >
                                        <Heart className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 hover:text-primary"
                                      >
                                        <Share2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="bg-primary/5 p-2 rounded-full text-primary transition-transform duration-300 overflow-hidden">
                                      <ChevronDown className="h-5 w-5 md:h-6 md:w-6 pointer-events-none transition-transform duration-300" />
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="p-0 border-t border-white/20 dark:border-white/10">
                                <CardContent className="p-0">
                                  <div className="flex flex-col">
                                    {/* Arabic Content */}
                                    <div className="bg-white/40 dark:bg-white/5 p-6 md:p-16 text-center select-none cursor-default relative group/arabic">
                                      <p
                                        className="text-3xl md:text-6xl font-arabic leading-[1.8] md:leading-[2.2] font-bold text-slate-900 dark:text-slate-100 drop-shadow-sm mb-6"
                                        dir="rtl"
                                      >
                                        {item.arabic}
                                      </p>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 hover:bg-primary hover:text-white transition-all gap-2 opacity-0 group-hover/arabic:opacity-100 absolute bottom-4 left-1/2 -translate-x-1/2"
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            item.arabic
                                          );
                                        }}
                                      >
                                        <Copy className="h-4 w-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">
                                          Salin Arab
                                        </span>
                                      </Button>
                                    </div>

                                    {/* Translation & Latin Section */}
                                    <div className="p-6 md:p-14 space-y-10 md:space-y-16">
                                      <div className="space-y-10 md:space-y-16 max-w-3xl mx-auto">
                                        {/* Latin / Pelafalan */}
                                        <div className="space-y-4 md:space-y-6 relative group/section">
                                          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                                            <div className="flex items-center gap-3 text-primary">
                                              <div className="p-2 rounded-lg bg-primary/10">
                                                <Quote className="h-4 w-4 md:h-5 md:w-5 rotate-180" />
                                              </div>
                                              <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                                                Pelafalan Latin
                                              </span>
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-8 md:h-10 px-3 md:px-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/10 hover:text-primary transition-all gap-2"
                                              onClick={() => {
                                                navigator.clipboard.writeText(
                                                  item.latin
                                                );
                                              }}
                                            >
                                              <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:inline">
                                                Salin
                                              </span>
                                            </Button>
                                          </div>
                                          <p className="text-base md:text-2xl italic text-muted-foreground font-medium leading-[1.8] md:leading-[2] select-text">
                                            {item.latin}
                                          </p>
                                        </div>

                                        {/* Translation / Terjemahan */}
                                        <div className="space-y-4 md:space-y-6 relative group/section">
                                          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                                            <div className="flex items-center gap-3 text-primary">
                                              <div className="p-2 rounded-lg bg-primary/10">
                                                <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                                              </div>
                                              <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                                                Terjemahan Indonesia
                                              </span>
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-8 md:h-10 px-3 md:px-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/10 hover:text-primary transition-all gap-2"
                                              onClick={() => {
                                                navigator.clipboard.writeText(
                                                  item.translation
                                                );
                                              }}
                                            >
                                              <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:inline">
                                                Salin
                                              </span>
                                            </Button>
                                          </div>
                                          <div className="relative">
                                            <p className="text-base md:text-2xl leading-[1.8] md:leading-[2] text-slate-700 dark:text-slate-200 font-medium select-text">
                                              {item.translation}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Mobile Actions */}
                                      <div className="flex md:hidden gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <Button
                                          variant="outline"
                                          className="flex-1 rounded-xl h-11 gap-2 font-bold text-xs uppercase tracking-wider"
                                        >
                                          <Heart className="h-4 w-4" /> Favorit
                                        </Button>
                                        <Button
                                          variant="outline"
                                          className="flex-1 rounded-xl h-11 gap-2 font-bold text-xs uppercase tracking-wider"
                                        >
                                          <Share2 className="h-4 w-4" /> Share
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </AccordionContent>
                            </Card>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-12">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl h-12 w-12"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 md:bg-white/50 md:dark:bg-slate-900/50 md:backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? 'default' : 'ghost'
                              }
                              size="sm"
                              className={`h-10 w-10 rounded-xl font-bold transition-all ${
                                currentPage === page
                                  ? 'shadow-lg shadow-primary/25'
                                  : ''
                              }`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl h-12 w-12"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-40 text-center space-y-6"
                  >
                    <div className="h-32 w-32 rounded-[3rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-200 dark:text-slate-800 relative">
                      <Search className="h-16 w-16" />
                      <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        Pencarian Tidak Ditemukan
                      </h3>
                      <p className="text-slate-500 font-medium max-w-sm mx-auto">
                        Coba gunakan kata kunci lain seperti &quot;makan&quot;,
                        &quot;tidur&quot;, atau &quot;dzikir pagi&quot;.
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setSearch('');
                        setActiveTab('all');
                      }}
                      variant="outline"
                      className="rounded-xl font-bold border-2 hover:bg-primary/[0.03]"
                    >
                      Bersihkan Pencarian
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      <KeutamaanSection
        quote="Ingatlah, hanya dengan mengingati Allah-lah hati menjadi tenteram."
        source="QS. Ar-Ra'd: 28"
      />
    </div>
  );
}
