// ============================================================
// BRAND ASSET PIPELINE — 22 Constanzaa logo
// Processes the client-supplied logo WITHOUT redrawing it:
//  1. src/assets/logo-22constanzaa.png — full logo, background
//     removed via border flood-fill (interior cream areas inside
//     the lettering are preserved), soft feathered edge.
//  2. public/favicon.png (64) + public/apple-touch-icon.png (180)
//     — square crop of the oval "22" portion, original artwork intact.
//  3. public/og.png — 1200x630 social banner using the real logo.
// Run: npm run assets
// ============================================================
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC =
  process.env.LOGO_SRC ||
  'C:/Users/balaj/AppData/Local/Temp/freebuff-desktop-pastes/paste-1789910651546-4608.png'

const IVORY = '#FBF7EF'
const T = 34 // background colour tolerance (euclidean RGB)

// keep the untouched client file in the repo as the source of truth
copyFileSync(SRC, resolve(ROOT, 'brand/logo-original.png'))
mkdirSync(resolve(ROOT, 'src/assets'), { recursive: true })
mkdirSync(resolve(ROOT, 'public'), { recursive: true })

// ---------- shared: border flood-fill background removal ----------
async function removeBackground(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: ch } = info
  const px = (x, y) => (y * w + x) * ch

  // background reference colour sampled from the top-left corner
  const br = data[0], bg = data[1], bb = data[2]
  const dist = (i) => {
    const dr = data[i] - br, dg = data[i + 1] - bg, db = data[i + 2] - bb
    return Math.sqrt(dr * dr + dg * dg + db * db)
  }

  const filled = new Uint8Array(w * h)
  const queue = []
  const pushIfBg = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const p = y * w + x
    if (!filled[p] && dist(p * ch) < T) {
      filled[p] = 1
      queue.push(p)
    }
  }
  for (let x = 0; x < w; x++) { pushIfBg(x, 0); pushIfBg(x, h - 1) }
  for (let y = 0; y < h; y++) { pushIfBg(0, y); pushIfBg(w - 1, y) }
  while (queue.length) {
    const p = queue.pop()
    const x = p % w, y = (p - x) / w
    pushIfBg(x + 1, y); pushIfBg(x - 1, y); pushIfBg(x, y + 1); pushIfBg(x, y - 1)
  }
  for (let p = 0; p < w * h; p++) if (filled[p]) data[p * ch + 3] = 0

  // feather: soften the cut edge for pixels just outside the tolerance
  const T2 = T * 1.7
  const soft = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x
      if (filled[p]) continue
      const isEdge =
        (x > 0 && filled[p - 1]) || (x < w - 1 && filled[p + 1]) ||
        (y > 0 && filled[p - w]) || (y < h - 1 && filled[p + w])
      if (isEdge) soft.push([p, Math.min(1, (dist(p * ch) - T) / (T2 - T))])
    }
  }
  for (const [p, a] of soft) data[p * ch + 3] = Math.round(a * 255)

  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png()
}

// ---------- 1. full transparent logo ----------
const trimmed = await sharp(SRC).trim({ threshold: 22 }).toBuffer()
const fullLogo = await removeBackground(trimmed)
const logoOut = resolve(ROOT, 'src/assets/logo-22constanzaa.png')
await fullLogo.png({ compressionLevel: 9 }).toFile(logoOut)
const meta = await sharp(logoOut).metadata()
console.log(`logo-22constanzaa.png  ${meta.width}x${meta.height}`)

// ---------- 2. square "22" crop for favicons ----------
// detect the maroon oval component in the left part of the image
{
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: ch } = info
  const isMaroon = (x, y) => {
    const i = (y * w + x) * ch
    const r = data[i], g = data[i + 1], b = data[i + 2]
    return r > 60 && r < 180 && g < 85 && b < 85
  }
  let seed = null
  outer: for (let x = 0; x < w * 0.45; x++)
    for (let y = 0; y < h; y++)
      if (isMaroon(x, y)) { seed = [x, y]; break outer }
  if (!seed) throw new Error('could not locate the 22 oval')
  const seen = new Uint8Array(w * h)
  const q = [seed]
  seen[seed[1] * w + seed[0]] = 1
  let x0 = seed[0], x1 = seed[0], y0 = seed[1], y1 = seed[1]
  while (q.length) {
    const [x, y] = q.pop()
    x0 = Math.min(x0, x); x1 = Math.max(x1, x)
    y0 = Math.min(y0, y); y1 = Math.max(y1, y)
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= w * 0.5 || ny >= h) continue
      const p = ny * w + nx
      if (!seen[p] && isMaroon(nx, ny)) { seen[p] = 1; q.push([nx, ny]) }
    }
  }
  // square crop around the oval, original artwork untouched
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1
  const side = Math.ceil(Math.max(bw, bh) * 1.16)
  const cx = x0 + bw / 2, cy = y0 + bh / 2
  const left = Math.max(0, Math.round(cx - side / 2))
  const top = Math.max(0, Math.round(cy - side / 2))
  const crop = await sharp(SRC)
    .extract({ left, top, width: Math.min(side, w - left), height: Math.min(side, h - top) })
    .toBuffer()
  const transparent = await removeBackground(crop)
  const png = await transparent.resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
  await sharp(png).resize(64, 64).png().toFile(resolve(ROOT, 'public/favicon.png'))
  await sharp(png).resize(180, 180).flatten({ background: IVORY }).png().toFile(resolve(ROOT, 'public/apple-touch-icon.png'))
  console.log(`favicon.png + apple-touch-icon.png  from 22-crop ${bw}x${bh} @ (${x0},${y0})`)
}

// ---------- 3. social banner og.png ----------
{
  const archSvg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="${IVORY}"/>
      <path d="M760 630 V300 a190 190 0 0 1 380 0 V630 Z" fill="#D4825D"/>
      <path d="M800 630 V306 a150 150 0 0 1 300 0 V630 Z" fill="#C4653C"/>
      <circle cx="950" cy="210" r="44" fill="#B98A33" opacity="0.9"/>
      <ellipse cx="950" cy="620" rx="150" ry="14" fill="#8C3D22" opacity="0.35"/>
      <circle cx="700" cy="110" r="6" fill="#B98A33"/>
      <circle cx="655" cy="170" r="4" fill="#C4653C"/>
    </svg>`)
  const logoWide = await sharp(logoOut)
    .resize({ width: 660 })
    .png()
    .toBuffer()
  const lm = await sharp(logoWide).metadata()
  await sharp(archSvg)
    .composite([{ input: logoWide, left: 90, top: Math.round(630 / 2 - lm.height / 2) }])
    .png()
    .toFile(resolve(ROOT, 'public/og.png'))
  console.log('og.png 1200x630')
}
console.log('brand assets ready')
