import Service from "@ember/service"
import { tracked } from "@glimmer/tracking"
import config from "blog/config/environment"

const STORAGE_KEY = `blog-posts-v1-${config.environment}`

export default class PostsService extends Service {
  @tracked posts

  constructor() {
    super(...arguments)
    this.posts = this.#load()
  }

  all() {
    return this.posts
  }

  find(id) {
    return this.posts.find((post) => post.id === id)
  }

  create({ title, body }) {
    let id = this.#slugify(title)
    let created = { id, title, body: body ?? ""}
    this.posts = [...this.posts, created]
    this.#save(this.posts)

    return created
  }

  #load() {
    let raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  }

  #slugify(string) {
    return String(string).toLowerCase().trim().replace(/[\W_]+/g, "-").replace(/(^-|-$)/g, "")
  }

  #save(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }
}
