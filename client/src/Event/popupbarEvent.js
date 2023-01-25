import { Notice } from "../store.js";
import { changeNotificationMode } from "../utils.js";

export const popupbarEvent = () => {
  //popupbar 메뉴 보이기와 숨기기
  document.querySelector(".fa-bars").addEventListener("click", () => {
    Notice.render();
    changeNotificationMode();
  });
  document
    .querySelector(".delete-notification-menu")
    .addEventListener("click", changeNotificationMode);
};
