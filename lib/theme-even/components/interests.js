import html from '../utils/html.js'

export default function Interests(resume = {}) {
  const interests = resume.interests
  return interests.length > 0 && html`
    <section id="interests">
      <h3>${resume.locale.interests}</h3>
      <div class="grid-list">
        ${interests.map(({ keywords = [], name }) => html`
          <div>
            ${name && html`<h4>${name}</h4>`}
            ${keywords.length > 0 && html`
              <ul class="tag-list">
                ${keywords.map(keyword => html`<li>${keyword}</li>`)}
              </ul>
            `}
          </div>
        `)}
      </div>
    </section>
  `
}
