interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'navy' | 'yellow' | 'blue' | 'red' | 'gray'
  size?: 'sm' | 'md'
  className?: string
}

const variants = {
  green: 'bg-emerald-100 text-emerald-800',
  navy: 'bg-slate-100 text-slate-800',
  yellow: 'bg-amber-100 text-amber-800',
  blue: 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-700',
}

const sizes = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
}

export default function Badge({
  children,
  variant = 'green',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  )
}
