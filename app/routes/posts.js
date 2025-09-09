import Route from "@ember/routing/route"
import { service } from "@ember/service"

export default class PostsRoute extends Route {
  @service store
  queryParams = { q: { refreshModel: false, replace: true}}

  setupController(controller, model) {
    super.setupController(controller, model)
    controller.rows = model
    controller.q = controller.q ?? ""
    controller.qInput = controller.q
  }

  async model({ q }) {
    return this.store.query("post", q ? { q } : {})
  }
}
