import type { ImageMetadata } from "@/types/image-metadata"
import { resizeImage } from "@/lib/image-utils"
import { calculateUTM } from "@/lib/coordinates"

export async function generateWord(imageMetadataList: ImageMetadata[]) {
  // Carregar a biblioteca dinamicamente
  await loadHtmlDocxScript()

  // Ordenar por status
  const sortedList = [...imageMetadataList].sort((a, b) => {
    const order = { Atrasado: 1, Pendente: 2, Concluido: 3 }
    return order[a.status] - order[b.status]
  })

  const container = document.createElement("div")
  const table = document.createElement("table")
  table.style.width = "100%"
  table.style.borderCollapse = "collapse"
  table.style.border = "1px solid #ddd"
  container.appendChild(table)

  // Processar cada imagem
  await Promise.all(
    sortedList.map(async (image) => {
      const row = table.insertRow()
      row.style.border = "1px solid #ddd"

      const imgCell = row.insertCell()
      imgCell.style.padding = "10px"
      imgCell.style.width = "40%"
      imgCell.style.verticalAlign = "top"
      imgCell.style.border = "1px solid #ddd"

      const imgElement = document.createElement("img")
      const resizedImageSrc = await resizeImage(image.thumbnail, 300, 200)
      imgElement.src = resizedImageSrc
      imgElement.style.width = "100%"
      imgCell.appendChild(imgElement)

      const infoCell = row.insertCell()
      infoCell.style.padding = "10px"
      infoCell.style.verticalAlign = "top"
      infoCell.style.border = "1px solid #ddd"

      const utmCoords = calculateUTM(image.Latitude, image.Longitude)
      infoCell.innerHTML = `
      <strong>Título:</strong> ${image.name}<br>
      <strong>Data/hora:</strong> ${image.date}<br>
      <strong>Status:</strong> ${image.status}<br>
      <strong>Detalhes:</strong> ${image.description}<br>
      <strong>Coordenadas UTM:</strong> ${utmCoords}<br>
      <strong>GPS:</strong> ${image.Latitude}, ${image.Longitude}<br>
      <strong>Previsão:</strong> ${image.predictionDate}
    `
    }),
  )

  const content = `<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body>${table.outerHTML}</body></html>`

  try {
    // Verificar se htmlDocx está disponível
    if (typeof window.htmlDocx === "undefined") {
      throw new Error("A biblioteca html-docx não está disponível")
    }

    const converted = window.htmlDocx.asBlob(content)

    const link = document.createElement("a")
    link.href = URL.createObjectURL(converted)
    link.download = `relatorio_${new Date().toISOString().split("T")[0]}.docx`
    link.click()
  } catch (error) {
    console.error("Erro ao gerar Word:", error)
    alert("Erro ao gerar o arquivo Word. Verifique o console para mais detalhes.")
  }
}

function loadHtmlDocxScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.htmlDocx) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = "https://unpkg.com/html-docx-js/dist/html-docx.js"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load html-docx"))
    document.head.appendChild(script)
  })
}

// Definir o tipo global para o htmlDocx
declare global {
  interface Window {
    htmlDocx: any
  }
}
