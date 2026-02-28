import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface AppLogoIconProps {
  className?: string
  size?: number
}

export default function AppLogoIcon({
  className,
  size = 20,
}: AppLogoIconProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center  shadow-orange-600/30 justify-center rounded-md bg-[#FF4D00] p-1.5 shadow-md shadow-[#FF4D00]/30",
        className
      )}
    // >
    //   <Sparkles
    //     size={size}
    //     className="text-black"
    //   />
    >
    <Image src="/favicon.ico" alt="logo" width={size} height={size} />
    </div>
  )
}
