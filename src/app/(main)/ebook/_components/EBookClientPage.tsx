'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Search, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import QuranImg from "@/assets/Al Qur'an.jpg";
import TowerImg from '@/assets/Tower.jpg';
import DaunImg from '@/assets/Daun.jpg';
import { KeutamaanSection } from '@/components/shared/keutamaan-section';
import { PageHero } from '@/components/shared/page-hero';
import type { PublicEbook } from '@/lib/queries';

type EBook = PublicEbook;

type Props = {
  ebooks: EBook[];
};

const CATEGORIES = ['Semua', 'Akidah', 'Fikih', 'Akhlak', 'Hadits', 'Tafsir'];

export function EBookClientPage({ ebooks }: Props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Semua');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredEbooks = React.useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();
    return ebooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower);
      const matchesCategory =
        selectedCategory === 'Semua' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [ebooks, debouncedSearch, selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <div className="relative">
        <PageHero
          title="Katalog E-Book"
          description="Temukan koleksi kitab dan ringkasan ilmu terbaik yang telah dikurasi. Tersedia secara gratis untuk kemaslahatan dakwah."
          backgroundImage={QuranImg}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl mx-auto group"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-all" />
            <Input
              placeholder="Cari e-book..."
              className="pl-16 h-14 bg-white/95 dark:bg-slate-900/95 text-foreground rounded-xl border-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] focus-visible:ring-8 focus-visible:ring-primary/20 text-xl font-medium transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </PageHero>

        {/* Refined Grid Content */}
        <section className="container mx-auto px-4 -mt-32 pb-16 relative z-10">
          {/* Category Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap gap-x-6 gap-y-3 justify-center border-b border-primary/10 pb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative py-2 text-sm font-black uppercase tracking-widest transition-all
                    ${selectedCategory === cat ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <motion.div
                      layoutId="ebook-cat-underline"
                      className="absolute -bottom-4.5 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {filteredEbooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
              {filteredEbooks.map((book, idx) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
                  className="group flex flex-col"
                >
                  {/* Book Jacket Design */}
                  <div className="relative aspect-[3/4.2] mb-8 transition-all duration-700 group-hover:-translate-y-4">
                    {/* Luxury Shadow & Glow */}
                    <div className="absolute inset-4 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Card Main */}
                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-100 dark:border-slate-800 bg-slate-900 z-10">
                      {book.thumbnail ? (
                        <Image
                          src={book.thumbnail}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      ) : (
                        <Image
                          src={
                            idx % 3 === 0
                              ? DaunImg
                              : idx % 2 === 0
                                ? TowerImg
                                : QuranImg
                          }
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      )}

                      {/* Hover Content Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
                        <div className="w-full space-y-3">
                          {book.isReadOnline && (
                            <Button
                              asChild
                              className="w-full rounded-2xl bg-white text-slate-950 font-black tracking-widest uppercase text-[10px] h-14 gap-3 shadow-2xl hover:bg-slate-100 active:scale-95 transition-all"
                            >
                              <Link href={`/ebook/${book.id}/read`}>
                                <BookOpen className="h-4 w-4" /> Baca Online
                              </Link>
                            </Button>
                          )}
                          {book.isDownloadable && (
                            <Button
                              asChild
                              variant={book.isReadOnline ? 'ghost' : 'default'}
                              className={
                                book.isReadOnline
                                  ? 'w-full rounded-2xl text-white font-black tracking-widest uppercase text-[10px] h-12 hover:bg-white/10 transition-all'
                                  : 'w-full rounded-2xl bg-white text-slate-950 font-black tracking-widest uppercase text-[10px] h-14 gap-3 shadow-2xl hover:bg-slate-100 active:scale-95 transition-all'
                              }
                            >
                              <a
                                href={book.fileUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="h-4 w-4" /> Download PDF
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Badge Overlay */}
                      <div className="absolute top-6 left-6 z-20">
                        <div className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/20">
                          {book.category}
                        </div>
                      </div>
                    </div>

                    {/* Spine Decoration Elements */}
                    <div className="absolute left-[-2px] inset-y-8 w-1 bg-primary/20 rounded-full z-20 group-hover:h-3/4 transition-all duration-1000" />
                  </div>

                  {/* Metadata */}
                  <div className="space-y-3 px-2 text-center sm:text-left">
                    <h3 className="text-lg font-black leading-tight text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest break-words leading-relaxed group-hover:text-primary/60 transition-colors">
                        {book.author}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3" /> PDF
                        </span>
                        <span className="h-1 w-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                        <span>{book.fileSize}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 text-center space-y-6"
            >
              <div className="h-32 w-32 rounded-[3rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-200 dark:text-slate-800 relative">
                <BookOpen className="h-16 w-16" />
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Katalog Kosong
                </h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                  Tidak dapat menemukan kitab dalam kategori ini atau pencarian
                  yang Anda masukkan.
                </p>
              </div>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                variant="outline"
                className="rounded-xl font-bold border-2 hover:bg-primary/[0.03]"
              >
                Reset Semua Filter
              </Button>
            </motion.div>
          )}
        </section>
      </div>

      <KeutamaanSection
        quote="Menuntut ilmu syar'i adalah lentera dalam kegelapan dan jalan pintas menuju kemuliaan abadi."
        source="FAIDAH KAJIAN"
        subtitle="Markaz Ilmu Digital Library"
      />
    </div>
  );
}
