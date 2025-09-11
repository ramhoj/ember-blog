import Model, { attr, hasMany } from "@ember-data/model"

export default class PostModel extends Model {
  @attr title
  @attr body

  @hasMany("comment", { async: true, inverse: "post" }) comments
}
