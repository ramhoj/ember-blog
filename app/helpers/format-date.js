import { helper } from "@ember/component/helper"

export default helper(function formatDate([date]) {
  return new Intl.DateTimeFormat(navigator.language, { dateStyle: "medium", timeStyle: "short" }).format(date)
})
