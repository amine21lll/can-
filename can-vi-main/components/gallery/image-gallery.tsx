"use client"

import { ImageGrid, type ImageGridItem } from "@/components/ui/image-grid"

interface ImageGalleryProps {
  images: ImageGridItem[]
  title?: string
  description?: string
  columns?: {
    mobile?: 1 | 2
    tablet?: 2 | 3 | 4
    desktop?: 2 | 3 | 4 | 5 | 6
  }
  aspectRatio?: "square" | "video" | "auto"
  className?: string
}

export function ImageGallery({
  images,
  title,
  description,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  aspectRatio = "square",
  className,
}: ImageGalleryProps) {
  return (
    <section className={className || "py-16 bg-background"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-bebas)" }}>
                {title}
              </h2>
            )}
            {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </div>
        )}

        <ImageGrid
          items={images}
          columns={columns}
          aspectRatio={aspectRatio}
          showTitle={false}
          showDescription={false}
        />
      </div>
    </section>
  )
}

