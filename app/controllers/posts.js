import Controller from "@ember/controller"
import { service } from "@ember/service"
import { action } from "@ember/object"
import { tracked } from "@glimmer/tracking"
import { task, timeout } from "ember-concurrency"

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

  searchTask = task({ restartable: true }, async (query) => {
    await timeout(300)                  // debounce
    this.q = query                      // sync URL after debounce
    let params = this.q ? { q: this.q } : {}
    let results = await this.store.query("post", params)
    this.rows = results                 // last task wins (prior ones canceled)
  })
}
