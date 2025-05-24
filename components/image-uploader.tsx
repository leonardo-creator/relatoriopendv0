"use client"

import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onFilesUpload: (files: FileList) => void
  isProcessing: boolean
  variant?: "default" | "secondary"
}

export function ImageUploader({ onFilesUpload, isProcessing, variant = "default" }: ImageUploaderProps) {
  const handleClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = "image/*"
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files) onFilesUpload(files)
    }
    input.click()
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isProcessing}
      variant={variant === "secondary" ? "outline" : "default"}
      className={variant === "secondary" ? "border-primary text-primary hover:bg-primary/10" : ""}
    >
      <Upload className="mr-2 h-4 w-4" />
      Adicionar Imagens
    </Button>
  )
}
