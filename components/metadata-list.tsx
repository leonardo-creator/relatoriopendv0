import type { ImageMetadata } from "@/types/image-metadata"
import { MetadataCard } from "@/components/metadata-card"

interface MetadataListProps {
  items: ImageMetadata[]
  onUpdate: (index: number, updates: Partial<ImageMetadata>) => void
  onRemove: (index: number) => void
}

export function MetadataList({ items, onUpdate, onRemove }: MetadataListProps) {
  const sortedItems = [...items].sort((a, b) => {
    const order = { Atrasado: 1, Pendente: 2, Concluido: 3 }
    return order[a.status] - order[b.status]
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedItems.map((item) => (
        <MetadataCard
          key={item.index}
          metadata={item}
          onUpdate={(updates) => onUpdate(item.index, updates)}
          onRemove={() => onRemove(item.index)}
        />
      ))}
    </div>
  )
}
