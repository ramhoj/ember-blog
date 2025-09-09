import Controller from "@ember/controller"
import { service } from "@ember/service"
import { tracked } from "@glimmer/tracking"
import { restartableTask } from "ember-concurrency"

export default class PostsController extends Controller {
  @service store
  @tracked q = ""

  queryParams = [{ q: { replace: true } }]

  searchTask = restartableTask(async (event) => {
    this.q = event.target.value
    return await this.store.query("post", { q: this.q || "" })
  })

  get posts() {
    return this.searchTask.lastSuccessful?.value ?? this.model
  }
}
