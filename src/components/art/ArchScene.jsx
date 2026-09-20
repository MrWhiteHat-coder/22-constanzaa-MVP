// Original brand illustration — "the table of 22" seen through a Mediterranean arch.
// Stands in for the hero photograph until the restaurant's approved photography arrives.
export function ArchScene({ className = '' }) {
  return (
    <svg
      viewBox="0 0 640 800"
      className={className}
      role="img"
      aria-label="Illustration of a warm dining table set inside a Mediterranean arch window with evening light and greenery"
    >
      <defs>
        <linearGradient id="as-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4EBDC" />
          <stop offset="1" stopColor="#EADFC9" />
        </linearGradient>
        <linearGradient id="as-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D4825D" />
          <stop offset="0.55" stopColor="#C4653C" />
          <stop offset="1" stopColor="#A94E2C" />
        </linearGradient>
        <linearGradient id="as-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3A184" />
          <stop offset="0.6" stopColor="#C4653C" />
          <stop offset="1" stopColor="#8C3D22" />
        </linearGradient>
        <radialGradient id="as-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F5D9A0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F5D9A0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="as-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#E9C87F" />
          <stop offset="0.75" stopColor="#D9B968" />
          <stop offset="1" stopColor="#D9B968" stopOpacity="0.85" />
        </radialGradient>
      </defs>

      <rect width="640" height="800" fill="url(#as-sky)" />

      {/* sun with halo rings */}
      <circle cx="478" cy="148" r="104" fill="#D9B968" opacity="0.14" />
      <circle cx="478" cy="148" r="80" fill="#D9B968" opacity="0.18" />
      <circle cx="478" cy="148" r="54" fill="url(#as-sun)" />

      {/* birds */}
      <path d="M150 120 q10 -12 20 0 q10 -12 20 0" fill="none" stroke="#8C3D22" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M210 88 q8 -10 16 0 q8 -10 16 0" fill="none" stroke="#8C3D22" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />

      {/* arch frame */}
      <path d="M64 800 V336 a256 256 0 0 1 512 0 V800 Z" fill="url(#as-arch)" />
      {/* inner arch */}
      <path d="M96 800 V348 a224 224 0 0 1 448 0 V800 Z" fill="url(#as-inner)" />

      {/* far doorway */}
      <path d="M262 800 V430 a58 58 0 0 1 116 0 V800 Z" fill="#8C3D22" opacity="0.5" />
      <path d="M274 800 V436 a46 46 0 0 1 92 0 V800 Z" fill="#6F2F18" opacity="0.55" />

      {/* floor */}
      <path d="M96 690 H544 V800 H96 Z" fill="#5E2712" opacity="0.55" />
      <path d="M96 690 H544" stroke="#4A1F0E" strokeWidth="3" opacity="0.4" />

      {/* greenery left */}
      <g opacity="0.92">
        <ellipse cx="140" cy="560" rx="58" ry="86" fill="#6F7048" />
        <ellipse cx="112" cy="628" rx="46" ry="60" fill="#8A8A5A" />
        <ellipse cx="168" cy="500" rx="38" ry="52" fill="#8A8A5A" />
        <ellipse cx="196" cy="640" rx="42" ry="48" fill="#58593A" opacity="0.85" />
      </g>

      {/* greenery right */}
      <g opacity="0.9">
        <ellipse cx="508" cy="590" rx="48" ry="70" fill="#6F7048" />
        <ellipse cx="536" cy="650" rx="38" ry="46" fill="#8A8A5A" />
        <ellipse cx="492" cy="528" rx="30" ry="40" fill="#8A8A5A" />
      </g>

      {/* chairs — burnt orange upholstery */}
      <g>
        <rect x="150" y="472" width="76" height="128" rx="26" fill="#B54B22" />
        <rect x="162" y="486" width="52" height="100" rx="20" fill="#C2542B" />
        <rect x="150" y="586" width="76" height="20" rx="9" fill="#8C3D22" />
      </g>
      <g>
        <rect x="414" y="472" width="76" height="128" rx="26" fill="#B54B22" />
        <rect x="426" y="486" width="52" height="100" rx="20" fill="#C2542B" />
        <rect x="414" y="586" width="76" height="20" rx="9" fill="#8C3D22" />
      </g>

      {/* pendant lamp */}
      <line x1="320" y1="200" x2="320" y2="322" stroke="#4A2A16" strokeWidth="3" />
      <circle cx="320" cy="352" r="64" fill="url(#as-glow)" />
      <path d="M290 336 a30 30 0 0 1 60 0 l-8 14 h-44 Z" fill="#B98A33" />
      <circle cx="320" cy="356" r="7" fill="#F5D9A0" />

      {/* table */}
      <ellipse cx="320" cy="686" rx="152" ry="28" fill="#6B3A1D" />
      <ellipse cx="320" cy="678" rx="152" ry="26" fill="#8A4B26" />
      <rect x="296" y="690" width="48" height="86" fill="#5E2712" />
      <ellipse cx="320" cy="786" rx="88" ry="12" fill="#4A1F0E" opacity="0.6" />

      {/* table setting */}
      <ellipse cx="268" cy="676" rx="42" ry="11" fill="#FBF7EF" />
      <ellipse cx="268" cy="673" rx="30" ry="7" fill="#EADFC9" />
      <ellipse cx="374" cy="676" rx="34" ry="9" fill="#FBF7EF" />
      <ellipse cx="374" cy="673" rx="23" ry="6" fill="#EADFC9" />
      {/* carafe */}
      <rect x="312" y="636" width="18" height="34" rx="6" fill="#C2542B" opacity="0.9" />
      <rect x="317" y="624" width="8" height="16" rx="3" fill="#C2542B" opacity="0.9" />
      {/* glasses */}
      <rect x="344" y="646" width="12" height="24" rx="4" fill="#F4EBDC" opacity="0.9" />
      <rect x="292" y="650" width="11" height="20" rx="4" fill="#F4EBDC" opacity="0.85" />

      {/* brass details */}
      <circle cx="94" cy="262" r="5" fill="#B98A33" opacity="0.8" />
      <circle cx="556" cy="306" r="4" fill="#B98A33" opacity="0.7" />
      <circle cx="586" cy="180" r="3" fill="#B98A33" opacity="0.6" />
    </svg>
  )
}
