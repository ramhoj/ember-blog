import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, fillIn, click } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | create post", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("successful", async function (assert) {
    await visit("/posts/new")
    await fillIn("input[name='title']", "Hello Ember")
    await fillIn("textarea[name='body']", "First post")
    await click("button[type='submit']")

    assert.dom("[data-test-title]").hasText("Hello Ember")
    assert.dom("[data-test-body]").hasText("First post")
  })
})
