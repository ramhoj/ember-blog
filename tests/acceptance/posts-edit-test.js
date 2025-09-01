import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, click, currentURL } from "@ember/test-helpers"
import { storePosts } from "blog/tests/helpers/storage"

module("Acceptance | posts edit", function (hooks) {
  setupApplicationTest(hooks)

  test("navigates to /posts/:id/edit", async function (assert) {
    storePosts([{ id: "a", title: "A", body: "Alpha" }])

    await visit("/posts/a")
    await click('a[href="/posts/a/edit"]')

    assert.equal(currentURL(), "/posts/a/edit")
    assert.dom("h2").hasText("Edit Post")
  })
})
