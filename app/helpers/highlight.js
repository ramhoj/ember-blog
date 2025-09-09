import { helper } from "@ember/component/helper"
import { htmlSafe } from "@ember/template"

function escapeHtml(str = "") {
  return String(str).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
  )
}

function escapeRegex(str = "") {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export default helper(function highlight([text, query]) {
  let source = String(text ?? "")
  let q = String(query ?? "").trim()
  if (!q) return source // Ember will escape this by default

  let rx = new RegExp(escapeRegex(q), "gi")
  let result = ""
  let lastIndex = 0
  let m

  while ((m = rx.exec(source))) {
    result += escapeHtml(source.slice(lastIndex, m.index))
    result += "<mark>" + escapeHtml(m[0]) + "</mark>"
    lastIndex = m.index + m[0].length
  }
  result += escapeHtml(source.slice(lastIndex))

  return htmlSafe(result)
})
