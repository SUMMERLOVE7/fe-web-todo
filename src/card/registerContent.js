import { changeLineWithEnter, closeModal } from "./inputContent.js";
import { dataStorage } from "../store.js";
import { manageContent } from "./deleteContent.js";
import { changeEveryCount } from "./countCard.js";
import { newCardHistory } from "../menu/updateMenu.js";
import { modifyModal } from "./modifyContent.js";
import { addData } from "../../server/server.js";
import { newCardTemplate } from "../template/card.js";
import { addEvent, multiSelector, pipe } from "../helper/commonFunction.js";

NodeList.prototype.forEach = Array.prototype.forEach;

const [contentTodo, contentDoing, contentDone] = 
  multiSelector([".havetodo-container", ".doing-container", ".done-container"]);

function valid_title_input(target) {
  if (!target.value) {
    alert("제목을 입력해주세요");
    return -1;
  } 
  return 0;
}

function valid_caption_input(target) {
  if (!target.value) {
    alert("내용을 입력해주세요");
    return -1;
  } 
  return 0;
}

// 제목이나 내용 미입력시 입력하라는 알림창 띄우는 함수
const check_input_validity = (title, caption) => 
  valid_title_input(title) === 0 && valid_caption_input(caption) === 0 ?
    0 : -1;

// 해당 칼럼의 인덱스를 찾는 함수
function findColumnIndex(element) {
  for (let i = 0; i < dataStorage.columns.length; i++) {
    if (element === dataStorage.columns[i].column) {
      return i;
    }
  }
}

// 카드 등록시 dataStorage에 저장하는 함수
async function pushCardIntoStorage(columnName, title, caption) {
  let index = findColumnIndex(columnName);

  dataStorage.columns[index].cards.unshift({
    title: title,
    caption: caption,
    id: new Date(),
  });

  // 서버부분 코드
  await addData(index);
}

// 카드 등록하기 위한 모달을 생성하는 함수
function registerModal(target) {
  let newTitle = "";
  let newContent = "";
  let columnName = target.querySelector(".column-name").innerText;

  let title = target.querySelector(".title-input");
  let content = target.querySelector(".caption-input");
  newTitle = title.value;
  newContent = content.value;

  pushCardIntoStorage(columnName, newTitle, newContent);

  let newSection = document.createElement("section");
  newSection.classList.add("todolist", "draggable");
  newSection.innerHTML = renderNewSection(newTitle, newContent);

  const [firstchild, listTitle, listCaption] = 
    multiSelector([".todolist", ".list-title", ".caption"]);

  changeLineWithEnter(title, listTitle);
  changeLineWithEnter(content, listCaption);

  target.insertBefore(newSection, firstchild);
  newCardHistory(columnName, newTitle);
  changeEveryCount();
  addEventToCard(target);
}

// 새로운 카드를 생성하는 함수
const renderNewSection = (newTitle, newContent) => newCardTemplate(newTitle, newContent);

// 새롭게 생성된 카드에 이벤트를 할당하는 함수
function addEventToCard(target) {
  let isTarget = target.querySelector(".x-content-button");
  let isPencil = target.querySelector(".modify-content-button");
  addEvent(target, [
    () => { if (isTarget.classList.contains("x-content-button")) {
        manageContent(isTarget);
    }},
    () => { if (isPencil.classList.contains("modify-content-button")) {
        modifyModal(isPencil);
    }}
  ]);
}

// 카드를 추가하는 모든 함수를 포함한 함수
function addCard(target) {
  const modal = target.closest(".open-modal");
  const title = modal.querySelector(".title-input");
  const caption = modal.querySelector(".caption-input");

  if (check_input_validity(title, caption) === 0) {
    let column = target.closest(".list-container");
    registerModal(column);
    closeModal(modal);
    let txtarea = modal.querySelectorAll(".textarea-input");
    for (let txt of txtarea) {
      txt.style.height = "auto";
    }
  }
}

// 카드 등록을 취소하는 함수
const cancelCardAddition = (target) => pipe(
  (modal) => closeModal(modal)
)(target.closest(".open-modal"));

// 카드 등록 및 취소 관련 이벤트 함수
function manageAddBtnEvent(target) {
  const addBtns = target.querySelectorAll(".add-button");
  const cancelBtns = target.querySelectorAll(".cancel-button");
  
  addBtns.forEach((btn) => addEvent(btn, [
    (event) => event.preventDefault(),
    () => addCard(btn)
  ]));

  cancelBtns.forEach((btn) => addEvent(btn, [() => cancelCardAddition(btn)]));
}

export { 
  contentTodo, contentDoing, contentDone,
  findColumnIndex, renderNewSection, addEventToCard, addCard, cancelCardAddition, manageAddBtnEvent
}