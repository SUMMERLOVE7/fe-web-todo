import { makeNewInput } from "../utils.js";
import { addInputEvent } from "./inputEvent.js";
import { storeDeletedItem } from "../dataProcessing.js";
import { modal } from "../Modal.js";
import { TodosStatus } from "../store.js";
import { render } from "../render.js";

const clickEvent = (body) => {
  //클릭 이벤트 한꺼번에 설정해 위임
  body.addEventListener("click", (e) => {
    const add_btn = e.target.closest(".add");
    const delete_btn = e.target.closest(".delete-lst");
    const add_column_btn = e.target.closest(".plus-column");

    // + 버튼 눌럿을때 add action
    if (add_btn) {
      const input_items = document.querySelector(".input-items");
      if (input_items) {
        input_items.remove();
        return;
      }
      const to_be_added_ul = e.target.closest("section").querySelector("ul");
      const input_new_element = makeNewInput("등록");
      to_be_added_ul.insertAdjacentHTML("afterbegin", input_new_element);
      addInputEvent();
      return;
    }
    // x 버튼 눌렀을 때 리스트 내용 삭제하고 삭제 모달창 활성화
    const id = e.target.dataset.id;
    if (id && delete_btn) {
      storeDeletedItem(id);
      modal.classList.toggle("act");
    }

    // 컬럼추가 기능
    /**
     * TODO
     * 서버에도 컬럼추가 반영
     */
    if (add_column_btn) {
      TodosStatus.push("새로운 칼럼");
      render();
    }
  });
};

export { clickEvent };
