


import type React from "react"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { AuthProvider } from "@/context/AuthContext"
import WhatsAppButtonClient from "@/components/WhatsAppButtonClient"

export const metadata: Metadata = {
  title: "Anthem Global | Software, GIS & Digitization Solutions",
  description:
    "Anthem Global Technology Services Private Limited is a premier provider of custom software, GIS & LiDAR point cloud classification, digitization, and workforce consulting solutions.",
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        {/* ✅ AuthProvider wraps everything that needs user info */}
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Header />
            {children}
            {/* Fixed WhatsApp button — client-only, never rendered during SSR */}
            <WhatsAppButtonClient />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
