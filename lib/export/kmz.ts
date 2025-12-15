import type { ImageMetadata } from "@/types/image-metadata"
import JSZip from "jszip"
import { saveAs } from "file-saver"

export async function generateKMZ(imageMetadataList: ImageMetadata[]) {
  try {
    const zip = new JSZip()
    const kmlFolder = zip.folder("images")
    
    // Início do KML
    let kmlContent = '<?xml version="1.0" encoding="UTF-8"?>'
    kmlContent += '<kml xmlns="http://www.opengis.net/kml/2.2">'
    kmlContent += "<Document>"
    kmlContent += "<name>Relatório de Pendências</name>"
    
    // Estilos
    kmlContent += `
      <Style id="pendente">
        <IconStyle><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon></IconStyle>
      </Style>
      <Style id="concluido">
        <IconStyle><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png</href></Icon></IconStyle>
      </Style>
      <Style id="atrasado">
        <IconStyle><Icon><href>http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png</href></Icon></IconStyle>
      </Style>
    `

    // Processar imagens
    for (const [index, item] of imageMetadataList.entries()) {
      if (item.Latitude === "N/A" || item.Longitude === "N/A") continue
      
      const fileName = `img_${index}.jpg`
      const imageBuffer = dataURItoBuffer(item.thumbnail)
      
      // Adicionar imagem ao ZIP
      if (kmlFolder) {
        kmlFolder.file(fileName, imageBuffer)
      }

      // Adicionar Placemark ao KML
      const styleId = item.status.toLowerCase()
      // Garantir coordenadas numéricas
      const lat = typeof item.Latitude === "string" ? parseFloat(item.Latitude) : item.Latitude
      const lng = typeof item.Longitude === "string" ? parseFloat(item.Longitude) : item.Longitude

      kmlContent += `
      <Placemark>
        <name>${escapeXml(item.name)}</name>
        <styleUrl>#${styleId}</styleUrl>
        <description><![CDATA[
          <div style="width: 300px;">
            <p><strong>Status:</strong> ${item.status}</p>
            <p><strong>Descrição:</strong> ${item.description}</p>
            <p><strong>Data:</strong> ${item.date}</p>
            <img src="images/${fileName}" width="300" />
          </div>
        ]]></description>
        <Point>
          <coordinates>${lng},${lat}</coordinates>
        </Point>
      </Placemark>`
    }

    kmlContent += "</Document></kml>"
    
    // Adicionar KML ao ZIP
    zip.file("doc.kml", kmlContent)

    // Gerar e salvar
    const content = await zip.generateAsync({ type: "blob" })
    saveAs(content, `relatorio_${new Date().toISOString().split("T")[0]}.kmz`)

  } catch (error) {
    console.error("Erro ao gerar KMZ:", error)
    alert("Erro ao gerar KMZ.")
  }
}

function dataURItoBuffer(dataURI: string): Uint8Array {
  const parts = dataURI.split(",")
  const base64 = parts.length > 1 ? parts[1] : parts[0]
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;"
      case ">": return "&gt;"
      case "&": return "&amp;"
      case "'": return "&apos;"
      case '"': return "&quot;"
      default: return c
    }
  })
}
