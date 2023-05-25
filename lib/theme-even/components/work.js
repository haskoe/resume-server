import html from '../utils/html.js'
import markdown from '../utils/markdown.js'
import Duration from './duration.js'
import Link from './link.js'

export default function Work(resume = {}) {
  const work = resume.resumeJson.work
  return work.length > 0 && html`
    <section id="work">
      <h3>${resume.locale.work}</h3>
      <div class="stack">
        ${work.map(({ description, highlights = [], location, name, position, startDate, endDate, summary, url }) => html`
          <article>
            <header>
              <h4>${position}</h4>
              <div class="meta">
                <div>
                  <strong>${Link(url, name)}</strong>
                  ${description && html`<span class="bullet-item">${description}</span>`}
                </div>
                <div>${Duration(startDate, endDate, resume.locale)}</div>
                ${location && html`<div>${location}</div>`}
              </div>
            </header>
            ${summary && markdown(summary)}
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
