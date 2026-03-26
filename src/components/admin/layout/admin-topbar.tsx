"use client"

import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut, User, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AdminTopbarProps {
  user: {
    name?: string | null
    email?: string | null
    role?: string
  }
}

const breadcrumbMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/artikel": "Artikel",
  "/admin/video-kajian": "Video Kajian",
  "/admin/audio-kajian": "Audio Kajian",
  "/admin/ebook": "E-Book",
  "/admin/doa-dzikir": "Do'a & Dzikir",
  "/admin/jadwal-kajian": "Jadwal Kajian",
  "/admin/tanya-jawab": "Tanya Jawab",
  "/admin/donasi": "Donasi",
  "/admin/pengguna": "Pengguna",
  "/admin/pengaturan": "Pengaturan",
  "/admin/audit-log": "Audit Log",
  "/admin/laporan": "Laporan",
  "/admin/newsletter": "Newsletter",
}

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
  content_editor: "Content Editor",
  viewer: "Viewer",
}

export function AdminTopbar({ user }: AdminTopbarProps) {
  const pathname = usePathname()

  const segments = pathname?.split("/").filter(Boolean) || []
  const breadcrumbs: { label: string; href: string }[] = []
  let current = ""
  for (const seg of segments) {
    current += `/${seg}`
    const label = breadcrumbMap[current] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ")
    breadcrumbs.push({ label, href: current })
  }

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD"

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
            <span
              className={
                i === breadcrumbs.length - 1
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3.5 h-3.5 mr-1" />
            Lihat Situs
          </a>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground">{roleLabels[user.role ?? ""] ?? user.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/admin/pengguna">
                <User className="w-4 h-4 mr-2" />
                Profil
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
