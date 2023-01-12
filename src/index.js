import { closeMenu } from "./menu/showMenu.js";
import { changeEveryCount } from "./card/countCard.js";
import { deleteContent, manageContent } from "./card/deleteContent.js";

window.onload = function () {
  closeMenu();
  changeEveryCount();

  for (let del of deleteContent) {
    manageContent(del);
  }
};
