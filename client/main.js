import { TodosStatus, Todos, Notice } from "./src/store.js";
import { makeInputTemplate, makeInputFormTemplate } from "./src/template.js";
import {
  storeToBeUpdatedItem,
  storeInputData,
  storeDeletedItem,
} from "./src/dataProcessing.js";

import { render } from "./src/render.js";
import { autoResizeTextarea } from "./src/utils.js";
import { addInputEvent } from "./src/inputEvent.js";
import { modal } from "./src/Modal.js";
import { doDragEvent } from "./src/drag.js";
import { getTodo, postTodo, deleteTodo } from "./src/api/rest.js";

//초기 렌더링
getTodo();
// render();

/** 알림메뉴창 활성화, 비활성화 하는 함수 */
const changeNotificationMode = () => {
  const notification_menu = document.querySelector(".notification-menu");
  notification_menu.classList.toggle("act");
};

//popupbar 메뉴 보이기와 숨기기
document.querySelector(".fa-bars").addEventListener("click", () => {
  Notice.render();
  changeNotificationMode();
});
document
  .querySelector(".delete-notification-menu")
  .addEventListener("click", changeNotificationMode);

const makeNewInput = (mode) => {
  return makeInputTemplate(mode);
};

//클릭 이벤트 한꺼번에 설정해 위임
document.body.addEventListener("click", (e) => {
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
  if (add_column_btn) {
    TodosStatus.push("새로운 칼럼");
    render();
  }
});

document.body.addEventListener("mousedown", (e) => {
  const origin_item = e.target.closest(".todolist-items");
  const drag_delay = 150;
  if (!origin_item) return;
  let isClick = 1;
  const timer = setTimeout(() => {
    if (!isClick) return;
    isClick = 0;
    doDragEvent(e, origin_item);
  }, drag_delay);

  document.onmouseup = function (e) {
    clearTimeout(timer);
    isClick = 0;
  };
});

// list-item 더블클릭이벤트
document.body.addEventListener("dblclick", (e) => {
  const update_element = e.target.closest(".todolist-items");
  const to_be_updated_column = e.target.closest(".todo-header");
  if (!(update_element || to_be_updated_column)) return;
  if (update_element) {
    storeToBeUpdatedItem(update_element);
    storeInputData();
    update_element.className = "input-items";
    update_element.setAttribute("tabindex", "-1");
    update_element.innerHTML = makeInputFormTemplate();
    addInputEvent();
  }

  //컬럼 수정
  if (to_be_updated_column) {
    const before_updated_title =
      to_be_updated_column.querySelector(".todo-column").innerText;
    to_be_updated_column.innerHTML = `
      <input class = "update-title" maxlength = 50 value = "${before_updated_title}"></input>
    `;
    const update_title = to_be_updated_column.querySelector(".update-title");
    update_title.addEventListener("keydown", autoResizeTextarea, true);
    update_title.addEventListener("focusout", () => {
      const updated_column = update_title.value;

      TodosStatus[TodosStatus.findIndex((e) => e === before_updated_title)] =
        updated_column;

      Todos.forEach((e) => {
        if (e.Status === before_updated_title) e.Status = updated_column;
      });
      render();
    });
  }
});
