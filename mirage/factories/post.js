import { Factory } from "miragejs"

export default Factory.extend({
  title(i) { return `Post ${i + 1}` },
  body() { return "Lorem ipsum" }
})
