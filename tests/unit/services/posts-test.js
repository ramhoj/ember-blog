import { module, test } from "qunit"
import { setupTest } from "ember-qunit"
import config from "blog/config/environment"

const STORAGE_KEY = `blog-posts-v1-${config.environment}`

module("Unit | Service | posts", function (hooks) {
  setupTest(hooks)

  hooks.beforeEach(function () {
    localStorage.removeItem(STORAGE_KEY)
  })

  test("returns [] when storage is empty", function (assert) {
    let service = this.owner.lookup("service:posts")
    assert.deepEqual(service.all(), [])
  })

  test("reads posts from localStorage", function (assert) {
    let data = [{ id: "a", title: "A", body: "" }]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    let service = this.owner.lookup("service:posts")
    assert.deepEqual(service.all(), data)
    assert.strictEqual(service.find("a").title, "A")
  })
})
