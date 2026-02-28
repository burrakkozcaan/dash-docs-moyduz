import { cn } from "@/utils/cn";
import Link from "next/link";


type SeeMoreButtonProps = {
  href: string;
  label: string;
  suffix?: string;
  className?: string;
};

export function SeeMoreButton({
  href,
  label,
  suffix,
  className,
}: SeeMoreButtonProps) {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href={href}
        className={cn(
          "group relative inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none bg-ln-gray-900 text-ln-gray-0 shadow-ln-button-gray hover:bg-ln-gray-800 disabled:bg-ln-gray-25 disabled:text-ln-gray-450 disabled:shadow-none h-11 gap-3.5 rounded-[13px] px-[18px] text-ln-label-sm",
          className
        )}
      >
        <span className="flex items-center gap-1">
          <span>{label}</span>

          {suffix && (
            <>
              <span className="text-ln-paragraph-sm text-ln-gray-0/[.32]">-</span>
              <span className="text-ln-gray-0/[.72]">{suffix}</span>
            </>
          )}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="-mx-1.5 size-5 shrink-0 group-disabled:text-ln-gray-450 text-ln-gray-0/[.72]"
        >
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="1.25"
            d="M8.333 13.333 11.667 10 8.333 6.667"
          />
        </svg>
      </Link>
    </div>
  );
}
