import { todo_list, doing_list, done_list, dataStorage } from "../store.js";
import {
  contentTodo,
  contentDoing,
  contentDone,
  findColumnIndex,
} from "./registerContent.js";

export function countCard(index) {
  console.log(dataStorage);
  let count = dataStorage.columns[index].cards.length;
  return count;
}

// export function countCard(list) {
//   return list.length;
// }

// export function updateCount(target, list) {
//   const titleContainer = target.querySelector(".container-title");
//   const countContainer = titleContainer.querySelector(".count-container");
//   const count = countContainer.querySelector(".count");
//   countContainer.innerHTML = "<div class='count'>" + countCard(list) + "</div>";
// }

export function updateCount(target) {
  const titleContainer = target.querySelector(".container-title");
  const countContainer = target.querySelector(".count-container");
  const count = countContainer.querySelector(".count");
  const columnName = target.querySelector(".column-name");
  let columnIdx = findColumnIndex(columnName);
  countContainer.innerHTML =
    "<div class='count'>" + countCard(columnIdx) + "</div>";
}

export function changeEveryCount() {
  // updateCount(contentTodo, todo_list);
  // updateCount(contentDoing, doing_list);
  // updateCount(contentDone, done_list);
  updateCount(contentDoing);
  updateCount(contentTodo);
  updateCount(contentDone);
}
