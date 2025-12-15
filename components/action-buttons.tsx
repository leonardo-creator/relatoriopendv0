"use client"

import { FileText, Globe, FileSpreadsheet, FileJson, Loader2, FileIcon as FilePdf, Smartphone, Monitor, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ImageMetadata } from "@/types/image-metadata"
import { generateWord } from "@/lib/export/word"
import { generatePDF } from "@/lib/export/pdf"
import { generateKMZ } from "@/lib/export/kmz"
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
      console.error(error)
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

  const exportOptions = [
    {
      id: "word",
      label: "Word",
      icon: FileText,
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-blue-600",
      action: () => generateWord(imageMetadataList),
      desc: "Documento Word editável"
    },
    {
      id: "pdf",
      label: "PDF",
      icon: FilePdf,
      color: "bg-red-600 hover:bg-red-700",
      textColor: "text-red-600",
      action: () => generatePDF(imageMetadataList),
      desc: "Relatório PDF com mapas"
    },
    {
      id: "excel",
      label: "Excel",
      icon: FileSpreadsheet,
      color: "bg-green-600 hover:bg-green-700",
      textColor: "text-green-600",
      action: () => generateExcel(imageMetadataList),
      desc: "Planilha Excel (Rotas)"
    },
    {
      id: "kmz",
      label: "KMZ",
      icon: Globe,
      color: "bg-purple-600 hover:bg-purple-700",
      textColor: "text-purple-600",
      action: () => generateKMZ(imageMetadataList),
      desc: "KMZ para Google Earth (Alta Resolução)"
    },
    {
      id: "json",
      label: "JSON",
      icon: FileJson,
      color: "bg-orange-600 hover:bg-orange-700",
      textColor: "text-orange-600",
      action: () => generateJSON(imageMetadataList),
      desc: "Dados em formato JSON"
    }
  ]

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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {exportOptions.map((opt) => (
                    <DropdownMenuItem 
                      key={opt.id}
                      onClick={() => handleExport(opt.id, opt.action)}
                      disabled={isExporting !== null}
                      className="cursor-pointer"
                    >
                      {isExporting === opt.id ? (
                        <Loader2 className={`mr-2 h-4 w-4 animate-spin ${opt.textColor}`} />
                      ) : (
                        <opt.icon className={`mr-2 h-4 w-4 ${opt.textColor}`} />
                      )}
                      <span>{opt.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
                {exportOptions.map((opt) => (
                  <Tooltip key={opt.id}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleExport(opt.id, opt.action)}
                        disabled={isExporting !== null}
                        size="sm"
                        className={`${opt.color} text-white`}
                      >
                        {isExporting === opt.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <opt.icon className="h-4 w-4" />
                        )}
                        <span className="ml-1">{opt.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{opt.desc}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
