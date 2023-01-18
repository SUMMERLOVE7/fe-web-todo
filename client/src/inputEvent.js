import { render } from "./render.js";
import { initializeBothData } from "./dataProcessing.js";
import { BeforeUpdateItem, InputData, Todos, Notice } from "./store.js";
import { autoResizeTextarea } from "./utils.js";

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
      initializeBothData();
    });
};

const addInputFocusOutEvent = () => {
  setTimeout(() => {
    const input_item = document.querySelector(".input-items");
    if (input_item) input_item.remove();
    if (checkBeforeUpdateItem()) render();
    initializeBothData();
  }, 0);
};

const doUpdateAction = () => {
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
  Notice.add({
    mode: "update",
    info: { Status: Todos[index].Status, Title: InputData["title"] },
    time: new Date().getTime(),
  });
  Notice.render();
  initializeBothData();
  render();
};

const doAddAction = () => {
  const input_status = document
    .querySelector(".input-items")
    .closest("section").className;

  Todos.unshift({
    Status: input_status,
    Title: InputData["title"],
    Contents: InputData["contents"],
  });

  Notice.add({
    mode: "add",
    info: { Status: input_status, Title: InputData["title"] },
    time: new Date().getTime(),
  });

  Notice.render();
  initializeBothData();
  render();
};

const addInputRegisterEvent = () => {
  if (checkBeforeUpdateItem()) {
    doUpdateAction();
    return;
  }
  doAddAction();
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
