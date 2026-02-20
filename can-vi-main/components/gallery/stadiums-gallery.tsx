"use client"

import { ImageGallery } from "./image-gallery"
import type { ImageGridItem } from "@/components/ui/image-grid"

const stadiumImages: ImageGridItem[] = [
  {
    id: "stadium-casablanca",
    src: "/images/stadium-casablanca.jpg",
    alt: "Stade de Casablanca - CAN 2025",
    title: "Stade de Casablanca",
  },
  {
    id: "stadium-rabat",
    src: "/images/stadium-rabat.jpg",
    alt: "Stade de Rabat - CAN 2025",
    title: "Stade de Rabat",
  },
  {
    id: "stadium-marrakech",
    src: "/images/stadium-marrakech.jpg",
    alt: "Stade de Marrakech - CAN 2025",
    title: "Stade de Marrakech",
  },
  {
    id: "stadium-tanger",
    src: "/images/stadium-tanger.jpg",
    alt: "Stade de Tanger - CAN 2025",
    title: "Stade de Tanger",
  },
  {
    id: "stadium-fes",
    src: "/images/stadium-fes.jpg",
    alt: "Stade de Fes - CAN 2025",
    title: "Stade de Fes",
  },
  {
    id: "stadium-agadir",
    src: "/images/stadium-agadir.jpg",
    alt: "Stade d'Agadir - CAN 2025",
    title: "Stade d'Agadir",
  },
]

export function StadiumsGallery() {
  return (
    <ImageGallery
      images={stadiumImages}
      title="🏟️ Stades hôtes"
      description="Découvrez les magnifiques stades qui accueilleront les matchs de la CAN 2025 au Maroc"
      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      aspectRatio="video"
    />
  )
}

