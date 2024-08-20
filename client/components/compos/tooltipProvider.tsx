
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface TooltipProps{
    children:React.ReactNode
    title:string
}

export default function ToolTipProvider({children,title}:TooltipProps) {
  return (
    <TooltipProvider delayDuration={1}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent sideOffset={3}>
         {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
