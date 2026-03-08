"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Ticket } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary to-primary-dark" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent mb-8 border border-accent/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Live • FIFA World Cup 2026
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight text-balance">
              WORLD CUP
              <br />
              <span className="text-accent">2026</span>
            </h1>

            <p className="mt-8 text-xl text-white/80 max-w-xl leading-relaxed">
              Welcome to the official FIFA World Cup 2026 platform. Buy your tickets, follow the matches, and join our volunteer team across Canada, Mexico, and the USA.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-black font-semibold gap-2">
                <Link href="/tickets">
                  <Ticket className="h-5 w-5" />
                  Get Tickets
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10 gap-2 bg-transparent"
              >
                <Link href="/matches">
                  <Calendar className="h-5 w-5" />
                  View Schedule
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-accent">32</div>
                <div className="text-sm text-white/60 mt-1">Teams</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-accent">64</div>
                <div className="text-sm text-white/60 mt-1">Matches</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-accent">12</div>
                <div className="text-sm text-white/60 mt-1">Stadiums</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl" />
              <Image
                src="/images/can2025-logo.png"
                alt="Logo officiel CAN Morocco 2025"
                width={400}
                height={400}
                className="relative w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <CountdownCAN2025 />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
