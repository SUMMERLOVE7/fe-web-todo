import { delData } from "../../server/server.js";
import { newCardHistory } from "../menu/updateMenu.js";
import { dataStorage, DeletedItem, Notice } from "../store.js";
import { updateCount } from "./countCard.js";
import { findColumnIndex } from "./registerContent.js";

export let deleteContent = document.querySelectorAll(".x-content-button");
export let deletePopup = document.querySelector(".delPopup");
export let deletePopupBtn = document.querySelector(".del-popup");
export let cancelDelBtn = document.querySelector(".undo-popup");

// 카드 삭제할 때, x 버튼에 마우스 호버시 빨간색으로 색깔 변경
function hoverRed(target) {
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.borderColor = "red";
  grandParentSection.style.backgroundColor = "seashell";
}

// 카드 삭제할 때, x 버튼에 마우스 아웃시 빨간색에서 다시 원래 색깔로 변경
function mouseOut(target) {
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.borderColor = "white";
  grandParentSection.style.backgroundColor = "white";
}

// 위의 함수들을 이벤트 할당하는 부분
export function manageContent(target) {
  target.addEventListener("mouseover", () => hoverRed(target));
  target.addEventListener("mouseout", () => mouseOut(target));

  target.addEventListener("click", (e) => {
    e.preventDefault();
    const $cardTarget = e.target.closest(".todolist");

    if (!$cardTarget) return;
    setDeletedItem($cardTarget);
    showPopup(deletePopup);
  });
}

function setDeletedItem(target) {
  DeletedItem.target = target;
}

// 기타 여러 모달창 띄우는 함수
export function showPopup(target) {
  target.style.display = "block";
  target.classList.add("show");
}

// delete할 데이터 삭제
export function rmDelPopup() {
  deleteList(DeletedItem.target);
  deletePopup.style.display = "none";
}

// 칼럼에서 카드 삭제 및 카드 개수 업데이트
function deleteList(target) {
  const $columnCountTarget = target.closest(".list-container");
  if (!$columnCountTarget) return;
  deleteCard(target, $columnCountTarget);
  target.remove();
  updateCount($columnCountTarget);
}

// 칼럼에서 카드 삭제 시 삭제되었다는 알림 띄우기 및 dataStorage에서 카드 삭제
function deleteCard(target, $columnCountTarget) {
  const columnName =
    $columnCountTarget?.querySelector(".column-name").innerText;
  const cardIndex = findCardIndex($columnCountTarget, target);
  const cardTitle = target.querySelector(".list-title").innerText;
  deleteCardFromStorage(columnName, cardIndex);
  Notice.add({
    ActionType: "delete",
    columnName: columnName,
    cardTitle: cardTitle,
    time: new Date().getTime(),
  });
  console.log("after delete Notice", Notice);
  Notice.render();
  // newCardHistory({ ActionType: "delete", columnName, cardTitle });

  // 서버부분 코드
  const columnIdx = findColumnIndex(columnName);
  delData(columnIdx, cardIndex);
}

// 카드에서 수정, 삭제 등 여러 작업시 해당 칼럼에서 선택한 카드의 인덱스 찾는 함수
export function findCardIndex(targetDiv, targetSection) {
  const cards = [...targetDiv.querySelectorAll(".todolist")];
  const card = targetSection;
  const idx = cards.findIndex((ele) => ele === card);
  return idx;
}

// dataStorage에서 카드를 삭제하는 함수
function deleteCardFromStorage(columnName, cardIndex) {
  const index = findColumnIndex(columnName);
  dataStorage.columns[index].cards.splice(cardIndex, 1);
}
