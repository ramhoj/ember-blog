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

  this.get("/posts/:postId/comments", (schema, req) => {
    return schema.comments.where({ postId: req.params.postId })
  })
  this.post("/posts/:postId/comments", (schema, req) => {
    let { comment } = JSON.parse(req.requestBody)
    return schema.comments.create({ ...comment, postId: req.params.postId })
  })
  this.patch("/posts/:postId/comments/:id", (schema, req) => {
    let { comment } = JSON.parse(req.requestBody)
    return schema.comments.find(req.params.id).update(comment)
  })
  this.put("/posts/:postId/comments/:id", (schema, req) => {
    let { comment } = JSON.parse(req.requestBody)
    return schema.comments.find(req.params.id).update(comment)
  })
  this.del("/posts/:postId/comments/:id")
}
