import { ToBeDeleted, TodosStatus, Todos, Notice } from "./store.js";
import { makeInputTemplate, makeInputFormTemplate } from "./template.js";
import {
  storeToBeUpdatedItem,
  storeInputData,
  storeDeletedItem,
} from "./dataProcessing.js";

import { render } from "./render.js";
import { addInputEvent, autoResizeTextarea } from "./inputEvent.js";
import { modal } from "./Modal.js";

//초기 렌더링
render();

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

document.body.ondragstart = function () {
  return false;
};

/** drag and drop 구현중인 함수
 *  1. 드래그 이벤트 실행되면 드래그할 노드 클론해 생성 (x)
 *  2. 드래그 되는 노드 잔상으로 만든다 (x)
 *  3. mousemove 때 마우스 따라서 도형 이동 (x)
 *  4. 못내려놓거나 본인자리면 무시
 *  5. 그게 아니면 잔상 이동
 *  6. 마우스가 올라가면 드래그 하는 노드 제거하고
 *  7. 잔상을 원래 노드로 스타일 변경
 *
 * Todos : mouse over 시 이동되는 노드 제거
 */
document.body.addEventListener("mousedown", (e) => {
  const origin_item = e.target.closest(".todolist-items");
  if (!origin_item) return;
  let isClick = 1;
  const timer = setTimeout(() => {
    if (!isClick) return;
    isClick = 0;
    let shiftX = e.clientX - origin_item.getBoundingClientRect().left;
    let shiftY = e.clientY - origin_item.getBoundingClientRect().top;

    const copy_item = origin_item.cloneNode(true);
    origin_item.style.opacity = 0.4;
    origin_item.style.border = "1px solid dodgerblue";
    copy_item.style.position = "absolute";
    copy_item.style.zIndex = 1;
    copy_item.style.width = "23vw";
    copy_item.classList.toggle("dragging");

    document.body.append(copy_item);

    function moveAt(pageX, pageY) {
      copy_item.style.left = pageX - shiftX + "px";
      copy_item.style.top = pageY - shiftY + "px";
    }

    function checkDropable() {
      copy_item.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      copy_item.hidden = false;
      if (!elemBelow) return;
      return elemBelow;
    }

    /**
     *
     *  3. mousemove 때 마우스 따라서 도형 이동 (x)
     *  4. 못내려놓거나 본인자리면 무시
     *  5. 그게 아니면 잔상 이동
     *
     * @todo
     * 1. 마우스 위치에 따라 카드 이동
     * 2. 마우스가 있는 위치로 잔상이 이동할수 있는지 검사
     * 3. 내려놓을 수 있으면 위에 넣을지 아래에 넣을지 검사
     * 4. 위치에 넣음
     */
    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
      const getDropable = checkDropable();
      if (!getDropable) return;
      const todolist_section = getDropable.closest("section");
      if (!todolist_section) return;
      const todolist_ul = todolist_section.querySelector("ul");
      const afterElement = getDragAfterElement(todolist_section, e.clientY);
      console.log(
        "origin",
        origin_item,
        "afterelement",
        afterElement,
        "todolist_ul",
        todolist_ul,
        "section",
        todolist_section
      );
      if (afterElement === origin_item) return;
      if (!afterElement) todolist_ul.appendChild(origin_item);
      todolist_ul.insertBefore(origin_item, afterElement);
    }
    moveAt(e.pageX, e.pageY);

    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function (e) {
      document.removeEventListener("mousemove", onMouseMove);
      // document.onmouseup = null;

      // document.removeChild(copy_item);
      // origin_item.remove();
      copy_item.remove();
      origin_item.style.opacity = 1;
      origin_item.style.border = "none";
    };
  }, 150);

  document.onmouseup = function (e) {
    clearTimeout(timer);
    isClick = 0;
  };
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".todolist-items")];
  // console.log("container", container, "y", y);
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

const sections = document.querySelectorAll("section:not(.notification-menu)");

// drag한 것이 todolist 로 올라왔을때 처리하려는 함수
// Array.from(sections).map((section) => {
//   section.addEventListener("mouseover", (e) => {
//     const draggable = document.querySelector(".dragging");
//     if (!draggable) return;

//     draggable.classList.toggle("dragging");
//     draggable.style.position = "static";
//     draggable.style.zIndex = 0;
//   });
// });

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
