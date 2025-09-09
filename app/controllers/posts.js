import Controller from "@ember/controller"
import { service } from "@ember/service"
import { action } from "@ember/object"
import { tracked } from "@glimmer/tracking"
import { restartableTask, timeout } from "ember-concurrency"

export default class PostsController extends Controller {
  @service store

  queryParams = [{ q: { replace: true } }]

  @tracked q = ""
  @tracked qInput = ""
  @tracked rows = []

  @action updateQuery(event) {
    this.qInput = event.target.value
    this.searchTask.perform(this.qInput)
  }

  searchTask = restartableTask(async (query) => {
    this.q = query
    let params = this.q ? { q: this.q } : {}
    let results = await this.store.query("post", params)
    this.rows = results
  })
}
