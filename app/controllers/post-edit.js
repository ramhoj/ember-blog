import Controller from "@ember/controller"
import { service } from "@ember/service"
import { action } from "@ember/object"

export default class PostsEditController extends Controller {
  @service router

  @action async update(attributes) {
    Object.assign(this.model, attributes)
    await this.model.save()
    this.router.transitionTo("post", this.model.id)
  }

  @action async delete() {
    await this.model.destroyRecord()
    this.router.transitionTo("posts")
  }
}
