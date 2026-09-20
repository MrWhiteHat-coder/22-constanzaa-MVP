import { restaurant, fullAddress } from '../data/restaurant'

export const telLink = `tel:${restaurant.phone.tel}`
export const instagramLink = restaurant.links.instagram
export const directionsLink = restaurant.links.maps
export const bookLink = '/book'
export const menuLink = '/menu'

// Dish deep links resolve to the menu with the dish opened in quick view
export function dishUrl(id) {
  return `${restaurant.siteUrl}/menu?dish=${id}`
}
