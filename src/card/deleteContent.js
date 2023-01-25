import { delData } from "../../server/server.js";
import { deleteCardHistory } from "../menu/updateMenu.js";
import { dataStorage } from "../store.js";
import { updateCount } from "./countCard.js";
import { findColumnIndex } from "./registerContent.js";

export let deleteContent = document.querySelectorAll(".x-content-button");
export let deletePopup = document.querySelector(".delPopup");
let deletePopupBtn = document.querySelector(".del-popup");
export let cancelDelBtn = document.querySelector(".undo-popup");

function hoverRed(target) {
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.borderColor = "red";
  grandParentSection.style.backgroundColor = "seashell";
}

function mouseOut(target) {
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.borderColor = "white";
  grandParentSection.style.backgroundColor = "white";
}

function deleteList(target) {
  const $columnCountTarget = target.closest(".list-container");
  deleteCard(target, $columnCountTarget);
  target.remove();
  updateCount($columnCountTarget);
}

function deleteCard(target, $columnCountTarget) {
  const columnName = $columnCountTarget.querySelector(".column-name").innerText;
  const cardIndex = findCardIndex($columnCountTarget, target);
  const cardTitle = target.querySelector(".list-title").innerText;
  deleteCardFromStorage(columnName, cardIndex);
  deleteCardHistory(columnName, cardTitle);

  // 서버부분 코드
  // const columnIdx = findColumnIndex(columnName);
  // delData(columnIdx, cardIndex);
}

export function manageContent(target) {
  target.addEventListener("mouseover", (e) => {
    hoverRed(target);
  });
  target.addEventListener("mouseout", (e) => {
    mouseOut(target);
  });

  target.addEventListener("click", (e) => {
    e.preventDefault();
    const $cardTarget = e.target.closest(".todolist");

    if (!$cardTarget) return;
    showPopup(deletePopup);
    rmDelPopup($cardTarget);
  });
}

export function showPopup(target) {
  target.style.display = "block";
  target.classList.add("show");
}

function rmDelPopup(target) {
  deletePopupBtn.addEventListener("click", () => {
    deleteList(target);
    deletePopup.style.display = "none";
  });
}

export function findCardIndex(targetDiv, targetSection) {
  const cards = [...targetDiv.querySelectorAll(".todolist")];
  const card = targetSection;
  const idx = cards.findIndex((ele) => ele === card);
  return idx;
}

function deleteCardFromStorage(columnName, cardIndex) {
  const index = findColumnIndex(columnName);
  dataStorage.columns[index].cards.splice(cardIndex, 1);
}
