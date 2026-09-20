// ============================================================
// 22 CONSTANZAA — central restaurant configuration
// Single source of truth for brand, contact, links, booking.
// ⚠ Fields marked VERIFY need client confirmation before launch.
// ============================================================

const MAPS_QUERY = encodeURIComponent(
  '22 Constanzaa, 1, First Floor, Janaki Avenue, Abhiramapuram 4th Street, Alwarpet, Chennai, Tamil Nadu 600018'
)

export const restaurant = {
  name: '22 Constanzaa',
  shortName: '22C',
  tagline: 'A table set for curious palates.',
  description:
    'Mediterranean and Middle Eastern flavours, served in the heart of Chennai.',
  locality: 'Alwarpet · Abhiramapuram, Chennai',

  address: {
    line1: '1, First Floor, Janaki Avenue',
    line2: 'Abhiramapuram 4th Street, Alwarpet',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600018',
  },

  phone: {
    display: '+91 73057 54522',
    tel: '+917305754522',
    whatsapp: '917305754522',
  },

  links: {
    // CLIENT-CONFIRMED official Instagram account
    instagram: 'https://www.instagram.com/22constanzaa.chennai/',
    // Built from the confirmed address — reliable without needing the exact Maps short link.
    // VERIFY: client may prefer their Google Business Profile link instead.
    maps: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
  },

  // VERIFY: opening hours — hidden across the site until confirmed
  hours: null,

  // VERIFY: shown only when confirmed
  parking: null,
  wifi: null,

  // VERIFY: final production domain (used for canonical + share links)
  siteUrl: 'https://22constanzaa.in',

  booking: {
    maxGuests: 12,
    occasions: [
      'Just dining',
      'Birthday',
      'Anniversary',
      'Date night',
      'Family gathering',
      'Business dinner',
    ],
    // Preferred-time options — a request, not a confirmed slot grid
    times: [
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
      '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
    ],
  },
}

export const fullAddress = `${restaurant.address.line1}, ${restaurant.address.line2}, ${restaurant.address.city}, ${restaurant.address.state} ${restaurant.address.postalCode}`

export const social = {
  instagramHandle: '@22constanzaa.chennai',
  tagline: 'Seen at 22C',
}

// WhatsApp deep link with a pre-filled message
export function whatsappUrl(message) {
  return `https://wa.me/${restaurant.phone.whatsapp}?text=${encodeURIComponent(message)}`
}

// Prefilled table-request message — the editable template used in Build Your Table
export function bookingMessage({ guests, date, time, name, phone, occasion }) {
  return [
    'Hello 22 Constanzaa,',
    'I would like to request a table.',
    '',
    `Guests: ${guests}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    occasion ? `Occasion: ${occasion}` : null,
    '',
    'Please confirm availability.',
  ]
    .filter((line) => line !== null)
    .join('\n')
}
