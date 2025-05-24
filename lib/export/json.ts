import type { ImageMetadata } from "@/types/image-metadata"
import { resizeImage } from "@/lib/image-utils"

export async function generateJSON(imageMetadataList: ImageMetadata[]) {
  // Redimensionar todas as imagens
  const resizedData = await Promise.all(
    imageMetadataList.map(async (item) => {
      const resizedThumbnail = await resizeImage(item.thumbnail, 300, 200)
      return { ...item, thumbnail: resizedThumbnail }
    }),
  )

  const jsonString = JSON.stringify(resizedData, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `backup_${new Date().toISOString().split("T")[0]}.json`
  a.click()

  URL.revokeObjectURL(url)
}
