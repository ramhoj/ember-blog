import { module, test } from "qunit"
import { setupTest } from "ember-qunit"
import { storePosts, getPosts } from "blog/tests/helpers/storage"

module("Unit | Service | posts", function (hooks) {
  setupTest(hooks)

  hooks.beforeEach(function () {
    this.posts = () => this.owner.lookup("service:posts")
  })

  test("reads posts from localStorage", function (assert) {
    let data = [{ id: "a", title: "A", body: "" }]
    storePosts(data)

    assert.deepEqual(this.posts().posts, data)
    assert.strictEqual(this.posts().find("a").title, "A")
  })

  test("create persists, returns created post and updates", function (assert) {
    let created = this.posts().create({ title: "Hello Ember", body: "First post" })

    assert.deepEqual(created, { id: "hello-ember", title: "Hello Ember", body: "First post" })
    assert.strictEqual(this.posts().find("hello-ember").title, "Hello Ember")
    assert.deepEqual(this.posts().posts.map((post) => post.id), ["hello-ember"])
    assert.deepEqual(getPosts(), [created])
  })

  test("create slugifies title", function (assert) {
    let created = this.posts().create({ title: "Hello_World!!  2025", body: "" })
    assert.strictEqual(created.id, "hello-world-2025")
  })

  test("updates title and body without changing id", function (assert) {
    storePosts([{ id: "hello-ember", title: "Hello Ember", body: "First" }])
    let updated = this.posts().update("hello-ember", { title: "Goodbye Ember", body: "Second" })

    assert.deepEqual(updated, { id: "hello-ember", title: "Goodbye Ember", body: "Second" })
    assert.strictEqual(this.posts().find("hello-ember").title, "Goodbye Ember")
    assert.deepEqual(getPosts(), [updated])
  })

  test("deletes post", function (assert) {
    storePosts([{ id: "a", title: "A" }, { id: "b", title: "B" }])

    this.posts().destroy("a")

    assert.deepEqual(this.posts().posts, [{ id: "b", title: "B" }])
    assert.deepEqual(getPosts(), [{ id: "b", title: "B" }])
  })
})
