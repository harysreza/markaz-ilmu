import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // TODO: Re-enable auth check after fixing NextAuth issue
    // const session = await getServerSession(req, res, authOptions)
    // if (!session) {
    //   return res.status(401).json({ error: "Unauthorized" })
    // }

    const body = req.body as HandleUploadBody

    // Handle client-side upload with Vercel Blob
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        // Validate file type based on pathname
        const ext = pathname.split(".").pop()?.toLowerCase()

        const allowedExtensions = {
          pdf: ["pdf"],
          image: ["jpg", "jpeg", "png", "webp"],
        }

        const isPdf = allowedExtensions.pdf.includes(ext || "")
        const isImage = allowedExtensions.image.includes(ext || "")

        if (!isPdf && !isImage) {
          throw new Error("Invalid file type")
        }

        // Generate unique pathname
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(2, 8)
        const folder = isPdf ? "ebooks" : "covers"

        return {
          allowedContentTypes: isPdf
            ? ["application/pdf"]
            : ["image/jpeg", "image/jpg", "image/png", "image/webp"],
          tokenPayload: JSON.stringify({
            // Optional: Add custom metadata
          }),
          maximumSizeInBytes: isPdf ? 50 * 1024 * 1024 : 5 * 1024 * 1024, // 50MB for PDF, 5MB for images
          pathname: `${folder}/${timestamp}-${randomStr}-${pathname}`,
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Upload completed:", blob.url)
        // Optional: Save to database or perform other actions
      },
    })

    return res.status(200).json(jsonResponse)
  } catch (error) {
    console.error("Upload error:", error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Upload failed",
    })
  }
}
