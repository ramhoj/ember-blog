import Route from "@ember/routing/route"
import { POSTS } from "blog/data/posts"

export default class PostsRoute extends Route {
  model() {
    return POSTS
  }
}
