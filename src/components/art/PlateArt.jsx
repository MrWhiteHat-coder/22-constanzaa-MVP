// Parametric dish illustrations — a ceramic plate motif per category.
// Used until approved food photography is supplied; keeps cards cohesive
// and intentional rather than showing broken images.

const MOTIFS = {
  wrap: {
    bg: ['#F0C8B0', '#E3A184'],
    draw: (
      <g>
        <g transform="rotate(-18 160 160)">
          {/* rolled wrap body */}
          <rect x="62" y="130" width="182" height="58" rx="29" fill="#E5B366" />
          <rect x="62" y="130" width="182" height="58" rx="29" fill="url(#pa-toast)" />
          {/* char marks */}
          <path d="M118 138 v42 M146 134 v50 M174 134 v50 M202 138 v42" stroke="#7A4A1F" strokeWidth="4.5" strokeLinecap="round" opacity="0.5" />
          {/* spiral end — rolled flatbread cross-section */}
          <circle cx="224" cy="159" r="27" fill="#D89A4E" />
          <path d="M224 138 a21 21 0 0 1 0 42 a15 15 0 0 1 0 -30 a9 9 0 0 1 0 18" fill="none" stroke="#B47A35" strokeWidth="4" strokeLinecap="round" />
          {/* paper wrap around the lower half */}
          <path d="M84 152 h96 v22 a14 14 0 0 1 -14 14 h-68 a14 14 0 0 1 -14 -14 Z" fill="#FBF7EF" />
          <path d="M84 152 h96 v8 h-96 Z" fill="#EFE5D2" />
        </g>
        <path d="M118 92 q6 -12 0 -22 M142 96 q6 -12 0 -22" stroke="#B98A33" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
    ),
  },
  bowl: {
    bg: ['#EADFC9', '#DCC9AC'],
    draw: (
      <g>
        <ellipse cx="160" cy="166" rx="88" ry="26" fill="#FBF7EF" />
        <path d="M72 160 a88 60 0 0 0 176 0 Z" fill="#35251B" />
        <ellipse cx="160" cy="160" rx="72" ry="20" fill="#F4EBDC" />
        <path d="M118 160 q42 -18 84 0 q-42 12 -84 0" fill="none" stroke="#D9B968" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
        <circle cx="138" cy="152" r="3.5" fill="#C4653C" />
        <circle cx="168" cy="150" r="3" fill="#8A8A5A" />
        <circle cx="192" cy="156" r="3" fill="#C4653C" />
        <path d="M96 226 h128" stroke="#B98A33" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </g>
    ),
  },
  skewer: {
    bg: ['#F0C8B0', '#E9DCC5'],
    draw: (
      <g>
        <line x1="52" y1="160" x2="268" y2="160" stroke="#8C3D22" strokeWidth="5" strokeLinecap="round" />
        <circle cx="268" cy="160" r="6" fill="#8C3D22" />
        <rect x="76" y="136" width="42" height="42" rx="12" fill="#C4653C" />
        <rect x="126" y="138" width="40" height="40" rx="12" fill="#6B3A1D" />
        <rect x="174" y="136" width="42" height="42" rx="12" fill="#D4825D" />
        <rect x="222" y="139" width="34" height="38" rx="11" fill="#8A4B26" />
        <path d="M84 144 h26 M134 146 h24 M182 144 h26" stroke="#5E2712" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="120" cy="106" r="3" fill="#B98A33" />
        <circle cx="206" cy="220" r="3.5" fill="#B98A33" opacity="0.8" />
      </g>
    ),
  },
  fried: {
    bg: ['#EADFC9', '#E3CFA8'],
    draw: (
      <g>
        <path d="M118 108 l52 14 -38 40 Z" fill="#D9A24A" />
        <path d="M180 118 l50 20 -44 30 Z" fill="#C98A3B" />
        <path d="M132 168 l46 8 -30 38 Z" fill="#E0B05C" />
        <path d="M126 116 l38 10 M188 128 l34 14 M140 176 l30 6" stroke="#8C5A1F" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="242" cy="216" r="18" fill="#8C3D22" />
        <circle cx="242" cy="216" r="10" fill="#C4653C" />
        <circle cx="96" cy="222" r="3" fill="#B98A33" />
        <circle cx="116" cy="236" r="2.5" fill="#B98A33" opacity="0.7" />
      </g>
    ),
  },
  falafel: {
    bg: ['#E3E3C4', '#D9D9B8'],
    draw: (
      <g>
        <circle cx="132" cy="140" r="34" fill="#8A5A2B" />
        <circle cx="192" cy="136" r="30" fill="#7A4E24" />
        <circle cx="160" cy="196" r="32" fill="#8A5A2B" />
        <circle cx="204" cy="188" r="24" fill="#7A4E24" />
        <circle cx="140" cy="132" r="4" fill="#6F7048" />
        <circle cx="152" cy="150" r="3.5" fill="#8A8A5A" />
        <circle cx="188" cy="130" r="3.5" fill="#6F7048" />
        <circle cx="166" cy="192" r="4" fill="#8A8A5A" />
        <circle cx="200" cy="196" r="3" fill="#6F7048" />
        <path d="M104 236 h120" stroke="#B98A33" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      </g>
    ),
  },
  seafood: {
    bg: ['#F0D9C0', '#E9C9A4'],
    draw: (
      <g>
        <path d="M104 160 q40 -52 92 -30 q36 16 40 30 q-4 14 -40 30 q-52 22 -92 -30 Z" fill="#D4694F" />
        <path d="M236 160 l28 -20 -6 20 6 20 Z" fill="#B54B32" />
        <circle cx="132" cy="152" r="5" fill="#35251B" />
        <path d="M150 176 q14 8 28 0 M160 142 q12 -6 24 0" stroke="#B54B32" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="212" cy="196" r="14" fill="#E9C87F" />
        <path d="M204 196 h16 M212 188 v16" stroke="#C99B45" strokeWidth="2.5" />
        <circle cx="116" cy="212" r="3" fill="#B98A33" />
      </g>
    ),
  },
  prawns: {
    bg: ['#F4D9B8', '#EDC394'],
    draw: (
      <g>
        <path d="M110 190 q-18 -44 24 -62 q34 -14 52 12 q-30 2 -38 22 q24 -8 36 6 q-10 22 -38 20 q-26 -2 -36 2 Z" fill="#D4694F" />
        <path d="M118 176 q-16 14 -12 30 l14 -10" fill="#B54B32" />
        <path d="M214 178 q18 -40 -20 -58 q-32 -14 -50 10 q28 4 36 22 q-22 -6 -34 6 q10 22 36 18 q24 -2 32 2 Z" fill="#C2542B" />
        <path d="M206 166 q16 12 14 30 l-14 -12" fill="#9C3D26" />
        <g stroke="#B4531F" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.65">
          <path d="M96 224 q10 -8 20 0 q10 8 20 0 q10 -8 20 0 q10 8 20 0 q10 -8 20 0 q10 8 20 0" />
        </g>
      </g>
    ),
  },
  knafeh: {
    bg: ['#F0C89C', '#E9AE72'],
    draw: (accent = '#B4531F') => (
      <g>
        <circle cx="160" cy="160" r="64" fill="#E08040" />
        <g stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M116 144 q22 -14 44 -8 M128 176 q20 10 42 4 M158 116 q18 8 26 24 M124 128 q16 -8 30 -4" />
        </g>
        <path d="M120 132 l80 56 M120 188 l80 -56" stroke="#F5D9A0" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
        <circle cx="150" cy="128" r="4" fill="#8A8A5A" />
        <circle cx="186" cy="146" r="4" fill="#6F7048" />
        <circle cx="146" cy="196" r="4" fill="#8A8A5A" />
        <circle cx="196" cy="186" r="3.5" fill="#6F7048" />
      </g>
    ),
  },
  baklava: {
    bg: ['#F0DCB0', '#E9CC8E'],
    draw: (
      <g>
        <path d="M160 96 l74 64 -74 64 -74 -64 Z" fill="#D9A24A" />
        <path d="M160 118 l52 42 -52 44 -52 -44 Z" fill="#C98A3B" />
        <path d="M160 140 l32 24 -32 26 -32 -26 Z" fill="#B98A33" />
        <path d="M160 96 v128 M86 160 h148" stroke="#8C5A1F" strokeWidth="3" opacity="0.35" />
        <circle cx="112" cy="230" r="4" fill="#F5D9A0" />
        <circle cx="216" cy="228" r="3.5" fill="#F5D9A0" />
        <circle cx="160" cy="244" r="4" fill="#F5D9A0" />
      </g>
    ),
  },
  cone: {
    bg: ['#E9DCC5', '#DCC9AC'],
    draw: (
      <g>
        <path d="M124 150 h72 l-36 100 Z" fill="#C98A4B" />
        <path d="M128 158 l60 0 M132 176 l52 0 M138 196 l40 0 M146 216 l24 0" stroke="#8C5A1F" strokeWidth="2.5" opacity="0.5" />
        <circle cx="160" cy="120" r="38" fill="#F4EBDC" />
        <circle cx="146" cy="108" r="6" fill="#E08040" opacity="0.9" />
        <circle cx="172" cy="112" r="5" fill="#C4653C" opacity="0.9" />
        <circle cx="160" cy="130" r="5" fill="#D9B968" opacity="0.9" />
        <path d="M136 96 q24 -14 48 0" stroke="#8C3D22" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4" />
      </g>
    ),
  },
  bowlBig: {
    bg: ['#EADFC9', '#DCC9AC'],
    draw: (
      <g>
        <path d="M64 150 a96 96 0 0 0 192 0 Z" fill="#8A4B26" />
        <ellipse cx="160" cy="150" rx="96" ry="22" fill="#6B3A1D" />
        <rect x="112" y="130" width="34" height="22" rx="9" fill="#C4653C" />
        <rect x="156" y="124" width="32" height="24" rx="9" fill="#D4825D" />
        <rect x="196" y="132" width="30" height="20" rx="8" fill="#B54B22" />
        <circle cx="140" cy="122" r="5" fill="#8A8A5A" />
        <circle cx="178" cy="118" r="5" fill="#6F7048" />
        <circle cx="208" cy="124" r="4" fill="#8A8A5A" />
        <path d="M128 96 q6 -14 0 -26 M168 92 q6 -14 0 -26 M204 98 q6 -14 0 -26" stroke="#B98A33" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
    ),
  },
}

