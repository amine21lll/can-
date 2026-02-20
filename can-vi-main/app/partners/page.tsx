import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PartnersGrid } from "@/components/partners/partners-grid"

export const metadata: Metadata = {
  title: "Partenaires & Sponsors | CAN Morocco 2025 Hub",
  description: "Découvrez nos partenaires officiels et sponsors de la Coupe d'Afrique des Nations Morocco 2025",
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PartnersGrid />
      </main>
      <Footer />
    </div>
  )
}

