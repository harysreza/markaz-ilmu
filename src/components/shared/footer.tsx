import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import Image from "next/image"
import Logo from "@/assets/markaz-ilmu-white.png"

export function Footer() {
  return (
    <footer className="w-full border-t py-20 bg-white dark:bg-slate-950 md:bg-background/80 md:backdrop-blur-md">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
        <div className="space-y-6">
          <Link href="/" className="flex items-center">
            <Image 
              src={Logo} 
              alt="Markaz Ilmu" 
              width={180} 
              height={50} 
              className="h-12 w-auto dark:brightness-100 brightness-0 transition-all"
            />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Media dakwah sunnah untuk menebarkan ilmu syar&apos;i berdasarkan Al-Qur&apos;an dan As-Sunnah sesuai pemahaman para sahabat Nabi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-display italic uppercase mb-6 text-primary tracking-wider">Informasi</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Kontak</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Donasi Dakwah</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display italic uppercase mb-6 text-primary tracking-wider">Alamat</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Jl. Raya Sunnah No. 123<br />
            Kec. Ilmu Syar&apos;i, Kota Jakarta<br />
            Indonesia, 12345
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Email: info@markazilmu.com
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Markaz Ilmu. All rights reserved.
      </div>
    </footer>
  )
}
