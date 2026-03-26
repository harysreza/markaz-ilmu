"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, FileText, Video, Music, BookOpen,
  Heart, Calendar, HelpCircle, DollarSign, Users,
  Settings, ClipboardList, BarChart3, Mail, ChevronRight,
  BookMarked
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Konten",
    items: [
      { label: "Artikel", href: "/admin/artikel", icon: FileText },
      { label: "Video Kajian", href: "/admin/video-kajian", icon: Video },
      { label: "Audio Kajian", href: "/admin/audio-kajian", icon: Music },
      { label: "E-Book", href: "/admin/ebook", icon: BookOpen },
      { label: "Do'a & Dzikir", href: "/admin/doa-dzikir", icon: Heart },
    ],
  },
  {
    label: "Program",
    items: [
      { label: "Jadwal Kajian", href: "/admin/jadwal-kajian", icon: Calendar },
      { label: "Tanya Jawab", href: "/admin/tanya-jawab", icon: HelpCircle },
      { label: "Donasi", href: "/admin/donasi", icon: DollarSign },
    ],
  },
  {
    label: "Administrasi",
    items: [
      { label: "Pengguna", href: "/admin/pengguna", icon: Users },
      { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
      { label: "Audit Log", href: "/admin/audit-log", icon: ClipboardList },
      { label: "Laporan", href: "/admin/laporan", icon: BarChart3 },
      { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 h-16 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <BookMarked className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold text-sm text-sidebar-foreground">Markaz Ilmu</p>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map((section) => {
          if (!section.items) {
            // Top-level item (Dashboard)
            const Icon = section.icon!
            const isActive = pathname === section.href || false
            return (
              <Link
                key={section.href}
                href={section.href!}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors mb-1",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {section.label}
              </Link>
            )
          }

          return (
            <div key={section.label} className="mb-4">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                {section.label}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname?.startsWith(item.href) || false
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors mb-0.5",
                      isActive
                        ? "bg-sidebar-primary/10 text-primary font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 opacity-50" />}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          Markaz Ilmu Admin v1.0
        </p>
      </div>
    </aside>
  )
}
