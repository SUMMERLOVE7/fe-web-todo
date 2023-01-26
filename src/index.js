import { closeMenu, closeMenuBtn, menuBtn, showMenu } from "./menu/showMenu.js";
import { changeEveryCount } from "./card/countCard.js";
import { deleteContent, manageContent, cancelDelBtn, deletePopup } from "./card/deleteContent.js";
import { modifyModal } from "./card/modifyContent.js";
import { manageAddBtnEvent } from "./card/registerContent.js";
import { openModal, resizeTextareaEvent } from "./card/inputContent.js";
import { openColumnModal, registerColumn, cancelColBtn } from "./column/addColumn.js";
import { deleteColumn } from "./column/ColumnDeletion.js";
import { getData } from "../server/server.js";
import { addEvent, changeCSS } from "./helper/commonFunction.js";

const modifyContent = document.querySelectorAll(".modify-content-button");

window.onload = function (e) {
  closeMenu();
  resizeTextareaEvent(document);
  for (let del of deleteContent) { manageContent(del); }
  for (let mod of modifyContent) { modifyModal(mod); }
  changeEveryCount();
  manageAddBtnEvent(document);
  openModal(document);
  deleteColumn(document);
  openColumnModal();
  registerColumn();
};

addEvent(menuBtn, [() => showMenu()]);
addEvent(closeMenuBtn, [() => closeMenu()]);
addEvent(cancelDelBtn, [() => changeCSS(deletePopup, "display", "none")]);
addEvent(cancelColBtn, [() =>closePopup()]);

// 서버 부분 코드
await getData();
