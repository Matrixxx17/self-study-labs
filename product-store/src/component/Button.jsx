
import { Loader2 } from "lucide-react"

const variantClasses = {
  primary: "bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
}

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  children,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {children}
    </button>
  )
}