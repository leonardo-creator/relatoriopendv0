import type { ImageMetadata } from "@/types/image-metadata"
import { resizeImage } from "@/lib/image-utils"
import { calculateUTM } from "@/lib/coordinates"

/**
 * Gera um relatório em formato DOCX que funciona em todas as plataformas
 * Mantém o formato original mas com implementação mais robusta
 */
export async function generateWord(imageMetadataList: ImageMetadata[]) {
  try {
    // Ordenar por status
    const sortedList = [...imageMetadataList].sort((a, b) => {
      const order = { Atrasado: 1, Pendente: 2, Concluido: 3 }
      return order[a.status] - order[b.status]
    })

    // Criar o documento HTML no formato original
    const htmlContent = await createHtmlReport(sortedList)

    // Converter para DOCX usando uma abordagem mais robusta
    await convertAndDownload(htmlContent)
  } catch (error) {
    console.error("Erro ao gerar relatório:", error)
    alert("Ocorreu um erro ao gerar o relatório. Tente novamente ou use outro formato de exportação.")
  }
}

/**
 * Cria o conteúdo HTML do relatório mantendo o formato original
 */
async function createHtmlReport(items: ImageMetadata[]): Promise<string> {
  // Criar um container para o conteúdo
  const container = document.createElement("div")

  // Criar a tag meta para definir a codificação UTF-8
  const metaCharset = document.createElement("meta")
  metaCharset.setAttribute("charset", "UTF-8")
  container.appendChild(metaCharset)

  // Criar uma tabela para conter as imagens e informações
  const table = document.createElement("table")
  table.style.width = "100%" // Ajustar conforme necessário

  // Adicionar a tabela ao container
  container.appendChild(table)

  // Processar cada item de metadados de imagem
  for (const image of items) {
    const row = table.insertRow()

    // Criar a primeira célula para imagens
    const imgCell = row.insertCell()
    const imgElement = document.createElement("img")

    // Redimensionar a imagem e definir a fonte
    const resizedImageSrc = await resizeImage(image.thumbnail, 300, 200)
    imgElement.src = resizedImageSrc
    imgElement.style.height = "10px" // Mantendo o estilo original
    imgCell.appendChild(imgElement)

    // Criar a segunda célula para informações
    const infoCell = row.insertCell()
    const utmCoords = calculateUTM(image.Latitude, image.Longitude)

    infoCell.innerHTML = toUTF8(
      `<strong>Título:</strong> ${image.name}<br>` +
        `<strong>Data/hora:</strong> ${image.date}<br>` +
        `<strong>Status:</strong> ${image.status}<br>` +
        `<strong>Detalhes:</strong> ${image.description}<br>` +
        `<strong>Coordenadas UTM:</strong> ${utmCoords}<br>` +
        `<strong>GPS:</strong> ${image.Latitude}, ${image.Longitude}<br>` +
        `<strong>Previsão:</strong> ${image.predictionDate}`,
    )
  }

  // Após processar todas imagens
  const content = decodeURIComponent(
    escape("<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body>" + table.outerHTML + "</body></html>"),
  )

  return content
}

/**
 * Converte string para UTF-8 (mantendo a função original)
 */
function toUTF8(str: string): string {
  return unescape(encodeURIComponent(str))
}

/**
 * Converte o HTML para DOCX e inicia o download
 * Implementação robusta com fallbacks
 */
async function convertAndDownload(htmlContent: string) {
  try {
    // Primeiro, tenta usar a biblioteca html-docx-js se disponível
    if (await isHtmlDocxAvailable()) {
      const blob = await convertWithHtmlDocx(htmlContent)
      downloadBlob(blob, `relatorio_${formatDateForFilename(new Date())}.docx`)
      return
    }

    // Se html-docx-js não estiver disponível, oferece alternativa
    const confirmed = confirm(
      "A biblioteca para conversão para Word não está disponível. " +
        "Deseja baixar o relatório em formato HTML? " +
        "(Você pode abrir este arquivo no Word ou outro editor de texto)",
    )

    if (confirmed) {
      // Fallback: Baixar como HTML
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" })
      downloadBlob(blob, `relatorio_${formatDateForFilename(new Date())}.html`)
    }
  } catch (error) {
    console.error("Erro na conversão:", error)

    // Último recurso: oferecer download como HTML
    const confirmed = confirm(
      "Ocorreu um erro ao gerar o documento Word. " +
        "Deseja baixar o relatório em formato HTML? " +
        "(Você pode abrir este arquivo no Word ou outro editor de texto)",
    )

    if (confirmed) {
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" })
      downloadBlob(blob, `relatorio_${formatDateForFilename(new Date())}.html`)
    }
  }
}

/**
 * Verifica se a biblioteca html-docx-js está disponível
 */
async function isHtmlDocxAvailable(): Promise<boolean> {
  if (typeof window.htmlDocx !== "undefined") {
    return true
  }

  try {
    // Tenta carregar a biblioteca
    await loadHtmlDocxScript()
    return typeof window.htmlDocx !== "undefined"
  } catch (error) {
    console.warn("Não foi possível carregar html-docx-js:", error)
    return false
  }
}

/**
 * Converte HTML para DOCX usando html-docx-js
 */
async function convertWithHtmlDocx(htmlContent: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const blob = window.htmlDocx.asBlob(htmlContent)
      resolve(blob)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Inicia o download de um blob
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

/**
 * Carrega a biblioteca html-docx-js dinamicamente
 */
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
    script.onerror = () => reject(new Error("Falha ao carregar html-docx-js"))
    document.head.appendChild(script)
  })
}

/**
 * Formata uma data para uso em nome de arquivo
 */
function formatDateForFilename(date: Date): string {
  return date.toISOString().split("T")[0]
}

// Definir o tipo global para o htmlDocx
declare global {
  interface Window {
    htmlDocx: any
  }
}
