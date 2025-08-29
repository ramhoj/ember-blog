import { module, test } from "qunit"
import { setupTest } from "blog/tests/helpers"
import Service from "@ember/service"

module("Unit | Route | posts/show", function (hooks) {
  setupTest(hooks)

  test("model finds a post by id", function (assert) {
    class PostsStub extends Service {
      find(id) {
        return { id, title: "Title" }
      }
    }
    this.owner.register("service:posts", PostsStub)

    let route = this.owner.lookup("route:posts/show")
    let model = route.model({ id: "xyz" })

    assert.deepEqual(model, { id: "xyz", title: "Title" })
  })
})
