import { MapPin } from "lucide-react"

export function Header() {
  return (
    <header className="bg-dark text-light">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-accent" />
            <h1 className="text-2xl md:text-3xl font-bold">Gerenciador de Metadados</h1>
          </div>
          <div className="text-sm text-neutral">v2.0 Professional</div>
        </div>
      </div>
    </header>
  )
}
