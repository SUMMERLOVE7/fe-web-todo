import { ToBeDeleted, TodosStatus, Todos } from "./store.js";
import {
  makeInputTemplate,
  makeInputFormTemplate,
  makeNoticeTemplate,
} from "./template.js";
import {
  storeToBeUpdatedItem,
  storeInputData,
  storeDeletedItem,
} from "./dataProcessing.js";

import { render } from "./render.js";
import { addInputEvent, autoResizeTextarea } from "./inputEvent.js";

//초기 렌더링
render();

const modal = document.querySelector(".modal");
const modal_delete_btn = modal.querySelector(".cancel-button");
const modal_register_btn = modal.querySelector(".register-button");

//모달창에서 취소 버튼 누를시 모달 비활성화
modal_delete_btn.addEventListener("click", () => {
  modal.classList.toggle("act");
});

/**
 *  * 모달창에서 삭제버튼 누를 시 데이터 삭제
 * 1. 삭제할 데이터를 Todos(todolist 데이터)에서 삭제
 * 2. 모달 창 없앰
 * 3. 알림창에 알림 등록
 * 4. 리렌더링
 * */
modal_register_btn.addEventListener("click", () => {
  Todos.splice(
    Todos.findIndex(
      (e) =>
        e.Status === ToBeDeleted.Status &&
        e.Title === ToBeDeleted.Title &&
        e.Contents === ToBeDeleted.Contents
    ),
    1
  );
  modal.classList.toggle("act");
  const NoticeUl = document
    .querySelector(".notification-menu")
    .querySelector("ul");
  NoticeUl.insertAdjacentHTML(
    "afterbegin",
    makeNoticeTemplate({
      mode: "delete",
      info: { Status: ToBeDeleted.Status, Title: ToBeDeleted.Title },
    })
  );
  render();
});

/** 알림메뉴창 활성화, 비활성화 하는 함수 */
const changeNotificationMode = () => {
  const notification_menu = document.querySelector(".notification-menu");
  notification_menu.classList.toggle("act");
};

//popupbar 메뉴 보이기와 숨기기
document
  .querySelector(".fa-bars")
  .addEventListener("click", changeNotificationMode);
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
 * 1. mousedown 일어날때마다 타이머를 만들어서 일정 시간이 지난 후 드래그 이벤트 시작
 * 2. mousemove 이벤트로 잔상이 마우스 따라오게함
 * Todos : mouse over 시 리스트 삽입 및 이동되는 노드 제거
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
    copy_item.classList.toggle("dragging");

    document.body.append(copy_item);

    function moveAt(pageX, pageY) {
      copy_item.style.left = pageX - shiftX + "px";
      copy_item.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }
    moveAt(e.pageX, e.pageY);

    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function (e) {
      document.removeEventListener("mousemove", onMouseMove);
      // document.onmouseup = null;

      // document.removeChild(copy_item);
      // copy_item.remove();
      origin_item.style.opacity = 1;
      origin_item.style.border = "none";
    };
  }, 150);

  document.onmouseup = function (e) {
    clearTimeout(timer);
    isClick = 0;
  };
});

function getDragAfterElement(container, x) {
  const draggableElements = [...container.querySelectorAll(".todolist-items")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.top - box.height / 2;
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
Array.from(sections).map((section) => {
  section.addEventListener("mouseover", (e) => {
    const draggable = document.querySelector(".dragging");
    if (!draggable) return;

    const afterElement = getDragAfterElement(section, e.clientX);
    console.log("afterElement", afterElement);
    document.querySelector("body").removeChild(draggable);
    section.appendChild(draggable);
    draggable.classList.toggle("dragging");
    draggable.style.position = "static";
    draggable.style.zIndex = 0;

    console.log("draggable", draggable);
  });
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
