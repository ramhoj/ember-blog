import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | show post", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("shows title and body", async function (assert) {
    let post = this.server.create("post", { title: "Hello Ember", body: "First post" })

    await visit(`/posts/${post.id}`)
    assert.dom("[data-test-title]").hasText("Hello Ember")
    assert.dom("[data-test-body]").hasText("First post")
  })
})
