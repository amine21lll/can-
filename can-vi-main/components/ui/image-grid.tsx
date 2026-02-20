"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface ImageGridItem {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  href?: string
}

interface ImageGridProps {
  items: ImageGridItem[]
  columns?: {
    mobile?: 1 | 2
    tablet?: 2 | 3 | 4
    desktop?: 2 | 3 | 4 | 5 | 6
  }
  aspectRatio?: "square" | "video" | "auto"
  showTitle?: boolean
  showDescription?: boolean
  className?: string
  imageClassName?: string
  cardClassName?: string
}

const gridColsClasses = {
  mobile: {
    1: "grid-cols-1",
    2: "grid-cols-2",
  },
  tablet: {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  },
  desktop: {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  },
}

export function ImageGrid({
  items,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  aspectRatio = "auto",
  showTitle = false,
  showDescription = false,
  className,
  imageClassName,
  cardClassName,
}: ImageGridProps) {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto",
  }

  const mobileCols = columns.mobile || 1
  const tabletCols = columns.tablet || 2
  const desktopCols = columns.desktop || 4

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        gridColsClasses.mobile[mobileCols as keyof typeof gridColsClasses.mobile],
        gridColsClasses.tablet[tabletCols as keyof typeof gridColsClasses.tablet],
        gridColsClasses.desktop[desktopCols as keyof typeof gridColsClasses.desktop],
        className,
      )}
    >
      {items.map((item) => {
        const content = (
          <Card
            className={cn(
              "group relative overflow-hidden bg-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
              aspectRatioClasses[aspectRatio],
              cardClassName,
            )}
          >
            <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={cn(
                  "object-contain transition-transform duration-300 group-hover:scale-105",
                  imageClassName,
                )}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            {(showTitle || showDescription) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4 pt-8">
                {showTitle && item.title && (
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                )}
                {showDescription && item.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
            )}
          </Card>
        )

        if (item.href) {
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            >
              {content}
            </a>
          )
        }

        return <div key={item.id}>{content}</div>
      })}
    </div>
  )
}

