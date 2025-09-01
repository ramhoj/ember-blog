import Route from "@ember/routing/route"
import { service } from "@ember/service"

export default class PostsEditRoute extends Route {
  @service posts

  model({ id }) {
    return this.posts.find(id)
  }
}
