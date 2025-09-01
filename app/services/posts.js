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

  find(id) {
    return this.posts.find((post) => post.id === id)
  }

  create({ title, body }) {
    let id = this.#slugify(title)
    let created = { id, title, body: body ?? ""}
    this.posts = [...this.posts, created]
    this.#persist(this.posts)

    return created
  }

  update(id, attributes) {
    this.posts = this.posts.map((post) =>
      post.id === id ? { ...post, ...attributes, id: post.id } : post
    )
    this.#persist(this.posts)

    return this.find(id)
  }

  destroy(id) {
    this.posts = this.posts.filter((post) => post.id !== id)
    this.#persist(this.posts)
  }

  #load() {
    let raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  }

  #slugify(string) {
    return String(string).toLowerCase().trim().replace(/[\W_]+/g, "-").replace(/(^-|-$)/g, "")
  }

  #persist(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }
}
