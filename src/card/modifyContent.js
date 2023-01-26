import { modData } from "../../server/server.js";
import { modifyCardHistory } from "../menu/updateMenu.js";
import { dataStorage } from "../store.js";
import { columnModifyModalTemplate } from "../template/modal.js";
import { findCardIndex } from "./deleteContent.js";
import { resizeTextareaEvent, changeLineWithEnter } from "./inputContent.js";
import { addEventToCard, findColumnIndex, renderNewSection } from "./registerContent.js";
import { addEvent } from "../helper/commonFunction.js";

// 수정 모달을 생성하는 함수
function modifyModal(target) {
  const parentSection = target.closest(".todolist");
  addEvent(target, [() => {
      let title = parentSection.querySelector(".list-title").innerText;
      let caption = parentSection.querySelector(".caption").innerText;
      parentSection.innerHTML = columnModifyModalTemplate;
      cancelModification(parentSection, title, caption);
    },
    () => resizeTextareaEvent(parentSection),
    () => finishModification(parentSection)
  ]);
}

// 카드 수정시 dataStorage의 내용 변경
function modifyCardInStorage(targetDiv, targetSection, newTitle, newCaption) {
  let cardindex = findCardIndex(targetDiv, targetSection);
  let columnName = targetDiv.querySelector(".column-name");
  let colIndex = findColumnIndex(columnName.innerText);

  dataStorage.columns[colIndex].cards[cardindex].title = newTitle;
  dataStorage.columns[colIndex].cards[cardindex].caption = newCaption;

  // 서버 부분 코드
  modData(colIndex);
}

// 수정 버튼 클릭시 수정을 완료하고 알림창에 수정을 했다는 알림 띄우는 함수
function finishModification(target) {
  let modBtn = target.querySelector(".modify-button");
  addEvent(modBtn, [() => {
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
      addEventToCard(grandParent);
      modifyCardHistory(columnName, newtitle);
  }]);
}

// 수정을 취소하는 함수
const cancelModification = (target, title, caption) => {
  const cancelModBtn = target.querySelector(".cancel-modify-button");
  addEvent(cancelModBtn, [() => {
      const parentSection = target.closest(".todolist");
      parentSection.innerHTML = renderNewSection(title, caption);
  }]);
}

export { modifyModal, modifyCardInStorage, finishModification, cancelModification }