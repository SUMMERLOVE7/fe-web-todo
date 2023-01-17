import { deleteCardHistory } from "../menu/updateMenu.js";
import { dataStorage } from "../store.js";
import { updateCount } from "./countCard.js";
import { findColumnIndex } from "./registerContent.js";

export let deleteContent = document.querySelectorAll(".x-content-button");
let deletePopup = document.querySelector(".delPopup");
let deletePopupBtn = document.querySelector(".del-popup");
let cancelDelBtn = document.querySelector(".undo-popup");

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
  deleteCardHistory();
}

function deleteCard(target, $columnCountTarget) {
  const columnName = $columnCountTarget.querySelector(".column-name").innerText;
  const cardIndex = findCardIndex($columnCountTarget, target);
  deleteCardFromStorage(columnName, cardIndex);
  console.log(dataStorage);
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
    showDelPopup();
    rmDelPopup($cardTarget);
  });
}

function showDelPopup() {
  deletePopup.style.display = "block";
  deletePopup.classList.add("show");
}

function rmDelPopup(target) {
  deletePopupBtn.addEventListener("click", () => {
    deleteList(target);
    deletePopup.style.display = "none";
  });
}

cancelDelBtn.addEventListener("click", () => {
  deletePopup.style.display = "none";
});

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

// function delArray(target) {
//   // let parentDiv = target.parentElement;
//   // let grandParentSection = parentDiv.parentElement; //card
//   // let ggrandParentDiv = grandParentSection.parentElement; //column

//   let grandParentSection = target.closest(".todolist");
//   let ggrandParentDiv = target.closest(".list-container");
//   // console.log(grandParentSection);
//   let columnName = ggrandParentDiv.querySelector(".column-name").innerText;
//   const cardIndex = findCardIndex(ggrandParentDiv, grandParentSection);
//   deleteCardFromStorage(columnName, cardIndex);
//   updateCount(ggrandParentDiv);
//   deleteCardHistory();
// }

//1 === 1 true
// [] === [] false
//{} === {} false
