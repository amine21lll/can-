import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ChatWidget } from "@/components/chat/chat-widget"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 - Official Platform | Canada, Mexico, USA",
  description:
    "The official FIFA World Cup 2026 platform. Buy tickets, check match schedules, join our volunteer program, and stay updated on the world's biggest football tournament across North America.",
  metadataBase: new URL("https://worldcup2026.example.com"),
  generator: "Next.js",
  keywords: ["FIFA World Cup 2026", "World Cup", "Football", "Soccer", "Canada", "Mexico", "USA", "Tickets", "Matches"],
  authors: [{ name: "FIFA World Cup 2026" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://worldcup2026.example.com",
    siteName: "FIFA World Cup 2026",
    title: "FIFA World Cup 2026 - Official Platform",
    description: "The official FIFA World Cup 2026 platform. Buy tickets, check match schedules, join our volunteer program.",
    images: [
      {
        url: "/images/wc2026-og.png",
        width: 1200,
        height: 630,
        alt: "FIFA World Cup 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026",
    description: "Official FIFA World Cup 2026 Platform",
    images: ["/images/wc2026-twitter.png"],
  },
  icons: {
    icon: "/images/wc2026-logo.png",
    shortcut: "/images/wc2026-logo.png",
    apple: "/images/wc2026-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#002B5C" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="World Cup 2026" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
