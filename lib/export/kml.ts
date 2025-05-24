import type { ImageMetadata } from "@/types/image-metadata"
import { resizeImage } from "@/lib/image-utils"

export async function generateKML(imageMetadataList: ImageMetadata[]) {
  try {
    let kmlContent = '<?xml version="1.0" encoding="UTF-8"?>'
    kmlContent += '<kml xmlns="http://www.opengis.net/kml/2.2">'
    kmlContent += "<Document>"
    kmlContent += "<name>Pontos de Monitoramento</name>"
    kmlContent += "<description>Exportado do Gerenciador de Metadados</description>"

    // Definir estilos para cada status
    kmlContent += `
      <Style id="pendente">
        <IconStyle>
          <Icon><href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon>
        </IconStyle>
      </Style>
      <Style id="concluido">
        <IconStyle>
          <Icon><href>http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png</href></Icon>
        </IconStyle>
      </Style>
      <Style id="atrasado">
        <IconStyle>
          <Icon><href>http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png</href></Icon>
        </IconStyle>
      </Style>
    `

    for (const item of imageMetadataList) {
      if (item.Latitude !== "N/A" && item.Longitude !== "N/A") {
        const placemark = await createPlacemark(item)
        kmlContent += placemark
      }
    }

    kmlContent += "</Document></kml>"

    download(`pontos_${new Date().toISOString().split("T")[0]}.kml`, kmlContent)
  } catch (error) {
    console.error("Erro ao gerar KML:", error)
    alert("Erro ao gerar o arquivo KML. Verifique o console para mais detalhes.")
  }
}

async function createPlacemark(item: ImageMetadata): Promise<string> {
  const resizedImageSrc = await resizeImage(item.thumbnail, 300, 200)

  let styleId: string
  switch (item.status) {
    case "Atrasado":
      styleId = "atrasado"
      break
    case "Pendente":
      styleId = "pendente"
      break
    case "Concluido":
      styleId = "concluido"
      break
    default:
      styleId = "pendente"
  }

  // Garantir que as coordenadas sejam números
  const lat = typeof item.Latitude === "string" ? Number.parseFloat(item.Latitude) : item.Latitude
  const lon = typeof item.Longitude === "string" ? Number.parseFloat(item.Longitude) : item.Longitude

  return `
    <Placemark>
        <name>${escapeXml(item.name)}</name>
        <styleUrl>#${styleId}</styleUrl>
        <description><![CDATA[
          <p><strong>Status:</strong> ${item.status}</p>
          <p><strong>Descrição:</strong> ${item.description}</p>
          <p><strong>Data:</strong> ${item.date}</p>
          <p><strong>Previsão:</strong> ${item.predictionDate}</p>
          <img src="${resizedImageSrc}" width="300" />
        ]]></description>
        <Point>
          <coordinates>${lon},${lat}</coordinates>
        </Point>
    </Placemark>`
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case "'":
        return "&apos;"
      case '"':
        return "&quot;"
      default:
        return c
    }
  })
}

function download(filename: string, text: string) {
  const element = document.createElement("a")
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
  element.setAttribute("download", filename)
  element.style.display = "none"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
