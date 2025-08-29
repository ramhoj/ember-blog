import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, click, currentURL } from "@ember/test-helpers"
import { storePosts } from "blog/tests/helpers/storage"

module("Acceptance | posts view", function (hooks) {
  setupApplicationTest(hooks)

  test("shows an empty list when there are no posts", async function (assert) {
    await visit("/posts")
    assert.equal(currentURL(), "/posts")
    assert.dom("[data-test-post]").doesNotExist()
  })

  test("renders posts from localStorage and navigates to show page", async function (assert) {
    let data = [{ id: "a", title: "A", body: "Alpha" }]
    storePosts(data)

    await visit("/posts")
    assert.dom('a[href="/posts/a"]').hasText("A")

    await click('a[href="/posts/a"]')
    assert.equal(currentURL(), "/posts/a")
    assert.dom("[data-test-title]").hasText("A")
    assert.dom("[data-test-body]").hasText("Alpha")
  })
})
