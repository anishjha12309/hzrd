"use client"

import { Check, X, AlertTriangle, Info, Loader2 } from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      className="toaster group"
      icons={{
        success: <Check className="w-4 h-4" />,
        info: <Info className="w-4 h-4" />,
        warning: <AlertTriangle className="w-4 h-4" />,
        error: <X className="w-4 h-4" />,
        loading: <Loader2 className="w-4 h-4 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group flex items-center gap-3 w-full p-4 bg-black text-white border border-black shadow-lg font-sans text-sm",
          title: "font-mono text-xs uppercase tracking-widest",
          description: "text-gray-400 text-xs mt-0.5",
          actionButton:
            "bg-white text-black px-3 py-1.5 font-mono text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors",
          cancelButton:
            "bg-transparent text-gray-400 px-2 py-1 font-mono text-xs uppercase hover:text-white transition-colors",
          closeButton:
            "bg-transparent text-gray-400 hover:text-white transition-colors p-1",
          success: "bg-black text-white border-black",
          error: "bg-black text-red-400 border-red-900",
          warning: "bg-black text-yellow-400 border-yellow-900",
          info: "bg-black text-white border-gray-800",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
