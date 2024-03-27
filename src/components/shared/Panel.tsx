import { cn } from "@/lib/utils"

interface PanelProps {
  children: React.ReactNode
  className?: string
}

const Panel = ({ children, className }: PanelProps) => (
  <div
    className={cn(
      "p-6 border border-cyan-900/60 bg-slate-400/5 rounded-xl",
      className
    )}
  >
    {children}
  </div>
)

export default Panel
