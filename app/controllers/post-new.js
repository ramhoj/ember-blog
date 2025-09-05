import Controller from "@ember/controller"
import { service } from "@ember/service"
import { action } from "@ember/object"

export default class PostsNewController extends Controller {
  @service store
  @service router

  @action async create({ title, body }) {
    let record = this.store.createRecord("post", { title, body })

    await record.save()
    this.router.transitionTo("post", record.id)
  }
}
