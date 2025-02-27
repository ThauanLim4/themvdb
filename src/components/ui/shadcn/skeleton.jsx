import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
  <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props}>
    <div className="w-full max-w-2/4 h-full min-h-36 bg-gray-300 mx-auto rounded-md">

    </div>
  </div>);
}

export { Skeleton }
