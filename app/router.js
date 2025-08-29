import EmberRouter from "@ember/routing/router"
import config from "blog/config/environment"

export default class Router extends EmberRouter {
  location = config.locationType
  rootURL = config.rootURL
}

Router.map(function () {
  this.route("posts", function () {
    this.route("new")
    this.route("post", { path: "/:id" })
  })
})
