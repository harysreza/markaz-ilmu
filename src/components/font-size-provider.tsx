"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type FontSize = "sm" | "base" | "lg" | "xl"

interface FontSizeContextType {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  increaseFontSize: () => void
  decreaseFontSize: () => void
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined)

const FONT_SIZES: Record<FontSize, string> = {
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
}

const FONT_SCALES: Record<FontSize, string> = {
  sm: "0.9",
  base: "1",
  lg: "1.1",
  xl: "1.25",
}

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("font-size") as FontSize
      if (saved && FONT_SIZES[saved]) {
        return saved
      }
    }
    return "base"
  })

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size)
    localStorage.setItem("font-size", size)
  }

  const increaseFontSize = () => {
    if (fontSize === "sm") setFontSize("base")
    else if (fontSize === "base") setFontSize("lg")
    else if (fontSize === "lg") setFontSize("xl")
  }

  const decreaseFontSize = () => {
    if (fontSize === "xl") setFontSize("lg")
    else if (fontSize === "lg") setFontSize("base")
    else if (fontSize === "base") setFontSize("sm")
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", FONT_SCALES[fontSize])
  }, [fontSize])

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export const useFontSize = () => {
  const context = useContext(FontSizeContext)
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider")
  }
  return context
}
