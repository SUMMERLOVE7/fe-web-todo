import { closeMenu } from "./menu/showMenu.js";
import { changeEveryCount, updateCount } from "./card/countCard.js";
import { deleteContent, manageContent } from "./card/deleteContent.js";
import { dataStorage } from "./store.js";
import { modifyModal } from "./card/modifyContent.js";
import { manageAddBtnEvent } from "./card/registerContent.js";
import {
  openModal,
  resizeTextarea,
  resizeTextareaEvent,
} from "./card/inputContent.js";

let modifyContent = document.querySelectorAll(".modify-content-button");

window.onload = function (e) {
  closeMenu();

  resizeTextareaEvent();
  for (let del of deleteContent) {
    manageContent(del);
  }
  for (let mod of modifyContent) {
    modifyModal(mod);
  }

  changeEveryCount();
  manageAddBtnEvent();
  openModal();
};

// document.body.addEventListener("click", ({ target }) => {
//   console.log(target);
// });
