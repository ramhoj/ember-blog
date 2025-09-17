import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking"
import { action } from "@ember/object"

export default class CommentFormComponent extends Component {
  @tracked body = ""

  constructor() {
    super(...arguments)
    this.body = this.args.model?.body ?? ""
  }

  @action updateBody(event) {
    this.body = event.target.value
  }

  @action submit(event) {
    event.preventDefault()
    this.args.onSave({ body: this.body })
  }
}
