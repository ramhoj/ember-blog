import ApplicationAdapter from "./application"

export default class CommentAdapter extends ApplicationAdapter {
  urlForQuery(query) {
    return `${this.host}/posts/${query.post_id}/comments`
  }

  urlForCreateRecord(modelName, snapshot) {
    return `${this.host ?? ""}/posts/${this.#postId(snapshot)}/comments`
  }

  urlForUpdateRecord(id, modelName, snapshot) {
    return `${this.host ?? ""}/posts/${this.#postId(snapshot)}/comments/${id}`
  }

  urlForDeleteRecord(id, modelName, snapshot) {
    return `${this.host ?? ""}/posts/${this.#postId(snapshot)}/comments/${id}`
  }

  #postId(snapshot) {
    return snapshot.belongsTo("post", { id: true })
  }
}
