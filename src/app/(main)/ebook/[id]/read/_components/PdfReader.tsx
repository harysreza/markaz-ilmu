'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Download,
  X,
  Maximize2,
  Minimize2,
  BookOpen,
  ArrowLeft,
  ChevronUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PdfReaderProps {
  ebook: {
    id: string;
    title: string;
    author: string;
    fileUrl: string;
  };
}

export function PdfReader({ ebook }: PdfReaderProps) {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Elegant Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Left: Back Button & Title */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => router.back()}
                  variant="ghost"
                  size="sm"
                  className="shrink-0 rounded-xl hover:bg-primary/10 transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </motion.div>

              <div className="min-w-0 flex items-center gap-3">
                <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-black uppercase tracking-tight truncate text-slate-900 dark:text-white">
                    {ebook.title}
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                    {ebook.author}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Fullscreen */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={toggleFullscreen}
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex rounded-xl hover:bg-primary/10"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>

              {/* Download */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = ebook.fileUrl;
                    link.download = `${ebook.title}.pdf`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold uppercase text-[10px] sm:text-xs tracking-widest transition-all"
                  size="sm"
                >
                  <Download className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Download</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* PDF Container with Decorative Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        {/* Decorative Top Border */}
        <div className="relative mb-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="flex items-center justify-center gap-2 py-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
              PDF Viewer
            </span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* PDF Viewer with Shadow Frame */}
        <motion.div className="relative rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.5)] border-4 border-white dark:border-slate-800">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none z-10" />

          {/* Inner Frame */}
          <div className="relative bg-slate-100 dark:bg-slate-900 p-2 sm:p-4">
            <div className="rounded-2xl overflow-hidden shadow-inner">
              <iframe
                src={`${ebook.fileUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-[calc(100vh-280px)] sm:h-[calc(100vh-240px)] border-0 bg-white dark:bg-slate-950"
                title={ebook.title}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={scrollToTop}
                size="lg"
                className="rounded-full h-14 w-14 shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90"
              >
                <ChevronUp className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Helper */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-40">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <BookOpen className="h-3 w-3" />
          <span>Swipe untuk navigasi</span>
        </div>
      </div>
    </div>
  );
}
