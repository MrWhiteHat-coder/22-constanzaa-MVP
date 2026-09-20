import { Link } from 'react-router-dom'
import { Icon } from './Icon'

const VARIANTS = {
  primary:
    'bg-clay-500 text-ivory shadow-[0_14px_28px_-12px_rgb(140,61,34,0.55),inset_0_1.5px_0_rgb(255,255,255,0.35),inset_0_-3px_6px_rgb(0,0,0,0.12)] hover:bg-clay-600',
  secondary:
    'bg-ivory text-espresso shadow-[0_12px_26px_-14px_rgb(122,66,35,0.4),inset_0_1.5px_0_rgb(255,255,255,0.9),inset_0_-3px_6px_rgb(122,66,35,0.08)] hover:bg-cream',
  brass:
    'bg-brass text-espresso-deep shadow-[0_14px_28px_-12px_rgb(122,98,20,0.5),inset_0_1.5px_0_rgb(255,255,255,0.4)] hover:brightness-105',
  ghost: 'bg-transparent text-espresso-soft hover:text-clay-700 shadow-none',
  outline:
    'bg-transparent text-clay-700 border-[1.5px] border-clay-500/60 hover:bg-clay-500/10 shadow-none',
}

const SIZES = {
  sm: 'px-4 py-2 text-[0.82rem] gap-1.5 rounded-full',
  md: 'px-6 py-3 text-sm gap-2 rounded-full',
  lg: 'px-8 py-4 text-[0.95rem] gap-2.5 rounded-full',
}

function classes({ variant = 'primary', size = 'md', className = '' }) {
  return [
    'tactile inline-flex select-none items-center justify-center font-bold tracking-[0.02em] cursor-pointer',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')
}

export function Button({ variant, size, className, children, icon, iconSize = 18, ...props }) {
  return (
    <button type="button" className={classes({ variant, size, className })} {...props}>
      {children}
      {icon && <Icon name={icon} size={iconSize} />}
    </button>
  )
}

export function ButtonLink({ to, variant, size, className, children, icon, iconSize = 18, ...props }) {
  const isExternal = typeof to === 'string' && /^(https?:|tel:|mailto:)/.test(to)
  const cls = classes({ variant, size, className })
  if (isExternal) {
    return (
      <a
        href={to}
        target={to.startsWith('http') ? '_blank' : undefined}
        rel={to.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={cls}
        {...props}
      >
        {children}
        {icon && <Icon name={icon} size={iconSize} />}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} {...props}>
      {children}
      {icon && <Icon name={icon} size={iconSize} />}
    </Link>
  )
}
