import { findColumnIndex } from "../card/registerContent.js";
import { addEvent, pipe } from "../helper/commonFunction.js";
import { dataStorage } from "../store.js";

NodeList.prototype.forEach = Array.prototype.forEach;

// x 버튼 클릭시 칼럼 삭제하는 함수
const deleteColumn = (target) => {
  const $xBtns = target.querySelectorAll(".x-button");
  $xBtns.forEach((btn) => addEvent(btn, [
    () => {
      const column = btn.closest(".list-container");
      const columnName = column.querySelector(".column-name");

      let idx = findColumnIndex(columnName.innerText);
      column.remove();
      dataStorage.columns.splice(idx, 1);
    }
  ]))
}

export { deleteColumn }