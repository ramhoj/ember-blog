import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking"
import { action } from "@ember/object"
import { task } from "ember-concurrency"

export default class CommentFormComponent extends Component {
  @tracked body = ""

  constructor() {
    super(...arguments)
    this.body = this.args.comment?.body ?? ""
  }

  @action updateBody(event) {
    this.body = event.target.value
  }

  submitTask = task(async (event) => {
    event.preventDefault()
    await this.args.onSave({ body: this.body })
    this.body = ""
  })
}
