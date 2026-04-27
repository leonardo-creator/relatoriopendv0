import type { ImageMetadata } from "@/types/image-metadata"

export async function generateJSON(imageMetadataList: ImageMetadata[]) {
  // Exporta os dados originais sem redimensionar as imagens,
  // preservando a qualidade original do base64
  const jsonString = JSON.stringify(imageMetadataList, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `backup_${new Date().toISOString().split("T")[0]}.json`
  a.click()

  URL.revokeObjectURL(url)
}
