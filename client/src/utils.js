import { makeInputTemplate } from "./template.js";

//add,update input창 높이 자동 조절하는 함수
const autoResizeTextarea = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
};

const makeNewInput = (mode) => {
  return makeInputTemplate(mode);
};

/** 알림메뉴창 활성화, 비활성화 하는 함수 */
const changeNotificationMode = () => {
  const notification_menu = document.querySelector(".notification-menu");
  notification_menu.classList.toggle("act");
};

export { autoResizeTextarea, makeNewInput, changeNotificationMode };
