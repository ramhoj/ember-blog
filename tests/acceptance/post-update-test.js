import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, fillIn, click } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | update post", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("successful", async function (assert) {
    let post = this.server.create("post", { title: "Hello Ember", body: "First post" })

    await visit(`/posts/${post.id}/edit`)
    await fillIn("input[name='title']", "Goodbye Ember")
    await fillIn("textarea[name='body']", "Updated post")
    await click("button[type='submit']")

    assert.dom("[data-test-title]").hasText("Goodbye Ember")
    assert.dom("[data-test-body]").hasText("Updated post")
  })
})
