import Route from "@ember/routing/route"
import { POSTS } from "blog/data/posts"

export default class PostRoute extends Route {
  model(params) {
    return POSTS.find((post) => post.id === params.post_id)
  }
}
