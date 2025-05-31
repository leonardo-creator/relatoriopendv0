"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Upload, 
  FileJson, 
  FileText, 
  FileSpreadsheet, 
  Globe, 
  FileIcon,
  Smartphone,
  Monitor,
  Info,
  Camera,
  MapPin,
  Download,
  HelpCircle,
  ArrowLeft,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"

export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <HelpCircle className="h-8 w-8 text-blue-600" />
              Central de Ajuda
            </h1>
            <p className="text-gray-600 mt-2">
              Aprenda a usar o Gerenciador de Metadados de Imagem de forma simples e eficiente
            </p>
          </div>
        </div>

        {/* Alerta Importante sobre Mobile vs Desktop */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <AlertTitle className="text-orange-800">Importante: Diferenças entre Celular e Desktop</AlertTitle>
          <AlertDescription className="text-orange-700 mt-2">
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="flex items-start gap-2">
                <Smartphone className="h-5 w-5 mt-1 text-orange-600" />
                <div>
                  <strong>No Celular:</strong>
                  <p className="text-sm">Você pode exportar apenas em formato JSON. Use esse arquivo na versão desktop para gerar outros formatos.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Monitor className="h-5 w-5 mt-1 text-orange-600" />
                <div>
                  <strong>No Desktop:</strong>
                  <p className="text-sm">Todos os formatos estão disponíveis: PDF, Word, Excel, KML e JSON.</p>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Guia Rápido */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Guia Rápido de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Carregue as Imagens</h3>
                <p className="text-sm text-gray-600">Selecione uma ou várias fotos com dados GPS</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Visualize os Dados</h3>
                <p className="text-sm text-gray-600">Veja as informações GPS extraídas automaticamente</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Exporte os Resultados</h3>
                <p className="text-sm text-gray-600">Baixe em diferentes formatos conforme sua necessidade</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas Frequentes */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-600" />
              Perguntas Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  O que é este programa e para que serve?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 mb-3">
                    Este programa extrai automaticamente informações de localização (GPS) das suas fotos e organiza esses dados de forma útil. É ideal para:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Documentar locais visitados em viagens</li>
                    <li>Criar relatórios de trabalho de campo</li>
                    <li>Organizar fotos por localização</li>
                    <li>Gerar mapas com pontos fotografados</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Que tipos de arquivo posso carregar?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-gray-700">Você pode carregar:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-blue-600" />
                        <span><strong>Imagens:</strong> JPG, JPEG, PNG, HEIC</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileJson className="h-5 w-5 text-green-600" />
                        <span><strong>Dados salvos:</strong> Arquivos JSON</span>
                      </div>
                    </div>
                    <Alert className="border-blue-200 bg-blue-50">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700">
                        <strong>Importante:</strong> As fotos precisam ter informações GPS para funcionar. 
                        Certifique-se de que a localização estava ativada quando tirou as fotos.
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Por que algumas fotos não mostram localização?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 mb-3">Isso pode acontecer por alguns motivos:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>GPS desligado:</strong> A localização não estava ativada no celular</li>
                    <li><strong>Local sem sinal:</strong> Área sem cobertura GPS (túneis, prédios fechados)</li>
                    <li><strong>Foto editada:</strong> Alguns editores removem os dados GPS</li>
                    <li><strong>Câmera antiga:</strong> Equipamentos muito antigos podem não ter GPS</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Como ativar a localização no meu celular?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">📱 Android:</h4>
                      <ol className="list-decimal pl-6 space-y-1 text-gray-700">
                        <li>Abra as Configurações</li>
                        <li>Procure por "Localização" ou "GPS"</li>
                        <li>Ative a localização</li>
                        <li>No app da câmera, permita acesso à localização</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">🍎 iPhone:</h4>
                      <ol className="list-decimal pl-6 space-y-1 text-gray-700">
                        <li>Vá em Ajustes {'>'}  Privacidade e Segurança</li>
                        <li>Toque em "Serviços de Localização"</li>
                        <li>Ative os Serviços de Localização</li>
                        <li>Encontre "Câmera" e permita acesso</li>
                      </ol>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Qual a diferença entre os formatos de exportação?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <FileJson className="h-6 w-6 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-orange-800">JSON</h4>
                          <p className="text-sm text-gray-600">Formato técnico que preserva todos os dados. Use para transferir entre dispositivos.</p>
                          <Badge variant="outline" className="mt-1">Disponível no celular</Badge>
                        </div>
                      </div>
                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <FileIcon className="h-6 w-6 text-red-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-red-800">PDF</h4>
                          <p className="text-sm text-gray-600">Relatório visual com mapas e fotos. Ideal para apresentações e impressão.</p>
                          <Badge variant="secondary" className="mt-1">Apenas desktop</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Word</h4>
                          <p className="text-sm text-gray-600">Documento editável para relatórios detalhados e personalizáveis.</p>
                          <Badge variant="secondary" className="mt-1">Apenas desktop</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <FileSpreadsheet className="h-6 w-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-800">Excel</h4>
                          <p className="text-sm text-gray-600">Planilha para análises e cálculos com os dados de localização.</p>
                          <Badge variant="secondary" className="mt-1">Apenas desktop</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <Globe className="h-6 w-6 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-purple-800">KML</h4>
                          <p className="text-sm text-gray-600">Para abrir no Google Earth e ver as fotos no mapa 3D.</p>
                          <Badge variant="secondary" className="mt-1">Apenas desktop</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  Como usar o JSON no desktop?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Se você processou fotos no celular e quer gerar PDF ou Word no computador:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                      <li>No celular, exporte em JSON e salve o arquivo</li>
                      <li>Transfira o arquivo JSON para o computador</li>
                      <li>Abra o programa no computador</li>
                      <li>Clique em "Importar JSON" na tela inicial</li>
                      <li>Selecione o arquivo transferido</li>
                      <li>Agora você pode exportar em qualquer formato!</li>
                    </ol>
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        <strong>Dica:</strong> Você pode enviar o arquivo JSON por WhatsApp, email ou salvar na nuvem para facilitar a transferência.
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  Meus dados ficam seguros?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        <strong>Sim, seus dados são 100% seguros!</strong>
                      </AlertDescription>
                    </Alert>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Todo o processamento acontece no seu dispositivo</li>
                      <li>Nenhuma foto é enviada para servidores externos</li>
                      <li>Os dados GPS são extraídos localmente</li>
                      <li>Você tem controle total sobre o que fazer com os arquivos gerados</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  O que fazer se algo não funcionar?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-gray-700">Tente estas soluções:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Recarregue a página:</strong> Pressione F5 ou puxe para baixo no celular</li>
                      <li><strong>Verifique as fotos:</strong> Confirme se têm dados GPS</li>
                      <li><strong>Teste com menos fotos:</strong> Comece com 2-3 imagens</li>
                      <li><strong>Use outro navegador:</strong> Chrome, Firefox ou Safari</li>
                      <li><strong>Limpe o cache:</strong> Exclua dados temporários do navegador</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Dicas Avançadas */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-6 w-6 text-purple-600" />
              Dicas Avançadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">💡 Organização</AlertTitle>
                <AlertDescription className="text-blue-700 text-sm">
                  Nomeie suas fotos com data/hora antes de carregar para facilitar a identificação nos relatórios.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">🎯 Precisão</AlertTitle>
                <AlertDescription className="text-green-700 text-sm">
                  Para melhor precisão GPS, tire fotos ao ar livre com boa visibilidade do céu.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-purple-200 bg-purple-50">
                <Info className="h-4 w-4 text-purple-600" />
                <AlertTitle className="text-purple-800">🗂️ Backup</AlertTitle>
                <AlertDescription className="text-purple-700 text-sm">
                  Sempre exporte em JSON para ter um backup dos dados processados.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-800">⚡ Performance</AlertTitle>
                <AlertDescription className="text-orange-700 text-sm">
                  Processe até 50 fotos por vez para evitar lentidão no celular.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao Programa
            </Button>
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            Gerenciador de Metadados de Imagem - Versão 2025
          </p>
        </div>
      </div>
    </div>
  )
}
