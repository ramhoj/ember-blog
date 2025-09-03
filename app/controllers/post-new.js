import Controller from "@ember/controller"
import { service } from "@ember/service"
import { action } from "@ember/object"

export default class PostsNewController extends Controller {
  @service posts
  @service router

  @action create({ title, body }) {
    let created = this.posts.create({ title, body })
    this.router.transitionTo("post", created.id)
  }
}
