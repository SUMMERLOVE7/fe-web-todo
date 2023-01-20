import { modData } from "../../server/server.js";
import { modifyCardHistory } from "../menu/updateMenu.js";
import { dataStorage } from "../store.js";
import { findCardIndex } from "./deleteContent.js";
import { resizeTextareaEvent, changeLineWithEnter } from "./inputContent.js";
import { addEvent, contentTodo, findColumnIndex, renderNewSection } from "./registerContent.js";

export function modifyModal(target) {
  let btnContainer = target.parentElement;
  let parentSection = btnContainer.parentElement;

  target.addEventListener("click", () => {
    let title = parentSection.querySelector(".list-title").innerText;
    let caption = parentSection.querySelector(".caption").innerText;

    parentSection.innerHTML = `<section class="open-modal">
    <div class='list-title-modal'>
    <textarea type='text' class='title-input textarea-input' name='title-input'>${title}</textarea></div>
      <form>
        <div class='caption-modal'>
          <textarea type='text' class='caption-input textarea-input' name='caption-input'>${caption}</textarea>
        </div>
      <div class='modal-button'>
        <button type='button' class='cancel-modify-button'> 취소 </button>
        <button type='submit' class='modify-button'> 수정 </button>
      </div>
      </form>
      </section>`;

    resizeTextareaEvent(parentSection);

    finishModification(parentSection);
    cancelModification(parentSection, title, caption);
  });
}

export function modifyCardInStorage(targetDiv, targetSection, newTitle, newCaption) {
  let cardindex = findCardIndex(targetDiv, targetSection);
  let columnName = targetDiv.querySelector(".column-name");
  let colIndex = findColumnIndex(columnName.innerText);

  dataStorage.columns[colIndex].cards[cardindex].title = newTitle;
  dataStorage.columns[colIndex].cards[cardindex].caption = newCaption;

  modData(colIndex);
}

export function finishModification(target) {
  let modBtn = target.querySelector(".modify-button");

  modBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let parent = target.closest(".todolist");

    ///
    let title = parent.querySelector(".title-input");
    let content = parent.querySelector(".caption-input");

    let newtitle = parent.querySelector(".title-input").value;
    let newcaption = parent.querySelector(".caption-input").value;

    let grandParent = target.closest(".list-container");
    let columnName = grandParent.querySelector(".column-name").innerText;

    target.innerHTML = renderNewSection(newtitle, newcaption);

    //////
    let listTitle = target.querySelector(".list-title");
    let listCaption = target.querySelector(".caption");
    changeLineWithEnter(title, listTitle);
    changeLineWithEnter(content, listCaption);

    modifyCardInStorage(grandParent, parent, newtitle, newcaption);
    addEvent(grandParent);
    modifyCardHistory(columnName, newtitle);
  });
}

export function cancelModification(target, title, caption) {
  let cancelModBtn = target.querySelector(".cancel-modify-button");
  cancelModBtn.addEventListener("click", () => {
    let parentSection = target.closest(".todolist");

    parentSection.innerHTML = renderNewSection(title, caption);
  });
}
