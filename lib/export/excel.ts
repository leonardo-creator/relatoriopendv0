import type { ImageMetadata } from "@/types/image-metadata"
import { utils, write } from "xlsx"
import { saveAs } from "file-saver"

export async function generateExcel(imageMetadataList: ImageMetadata[]) {
  try {
    // Formatar dados para o schema "Excel para Rotas"
    const excelData = imageMetadataList.map((item) => {
      // Garantir que coordenadas sejam números decimais
      const lat = typeof item.Latitude === "string" ? parseFloat(item.Latitude) : item.Latitude
      const lng = typeof item.Longitude === "string" ? parseFloat(item.Longitude) : item.Longitude

      return {
        Latitude: isNaN(lat) ? 0 : lat,
        Longitude: isNaN(lng) ? 0 : lng,
        index: item.index,
        name: item.name,
        description: item.description,
        status: item.status,
        fileSize: item.fileSize,
        fileType: item.fileType,
        date: item.date,
        predictionDate: item.predictionDate,
      }
    })

    const worksheet = utils.json_to_sheet(excelData)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "Rotas")

    // Ajustar largura das colunas
    const wscols = [
      { wch: 15 }, // Lat
      { wch: 15 }, // Long
      { wch: 8 },  // index
      { wch: 25 }, // name
      { wch: 30 }, // description
      { wch: 10 }, // status
      { wch: 10 }, // fileSize
      { wch: 10 }, // fileType
      { wch: 20 }, // date
      { wch: 15 }, // prediction
    ]
    worksheet["!cols"] = wscols

    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" })
    
    saveAs(blob, `rotas_${new Date().toISOString().split("T")[0]}.xlsx`)
  } catch (error) {
    console.error("Erro ao gerar Excel:", error)
    alert("Erro ao gerar o arquivo Excel. Verifique o console para mais detalhes.")
  }
}
