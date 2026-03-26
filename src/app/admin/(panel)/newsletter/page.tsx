import { prisma } from "@/lib/prisma"
export const metadata = { title: "Newsletter" }
export default async function NewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } })
  const active = subscribers.filter(s => s.isActive).length
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{active} aktif dari {subscribers.length} total subscriber</p>
      </div>
      <div className="bg-background border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-muted/30"><th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th><th className="px-4 py-3 text-left font-medium text-muted-foreground">Halaman Asal</th><th className="px-4 py-3 text-left font-medium text-muted-foreground">Tanggal Daftar</th><th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th></tr></thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">Belum ada subscriber</td></tr>
            ) : subscribers.map(s => (
              <tr key={s.id} className="border-b hover:bg-muted/20">
                <td className="px-4 py-3 font-medium">{s.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.sourcePage ?? "-"}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(s.subscribedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-500"}`}>{s.isActive ? "Aktif" : "Nonaktif"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
