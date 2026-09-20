import { useId } from 'react'

// Passport-style stamp — decorative motif for "The Table of 22".
export function Stamp({ text = 'TABLE OF 22', sub = 'CHENNAI', color = '#C4653C', className = '', rotate = 0 }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" style={{ transform: `rotate(${rotate}deg)` }}>
      <defs>
        <path id={id} d="M80 22 a58 58 0 1 1 -0.01 0" fill="none" />
      </defs>
      <circle cx="80" cy="80" r="76" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="4 5" opacity="0.9" />
      <circle cx="80" cy="80" r="40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <text fontSize="13.5" fontWeight="800" letterSpacing="3.2" fill={color} fontFamily="Manrope, sans-serif">
        <textPath href={`#${id}`} startOffset="2%">
          {text}
        </textPath>
      </text>
      <text x="80" y="88" textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="2.5" fill={color} fontFamily="Manrope, sans-serif">
        {sub}
      </text>
    </svg>
  )
}
