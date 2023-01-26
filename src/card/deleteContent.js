import { delData } from "../../server/server.js";
import { multiSelector, pipe, addEvent, changeCSS } from "../helper/commonFunction.js";
import { deleteCardHistory } from "../menu/updateMenu.js";
import { dataStorage } from "../store.js";
import { updateCount } from "./countCard.js";
import { findColumnIndex } from "./registerContent.js";

const deleteContent = document.querySelectorAll(".x-content-button");
const [deletePopup, deletePopupBtn, cancelDelBtn] = multiSelector([".delPopup", ".del-popup", ".undo-popup"])

// 카드 삭제할 때, x 버튼에 마우스 호버시 빨간색으로 색깔 변경
const hoverRed = (target) => pipe(
  (section) => {
    changeCSS(section, "borderColor", "red");
    changeCSS(section, "backgroundColor", "seashell");
  }
)(target.parentElement.parentElement);

// 카드 삭제할 때, x 버튼에 마우스 아웃시 빨간색에서 다시 원래 색깔로 변경
const mouseOut = (target) => pipe(
  (section) => {
    changeCSS(section, "borderColor", "white");
    changeCSS(section, "backgroundColor", "white");
  }
)(target.parentElement.parentElement);

// 칼럼에서 카드 삭제 및 카드 개수 업데이트
const deleteList = (target) => {
  const $columnCountTarget = target.closest(".list-container");
  target.remove();
  deleteCard(target, $columnCountTarget);
  updateCount($columnCountTarget);
}

// 칼럼에서 카드 삭제 시 삭제되었다는 알림 띄우기 및 dataStorage에서 카드 삭제
function deleteCard(target, $columnCountTarget) {
  const columnName = $columnCountTarget.querySelector(".column-name").innerText;
  const cardIndex = findCardIndex($columnCountTarget, target);
  const cardTitle = target.querySelector(".list-title").innerText;
  deleteCardFromStorage(columnName, cardIndex);
  deleteCardHistory(columnName, cardTitle);

  const columnIdx = findColumnIndex(columnName);
  delData(columnIdx, cardIndex);
}

// 위의 함수들을 이벤트 할당하는 부분
function manageContent(target) {
  addEvent(target, [() => hoverRed(target)], "mouseover");
  addEvent(target, [() => mouseOut(target)], "mouseout");
  addEvent(target, [
    () => e.preventDefault(),
    () => {
      const $cardTarget = e.target.closest(".todolist");
      if (!$cardTarget) return;
      showPopup(deletePopup);
      rmDelPopup($cardTarget);
      }
  ]);
}

// 기타 여러 모달창 띄우는 함수
const showPopup = (target) => pipe(
  () => changeCSS(target, "display", "block"),
  () => target.classList.add("show")
);

// 카드 삭제 취소시 모달창 안보이게 하는 부분
const rmDelPopup = (target) => addEvent(deletePopupBtn, [
  () => deleteList(target),
  () => changeCSS(deletePopup, "display", "none"),
]);

// 카드에서 수정, 삭제 등 여러 작업시 해당 칼럼에서 선택한 카드의 인덱스 찾는 함수
const findCardIndex = (targetDiv, targetSection) => pipe(
  ($cardArray) => $cardArray.findIndex(($card) => $card === targetSection)
)([...targetDiv.querySelectorAll(".todolist")]);

// dataStorage에서 카드를 삭제하는 함수
function deleteCardFromStorage(columnName, cardIndex) {
  const index = findColumnIndex(columnName);
  dataStorage.columns[index].cards.splice(cardIndex, 1);
}

export {
  deleteContent, deletePopup, cancelDelBtn,
  manageContent, showPopup, findCardIndex
}