import { MapPin, HelpCircle, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

export function Header() {
  const isMobile = useMobile()

  return (
    <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MapPin className="h-8 w-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Gerenciador de Metadados</h1>
              <p className="text-sm text-blue-200 hidden md:block">Extraia dados GPS das suas fotos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Badge indicando o dispositivo */}
            <Badge 
              variant="secondary" 
              className={`${isMobile ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'} hidden sm:flex items-center gap-1`}
            >
              {isMobile ? (
                <>
                  <Smartphone className="h-3 w-3" />
                  Mobile
                </>
              ) : (
                <>
                  <Monitor className="h-3 w-3" />
                  Desktop
                </>
              )}
            </Badge>
            
            {/* Botão de ajuda */}
            <Link href="/ajuda">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Ajuda</span>
                <span className="sm:hidden">?</span>
              </Button>
            </Link>
            
            <div className="text-right">
              <div className="text-xs text-blue-200">v2025</div>
              <div className="text-xs text-blue-300 hidden md:block">Professional</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
