import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function logAudit(
  actorId: string,
  action: string,
  resource: string,
  resourceId: string,
  resourceTitle: string,
  options?: { oldValue?: object; newValue?: object; ipAddress?: string }
) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId,
        action,
        resource,
        resourceId,
        resourceTitle,
        oldValue: options?.oldValue ? JSON.stringify(options.oldValue) : null,
        newValue: options?.newValue ? JSON.stringify(options.newValue) : null,
        ipAddress: options?.ipAddress,
      },
    })
  } catch {
    // Non-blocking: audit log failure should not block the main operation
  }
}

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user) return null
  return session
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
