import { modData } from "../../server/server.js";
import { modifyCardHistory } from "../menu/updateMenu.js";
import { dataStorage } from "../store.js";
import { findCardIndex } from "./deleteContent.js";
import { resizeTextareaEvent, changeLineWithEnter } from "./inputContent.js";
import { addEvent, findColumnIndex, renderNewSection } from "./registerContent.js";

// 수정 모달을 생성하는 함수
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

// 카드 수정시 dataStorage의 내용 변경
export function modifyCardInStorage(targetDiv, targetSection, newTitle, newCaption) {
  let cardindex = findCardIndex(targetDiv, targetSection);
  let columnName = targetDiv.querySelector(".column-name");
  let colIndex = findColumnIndex(columnName.innerText);

  dataStorage.columns[colIndex].cards[cardindex].title = newTitle;
  dataStorage.columns[colIndex].cards[cardindex].caption = newCaption;

  // 서버 부분 코드
  // modData(colIndex);
}

// 수정 버튼 클릭시 수정을 완료하고 알림창에 수정을 했다는 알림 띄우는 함수
export function finishModification(target) {
  let modBtn = target.querySelector(".modify-button");

  modBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let parent = target.closest(".todolist");
    let title = parent.querySelector(".title-input");
    let content = parent.querySelector(".caption-input");
    let newtitle = title.value;
    let newcaption = content.value;
    let grandParent = target.closest(".list-container");
    let columnName = grandParent.querySelector(".column-name").innerText;

    target.innerHTML = renderNewSection(newtitle, newcaption);

    let listTitle = target.querySelector(".list-title");
    let listCaption = target.querySelector(".caption");
    changeLineWithEnter(title, listTitle);
    changeLineWithEnter(content, listCaption);

    modifyCardInStorage(grandParent, parent, newtitle, newcaption);
    addEvent(grandParent);
    modifyCardHistory(columnName, newtitle);
  });
}

// 수정을 취소하는 함수
export function cancelModification(target, title, caption) {
  let cancelModBtn = target.querySelector(".cancel-modify-button");
  cancelModBtn.addEventListener("click", () => {
    let parentSection = target.closest(".todolist");

    parentSection.innerHTML = renderNewSection(title, caption);
  });
}
