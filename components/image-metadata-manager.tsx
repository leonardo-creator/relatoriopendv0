"use client"

import { useState, useCallback } from "react"
import type { ImageMetadata } from "@/types/image-metadata"
import { Header } from "@/components/header"
import { IntroSection } from "@/components/intro-section"
import { ImageUploader } from "@/components/image-uploader"
import { MetadataList } from "@/components/metadata-list"
import { ActionButtons } from "@/components/action-buttons"
import { processImageFiles } from "@/lib/image-processor"
import { useToast } from "@/hooks/use-toast"

export default function ImageMetadataManager() {
  const [imageMetadataList, setImageMetadataList] = useState<ImageMetadata[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleFilesUpload = useCallback(
    async (files: FileList) => {
      setIsProcessing(true)
      try {
        const startIndex = imageMetadataList.length
        const newMetadata = await processImageFiles(files, startIndex)
        setImageMetadataList((prev) => [...prev, ...newMetadata])

        toast({
          title: "Imagens carregadas",
          description: `${newMetadata.length} imagens processadas com sucesso.`,
        })
      } catch (error) {
        console.error("Erro ao processar imagens:", error)
        toast({
          title: "Erro ao processar imagens",
          description: "Verifique se as imagens contêm metadados de localização.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    },
    [imageMetadataList.length, toast],
  )

  const handleJsonUpload = useCallback(
    async (file: File) => {
      try {
        const text = await file.text()
        const jsonData = JSON.parse(text) as ImageMetadata[]
        setImageMetadataList(jsonData)

        toast({
          title: "JSON carregado",
          description: `${jsonData.length} registros importados.`,
        })
      } catch (error) {
        console.error("Erro ao carregar JSON:", error)
        toast({
          title: "Erro ao carregar JSON",
          description: "Arquivo JSON inválido.",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const updateMetadata = useCallback((index: number, updates: Partial<ImageMetadata>) => {
    setImageMetadataList((prev) => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)))
  }, [])

  const removeImage = useCallback(
    (index: number) => {
      setImageMetadataList((prev) => {
        const filtered = prev.filter((_, i) => i !== index)
        return filtered.map((item, i) => ({ ...item, index: i }))
      })

      toast({
        title: "Imagem removida",
        description: "A imagem foi removida da lista.",
      })
    },
    [toast],
  )

  const hasImages = imageMetadataList.length > 0

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {!hasImages && (
        <IntroSection onFilesUpload={handleFilesUpload} onJsonUpload={handleJsonUpload} isProcessing={isProcessing} />
      )}

      {hasImages && (
        <>
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-dark">Imagens Carregadas ({imageMetadataList.length})</h2>
              <ImageUploader onFilesUpload={handleFilesUpload} isProcessing={isProcessing} variant="secondary" />
            </div>

            <MetadataList items={imageMetadataList} onUpdate={updateMetadata} onRemove={removeImage} />
          </div>

          <ActionButtons imageMetadataList={imageMetadataList} setImageMetadataList={setImageMetadataList} />
        </>
      )}
    </div>
  )
}
