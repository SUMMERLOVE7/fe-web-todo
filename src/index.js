import { closeMenu } from "./menu/showMenu.js";
import { changeEveryCount, updateCount } from "./card/countCard.js";
import { deleteContent, manageContent } from "./card/deleteContent.js";
import { dataStorage } from "./store.js";

window.onload = function (e) {
  closeMenu();

  for (let del of deleteContent) {
    manageContent(del);
  }
  changeEveryCount();
};

// document.body.addEventListener("click", ({ target }) => {
//   console.log(target);
// });
