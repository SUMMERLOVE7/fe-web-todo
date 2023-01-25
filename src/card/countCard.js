import { dataStorage } from "../store.js";
import { findColumnIndex } from "./registerContent.js";

// store.js의 dataStorage에 저장된 카드 갯수 카운트
export function countCard(index) {
  let count = dataStorage.columns[index].cards.length;
  return count;
}

// index.html의 카드 개수 업데이트하는 함수
export function updateCount(target) {
  const countContainer = target.querySelector(".count-container");
  const columnName = target.querySelector(".column-name");
  let columnIdx = findColumnIndex(columnName.innerHTML);
  countContainer.innerHTML = "<div class='count'>" + countCard(columnIdx) + "</div>";
}

// 한번에 모든 칼럼의 카드 개수 업데이트 하는 함수
export function changeEveryCount() {
  let columns = document.querySelectorAll(".list-container");

  for (let col of columns) {
    updateCount(col);
  }
}
