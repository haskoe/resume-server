import html from '../utils/html.js'

export default function Interests(header, txt, sectionId) {
  return txt && html`
    <section id="${sectionId}">
      <h3>${header}</h3>
      <div class="grid-list">
        ${txt}
      </div>
    </section>
  `
}
