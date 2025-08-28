import type React from "react"
import type { Metadata } from "next/metadata"
import "./globals.css"

export const metadata: Metadata = {
  title: "Campus SkillXChange",
  description: "Connect with FUTO students to exchange knowledge and learn new skills through peer-to-peer learning",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
        `}</style>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
