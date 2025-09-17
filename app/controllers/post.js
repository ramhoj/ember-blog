import Controller from "@ember/controller"
import { service } from "@ember/service"
import { tracked } from "@glimmer/tracking"
import { action } from "@ember/object"

export default class PostController extends Controller {
  @service store
  @tracked comments = []

  @action async createComment({ body }) {
    let record = this.store.createRecord("comment", { post: this.model, body })
    this.comments = [...this.comments, record]
    await record.save()
  }
}
