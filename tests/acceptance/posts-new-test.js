import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, click, currentURL } from "@ember/test-helpers"

module("Acceptance | posts new", function (hooks) {
  setupApplicationTest(hooks)

  test("navigates to /posts/new and shows the page", async function (assert) {
    await visit("/posts")
    await click('a[href="/posts/new"]')
    assert.equal(currentURL(), "/posts/new")
    assert.dom("h2").hasText("New Post")
  })
})
