import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, fillIn, click, currentURL } from "@ember/test-helpers"

module("Acceptance | posts create", function (hooks) {
  setupApplicationTest(hooks)

  test("creates a post and shows it", async function (assert) {
    await visit("/posts/new")
    await fillIn("input[name='title']", "Hello Ember")
    await fillIn("textarea[name='body']", "First post")
    await click("button[type='submit']")

    assert.equal(currentURL(), "/posts/hello-ember")
    assert.dom("[data-test-title]").hasText("Hello Ember")
    assert.dom("[data-test-body]").hasText("First post")
  })
})
