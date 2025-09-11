import Controller from "@ember/controller"
import { tracked } from "@glimmer/tracking"

export default class PostController extends Controller {
  @tracked comments = []
}
