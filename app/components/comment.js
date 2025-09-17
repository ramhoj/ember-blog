import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking"
import { action } from "@ember/object"

export default class CommentComponent extends Component {
  @tracked isEditing = false

  constructor() {
    super(...arguments)
    this.args.comment.post = this.args.post
  }

  @action edit() {
    this.isEditing = true
  }

  @action cancelEdit() {
    this.args.comment.rollbackAttributes()
    this.isEditing = false
  }

  @action async update({ body }) {
    this.args.comment.body = body
    await this.args.comment.save()
    this.isEditing = false
  }
}
