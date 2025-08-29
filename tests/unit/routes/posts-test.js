import { module, test } from "qunit"
import { setupTest } from "blog/tests/helpers"
import Service from "@ember/service"

module("Unit | Route | posts", function (hooks) {
  setupTest(hooks)

  test("model returns all posts from service", function (assert) {
    class PostsStub extends Service {
      all() {
        return [{ id: "1" }]
      }
    }
    this.owner.register("service:posts", PostsStub)

    let route = this.owner.lookup("route:posts")
    assert.deepEqual(route.model(), [{ id: "1" }])
  })
})
