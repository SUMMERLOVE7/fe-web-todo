import { findColumnIndex } from "../card/registerContent.js";
import { dataStorage } from "../store.js";

export function deleteColumn(target) {
  const xBtns = target.querySelectorAll(".x-button");

  for (let x of xBtns) {
    x.addEventListener("click", () => {
      const column = x.closest(".list-container");
      const columnName = column.querySelector(".column-name");

      let idx = findColumnIndex(columnName.innerText);
      column.remove();
      dataStorage.columns.splice(idx, 1);
    });
  }
}
