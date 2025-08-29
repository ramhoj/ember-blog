import config from "blog/config/environment"
import * as QUnit from "qunit"

const STORAGE_KEY = `blog-posts-v1-${config.environment}`

export function storePosts(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getPosts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

function resetPostsStorage() {
  localStorage.removeItem(STORAGE_KEY)
}

QUnit.testStart(resetPostsStorage)
