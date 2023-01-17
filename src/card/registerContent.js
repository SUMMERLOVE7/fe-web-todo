import { closeModal } from "./inputContent.js";
import { dataStorage } from "../store.js";
import { manageContent } from "./deleteContent.js";
import { updateCount, changeEveryCount } from "./countCard.js";
import { newCardHistory } from "../menu/updateMenu.js";
import { modifyModal } from "./modifyContent.js";

export let addTodoButton = document.querySelector(".todo-add-button");
export let contentTodo = document.querySelector(".havetodo-container");
export let contentDoing = document.querySelector(".doing-container");
export let contentDone = document.querySelector(".done-container");

function valid_title_input(target) {
  if (!target.value) {
    alert("제목을 입력해주세요");
    return -1;
  } else {
    return 0;
  }
}

function valid_caption_input(target) {
  if (!target.value) {
    alert("내용을 입력해주세요");
    return -1;
  } else {
    return 0;
  }
}

function check_input_validity(title, caption) {
  if (valid_title_input(title) === 0 && valid_caption_input(caption) === 0) {
    return 0;
  } else return -1;
}

export function findColumnIndex(element) {
  for (let i = 0; i < dataStorage.columns.length; i++) {
    if (element === dataStorage.columns[i].column) {
      return i;
    }
  }
}

function pushCardIntoStorage(columnName, title, caption) {
  let index = findColumnIndex(columnName);

  dataStorage.columns[index].cards.unshift({
    title: title,
    caption: caption,
  });
}

function registerModal(target) {
  let newTitle = "";
  let newContent = "";
  let columnName = target.querySelector(".column-name").innerText;

  newTitle = target.querySelector(".title-input").value;
  newContent = target.querySelector(".caption-input").value;

  pushCardIntoStorage(columnName, newTitle, newContent);

  let newSection = document.createElement("section");
  let newClass = document.createAttribute("class");

  newClass.value = "todolist";
  newSection.setAttributeNode(newClass);

  newSection.innerHTML = renderNewSection(newTitle, newContent);

  let firstchild = target.querySelector(".todolist");
  target.insertBefore(newSection, firstchild);
  newCardHistory();
  changeEveryCount();
  addEvent(target);
}

export function renderNewSection(newTitle, newContent) {
  return `<div class = 'list-header'> <div class = 'list-title'>
  ${newTitle} </div> <div class='caption'>
  ${newContent}
  </div></div><div class='button-container'><button type='button' class='x-content-button'>
  <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'>
  <path d='M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z' fill='black'/>
  </svg></button><button type='button' class='modify-content-button'>
  <svg xmlns='http://www.w3.org/2000/svg' width='15' height='14' viewBox='0 0 15 14' fill='none'>
  <path d='M13.7619 2.8366L11.2012 0.262865C11.032 0.0945094 10.803 0 10.5643 0C10.3256 0 10.0967 0.0945094 9.92745 0.262865L0.849572 9.32765L0.0207413 12.9047C-0.00785061 13.0355 -0.00687046 13.171 0.02361 13.3013C0.0540905 13.4316 0.113301 13.5535 0.196917 13.658C0.280533 13.7626 0.386441 13.8471 0.506905 13.9054C0.62737 13.9638 0.759346 13.9945 0.893194 13.9953C0.955562 14.0016 1.0184 14.0016 1.08077 13.9953L4.69709 13.1664L13.7619 4.11038C13.9302 3.94117 14.0247 3.71219 14.0247 3.47349C14.0247 3.2348 13.9302 3.00581 13.7619 2.8366ZM4.26086 12.3812L0.871383 13.0923L1.6435 9.76824L8.43555 3.00237L11.0529 5.61973L4.26086 12.3812ZM11.6375 4.9872L9.02009 2.36984L10.5382 0.860495L13.1119 3.47785L11.6375 4.9872Z' fill='#828282'/>
  </svg></button></div>`;
}

export function addEvent(target) {
  let isTarget = target.querySelector(".x-content-button");
  let isPencil = target.querySelector(".modify-content-button");

  target.addEventListener("click", () => {
    if (isTarget.classList.contains("x-content-button")) {
      manageContent(isTarget);
    }
    if (isPencil.classList.contains("modify-content-button")) {
      modifyModal(isPencil);
    }
  });
}

export function addCard(target) {
  const modal = target.closest(".open-modal");
  const title = modal.querySelector(".title-input");
  const caption = modal.querySelector(".caption-input");

  if (check_input_validity(title, caption) === 0) {
    let column = target.closest(".list-container");
    registerModal(column);
    closeModal(modal);
  }
}

export function cancelCardAddition(target) {
  let modal = target.closest(".open-modal");
  closeModal(modal);
}

export function manageAddBtnEvent() {
  let addBtns = document.querySelectorAll("#add-button");

  for (let btn of addBtns) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addCard(btn);
    });
  }

  const addBtn = document.querySelectorAll("#cancel-button");
  for (let btn of addBtn) {
    btn.addEventListener("click", () => {
      cancelCardAddition(btn);
    });
  }
}

// addTodoButton.addEventListener("click", (e) => {
//   e.preventDefault(); //새로고침 방지

//   if (
//     valid_title_input(todoTitleInput) === 0 &&
//     valid_caption_input(todoCaptionInput) === 0
//   ) {
//     registerModal(contentTodo);
//   }
// });
// addDoingButton.addEventListener("click", (e) => {
//   e.preventDefault(); //새로고침 방지

//   if (
//     valid_title_input(doingTitleInput) === 0 &&
//     valid_caption_input(doingCaptionInput) === 0
//   ) {
//     registerModal(contentDoing);
//   }
// });
// addDoneButton.addEventListener("click", (e) => {
//   e.preventDefault(); //새로고침 방지

//   if (
//     valid_title_input(doneTitleInput) === 0 &&
//     valid_caption_input(doneCaptionInput) === 0
//   ) {
//     registerModal(contentDone);
//   }
// });
