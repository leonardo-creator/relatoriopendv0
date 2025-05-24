"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Trash2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ImageMetadata } from "@/types/image-metadata"
import { calculateUTM } from "@/lib/coordinates"
import { cn } from "@/lib/utils"

interface MetadataCardProps {
  metadata: ImageMetadata
  onUpdate: (updates: Partial<ImageMetadata>) => void
  onRemove: () => void
}

export function MetadataCard({ metadata, onUpdate, onRemove }: MetadataCardProps) {
  const [localMetadata, setLocalMetadata] = useState(metadata)

  useEffect(() => {
    setLocalMetadata(metadata)
  }, [metadata])

  const handleStatusChange = (status: string) => {
    setLocalMetadata((prev) => ({ ...prev, status: status as "Pendente" | "Concluido" | "Atrasado" }))
    onUpdate({ status: status as "Pendente" | "Concluido" | "Atrasado" })
  }

  const handleDescriptionChange = (description: string) => {
    setLocalMetadata((prev) => ({ ...prev, description }))
    onUpdate({ description })
  }

  const handlePredictionDateChange = (date: string) => {
    const currentDate = new Date()
    const predictionDate = new Date(date)

    let newStatus = localMetadata.status
    if (currentDate > predictionDate && localMetadata.status !== "Concluido") {
      newStatus = "Atrasado"
    }

    setLocalMetadata((prev) => ({ ...prev, predictionDate: date, status: newStatus }))
    onUpdate({ predictionDate: date, status: newStatus })
  }

  const statusColors = {
    Pendente: "border-accent bg-accent/10",
    Concluido: "border-success bg-success/10",
    Atrasado: "border-error bg-error/10",
  }

  const statusIcons = {
    Pendente: <Clock className="h-4 w-4" />,
    Concluido: <Clock className="h-4 w-4" />,
    Atrasado: <Clock className="h-4 w-4" />,
  }

  // Calcular coordenadas UTM de forma segura
  const utmCoords =
    localMetadata.Latitude !== "N/A" && localMetadata.Longitude !== "N/A"
      ? calculateUTM(localMetadata.Latitude, localMetadata.Longitude)
      : "N/A"

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", statusColors[localMetadata.status])}>
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={localMetadata.thumbnail || "/placeholder.svg"}
            alt={localMetadata.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Button size="icon" variant="destructive" className="h-8 w-8 bg-error hover:bg-error/90" onClick={onRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        <div>
          <h3 className="font-semibold text-dark truncate">{localMetadata.name}</h3>
          <p className="text-sm text-dark/60">{localMetadata.date}</p>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor={`status-${localMetadata.index}`}>Status</Label>
            <Select value={localMetadata.status} onValueChange={handleStatusChange}>
              <SelectTrigger id={`status-${localMetadata.index}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Concluido">Concluído</SelectItem>
                <SelectItem value="Atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={`description-${localMetadata.index}`}>Descrição</Label>
            <Input
              id={`description-${localMetadata.index}`}
              value={localMetadata.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Adicione uma descrição..."
            />
          </div>

          <div>
            <Label htmlFor={`prediction-${localMetadata.index}`}>Data de Previsão</Label>
            <Input
              id={`prediction-${localMetadata.index}`}
              type="date"
              value={localMetadata.predictionDate}
              onChange={(e) => handlePredictionDateChange(e.target.value)}
            />
          </div>

          <div className="pt-2 border-t border-neutral">
            <div className="flex items-center gap-2 text-sm text-dark/60">
              <MapPin className="h-4 w-4" />
              <span className="truncate">UTM: {utmCoords}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-dark/60 mt-1">
              <Calendar className="h-4 w-4" />
              <span>{localMetadata.fileSize}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
