import { todo_list, doing_list, done_list } from "../store.js";
import { updateCount } from "./countCard.js";
import { contentDoing, contentTodo, contentDone } from "./registerContent.js";

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

function deleteList(element) {
  //let parentDiv = element.closest("div");
  //let grandParentSection = parentDiv.closest("section");
  //target.addEventListner('click', grandParentSection.style.display = 'none');
  let parentDiv = element.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.display = "none";
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
    showDelPopup();
    rmDelPopup(target);
  });
}

function showDelPopup() {
  deletePopup.style.display = "block";
  deletePopup.classList.add("show");
}

function rmDelPopup(target) {
  deletePopupBtn.addEventListener("click", () => {
    delArray(target);
    deleteList(target);
    deletePopup.style.display = "none";
  });
}

cancelDelBtn.addEventListener("click", () => {
  deletePopup.style.display = "none";
});

function findCardIndex(targetDiv, targetSection) {
  const cards = [...targetDiv.querySelectorAll(".todolist")];
  const card = targetSection;
  const idx = cards.findIndex((ele) => ele === card);
  return idx;
}

function delArray(target) {
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement; //card
  let ggrandParentDiv = grandParentSection.parentElement; //column

  if (ggrandParentDiv.classList.contains("havetodo-container")) {
    const idx = findCardIndex(ggrandParentDiv, grandParentSection);
    todo_list.splice(idx, 1);
    updateCount(contentTodo, todo_list);
  } else if (ggrandParentDiv.classList.contains("doing-container")) {
    const idx = findCardIndex(ggrandParentDiv, grandParentSection);
    doing_list.splice(idx, 1);
    updateCount(contentDoing, doing_list);
  } else if (ggrandParentDiv.classList.contains("done-container")) {
    const idx = findCardIndex(ggrandParentDiv, grandParentSection);
    done_list.splice(idx, 1);
    updateCount(contentDone, done_list);
  }
}

//1 === 1 true
// [] === [] false
//{} === {} false
