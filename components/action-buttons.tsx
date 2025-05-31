"use client"

import { FileText, Globe, FileSpreadsheet, FileJson, Loader2, FileIcon as FilePdf, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

  if (imageMetadataList.length === 0) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-50">
        <div className="container mx-auto px-4 py-3">
          {/* Versão compacta para mobile */}
          {isMobile ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                {imageMetadataList.length} {imageMetadataList.length === 1 ? 'imagem' : 'imagens'}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleExport("json", () => generateJSON(imageMetadataList))}
                    disabled={isExporting !== null}
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4"
                  >
                    {isExporting === "json" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileJson className="h-4 w-4" />
                    )}
                    <span className="ml-2">Exportar JSON</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salva em JSON para transferir ao desktop</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            /* Versão compacta para desktop */
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Exportar {imageMetadataList.length} {imageMetadataList.length === 1 ? 'imagem' : 'imagens'}
                </span>
                <Badge variant="outline" className="text-xs">
                  <Monitor className="h-3 w-3 mr-1" />
                  Todos os formatos
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                {/* Botões compactos em linha */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleExport("word", () => generateWord(imageMetadataList))}
                      disabled={isExporting !== null}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isExporting === "word" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      <span className="ml-1">Word</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Documento Word editável</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleExport("pdf", () => generatePDF(imageMetadataList))}
                      disabled={isExporting !== null}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isExporting === "pdf" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <FilePdf className="h-4 w-4" />
                      )}
                      <span className="ml-1">PDF</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Relatório PDF com mapas</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleExport("excel", () => generateExcel(imageMetadataList))}
                      disabled={isExporting !== null}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isExporting === "excel" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <FileSpreadsheet className="h-4 w-4" />
                      )}
                      <span className="ml-1">Excel</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Planilha Excel para análises</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleExport("kml", () => generateKML(imageMetadataList))}
                      disabled={isExporting !== null}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isExporting === "kml" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Globe className="h-4 w-4" />
                      )}
                      <span className="ml-1">KML</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Arquivo KML para Google Earth</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleExport("json", () => generateJSON(imageMetadataList))}
                      disabled={isExporting !== null}
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      {isExporting === "json" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <FileJson className="h-4 w-4" />
                      )}
                      <span className="ml-1">JSON</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dados em formato JSON</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
