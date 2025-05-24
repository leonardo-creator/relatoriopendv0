"use client"

import { FileText, Globe, FileSpreadsheet, FileJson, Loader2, FileIcon as FilePdf } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ImageMetadata } from "@/types/image-metadata"
import { generateWord } from "@/lib/export/word"
import { generatePDF } from "@/lib/export/pdf"
import { generateKML } from "@/lib/export/kml"
import { generateExcel } from "@/lib/export/excel"
import { generateJSON } from "@/lib/export/json"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface ActionButtonsProps {
  imageMetadataList: ImageMetadata[]
  setImageMetadataList: (list: ImageMetadata[]) => void
}

export function ActionButtons({ imageMetadataList, setImageMetadataList }: ActionButtonsProps) {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState<string | null>(null)
  const isMobile = useMobile()

  const handleExport = async (type: string, exportFn: () => Promise<void>) => {
    setIsExporting(type)
    try {
      await exportFn()
      toast({
        title: "Exportação concluída",
        description: `Arquivo ${type.toUpperCase()} gerado com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: `Falha ao gerar arquivo ${type.toUpperCase()}.`,
        variant: "destructive",
      })
    } finally {
      setIsExporting(null)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral p-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Em dispositivos móveis, mostrar apenas o botão JSON */}
          {isMobile ? (
            <Button
              onClick={() => handleExport("json", () => generateJSON(imageMetadataList))}
              disabled={isExporting !== null}
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 w-full"
            >
              {isExporting === "json" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileJson className="mr-2 h-4 w-4" />
              )}
              Exportar JSON
            </Button>
          ) : (
            // Em desktop, mostrar todos os botões
            <>
              <Button
                onClick={() => handleExport("word", () => generateWord(imageMetadataList))}
                disabled={isExporting !== null}
                className="bg-primary hover:bg-primary/90"
              >
                {isExporting === "word" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Gerar Word
              </Button>

              <Button
                onClick={() => handleExport("pdf", () => generatePDF(imageMetadataList))}
                disabled={isExporting !== null}
                className="bg-error hover:bg-error/90 text-white"
              >
                {isExporting === "pdf" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FilePdf className="mr-2 h-4 w-4" />
                )}
                Gerar PDF
              </Button>

              <Button
                onClick={() => handleExport("kml", () => generateKML(imageMetadataList))}
                disabled={isExporting !== null}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                {isExporting === "kml" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="mr-2 h-4 w-4" />
                )}
                Gerar KML
              </Button>

              <Button
                onClick={() => handleExport("excel", () => generateExcel(imageMetadataList))}
                disabled={isExporting !== null}
                variant="outline"
                className="border-success text-success hover:bg-success/10"
              >
                {isExporting === "excel" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                )}
                Gerar Excel
              </Button>

              <Button
                onClick={() => handleExport("json", () => generateJSON(imageMetadataList))}
                disabled={isExporting !== null}
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
              >
                {isExporting === "json" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileJson className="mr-2 h-4 w-4" />
                )}
                Exportar JSON
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