// map dishes without bespoke art to nearest motif
const ALIAS = {
  dips: 'bowl',
}

export function PlateArt({ variant = 'bowl', className = '', label = 'Illustrated dish' }) {
  const key = MOTIFS[variant] ? variant : ALIAS[variant] || 'bowl'
  const motif = MOTIFS[key]
  const [bg1, bg2] = motif.bg
  const draw = typeof motif.draw === 'function' ? motif.draw() : motif.draw
  const id = `pa-${variant}`
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label={label}>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.42" r="0.75">
          <stop offset="0" stopColor={bg1} />
          <stop offset="1" stopColor={bg2} />
        </radialGradient>
        <linearGradient id="pa-toast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0C480" stopOpacity="0.75" />
          <stop offset="1" stopColor="#C98A3B" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="320" height="320" rx="0" fill={`url(#${id})`} />
      {/* plate */}
      <circle cx="160" cy="160" r="112" fill="#FBF7EF" />
      <circle cx="160" cy="160" r="112" fill="none" stroke="#DCC9AC" strokeWidth="2" />
      <circle cx="160" cy="160" r="98" fill="none" stroke="#EADFC9" strokeWidth="10" />
      <circle cx="160" cy="160" r="88" fill="#FFFDF8" />
      {draw}
      {/* brass glint */}
      <circle cx="242" cy="86" r="5" fill="#B98A33" opacity="0.65" />
    </svg>
  )
}

// category → motif mapping
export const categoryMotif = {
  shawarma: 'wrap',
  mezze: 'bowl',
  'small-plates': 'fried',
  mains: 'skewer',
  desserts: 'knafeh',
}
