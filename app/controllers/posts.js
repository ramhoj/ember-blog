import Controller from "@ember/controller"
import { action } from "@ember/object"
import { tracked } from "@glimmer/tracking"

export default class PostsController extends Controller {
  queryParams = ["q"]
  @tracked q = ""

  get filteredPosts() {
    let q = this.q?.trim().toLowerCase()
    if (!q) return this.model

    return this.model.filter((post) => {
      return post.title.toLowerCase().includes(q) || post.body.toLowerCase().includes(q)
    })
  }

  @action updateQuery(event) {
    this.q = event.target.value
  }
}
