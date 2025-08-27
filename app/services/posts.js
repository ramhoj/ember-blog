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
    return this.posts.find(post => post.id === id)
  }

  #load() {
    let raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  }
}
