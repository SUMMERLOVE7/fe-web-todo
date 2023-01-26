import { dataStorage } from "../store.js";
import { findColumnIndex } from "./registerContent.js";
import { pipe } from "../helper/commonFunction.js";

// store.js의 dataStorage에 저장된 카드 갯수 카운트
const countCard = (index) => pipe(
  () => dataStorage.columns[index].cards.length,
  (count) => count
)();

// index.html의 카드 개수 업데이트하는 함수
const updateCount = (target) => pipe(
  (columnName) => findColumnIndex(columnName.innerHTML),
  (columnIndex) => {
    const countContainer = target.querySelector(".count-container");
    countContainer.innerHTML = "<div class='count'>" + countCard(columnIndex) + "</div>";
  }
)(target.querySelector(".column-name"));

// 한번에 모든 칼럼의 카드 개수 업데이트 하는 함수
function changeEveryCount() {
  const columns = document.querySelectorAll(".list-container");
  columns.forEach((col) => updateCount(col));
}

export { countCard, updateCount, changeEveryCount }