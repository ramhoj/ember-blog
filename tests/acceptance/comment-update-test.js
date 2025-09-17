import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, fillIn, click } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | update comment", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("successful", async function (assert) {
    let post = this.server.create("post", { title: "Hello Ember", body: "First post" })
    this.server.create("comment", { post, body: "First comment" })

    await visit(`/posts/${post.id}`)
    await click("[data-test-edit-comment-button]")
    await fillIn("textarea[name='body']", "Updated comment")
    await click("button[type='submit']")

    assert.dom("[data-test-comment-body]").hasText("Updated comment")
  })
})
