import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 bg-slate-100 transition-all duration-300 focus:ring-2 focus:ring-violet-500 selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border md:px-6 md:py-2 px-4 py-1.5 md:text-lg shadow-xs  outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
        "",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />
  );
}

export { Input }
