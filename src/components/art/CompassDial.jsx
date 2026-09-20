import { motion } from 'motion/react'

export const CRAVINGS = [
  { id: 'smoky', label: 'Smoky', angle: 0 },
  { id: 'fresh', label: 'Fresh', angle: 60 },
  { id: 'spiced', label: 'Spiced', angle: 120 },
  { id: 'creamy', label: 'Creamy', angle: 180 },
  { id: 'crispy', label: 'Crispy', angle: 240 },
  { id: 'sweet', label: 'Sweet', angle: 300 },
]

const R = 150
const C = 190

function polar(angleDeg, radius) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) }
}

export function CompassDial({ craving, step, className = '' }) {
  const selected = CRAVINGS.find((c) => c.id === craving)
  const needleAngle = selected ? selected.angle : 0

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 380 380" className="w-full" role="img" aria-label={`Taste compass dial${craving ? `, pointing to ${craving}` : ''}`}>
        <defs>
          <radialGradient id="cd-face" cx="0.5" cy="0.45" r="0.65">
            <stop offset="0" stopColor="#FFFDF8" />
            <stop offset="1" stopColor="#F4EBDC" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={R} fill="url(#cd-face)" />
        <circle cx={C} cy={C} r={R} fill="none" stroke="#DCC9AC" strokeWidth="2" />
        <circle cx={C} cy={C} r={R - 14} fill="none" stroke="#EADFC9" strokeWidth="1.5" />

        {/* ticks */}
        {Array.from({ length: 36 }, (_, i) => {
          const a = i * 10
          const p1 = polar(a, R - 6)
          const p2 = polar(a, i % 3 === 0 ? R - 20 : R - 13)
          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#B98A33"
              strokeWidth={i % 3 === 0 ? 2.5 : 1}
              opacity={i % 3 === 0 ? 0.7 : 0.35}
              strokeLinecap="round"
            />
          )
        })}

        {/* craving labels */}
        {CRAVINGS.map((c) => {
          const p = polar(c.angle, R - 44)
          const active = craving === c.id
          return (
            <text
              key={c.id}
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize="13.5"
              fontWeight={active ? 800 : 700}
              letterSpacing="1.5"
              fill={active ? '#8C3D22' : '#5C4632'}
              opacity={active ? 1 : 0.55}
              style={{ textTransform: 'uppercase' }}
            >
              {c.label}
            </text>
          )
        })}

        {/* needle */}
        <motion.g
          style={{ originX: '190px', originY: '190px' }}
          animate={{ rotate: needleAngle }}
          transition={{ type: 'spring', stiffness: 60, damping: 13 }}
        >
          <path d="M190 74 L201 178 L190 196 L179 178 Z" fill="#C4653C" />
          <path d="M190 306 L197 214 L190 200 L183 214 Z" fill="#DCC9AC" />
        </motion.g>
        <circle cx={C} cy={C} r="13" fill="#B98A33" />
        <circle cx={C} cy={C} r="5.5" fill="#FFFDF8" />
      </svg>

      {/* step counter */}
      <div className="absolute inset-x-0 -bottom-1 flex justify-center">
        <span className="clay-inset flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-espresso-soft">
          Step {step} of 3
        </span>
      </div>
    </div>
  )
}
