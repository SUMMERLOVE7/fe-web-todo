import { render } from "./render.js";
import {
  initializeToBeUpdatedItem,
  initializeInputData,
} from "./dataProcessing.js";

import { BeforeUpdateItem, InputData, Todos } from "./store.js";

import { makeNoticeTemplate } from "./template.js";

const checkBeforeUpdateItem = () => {
  return (
    BeforeUpdateItem.Title &&
    BeforeUpdateItem.Contents &&
    BeforeUpdateItem.Status
  );
};

const checkInputStatus = () => {
  return InputData["title"] && InputData["contents"];
};

/**
 * add, update input창 이벤트 등록하는 함수
 * 1. input title로 포커스
 * 2. input title, input contents 높이 자동 조절
 * 3. 취소버튼 이벤트 등록
 * 4. 등록, 수정버튼 눌렀을 때 이벤트 등록
 * 5. 인풋 창에 blur(focusout) 이벤트 등록
 */
export const addInputEvent = () => {
  const input_title = document.querySelector(".input-title");
  const input_contents = document.querySelector(".input-contents");
  const input_item = document.querySelector(".input-items");
  const cancel_btn = input_item.querySelector(".cancel-button");
  const register_btn = input_item.querySelector(".register-button");

  input_title.focus();
  input_title.addEventListener("change", onChange);
  input_title.addEventListener("keydown", autoResizeTextarea, true);

  input_contents.addEventListener("change", onChange);
  input_contents.addEventListener("keydown", autoResizeTextarea, true);

  cancel_btn.addEventListener("click", InputCancelEvent);
  register_btn.addEventListener("mousedown", addInputRegisterEvent);
  input_item.addEventListener("blur", addInputFocusOutEvent);

  modifyRegisterButtonMode();
};

//add,update input창 높이 자동 조절하는 함수
const autoResizeTextarea = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
};

//add에서 input창에서 input값 받는 함수
const onChange = (e) => {
  InputData[e.target.name] = e.target.value;
  modifyRegisterButtonMode();
};

/** add, update 액션에서 input창 취소버튼 눌렀을 때 이벤트
 * 1. input창 제거
 * 2. 업데이트모드면 리렌더링
 * 3. input 데이터들 초기화
 */
const InputCancelEvent = () => {
  document
    .querySelector(".input-items .cancel-button")
    .addEventListener("click", () => {
      document.querySelector(".input-items").remove();
      if (checkBeforeUpdateItem()) render();
      initializeToBeUpdatedItem();
      initializeInputData();
    });
};

const addInputFocusOutEvent = () => {
  setTimeout(() => {
    const input_item = document.querySelector(".input-items");
    if (input_item) input_item.remove();
    if (checkBeforeUpdateItem()) render();
    initializeToBeUpdatedItem();
    initializeInputData();
  }, 0);
};

/**
 * 1. update할 데이터가 있는지 체크
 *
 * 2. update 모드
 * 2-1. update할 데이터 탐색
 * 2-2. 객체 복사 후 업데이트 할 title, contents 덮어씌움
 * 2-3. update 알림 등록
 *
 * 3. add 모드
 * 3-1. Todos 배열 맨 앞에 데이터 삽입 (나중에 Todos 아이템에 이벤트 시간을 넣어 정렬할까 생각중...)
 * 3-2. add 알림 등록
 *
 * 4. 데이터 초기화
 * 5. 리렌더링
 */
const addInputRegisterEvent = () => {
  const NoticeUl = document
    .querySelector(".notification-menu")
    .querySelector("ul");
  if (checkBeforeUpdateItem()) {
    const index = Todos.findIndex(
      (e) =>
        e.Title === BeforeUpdateItem.Title &&
        e.Contents === BeforeUpdateItem.Contents &&
        e.Status === BeforeUpdateItem.Status
    );
    Todos[index] = {
      ...Todos[index],
      Title: InputData["title"],
      Contents: InputData["contents"],
    };
    NoticeUl.insertAdjacentHTML(
      "afterbegin",
      makeNoticeTemplate({
        mode: "update",
        info: { Status: Todos[index].Status, Title: InputData["title"] },
      })
    );
    initializeToBeUpdatedItem();
    initializeInputData();
    render();
    return;
  }
  const input_status = document
    .querySelector(".input-items")
    .closest("section").className;
  Todos.unshift({
    Status: input_status,
    Title: InputData["title"],
    Contents: InputData["contents"],
  });
  NoticeUl.insertAdjacentHTML(
    "afterbegin",
    makeNoticeTemplate({
      mode: "add",
      info: { Status: input_status, Title: InputData["title"] },
    })
  );
  initializeToBeUpdatedItem();
  initializeInputData();
  render();
};

const modifyRegisterButtonMode = () => {
  const register_button = document.querySelector(".register-button");
  const input_items = document.querySelector(".input-items");
  if (checkInputStatus(register_button)) {
    register_button.disabled = false;
    input_items.style.opacity = 1;
    return;
  }
  register_button.disabled = true;
  input_items.style.opacity = 0.4;
};

export { autoResizeTextarea };
