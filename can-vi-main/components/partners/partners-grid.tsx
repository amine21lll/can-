"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Partner {
  id: string
  name: string
  description: string
  logo: string
  href?: string
}

const partners: Partner[] = [
  {
    id: "totalenergies",
    name: "TotalEnergies",
    description: "Partenaire titre officiel",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "bein",
    name: "beIN REGIE",
    description: "Média",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "suzuki",
    name: "Suzuki",
    description: "Partenaire global",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "royal-air-maroc",
    name: "Royal Air Maroc",
    description: "Transport officiel",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "danone",
    name: "Danone",
    description: "Nutrition",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "tecno",
    name: "TECNO",
    description: "Technologie",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "agl",
    name: "AGL",
    description: "Logistique",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "sidi-ali",
    name: "Sidi Ali",
    description: "Eau officielle",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "oncf",
    name: "ONCF",
    description: "Transport ferroviaire",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "supersport",
    name: "SuperSport",
    description: "Diffusion TV",
    logo: "/placeholder-logo.svg",
  },
  {
    id: "canal-plus",
    name: "CANAL+ Africa",
    description: "Diffusion TV",
    logo: "/placeholder-logo.svg",
  },
]

export function PartnersGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-bebas)" }}>
            🏆 Partenaires officiels & sponsors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos partenaires qui rendent possible cette grande célébration du football africain
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((partner) => {
            const content = (
              <Card className="group relative flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-muted/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20">
                <div className="relative w-full h-24 sm:h-32 mb-4 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name} - ${partner.description}`}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="text-center mt-auto">
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{partner.description}</p>
                </div>
              </Card>
            )

            if (partner.href) {
              return (
                <a
                  key={partner.id}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                >
                  {content}
                </a>
              )
            }

            return <div key={partner.id}>{content}</div>
          })}
        </div>
      </div>
    </section>
  )
}

