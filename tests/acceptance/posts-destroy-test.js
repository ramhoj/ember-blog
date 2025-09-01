import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, click, currentURL } from "@ember/test-helpers"
import { storePosts } from "blog/tests/helpers/storage"

module("Acceptance | posts delete", function (hooks) {
  setupApplicationTest(hooks)

  hooks.beforeEach(function () {
    storePosts([{ id: "hello-ember", title: "Hello Ember", body: "First" }])
  })

  test("destroyes a post from the edit page and redirects to index", async function (assert) {
    await visit("/posts/hello-ember/edit")
    await click("[data-test-destroy-button]")

    assert.strictEqual(currentURL(), "/posts")
    assert.dom('a[href="/posts/hello-ember"]').doesNotExist()
  })
})
