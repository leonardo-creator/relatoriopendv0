import type { ImageMetadata } from "@/types/image-metadata"

export async function generateExcel(imageMetadataList: ImageMetadata[]) {
  // Carregar XLSX dinamicamente
  await loadXLSXScript()

  try {
    // Remover thumbnails para o Excel
    const excelData = imageMetadataList.map(({ thumbnail, ...rest }) => ({
      ...rest,
      Latitude: rest.Latitude.toString(),
      Longitude: rest.Longitude.toString(),
    }))

    const worksheet = window.XLSX.utils.json_to_sheet(excelData)
    const workbook = window.XLSX.utils.book_new()
    window.XLSX.utils.book_append_sheet(workbook, worksheet, "Metadados")

    // Ajustar largura das colunas
    const maxWidth = 30
    const cols = Object.keys(excelData[0] || {}).map(() => ({ wch: maxWidth }))
    worksheet["!cols"] = cols

    window.XLSX.writeFile(workbook, `metadados_${new Date().toISOString().split("T")[0]}.xlsx`)
  } catch (error) {
    console.error("Erro ao gerar Excel:", error)
    alert("Erro ao gerar o arquivo Excel. Verifique o console para mais detalhes.")
  }
}

function loadXLSXScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.XLSX) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load XLSX"))
    document.head.appendChild(script)
  })
}

// Definir o tipo global para o XLSX
declare global {
  interface Window {
    XLSX: any
  }
}
