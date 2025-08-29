import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking"
import { action } from "@ember/object"

export default class PostFormComponent extends Component {
  @tracked title = ""
  @tracked body = ""

  @action updateTitle(event) {
    this.title = event.target.value
  }

  @action updateBody(event) {
    this.body = event.target.value
  }
  
  @action submit(event) {
    event.preventDefault()
    this.args.onSave({ title: this.title, body: this.body })
  }
}
