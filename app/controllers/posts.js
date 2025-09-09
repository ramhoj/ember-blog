import Controller from "@ember/controller"
import { service } from "@ember/service"
import { action } from "@ember/object"
import { tracked } from "@glimmer/tracking"
import { debounce } from "@ember/runloop"

export default class PostsController extends Controller {
  @service store

  queryParams = [{ q: { replace: true } }]

  @tracked q = ""
  @tracked qInput = ""
  @tracked rows = []

  @action updateQuery(event) {
    this.qInput = event.target.value
    debounce(this, this.#commitQuery, 300)
  }

  async #commitQuery() {
    this.q = this.qInput
    let params = this.q ? { q: this.q } : {}
    let results = await this.store.query("post", params)
    this.rows = results
  }
}
