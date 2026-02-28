"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "group relative flex h-10 w-full items-center rounded-[10px]",
          "border border-zinc-950/10 bg-white hover:bg-zinc-950/5",
          "dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-white/5",
          "focus-within:border-zinc-950 dark:focus-within:border-white/60",
          className
        )}
      >
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center pl-4 pr-2",
              "text-muted-foreground/70",
              "group-focus-within:text-foreground"
            )}
          >
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          {...(props.value !== undefined && props.onChange
            ? { value: props.value ?? "", onChange: props.onChange }
            : {})}
          className={cn(
            "h-full w-full border-none bg-transparent outline-none",
            "text-sm leading-5 font-normal tracking-normal text-foreground",
            "placeholder:text-muted-foreground/60",
            "overflow-hidden rounded-[10px] text-ellipsis whitespace-nowrap",
            "[&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:dark:!bg-zinc-950",
            "[&:-webkit-autofill]:!shadow-[0_0_0_1000px_white_inset]",
            "[&:-webkit-autofill]:dark:!shadow-[0_0_0_1000px_var(--card)_inset]",
            "[&:-webkit-autofill]:![-webkit-text-fill-color:var(--foreground)]",
            icon ? "px-2" : "px-4"
          )}
          {...props}
        />
      </div>
    )
  }
)

CustomInput.displayName = "CustomInput"

export { CustomInput }
export default CustomInput
