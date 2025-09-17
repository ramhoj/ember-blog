import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, fillIn, click } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | create comment", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("successful", async function (assert) {
    let post = this.server.create("post", { title: "A", body: "B" })

    await visit(`/posts/${post.id}`)
    await fillIn("textarea[name='body']", "First comment")
    await click("button[type='submit']")

    assert.dom("[data-test-comment-body]").hasText("First comment")
  })
})
