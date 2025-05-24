import type { ImageMetadata } from "@/types/image-metadata"
import { addBusinessDays } from "./date-utils"

export async function processImageFiles(files: FileList, startIndex: number): Promise<ImageMetadata[]> {
  // Carregar a biblioteca EXIF.js dinamicamente
  await loadExifJs()

  const promises = Array.from(files).map((file, index) => readImageMetadata(file, startIndex + index))
  return Promise.all(promises)
}

function loadExifJs(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.EXIF) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.min.js"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load EXIF.js"))
    document.head.appendChild(script)
  })
}

function readImageMetadata(file: File, index: number): Promise<ImageMetadata> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string

      img.onload = () => {
        try {
          // Usar uma abordagem mais segura para extrair metadados EXIF
          const exifData = extractExifData(img)

          const defaultPredictionDate = addBusinessDays(new Date(), 7)
          const predictionDate = defaultPredictionDate.toISOString().split("T")[0]

          const metadata: ImageMetadata = {
            index: index,
            name: file.name,
            status: "Pendente",
            description: "",
            fileSize: `${(file.size / 1024).toFixed(2)} KB`,
            fileType: file.type,
            date: new Date(file.lastModified).toLocaleString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            Latitude: exifData.latitude,
            Longitude: exifData.longitude,
            thumbnail: e.target?.result as string,
            predictionDate: predictionDate,
          }

          resolve(metadata)
        } catch (error) {
          console.error("Erro ao processar metadados EXIF:", error)

          // Mesmo com erro, retornar metadados básicos sem coordenadas
          const defaultPredictionDate = addBusinessDays(new Date(), 7)
          const predictionDate = defaultPredictionDate.toISOString().split("T")[0]

          const metadata: ImageMetadata = {
            index: index,
            name: file.name,
            status: "Pendente",
            description: "",
            fileSize: `${(file.size / 1024).toFixed(2)} KB`,
            fileType: file.type,
            date: new Date(file.lastModified).toLocaleString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            Latitude: "N/A",
            Longitude: "N/A",
            thumbnail: e.target?.result as string,
            predictionDate: predictionDate,
          }

          resolve(metadata)
        }
      }

      img.onerror = () => {
        reject(new Error("Erro ao carregar a imagem"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"))
    }

    reader.readAsDataURL(file)
  })
}

function extractExifData(img: HTMLImageElement): { latitude: number | string; longitude: number | string } {
  try {
    if (!window.EXIF) {
      console.warn("Biblioteca EXIF.js não carregada")
      return { latitude: "N/A", longitude: "N/A" }
    }

    // Método alternativo para extrair dados EXIF
    let lat = "N/A"
    let lng = "N/A"

    // Usar uma abordagem mais segura
    if (img.exifdata) {
      const gpsData = extractGpsData(img.exifdata)
      if (gpsData.latitude !== "N/A" && gpsData.longitude !== "N/A") {
        return gpsData
      }
    }

    // Tentar extrair dados EXIF manualmente
    window.EXIF.getData(img, function () {
      const exifData = window.EXIF.getAllTags(this)
      if (exifData && exifData.GPSLatitude && exifData.GPSLongitude) {
        const latRef = exifData.GPSLatitudeRef || "N"
        const lngRef = exifData.GPSLongitudeRef || "E"

        lat = convertDMSToDD(exifData.GPSLatitude, latRef === "S")
        lng = convertDMSToDD(exifData.GPSLongitude, lngRef === "W")
      }
    })

    return { latitude: lat, longitude: lng }
  } catch (error) {
    console.error("Erro ao extrair dados EXIF:", error)
    return { latitude: "N/A", longitude: "N/A" }
  }
}

function extractGpsData(exifdata: any): { latitude: number | string; longitude: number | string } {
  try {
    if (!exifdata || !exifdata.GPSLatitude || !exifdata.GPSLongitude) {
      return { latitude: "N/A", longitude: "N/A" }
    }

    const latRef = exifdata.GPSLatitudeRef || "N"
    const lngRef = exifdata.GPSLongitudeRef || "E"

    const latitude = convertDMSToDD(exifdata.GPSLatitude, latRef === "S")
    const longitude = convertDMSToDD(exifdata.GPSLongitude, lngRef === "W")

    return { latitude, longitude }
  } catch (error) {
    console.error("Erro ao extrair dados GPS:", error)
    return { latitude: "N/A", longitude: "N/A" }
  }
}

function convertDMSToDD(dmsArray: number[], isNegative = false): number {
  if (!Array.isArray(dmsArray) || dmsArray.length < 3) {
    return 0
  }

  try {
    const degrees = dmsArray[0]
    const minutes = dmsArray[1]
    const seconds = dmsArray[2]

    let dd = degrees + minutes / 60 + seconds / (60 * 60)

    if (isNegative) {
      dd = -dd
    }

    return dd
  } catch (error) {
    console.error("Erro ao converter coordenadas:", error)
    return 0
  }
}

// Definir o tipo global para o EXIF
declare global {
  interface Window {
    EXIF: any
  }

  interface HTMLImageElement {
    exifdata?: any
  }
}
