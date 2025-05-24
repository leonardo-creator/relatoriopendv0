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

  // Criar o documento com estilo otimizado para mobile
  const container = document.createElement("div")

  // Adicionar estilos globais para melhorar a legibilidade em dispositivos móveis
  const style = document.createElement("style")
  style.textContent = `
    body {
      font-family: Arial, sans-serif;
      font-size: 14pt;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 18pt;
      color: #110043;
      margin-bottom: 20px;
      text-align: center;
    }
    .item {
      page-break-inside: avoid;
      margin-bottom: 30px;
      border: 1px solid #d4d4d8;
      border-radius: 8px;
      overflow: hidden;
    }
    .item-header {
      background-color: #f1f5f9;
      padding: 10px;
      font-weight: bold;
      font-size: 16pt;
      color: #110043;
    }
    .item-content {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
    .item-image {
      text-align: center;
      margin-bottom: 15px;
    }
    .item-image img {
      max-width: 100%;
      height: auto;
      max-height: 200px;
    }
    .item-details {
      font-size: 14pt;
    }
    .status-pendente {
      color: #42eedc;
    }
    .status-concluido {
      color: #a2ff00;
    }
    .status-atrasado {
      color: #ff3f19;
    }
    .label {
      font-weight: bold;
      margin-right: 5px;
    }
    .value {
      margin-bottom: 8px;
    }
  `
  container.appendChild(style)

  // Adicionar título
  const title = document.createElement("h1")
  title.textContent = "Relatório de Monitoramento"
  container.appendChild(title)

  // Processar cada imagem como um item individual (não usar tabela)
  await Promise.all(
    sortedList.map(async (image, index) => {
      const item = document.createElement("div")
      item.className = "item"

      // Cabeçalho do item com o nome do arquivo
      const header = document.createElement("div")
      header.className = "item-header"
      header.textContent = `${index + 1}. ${image.name}`
      item.appendChild(header)

      // Conteúdo do item
      const content = document.createElement("div")
      content.className = "item-content"

      // Imagem
      const imageContainer = document.createElement("div")
      imageContainer.className = "item-image"

      const imgElement = document.createElement("img")
      // Redimensionar para um tamanho menor para melhor visualização em dispositivos móveis
      const resizedImageSrc = await resizeImage(image.thumbnail, 400, 300)
      imgElement.src = resizedImageSrc
      imgElement.alt = image.name
      imageContainer.appendChild(imgElement)
      content.appendChild(imageContainer)

      // Detalhes
      const details = document.createElement("div")
      details.className = "item-details"

      // Status com cor
      const statusClass = `status-${image.status.toLowerCase()}`
      details.innerHTML += `
        <div>
          <span class="label">Status:</span>
          <span class="value ${statusClass}">${image.status}</span>
        </div>
      `

      // Outros detalhes
      const utmCoords = calculateUTM(image.Latitude, image.Longitude)
      details.innerHTML += `
        <div><span class="label">Data/hora:</span> <span class="value">${image.date}</span></div>
        <div><span class="label">Descrição:</span> <span class="value">${image.description || "Não informada"}</span></div>
        <div><span class="label">Previsão:</span> <span class="value">${formatDate(image.predictionDate)}</span></div>
        <div><span class="label">Coordenadas UTM:</span> <span class="value">${utmCoords}</span></div>
        <div><span class="label">GPS:</span> <span class="value">${formatCoordinates(image.Latitude, image.Longitude)}</span></div>
      `

      content.appendChild(details)
      item.appendChild(content)
      container.appendChild(item)
    }),
  )

  // Criar o conteúdo HTML completo
  const content = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório de Monitoramento</title>
    </head>
    <body>
      ${container.innerHTML}
    </body>
  </html>`

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

// Função para formatar data de forma mais legível
function formatDate(dateString: string): string {
  if (!dateString) return "Não definida"

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  } catch (e) {
    return dateString
  }
}

// Função para formatar coordenadas de forma mais legível
function formatCoordinates(lat: number | string, lng: number | string): string {
  if (lat === "N/A" || lng === "N/A") return "Não disponível"

  try {
    const latitude = typeof lat === "string" ? Number.parseFloat(lat) : lat
    const longitude = typeof lng === "string" ? Number.parseFloat(lng) : lng

    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
  } catch (e) {
    return `${lat}, ${lng}`
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
