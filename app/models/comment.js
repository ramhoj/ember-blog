import Model, { attr, belongsTo } from "@ember-data/model"

export default class CommentModel extends Model {
  @attr body
  @belongsTo("post", { async: true, inverse: "comments" }) post
}
