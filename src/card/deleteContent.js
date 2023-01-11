import { todo_list, doing_list, done_list } from "../store.js";
//import todo_list from "../store.js";
import { changeEveryCount, countCard, updateCount } from "./countCard.js";
import { contentDoing, contentTodo, contentDone } from "./registerContent.js";

//let deleteContent = document.getElementsByClassName("x-content-button");
let deleteContent = document.querySelectorAll(".x-content-button");
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

for (let del of deleteContent) {
  del.addEventListener("mouseover", (e) => {
    hoverRed(del);
  });
  del.addEventListener("mouseout", (e) => {
    mouseOut(del);
  });
  del.addEventListener("click", (e) => {
    e.preventDefault();
    showDelPopup();
    rmDelPopup(del);
    //deleteList(del);
  });
}

// export function manageContent(target) {
//   target.addEventListener("mouseover", (e) => {
//     hoverRed(target);
//   });
//   target.addEventListener("mouseout", (e) => {
//     mouseOut(target);
//   });
//   // target.addEventListener("click", (e) => {
//   //   e.preventDefault();
//   //   deleteList(target);
//   // });
// }

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
    //delArray(target);
    rmDelPopup(target);
  });
}

function showDelPopup() {
  deletePopup.style.display = "block";
  deletePopup.classList.add("show");
}

function rmDelPopup(target) {
  console.log("rmpopup");
  deletePopupBtn.addEventListener("click", () => {
    console.log("delpopup");
    delArray(target); ////
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
  //console.log(todolist);
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement; //card
  let ggrandParentDiv = grandParentSection.parentElement; //column
  //const cards = [...ggrandParentDiv.querySelectorAll(".todolist")];
  //const card = grandParentSection;
  //const idx = cards.findIndex((ele) => ele === card);
  let title = parentDiv.querySelector(".list-title").innerText;
  let caption = grandParentSection.querySelector(".caption").innerText;
  if (ggrandParentDiv.classList.contains("havetodo-container")) {
    const idx = findCardIndex(ggrandParentDiv, grandParentSection);
    // const cards = [...ggrandParentDiv.querySelectorAll(".todolist")];
    // const card = grandParentSection;
    // const idx = cards.findIndex((ele) => ele === card);
    todo_list.splice(idx, 1);
    //console.log(todo_list);
    updateCount(contentTodo, todo_list);
  } else if (ggrandParentDiv.classList.contains("doing-container")) {
    const cards = [...ggrandParentDiv.querySelectorAll(".todolist")];
    const card = grandParentSection;
    const idx = cards.findIndex((ele) => ele === card);
    //debugger;
    doing_list.splice(idx, 1);
    updateCount(contentDoing, doing_list);
  } else if (ggrandParentDiv.classList.contains("done-container")) {
    const cards = [...ggrandParentDiv.querySelectorAll(".todolist")];
    const card = grandParentSection;
    const idx = cards.findIndex((ele) => ele === card);
    done_list.splice(idx, 1);
    console.log(done_list.length);
    updateCount(contentDone, done_list);
  }

  //todo_list.splice(idx, 1);
}

//1 === 1 true
// [] === [] false
//{} === {} false
