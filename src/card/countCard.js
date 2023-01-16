import { dataStorage } from "../store.js";
import {
  contentTodo,
  contentDoing,
  contentDone,
  findColumnIndex,
} from "./registerContent.js";

export function countCard(index) {
  let count = dataStorage.columns[index].cards.length;
  return count;
}

export function updateCount(target) {
  const countContainer = target.querySelector(".count-container");
  const columnName = target.querySelector(".column-name");
  let columnIdx = findColumnIndex(columnName.innerHTML);
  countContainer.innerHTML =
    "<div class='count'>" + countCard(columnIdx) + "</div>";
}

export function changeEveryCount() {
  updateCount(contentDoing);
  updateCount(contentTodo);
  updateCount(contentDone);
}
