import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, click } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | destroy post", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("success", async function (assert) {
    let post = this.server.create("post", { title: "Hello Ember", body: "First post" })

    await visit(`/posts/${post.id}/edit`)
    await click("[data-test-destroy-button]")
    assert.dom("[data-test-post]").doesNotExist()
  })
})
