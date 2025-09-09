import { module, test } from "qunit"
import { setupApplicationTest } from "ember-qunit"
import { visit, fillIn, settled, click } from "@ember/test-helpers"
import { setupMirage } from "ember-cli-mirage/test-support"

module("Acceptance | list posts", function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test("unpopulated", async function (assert) {
    await visit("/posts")
    assert.dom("[data-test-post]").doesNotExist()
    assert.dom("[data-test-no-posts]").exists()
  })

  test("populated", async function (assert) {
    this.server.createList("post", 2)

    await visit("/posts")
    assert.dom("[data-test-post]").exists({ count: 2 })
  })

  test("filtered via input", async function (assert) {
    this.server.create("post", { title: "Alpha", body: "one" })
    this.server.create("post", { title: "Beta", body: "two" })
    this.server.create("post", { title: "Echo", body: "three" })

    await visit("/posts")
    assert.dom("[data-test-post]").exists({ count: 3 })

    await fillIn("[name=q]", "A")
    assert.dom("[data-test-post]").exists({ count: 2 })

    await fillIn("[name=q]", "Alp")
    assert.dom("mark").hasText("Alp", "highlights the matching text")
  })

  test("filtered via url", async function (assert) {
    this.server.create("post", { title: "Alpha", body: "one" })
    this.server.create("post", { title: "Beta", body: "two" })
    this.server.create("post", { title: "Echo", body: "three" })

    await visit("/posts?q=A")
    assert.dom('input[name="q"]').hasValue("A")
    assert.dom("[data-test-post]").exists({ count: 2 })
  })

  test("preserves focus", async function (assert) {
    this.server.timing = 200
    this.server.createList("post", 2)

    await visit("/posts")
    await fillIn('input[name="q"]', "a")
    assert.dom('input[name="q"]').isFocused()
    await settled()
    assert.dom('input[name="q"]').isFocused()
  })

  test("restartable: last search wins", async function (assert) {
    this.server.timing = 200
    this.server.create("post", { title: "Alpha" })
    this.server.create("post", { title: "Beta" })

    await visit("/posts")
    await fillIn('input[name="q"]', "a") // request 1
    await fillIn('input[name="q"]', "be") // request 2 (cancels 1)
    assert.dom("[data-test-post]").exists({ count: 1 })
    assert.dom("[data-test-post]").includesText("Beta")
  })

  test("clear search query", async function (assert) {
    this.server.create("post", { title: "Alpha" })
    this.server.create("post", { title: "Beta" })

    await visit("/posts")
    await fillIn('input[name="q"]', "a")
    await click("[data-test-clear-search]")

    assert.dom('input[name="q"]').hasValue("")
    assert.dom("[data-test-post]").exists({ count: 2 })
  })
})
