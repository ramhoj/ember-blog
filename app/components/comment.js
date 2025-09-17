import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking"
import { action } from "@ember/object"

export default class CommentComponent extends Component {
  @tracked isEditing = false

  @action edit() {
    this.isEditing = true
  }

  @action cancelEdit() {
    this.args.comment.rollbackAttributes()
    this.isEditing = false
  }

  @action updateBody(event) {
    this.args.comment.body = event.target.value
  }

  @action async save(event) {
    event?.preventDefault()
    this.args.comment.post = this.args.post
    await this.args.comment.save()
    this.isEditing = false
  }
}