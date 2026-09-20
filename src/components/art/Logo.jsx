import logoUrl from '../../assets/logo-22constanzaa.png'

// The official client-supplied 22 Constanzaa logo.
// Used exactly as supplied — never redrawn, restyled or forced into
// the claymorphism language. `plaque` places it on a small ivory chip
// for dark surfaces so the maroon script stays readable.
export function Logo({ className = 'h-11 w-auto', plaque = false, alt = '22 Constanzaa' }) {
  const img = (
    <img
      src={logoUrl}
      alt={alt}
      width={280}
      height={97}
      draggable="false"
      decoding="async"
      fetchPriority="high"
      className={`w-auto select-none ${className}`}
    />
  )
  if (!plaque) return img
  return (
    <span className="inline-flex items-center justify-center rounded-2xl bg-ivory px-3.5 py-2.5 shadow-clay-sm">
      {img}
    </span>
  )
}
