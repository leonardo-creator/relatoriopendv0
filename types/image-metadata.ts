export interface ImageMetadata {
  index: number
  name: string
  status: "Pendente" | "Concluido" | "Atrasado"
  description: string
  fileSize: string
  fileType: string
  date: string
  Latitude: number | string
  Longitude: number | string
  thumbnail: string
  predictionDate: string
}
