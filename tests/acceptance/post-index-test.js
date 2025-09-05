import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | list posts", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("populated", async function (assert) {
    this.server.createList("post", 2)

    await visit("/posts")
    assert.dom("[data-test-post]").exists({ count: 2 })
  })
})
