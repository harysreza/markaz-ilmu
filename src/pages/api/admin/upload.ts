import { IncomingForm, File as FormidableFile } from "formidable"
import { NextApiRequest, NextApiResponse } from "next"
import { readFile } from "fs/promises"
import { put } from "@vercel/blob"

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // TODO: Re-enable auth check after fixing NextAuth issue
    // For now, allowing upload without auth for testing

    console.log("=== Upload Started ===")

    // Parse form data using formidable
    const form = new IncomingForm()
    const [fields, files] = await new Promise<
      [Record<string, string[]>, Record<string, FormidableFile[]>]
    >((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        else
          resolve([
            fields as Record<string, string[]>,
            files as Record<string, FormidableFile[]>,
          ])
      })
    })

    const file = files.file?.[0]
    const type = fields.type?.[0]

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    console.log("File:", file.originalFilename, "Type:", type, "Size:", file.size)

    // Validasi tipe file
    const allowedTypes = {
      pdf: ["application/pdf"],
      image: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    }

    const validTypes = type === "pdf" ? allowedTypes.pdf : allowedTypes.image
    if (!validTypes.includes(file.mimetype || "")) {
      return res.status(400).json({
        error: `Invalid file type. Allowed: ${validTypes.join(", ")}`,
      })
    }

    // Validasi ukuran
    const maxSize = type === "pdf" ? 50 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      return res.status(400).json({
        error: `File too large. Max: ${maxSize / 1024 / 1024}MB`,
      })
    }

    // Read file
    const fileBuffer = await readFile(file.filepath)

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const ext = file.originalFilename?.split(".").pop() || "pdf"
    const blobPath = `${type === "pdf" ? "ebooks" : "covers"}/${timestamp}-${randomStr}.${ext}`

    console.log("Uploading to Blob:", blobPath)

    // Upload to Vercel Blob
    const blob = await put(blobPath, fileBuffer, {
      access: "public",
      contentType: file.mimetype || "application/octet-stream",
    })

    console.log("Upload success:", blob.url)

    return res.status(200).json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
      size: file.size,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Upload failed",
    })
  }
}
