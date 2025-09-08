import { module, test } from "qunit"
import { setupTest } from "ember-qunit"

module("Unit | Controller | posts", function(hooks) {
  setupTest(hooks)

  test("returns all posts when q is empty", function(assert) {
    let controller = this.owner.lookup("controller:posts")
    controller.model = [ { id: 1, title: "A" }, { id: 2, title: "B" } ]
    controller.q = ""

    assert.equal(controller.filteredPosts.length, 2)
  })

  test("returns matching posts when q is present", function(assert) {
    let controller = this.owner.lookup("controller:posts")
    controller.model = [
      { id: 1, title: "Adam", body: "Sven" },
      { id: 2, title: "Bert", body: "Bea" },
      { id: 3, title: "Borg", body: "Zorro" }
    ]
    controller.q = "A"

    assert.deepEqual(controller.filteredPosts.map(p => p.id), [1, 2] )
  })
})
