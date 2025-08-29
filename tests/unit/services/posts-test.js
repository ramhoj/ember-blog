import { module, test } from "qunit"
import { setupTest } from "ember-qunit"
import { storePosts, getPosts } from "blog/tests/helpers/storage"

module("Unit | Service | posts", function (hooks) {
  setupTest(hooks)

  hooks.beforeEach(function () {
    this.posts = () => this.owner.lookup("service:posts")
  })

  test("returns [] when storage is empty", function (assert) {
    assert.deepEqual(this.posts().all(), [])
  })

  test("reads posts from localStorage", function (assert) {
    let data = [{ id: "a", title: "A", body: "" }]
    storePosts(data)

    assert.deepEqual(this.posts().all(), data)
    assert.strictEqual(this.posts().find("a").title, "A")
  })

  test("create persists, returns created post and updates all()", function (assert) {
    let created = this.posts().create({ title: "Hello Ember", body: "First post" })

    assert.deepEqual(created, { id: "hello-ember", title: "Hello Ember", body: "First post" })
    assert.strictEqual(this.posts().find("hello-ember").title, "Hello Ember")
    assert.deepEqual(this.posts().all().map((post) => post.id), ["hello-ember"])
    assert.deepEqual(getPosts(), [created])
  })

  test("create slugifies title", function (assert) {
    let created = this.posts().create({ title: "Hello_World!!  2025", body: "" })
    assert.strictEqual(created.id, "hello-world-2025")
  })
})
