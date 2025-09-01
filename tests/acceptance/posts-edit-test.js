import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, click, currentURL, fillIn } from "@ember/test-helpers"
import { storePosts } from "blog/tests/helpers/storage"

module("Acceptance | posts edit", function (hooks) {
  setupApplicationTest(hooks)

  test("navigates to /posts/:id/edit", async function (assert) {
    storePosts([{ id: "a", title: "A", body: "Alpha" }])

    await visit("/posts/a")
    await click('a[href="/posts/a/edit"]')

    await fillIn("input[name='title']", "B")
    await fillIn("textarea[name='body']", "Beta")
    await click("button[type='submit']")

    assert.strictEqual(currentURL(), "/posts/a")
    assert.dom("[data-test-title]").hasText("B")
    assert.dom("[data-test-body]").hasText("Beta")
  })
})
