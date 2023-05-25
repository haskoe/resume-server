import html from '../utils/html.js'
import markdown from '../utils/markdown.js'
import Duration from './duration.js'
import Link from './link.js'

export default function Education(resume = {}) {
  const education = resume.resumeJson.education
  return education.length > 0 && html`
    <section id="education">
      <h3>${resume.locale.education}</h3>
      <div class="stack">
        ${education.map(({ area, courses = [], institution, startDate, endDate, studyType, url }) => html`
          <article>
            <header>
              <h4>${Link(url, institution)}</h4>
              <div class="meta">
                ${area && html`<strong>${area}</strong>`}
                <div>${Duration(startDate, endDate, resume.locale)}</div>
              </div>
            </header>
            ${studyType && markdown(studyType)}
            ${courses.length > 0 && html`
              <h5>Courses</h5>
              <ul>
                ${courses.map(course => html`<li>${markdown(course)}</li>`)}
              </ul>
            `}
          </article>
        `)}
      </div>
    </section>
  `
}
