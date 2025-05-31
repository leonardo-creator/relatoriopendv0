"use client"

import { AlertTriangle, Upload, FileJson, HelpCircle, Smartphone, Monitor, Info, Camera, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

interface IntroSectionProps {
  onFilesUpload: (files: FileList) => void
  onJsonUpload: (file: File) => void
  isProcessing: boolean
}

export function IntroSection({ onFilesUpload, onJsonUpload, isProcessing }: IntroSectionProps) {
  const isMobile = useMobile()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Extraia Dados GPS das Suas Fotos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra automaticamente onde suas fotos foram tiradas e exporte os dados em diversos formatos úteis
          </p>
        </div>

        {/* Informações sobre dispositivo */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              {isMobile ? (
                <>
                  <Smartphone className="h-6 w-6 text-orange-600" />
                  <h3 className="font-semibold text-orange-800">Você está usando um celular</h3>
                </>
              ) : (
                <>
                  <Monitor className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Você está usando um desktop</h3>
                </>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <Badge variant={isMobile ? "default" : "secondary"} className="mb-2">
                  <Smartphone className="h-3 w-3 mr-1" />
                  Mobile
                </Badge>
                <p className={isMobile ? "text-orange-700 font-medium" : "text-gray-600"}>
                  Apenas exportação JSON disponível
                </p>
              </div>
              <div className="text-center">
                <Badge variant={!isMobile ? "default" : "secondary"} className="mb-2">
                  <Monitor className="h-3 w-3 mr-1" />
                  Desktop
                </Badge>
                <p className={!isMobile ? "text-blue-700 font-medium" : "text-gray-600"}>
                  Todos os formatos: PDF, Word, Excel, KML, JSON
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões principais */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Camera className="h-6 w-6 text-blue-600" />
              Começar Agora
            </CardTitle>
            <CardDescription>Escolha como você quer enviar suas fotos ou dados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
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
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6" />
                  <div>
                    <div>📸 Carregar Fotos</div>
                    <div className="text-xs opacity-90">JPG, PNG, HEIC</div>
                  </div>
                </div>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-16 border-2 border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold"
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
                <div className="flex flex-col items-center gap-2">
                  <FileJson className="h-6 w-6" />
                  <div>
                    <div>📄 Importar JSON</div>
                    <div className="text-xs opacity-90">Dados salvos</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="text-center">
              <Link href="/ajuda">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Precisa de ajuda? Clique aqui!
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Dicas importantes */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">💡 Dicas Importantes para Melhores Resultados</AlertTitle>
          <AlertDescription className="text-amber-700 space-y-2 mt-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-600" />
                <div>
                  <strong>GPS ativado:</strong> Certifique-se de que a localização estava ligada quando tirou as fotos
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Camera className="h-4 w-4 mt-0.5 text-amber-600" />
                <div>
                  <strong>Fotos originais:</strong> Use imagens direto da câmera, não do WhatsApp ou redes sociais
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Smartphone className="h-4 w-4 mt-0.5 text-amber-600" />
                <div>
                  <strong>Transferência:</strong> Zipe as fotos antes de enviar do celular para o computador
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-amber-600" />
                <div>
                  <strong>Processamento:</strong> Máximo de 50 fotos por vez no celular para melhor performance
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
