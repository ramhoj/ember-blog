// import PostScopedRoute from "./concerns/post-scoped"
// export default class PostEditRoute extends PostScopedRoute { }

import Route from "@ember/routing/route"
import { service } from "@ember/service"

export default class PostEditRoute extends Route {
  @service posts

  model({ id }) {
    return this.posts.find(id)
  }
}
