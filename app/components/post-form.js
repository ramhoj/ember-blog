import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking"
import { action } from "@ember/object"
import { task } from "ember-concurrency"

export default class PostFormComponent extends Component {
  @tracked title = ""
  @tracked body = ""

  constructor() {
    super(...arguments)
    this.title = this.args.model?.title ?? ""
    this.body = this.args.model?.body ?? ""
  }

  @action updateTitle(event) {
    this.title = event.target.value
  }

  @action updateBody(event) {
    this.body = event.target.value
  }

  submitTask = task(async (event) => {
    event.preventDefault()
    await this.args.onSave({ title: this.title, body: this.body })
  })

  @action delete() {
    this.args.onDelete()
  }
}
