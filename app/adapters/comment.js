import ApplicationAdapter from "./application"

export default class CommentAdapter extends ApplicationAdapter {
  urlForQuery(query) {
    return `${this.host}/posts/${query.post_id}/comments`
  }

  urlForCreateRecord(modelName, snapshot) {
    let postId = snapshot.belongsTo("post", { id: true })
    return `${this.host ?? ""}/posts/${postId}/comments`
  }
}
