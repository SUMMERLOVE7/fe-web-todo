import { closeMenu, closeMenuBtn, menuBtn, showMenu } from "./menu/showMenu.js";
import { changeEveryCount, updateCount } from "./card/countCard.js";
import { deleteContent, manageContent, cancelDelBtn, deletePopup } from "./card/deleteContent.js";
import { dataStorage } from "./store.js";
import { modifyModal } from "./card/modifyContent.js";
import { manageAddBtnEvent } from "./card/registerContent.js";
import { openModal, resizeTextareaEvent } from "./card/inputContent.js";
import { openColumnModal, registerColumn, cancelColBtn } from "./column/addColumn.js";
import { deleteColumn } from "./column/ColumnDeletion.js";
import { getData } from "../server/server.js";

let modifyContent = document.querySelectorAll(".modify-content-button");

window.onload = function (e) {
  closeMenu();

  resizeTextareaEvent(document);
  for (let del of deleteContent) {
    manageContent(del);
  }
  for (let mod of modifyContent) {
    modifyModal(mod);
  }

  changeEveryCount();
  manageAddBtnEvent(document);
  openModal(document);
  deleteColumn(document);
  openColumnModal();
  registerColumn();
};

menuBtn.addEventListener("click", () => showMenu());
closeMenuBtn.addEventListener("click", () => closeMenu());

cancelDelBtn.addEventListener("click", () => {
  deletePopup.style.display = "none";
});

cancelColBtn.addEventListener("click", () => {
  closePopup();
});

// 서버 부분 코드
// await getData();
