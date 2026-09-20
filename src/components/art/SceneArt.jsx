// Ambience tiles — original illustrated scenes inspired by the restaurant's
// documented visual character (arches, terracotta, orange chairs, greenery,
// the 22C reception glow). Swappable for approved photography later.

const SCENES = {
  windows: (
    <svg viewBox="0 0 480 480" role="img" aria-label="Three arched windows with garden light">
      <defs>
        <linearGradient id="sa-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4EBDC" />
          <stop offset="1" stopColor="#E9C9A4" />
        </linearGradient>
      </defs>
      <rect width="480" height="480" fill="#FBF7EF" />
      {[60, 200, 340].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 430 V180 a60 60 0 0 1 120 0 V430 Z`} fill={i === 1 ? '#D4825D' : '#C4653C'} opacity={i === 1 ? 1 : 0.85} />
          <path d={`M${x + 12} 430 V186 a48 48 0 0 1 96 0 V430 Z`} fill="url(#sa-win)" />
          <line x1={x + 60} y1="140" x2={x + 60} y2="430" stroke="#8C3D22" strokeWidth="3" opacity="0.25" />
          <ellipse cx={x + 38} cy="400" rx="22" ry="34" fill="#8A8A5A" />
          <ellipse cx={x + 84} cy="412" rx="18" ry="26" fill="#6F7048" />
        </g>
      ))}
      <circle cx="428" cy="64" r="26" fill="#D9B968" opacity="0.9" />
    </svg>
  ),
  chairs: (
    <svg viewBox="0 0 480 480" role="img" aria-label="Orange upholstered dining chairs around a table">
      <rect width="480" height="480" fill="#F4EBDC" />
      <path d="M110 470 V240 a130 130 0 0 1 260 0 V470 Z" fill="#EADFC9" />
      <path d="M140 470 V248 a100 100 0 0 1 200 0 V470 Z" fill="#E3CFA8" />
      {/* table */}
      <ellipse cx="240" cy="342" rx="92" ry="18" fill="#8A4B26" />
      <rect x="228" y="342" width="24" height="92" fill="#6B3A1D" />
      <ellipse cx="240" cy="352" rx="30" ry="7" fill="#FBF7EF" />
      {/* chairs */}
      <g>
        <rect x="106" y="220" width="66" height="112" rx="24" fill="#B54B22" />
        <rect x="117" y="232" width="44" height="88" rx="18" fill="#C2542B" />
      </g>
      <g>
        <rect x="308" y="220" width="66" height="112" rx="24" fill="#B54B22" />
        <rect x="319" y="232" width="44" height="88" rx="18" fill="#C2542B" />
      </g>
      <ellipse cx="240" cy="446" rx="150" ry="14" fill="#DCC9AC" />
      <circle cx="86" cy="90" r="6" fill="#B98A33" />
      <circle cx="396" cy="110" r="5" fill="#B98A33" opacity="0.7" />
    </svg>
  ),
  glow: (
    <svg viewBox="0 0 480 480" role="img" aria-label="Warm pendant lamps glowing over evening tables">
      <rect width="480" height="480" fill="#2E1D12" />
      {[110, 240, 370].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2={140 + i * 26} stroke="#4A2A16" strokeWidth="3" />
          <circle cx={x} cy={190 + i * 26} r="58" fill="#F5D9A0" opacity="0.16" />
          <path d={`M${x - 26} ${172 + i * 26} a26 26 0 0 1 52 0 l-7 12 h-38 Z`} fill="#B98A33" />
          <circle cx={x} cy={192 + i * 26} r="6" fill="#F5D9A0" />
        </g>
      ))}
      <ellipse cx="150" cy="430" rx="86" ry="14" fill="#4A2A16" />
      <rect x="138" y="400" width="24" height="30" rx="4" fill="#C2542B" opacity="0.9" />
      <ellipse cx="330" cy="452" rx="86" ry="14" fill="#4A2A16" />
      <rect x="318" y="420" width="24" height="30" rx="4" fill="#C2542B" opacity="0.9" />
      <circle cx="60" cy="60" r="3" fill="#D9B968" opacity="0.7" />
      <circle cx="430" cy="52" r="3.5" fill="#D9B968" opacity="0.6" />
    </svg>
  ),
  mural: (
    <svg viewBox="0 0 480 480" role="img" aria-label="Mediterranean mural shapes in terracotta and olive">
      <rect width="480" height="480" fill="#F4EBDC" />
      <path d="M40 440 V200 a90 90 0 0 1 180 0 V440 Z" fill="none" stroke="#C4653C" strokeWidth="10" />
      <path d="M80 440 V208 a50 50 0 0 1 100 0 V440 Z" fill="#D4825D" opacity="0.85" />
      <circle cx="360" cy="130" r="46" fill="#B98A33" />
      <path d="M300 250 l50 90 50 -90 Z" fill="#6F7048" opacity="0.9" />
      <path d="M60 300 q40 -40 80 0 t80 0" stroke="#8A8A5A" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M280 400 q40 -40 80 0 t80 0" stroke="#C4653C" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.8" />
      <circle cx="360" cy="330" r="8" fill="#8C3D22" />
      <path d="M240 60 l14 28 30 4 -22 22 6 30 -28 -14 -28 14 6 -30 -22 -22 30 -4 Z" fill="#D9B968" opacity="0.9" />
    </svg>
  ),
  plates: (
    <svg viewBox="0 0 480 480" role="img" aria-label="Overhead view of ceramic plates and brass cutlery">
      <rect width="480" height="480" fill="#EADFC9" />
      <circle cx="180" cy="200" r="110" fill="#FBF7EF" />
      <circle cx="180" cy="200" r="84" fill="none" stroke="#E3CFA8" strokeWidth="8" />
      <circle cx="180" cy="200" r="52" fill="#F4EBDC" />
      <circle cx="322" cy="300" r="64" fill="#D4825D" />
      <circle cx="322" cy="300" r="46" fill="#FBF7EF" />
      <circle cx="322" cy="300" r="24" fill="#E3A184" />
      <g stroke="#B98A33" strokeWidth="5" strokeLinecap="round">
        <line x1="86" y1="330" x2="86" y2="420" />
        <line x1="108" y1="330" x2="108" y2="420" />
        <line x1="392" y1="140" x2="392" y2="230" />
      </g>
      <circle cx="330" cy="120" r="18" fill="#8A8A5A" opacity="0.85" />
      <circle cx="368" cy="94" r="10" fill="#6F7048" opacity="0.85" />
    </svg>
  ),
  greenery: (
    <svg viewBox="0 0 480 480" role="img" aria-label="Greenery spilling through an arched window">
      <rect width="480" height="480" fill="#FBF7EF" />
      <path d="M100 460 V210 a140 140 0 0 1 280 0 V460 Z" fill="#D4825D" />
      <path d="M124 460 V216 a116 116 0 0 1 232 0 V460 Z" fill="#F4EBDC" />
      <g>
        <ellipse cx="170" cy="330" rx="52" ry="76" fill="#6F7048" />
        <ellipse cx="240" cy="380" rx="60" ry="70" fill="#8A8A5A" />
        <ellipse cx="308" cy="330" rx="48" ry="70" fill="#58593A" />
        <ellipse cx="200" cy="260" rx="40" ry="52" fill="#8A8A5A" opacity="0.9" />
        <ellipse cx="286" cy="252" rx="36" ry="48" fill="#6F7048" opacity="0.9" />
        <ellipse cx="242" cy="200" rx="30" ry="38" fill="#8A8A5A" />
      </g>
      <circle cx="420" cy="70" r="22" fill="#D9B968" opacity="0.9" />
    </svg>
  ),
  reception: (
    <svg viewBox="0 0 480 480" role="img" aria-label="The illuminated 22C monogram at reception">
      <rect width="480" height="480" fill="#2E1D12" />
      <path d="M90 440 V190 a150 150 0 0 1 300 0 V440 Z" fill="none" stroke="#B98A33" strokeWidth="4" opacity="0.8" />
      <path d="M120 440 V200 a120 120 0 0 1 240 0 V440 Z" fill="#3B2415" />
      <text
        x="240"
        y="330"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="120"
        fill="#E9C87F"
        letterSpacing="4"
      >
        22C
      </text>
      <circle cx="240" cy="392" r="5" fill="#E9C87F" />
      <circle cx="240" cy="392" r="26" fill="#E9C87F" opacity="0.18" />
      <circle cx="80" cy="80" r="3" fill="#D9B968" opacity="0.6" />
      <circle cx="410" cy="96" r="3.5" fill="#D9B968" opacity="0.5" />
    </svg>
  ),
}

export function SceneArt({ scene = 'windows', className = '' }) {
  return <div className={className}>{SCENES[scene] || SCENES.windows}</div>
}
