import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar"
import { AdminTopbar } from "@/components/admin/layout/admin-topbar"

export const metadata = { title: { template: "%s | Admin Markaz Ilmu", default: "Admin | Markaz Ilmu" } }

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminTopbar
          user={{
            name: session.user.name,
            email: session.user.email,
            role: (session.user as { role?: string }).role,
          }}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
