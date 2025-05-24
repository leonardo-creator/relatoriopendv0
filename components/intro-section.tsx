"use client"

import { AlertTriangle, Upload, FileJson } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface IntroSectionProps {
  onFilesUpload: (files: FileList) => void
  onJsonUpload: (file: File) => void
  isProcessing: boolean
}

export function IntroSection({ onFilesUpload, onJsonUpload, isProcessing }: IntroSectionProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-neutral">
          <CardHeader>
            <CardTitle className="text-2xl text-dark">Começar</CardTitle>
            <CardDescription>Carregue suas imagens ou importe um arquivo JSON existente</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isProcessing}
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.multiple = true
                input.accept = "image/*"
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files
                  if (files) onFilesUpload(files)
                }
                input.click()
              }}
            >
              <Upload className="mr-2 h-5 w-5" />
              Carregar Imagens
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10"
              disabled={isProcessing}
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = ".json"
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) onJsonUpload(file)
                }
                input.click()
              }}
            >
              <FileJson className="mr-2 h-5 w-5" />
              Importar JSON
            </Button>
          </CardContent>
        </Card>

        <Alert className="border-accent bg-accent/10">
          <AlertTriangle className="h-5 w-5 text-accent" />
          <AlertTitle className="text-dark">Dicas Importantes</AlertTitle>
          <AlertDescription className="text-dark/80 space-y-2">
            <p>
              • Para manter os dados de localização, <strong>zipe as fotos no celular</strong> antes de transferir para
              o computador
            </p>
            <p>• Evite baixar imagens do WhatsApp - elas perdem os metadados de GPS</p>
            <p>• Use a câmera do celular com localização ativada para melhores resultados</p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
