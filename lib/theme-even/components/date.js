import html from '../utils/html.js'

const formatDate = (dateString, locale) =>
  new Date(dateString).toLocaleDateString(locale?.countryCode || 'en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

export default function Duration(date, locale) {
  return html`<time datetime="${date}">${formatDate(date, locale)}</time>`
}
