import html from '../utils/html.js'
import markdown from '../utils/markdown.js'
import Duration from './duration.js'
import Link from './link.js'

const formatRoles = (arr,locale) => Intl.ListFormat
  ? new Intl.ListFormat(locale?.countryCode || 'en').format(arr)
  : arr.join(', ')

export default function Projects(resume = {}) {
  const projects = resume.projects
  return (projects?.length || 0) > 0 && html`
    <section id="projects">
      <h3>Projects</h3>
      <div class="stack">
      ${projects.map(({ description, entity, highlights = [], name, startDate, endDate, roles = [], url }) => html`
        <article>
          <header>
            <h4>${Link(url, name)}</h4>
            <div class="meta">
              <div>
                ${roles.length > 0 && html`<strong>${formatRoles(roles,resume.locale)}</strong>`}
                ${entity && html`at <strong>${entity}</strong>`}
              </div>
              <div>${Duration(startDate, endDate)}</div>
            </div>
          </header>
          ${description && markdown(description)}
          ${highlights.length > 0 && html`
            <ul>
              ${highlights.map(highlight => html`<li>${markdown(highlight)}</li>`)}
            </ul>
          `}
        </article>
      `)}
      </div>
    </section>
  `
}
