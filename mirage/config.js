import {
  discoverEmberDataModels
  // applyEmberDataSerializers,
} from "ember-cli-mirage"
import { createServer } from "miragejs"

export default function (config) {
  let finalConfig = {
    ...config,
    // Remove discoverEmberDataModels if you do not want ember-cli-mirage to auto discover the ember models
    models: {
      ...discoverEmberDataModels(config.store),
      ...config.models
    },
    // uncomment to opt into ember-cli-mirage to auto discover ember serializers
    // serializers: applyEmberDataSerializers(config.serializers),
    routes
  }

  return createServer(finalConfig)
}

function routes() {
  this.urlPrefix = "http://localhost:3000"
  this.timing = 0

  this.get("/posts", (schema, request) => {
    let q = (request.queryParams.q || "").toLowerCase()
    if (!q) return schema.posts.all()
    return schema.posts.where(
      (post) => post.title.toLowerCase().includes(q) || (post.body || "").toLowerCase().includes(q)
    )
  })
  this.post("/posts")
  this.get("/posts/:id")
  this.put("/posts/:id")
  this.patch("/posts/:id")
  this.del("/posts/:id")

  this.get("/posts/:id/comments", (schema, request) => {
    return schema.comments.where({ postId: request.params.id })
  })

  this.post("/posts/:id/comments", (schema, request) => {
    let postId = request.params.id
    let attrs = JSON.parse(request.requestBody).comment

    return schema.comments.create({ ...attrs, postId })
  })
}
