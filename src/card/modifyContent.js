import { modifyCardHistory } from "../menu/updateMenu.js";
import { dataStorage } from "../store.js";
import { findCardIndex } from "./deleteContent.js";
import {
  addEvent,
  contentTodo,
  findColumnIndex,
  renderNewSection,
} from "./registerContent.js";

export function modifyModal(target) {
  let btnContainer = target.parentElement;
  let parentSection = btnContainer.parentElement;

  target.addEventListener("click", () => {
    let title = parentSection.querySelector(".list-title").innerText;
    let caption = parentSection.querySelector(".caption").innerText;
    // let title = parentSection.querySelector(".list-title").value;
    // let caption = parentSection.querySelector(".caption").value;

    parentSection.innerHTML = `<section id="open-modal"> <div class='list-title-modal'>
      <input type='text' class='title-input' name='title-input' value="${title}"></input></div>
      <form><div class='caption-modal'><input type='text' class='caption-input' name='caption-input' value="${caption}">
      </input></div>
      <div class='modal-button'><button type='button' class='cancel-modify-button'> 취소 </button>
      <button type='submit' class='modify-button'> 수정 </button></div></form></section>`;

    finishModification(parentSection);
    cancelModification(parentSection, title, caption);
  });
}

export function modifyCardInStorage(
  targetDiv,
  targetSection,
  newTitle,
  newCaption
) {
  let cardindex = findCardIndex(targetDiv, targetSection);
  let columnName = targetDiv.querySelector(".column-name");
  let colIndex = findColumnIndex(columnName.innerText);

  dataStorage.columns[colIndex].cards[cardindex].title = newTitle;
  dataStorage.columns[colIndex].cards[cardindex].caption = newCaption;
}

export function finishModification(target) {
  let modBtn = target.querySelector(".modify-button");

  modBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let parent = target.closest(".todolist");
    let newtitle = parent.querySelector(".title-input").value;
    let newcaption = parent.querySelector(".caption-input").value;

    let grandParent = target.closest("#list-container");
    let columnName = grandParent.querySelector(".column-name").innerText;

    target.innerHTML = renderNewSection(newtitle, newcaption);
    let container = target.closest("#list-container");

    modifyCardInStorage(grandParent, parent, newtitle, newcaption);
    addEvent(container);
    modifyCardHistory();
  });
}

export function cancelModification(target, title, caption) {
  let cancelModBtn = target.querySelector(".cancel-modify-button");
  cancelModBtn.addEventListener("click", () => {
    let parentSection = target.closest(".todolist");

    parentSection.innerHTML = renderNewSection(title, caption);
  });
}
