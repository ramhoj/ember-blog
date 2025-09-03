import EmberRouter from "@ember/routing/router"
import config from "blog/config/environment"

export default class Router extends EmberRouter {
  location = config.locationType
  rootURL = config.rootURL
}

Router.map(function() {
  this.route("posts")
  this.route("post-new", { path: "/posts/new" })
  this.route("post-edit", { path: "/posts/:id/edit" })
  this.route("post", { path: "/posts/:id" })
})
