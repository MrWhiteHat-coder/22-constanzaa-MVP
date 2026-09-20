import { motion } from 'motion/react'
import { useId } from 'react'

export function Reveal({ children, delay = 0, className = '', as = 'div', ...rest }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Section({ id, className = '', containerClassName = '', children, label }) {
  return (
    <section id={id} aria-label={label} className={`relative ${className}`}>
      <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${containerClassName}`}>{children}</div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, copy, align = 'center', tone = 'dark', id }) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  const titleCls = tone === 'light' ? 'text-ivory' : 'text-espresso'
  const copyCls = tone === 'light' ? 'text-ivory/75' : 'text-espresso-soft'
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignCls}`}>
      {eyebrow && (
        <span className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="inline-block h-[3px] w-7 rounded-full bg-brass" aria-hidden="true" />
          {eyebrow}
          {align === 'center' && <span className="inline-block h-[3px] w-7 rounded-full bg-brass" aria-hidden="true" />}
        </span>
      )}
      <h2 id={id} className={`text-3xl sm:text-4xl lg:text-[2.9rem] ${titleCls}`}>
        {title}
      </h2>
      {copy && <p className={`max-w-xl text-[0.98rem] leading-relaxed ${copyCls}`}>{copy}</p>}
    </Reveal>
  )
}
