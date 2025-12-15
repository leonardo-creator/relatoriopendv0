import type { ImageMetadata } from "@/types/image-metadata"
import { calculateUTM } from "@/lib/coordinates"
import { Document, Packer, Paragraph, Table, TableRow, TableCell, ImageRun, TextRun, WidthType, BorderStyle } from "docx"
import { saveAs } from "file-saver"

/**
 * Gera um relatório em formato DOCX com imagens em alta qualidade
 */
export async function generateWord(imageMetadataList: ImageMetadata[]) {
  try {
    // Ordenar por status
    const sortedList = [...imageMetadataList].sort((a, b) => {
      const order = { Atrasado: 1, Pendente: 2, Concluido: 3 }
      return order[a.status] - order[b.status]
    })

    // Criar as linhas da tabela
    const rows: TableRow[] = []

    for (const image of sortedList) {
      // Converter Data URI para buffer (Uint8Array) para o docx
      const imageBuffer = dataURItoBuffer(image.thumbnail)
      const utmCoords = calculateUTM(image.Latitude, image.Longitude)

      const row = new TableRow({
        children: [
          // Célula da Imagem
          new TableCell({
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBuffer,
                    transformation: {
                      width: 300,
                      height: 200,
                    },
                    type: "png", // Pode ser detectado dinamicamente se necessário, mas png/jpeg funciona
                  }),
                ],
              }),
            ],
            borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
            }
          }),
          // Célula de Informações
          new TableCell({
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
            },
            children: [
              createMetadataParagraph("Título:", image.name),
              createMetadataParagraph("Data/hora:", image.date),
              createMetadataParagraph("Status:", image.status),
              createMetadataParagraph("Detalhes:", image.description),
              createMetadataParagraph("Coordenadas UTM:", utmCoords),
              createMetadataParagraph("GPS:", `${image.Latitude}, ${image.Longitude}`),
              createMetadataParagraph("Previsão:", image.predictionDate),
            ],
             borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
            }
          }),
        ],
      })
      rows.push(row)
    }

    const table = new Table({
      rows: rows,
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    })

    const doc = new Document({
      sections: [
        {
          children: [table],
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `relatorio_${new Date().toISOString().split("T")[0]}.docx`)
  } catch (error) {
    console.error("Erro ao gerar relatório Word:", error)
    alert("Ocorreu um erro ao gerar o relatório. Tente novamente.")
  }
}

function createMetadataParagraph(label: string, value: string | undefined): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: `${label} `,
        bold: true,
      }),
      new TextRun({
        text: value || "",
      }),
    ],
    spacing: {
        after: 100
    }
  })
}

function dataURItoBuffer(dataURI: string): Uint8Array {
  // data:image/jpeg;base64,...
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
