import Controller from "@ember/controller"
import { service } from "@ember/service"
import { action } from "@ember/object"

export default class PostsEditController extends Controller {
  @service posts
  @service router

  @action update({ title, body }) {
    this.posts.update(this.model.id, { title, body })
    this.router.transitionTo("posts.show", this.model.id)
  }

  @action delete() {
    this.posts.destroy(this.model.id)
    this.router.transitionTo("posts")
  }
}
