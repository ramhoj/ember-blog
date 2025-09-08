import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, fillIn } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | list posts", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("populated", async function (assert) {
    this.server.createList("post", 2)

    await visit("/posts")
    assert.dom("[data-test-post]").exists({ count: 2 })
  })

  test("filtered via input", async function (assert) {
    this.server.create("post", { title: "Alpha", body: "one" })
    this.server.create("post", { title: "Beta", body: "two" })
    this.server.create("post", { title: "Echo", body: "three" })

    await visit("/posts")
    assert.dom("[data-test-post]").exists({ count: 3 })

    await fillIn("[name=q]", "A")
    assert.dom("[data-test-post]").exists({ count: 2 })
  })

  test("filtered via url", async function (assert) {
    this.server.create("post", { title: "Alpha", body: "one" })
    this.server.create("post", { title: "Beta", body: "two" })
    this.server.create("post", { title: "Echo", body: "three" })

    await visit("/posts?q=A")
    assert.dom("[data-test-post]").exists({ count: 2 })
  })
})
