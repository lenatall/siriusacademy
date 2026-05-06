import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-navy' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  className?: string
  fullWidth?: boolean
}

const variants = {
  primary:
    'bg-brand-green hover:bg-brand-green-dark text-white shadow-md hover:shadow-green-lg hover:-translate-y-0.5',
  secondary:
    'bg-brand-yellow hover:bg-brand-yellow-dark text-navy-900 shadow-md hover:shadow-yellow-lg hover:-translate-y-0.5',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-navy-900',
  'outline-navy':
    'border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white',
  ghost: 'text-navy-800 hover:bg-gray-100',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ${
    fullWidth ? 'w-full' : ''
  } ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={base}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {content}
    </button>
  )
}
