import Controller from "@ember/controller"
import { service } from "@ember/service"
import { tracked } from "@glimmer/tracking"
import { restartableTask } from "ember-concurrency"

export default class PostsController extends Controller {
  @service store

  queryParams = [{ q: { replace: true } }]

  @tracked q = ""
  @tracked qInput = ""
  @tracked rows = []

  searchTask = restartableTask(async (event) => {
    this.qInput = event.target.value
    this.q = this.qInput
    let params = this.q ? { q: this.q } : {}
    let results = await this.store.query("post", params)
    this.rows = results
  })
}
