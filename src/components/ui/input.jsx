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
        "flex justify-between text-base rounded border outline-none md:px-4 md:py-2 px-3 py-2 w-full bg-slate-100",
        "",
        "",
        className
      )}
      {...props} />
  );
}

export { Input }
