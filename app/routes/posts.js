import Route from "@ember/routing/route"
import { service } from "@ember/service"

export default class PostsRoute extends Route {
  @service posts

  model() {
    return this.posts.all()
  }
}
