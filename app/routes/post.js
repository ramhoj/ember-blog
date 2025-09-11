import PostScopedRoute from "./concerns/post-scoped"

export default class PostRoute extends PostScopedRoute {
  async setupController(controller, model) {
    super.setupController(...arguments)
    controller.comments = await this.store.query("comment", { post_id: model.id })
  }
}
