import { Suspense } from "react"
import ImageMetadataManager from "@/components/image-metadata-manager"
import { Loader2 } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <ImageMetadataManager />
        <Toaster />
      </Suspense>
    </main>
  )
}
