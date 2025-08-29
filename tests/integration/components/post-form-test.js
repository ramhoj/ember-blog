import { module, test } from "qunit"
import { setupRenderingTest } from "ember-qunit"
import { render, fillIn, click } from "@ember/test-helpers"
import { hbs } from "ember-cli-htmlbars"

module("Integration | Component | post-form", function (hooks) {
  setupRenderingTest(hooks)

  test("calls @onSave with title and body", async function (assert) {
    this.saved = null
    this.handleSave = (payload) => { this.saved = payload }

    await render(hbs`<PostForm @onSave={{this.handleSave}} />`)
    await fillIn("input[name='title']", "Hello Ember")
    await fillIn("textarea[name='body']", "First post")
    await click("button[type='submit']")

    assert.ok(this.saved, "onSave was called")
    assert.strictEqual(this.saved.title, "Hello Ember")
    assert.strictEqual(this.saved.body, "First post")
  })
})
