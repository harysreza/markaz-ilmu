import type { ReactNode } from "react"

// Minimal layout — login page lives here without admin shell.
// Protected pages live in (panel)/layout.tsx which adds auth + sidebar.
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
