import { todo_list, doing_list, done_list } from "../store.js";
import { contentTodo, contentDoing, contentDone } from "./registerContent.js";

export function countCard(list) {
  return list.length;
}

export function updateCount(target, list) {
  const titleContainer = target.querySelector(".container-title");
  const countContainer = titleContainer.querySelector(".count-container");
  const count = countContainer.querySelector(".count");
  countContainer.innerHTML = "<div class='count'>" + countCard(list) + "</div>";
}

export function changeEveryCount() {
  updateCount(contentTodo, todo_list);
  updateCount(contentDoing, doing_list);
  updateCount(contentDone, done_list);
}
