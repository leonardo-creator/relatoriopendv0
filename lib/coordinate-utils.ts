import type { ImageMetadata } from "@/types/image-metadata"

/**
 * Normaliza um valor de coordenada para garantir que seja um número válido ou "N/A"
 * Trata casos de null, undefined, strings vazias, "null", "undefined", etc.
 */
export function normalizeCoordinate(value: number | string | null | undefined): number | string {
  if (value === null || value === undefined) return "N/A"
  if (value === "N/A") return "N/A"
  if (typeof value === "number") return isNaN(value) ? "N/A" : value
  if (typeof value === "string") {
    const trimmed = value.trim()
    if (trimmed === "" || trimmed === "N/A" || trimmed === "null" || trimmed === "undefined") return "N/A"
    const num = Number.parseFloat(trimmed)
    return isNaN(num) ? "N/A" : num
  }
  return "N/A"
}

/**
 * Formata coordenadas GPS para exibição
 * Retorna as coordenadas formatadas com 6 casas decimais ou "N/A"
 */
export function formatGPSCoordinates(lat: number | string, lon: number | string): string {
  const normalizedLat = normalizeCoordinate(lat)
  const normalizedLon = normalizeCoordinate(lon)

  if (normalizedLat === "N/A" || normalizedLon === "N/A") {
    return "N/A"
  }

  return `${Number(normalizedLat).toFixed(6)}, ${Number(normalizedLon).toFixed(6)}`
}

/**
 * Verifica se um item de metadados possui coordenadas válidas
 */
export function hasValidCoordinates(item: ImageMetadata): boolean {
  const lat = normalizeCoordinate(item.Latitude)
  const lon = normalizeCoordinate(item.Longitude)
  return lat !== "N/A" && lon !== "N/A"
}
