import type { ImageMetadata } from "@/types/image-metadata"
import { resizeImage } from "@/lib/image-utils"
import { calculateUTM } from "@/lib/coordinates"

/**
 * Gera um relatório em formato PDF que funciona em todas as plataformas
 * Implementação robusta sem dependências externas problemáticas
 */
export async function generatePDF(imageMetadataList: ImageMetadata[]) {
  try {
    // Ordenar por status
    const sortedList = [...imageMetadataList].sort((a, b) => {
      const order = { Atrasado: 1, Pendente: 2, Concluido: 3 }
      return order[a.status] - order[b.status]
    })

    // Criar o documento HTML com estilos otimizados para PDF
    const htmlContent = await createHtmlReport(sortedList)

    // Converter para PDF usando uma abordagem robusta
    await convertAndDownload(htmlContent)
  } catch (error) {
    console.error("Erro ao gerar PDF:", error)
    alert("Ocorreu um erro ao gerar o PDF. Tente novamente ou use outro formato de exportação.")
  }
}

/**
 * Cria o conteúdo HTML do relatório com layout profissional de duas colunas
 */
async function createHtmlReport(items: ImageMetadata[]): Promise<string> {
  // Estilos CSS incorporados para garantir compatibilidade
  const styles = `
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      line-height: 1.3;
      margin: 0;
      padding: 15px;
      color: #000000;
    }
    h1 {
      font-size: 16pt;
      color: #110043;
      text-align: center;
      margin-bottom: 15px;
    }
    .report-date {
      text-align: center;
      font-size: 9pt;
      margin-bottom: 20px;
      color: #666666;
    }
    .item-container {
      margin-bottom: 20px;
      page-break-inside: avoid;
      border: 1px solid #dddddd;
    }
    .item-title {
      background-color: #f5f5f5;
      padding: 6px 10px;
      font-weight: bold;
      font-size: 12pt;
      border-bottom: 1px solid #dddddd;
    }
    .item-content {
      display: table;
      width: 100%;
      border-collapse: collapse;
    }
    .image-cell {
      display: table-cell;
      width: 50%;
      padding: 0;
      vertical-align: top;
      border-right: 1px solid #dddddd;
    }
    .image-cell img {
      width: 100%;
      display: block;
    }
    .details-cell {
      display: table-cell;
      width: 50%;
      vertical-align: top;
      padding: 0;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
    }
    .details-table tr {
      border-bottom: 1px solid #eeeeee;
    }
    .details-table tr:last-child {
      border-bottom: none;
    }
    .details-table td {
      padding: 6px 10px;
      vertical-align: top;
    }
    .details-table td:first-child {
      width: 35%;
      font-weight: bold;
      background-color: #f9f9f9;
      border-right: 1px solid #eeeeee;
    }
    .status-pendente {
      color: #00bcd4;
      font-weight: bold;
    }
    .status-concluido {
      color: #4caf50;
      font-weight: bold;
    }
    .status-atrasado {
      color: #f44336;
      font-weight: bold;
    }
    @page {
      size: A4;
      margin: 1.5cm;
    }
    @media print {
      .item-container {
        page-break-inside: avoid;
      }
    }
  `

  // Cabeçalho do documento
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de Monitoramento</title>
  <style>${styles}</style>
</head>
<body>
  <h1>Relatório de Monitoramento</h1>
  <div class="report-date">Gerado em: ${new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}</div>
`

  // Processar cada item
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const resizedImageSrc = await resizeImage(item.thumbnail, 800, 600)
    const utmCoords = calculateUTM(item.Latitude, item.Longitude)

    // Determinar a classe CSS para o status
    let statusClass = ""
    switch (item.status) {
      case "Pendente":
        statusClass = "status-pendente"
        break
      case "Concluido":
        statusClass = "status-concluido"
        break
      case "Atrasado":
        statusClass = "status-atrasado"
        break
    }

    // Formatar a data de previsão
    const predictionDate = formatDate(item.predictionDate)

    // Adicionar o item ao HTML com layout profissional de duas colunas
    html += `
  <div class="item-container">
    <div class="item-title">${i + 1}. ${escapeHtml(item.name)}</div>
    <div class="item-content">
      <div class="image-cell">
        <img src="${resizedImageSrc}" alt="${escapeHtml(item.name)}" />
      </div>
      <div class="details-cell">
        <table class="details-table">
          <tr>
            <td>Status:</td>
            <td><span class="${statusClass}">${item.status}</span></td>
          </tr>
          <tr>
            <td>Data/hora:</td>
            <td>${item.date}</td>
          </tr>
          <tr>
            <td>Descrição:</td>
            <td>${escapeHtml(item.description || "Não informada")}</td>
          </tr>
          <tr>
            <td>Previsão:</td>
            <td>${predictionDate}</td>
          </tr>
          <tr>
            <td>Coordenadas UTM:</td>
            <td>${utmCoords}</td>
          </tr>
          <tr>
            <td>GPS:</td>
            <td>${formatCoordinates(item.Latitude, item.Longitude)}</td>
          </tr>
          <tr>
            <td>Tamanho:</td>
            <td>${item.fileSize}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
`
  }

  // Fechar o documento HTML
  html += `
</body>
</html>`

  return html
}

/**
 * Converte o HTML para PDF e inicia o download
 * Implementação robusta com fallbacks
 */
async function convertAndDownload(htmlContent: string) {
  try {
    // Primeiro, tenta usar a impressão nativa do navegador para PDF
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      throw new Error("Não foi possível abrir uma nova janela para impressão")
    }

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Adiciona instruções para o usuário
    alert(
      "Uma nova janela foi aberta com o relatório. " +
        "Use a função de impressão do navegador (Ctrl+P ou Cmd+P) " +
        "e selecione 'Salvar como PDF' para baixar o relatório.",
    )

    // Inicia a impressão após um pequeno atraso para garantir que o conteúdo seja carregado
    setTimeout(() => {
      printWindow.print()
    }, 500)
  } catch (error) {
    console.error("Erro na conversão para PDF:", error)

    // Fallback: Baixar como HTML
    const confirmed = confirm(
      "Ocorreu um erro ao gerar o PDF. " +
        "Deseja baixar o relatório em formato HTML? " +
        "(Você pode abrir este arquivo no navegador e usar a função de impressão para salvar como PDF)",
    )

    if (confirmed) {
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" })
      downloadBlob(blob, `relatorio_${formatDateForFilename(new Date())}.html`)
    }
  }
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
 * Formata uma data para exibição
 */
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

/**
 * Formata coordenadas para exibição
 */
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

/**
 * Formata uma data para uso em nome de arquivo
 */
function formatDateForFilename(date: Date): string {
  return date.toISOString().split("T")[0]
}

/**
 * Escapa caracteres HTML para evitar problemas de formatação
 */
function escapeHtml(text: string): string {
  if (!text) return ""

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
