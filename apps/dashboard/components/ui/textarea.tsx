"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-[10px] border px-3 py-2 text-sm",
          "border-[#d1d1d1] bg-white dark:border-[#313131] dark:bg-zinc-950",
          "placeholder:text-[#999999] dark:placeholder:text-[#999999]",
          "text-black dark:text-white",
          "outline-none transition-[border-color]",
          "focus:border-gray-400 dark:focus:border-white/10",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
