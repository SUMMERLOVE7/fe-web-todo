import { findColumnIndex } from "../card/registerContent.js";
import { dataStorage } from "../store.js";

// x 버튼 클릭시 칼럼 삭제하는 함수
export function deleteColumn(target) {
  const xBtns = [...target.querySelectorAll(".x-button")];

  xBtns.forEach((xBtn) => {
    xBtn.addEventListener("click", () => {
      const column = xBtn.closest(".list-container");
      const columnName = column.querySelector(".column-name");

      const idx = findColumnIndex(columnName.innerText);
      column.remove();
      dataStorage.columns.splice(idx, 1);
    });
  });
}
