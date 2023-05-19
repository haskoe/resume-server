import html from '../utils/html.js'
import Date from './date.js'

export default function Duration(startDate, endDate, locale) {
  return html`${Date(startDate, locale)} – ${endDate ? Date(endDate, locale) : locale.present}`
}
