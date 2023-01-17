let addTodoContent = document.querySelector("#plus-todo-button");
let closeTodoContent = document.querySelector("#x-todo-button");
// export let todoTitleInput = document.querySelector(".todo-title-input");
// export let todoCaptionInput = document.querySelector(".todo-caption-input");
export let openTodoModal = document.querySelector("#open-modal-todo");

let addDoingContent = document.querySelector("#plus-doing-button");
// export let doingTitleInput = document.querySelector(".doing-title-input");
// export let doingCaptionInput = document.querySelector(".doing-caption-input");
export let openDoingModal = document.querySelector("#open-modal-doing");
let closeDoingContent = document.querySelector("#x-doing-button");

let addDoneContent = document.querySelector("#plus-done-button");
// export let doneTitleInput = document.querySelector(".done-title-input");
// export let doneCaptionInput = document.querySelector(".done-caption-input");
export let openDoneModal = document.querySelector("#open-modal-done");
let closeDoneContent = document.querySelector("#x-done-button");

export function showModal(target) {
  target.style.display = "block";
  target.classList.add("show");
}

export function modal() {
  return `<section id="open-modal" class="hidden">
  <div class="list-title-modal">
      <input type="text" class="title-input" name="title-input" placeholder="제목을 입력하세요."> </input>
  </div>
  <form>
      <div class="caption-modal">
          <input type="text" class="caption-input" name="caption-input" placeholder="내용을 입력하세요."> </input>
      </div>
      <div class="modal-button">
          <button type="button" class="cancel-button"> 취소 </button>
          <button type="submit" class = "add-button"> 등록 </button>                    
      </div>
  </form>  
</section>`;
}

export function openModal() {
  const plusBtns = document.querySelectorAll(".plus-button");

  for (let plus of plusBtns) {
    plus.addEventListener("click", () => {
      const column = plus.closest(".list-container");
      const modal = column.querySelector(".open-modal");
      showModal(modal);
    });
  }
}

// addTodoContent.addEventListener("click", () => openModal(openTodoModal));
// addDoingContent.addEventListener("click", () => openModal(openDoingModal));
// addDoneContent.addEventListener("click", () => openModal(openDoneModal));

// export function closeModal(target) {
//   target.style.display = "none";
// }

export function closeModal(target) {
  const titleInput = target.querySelector(".title-input");
  const captionInput = target.querySelector(".caption-input");
  titleInput.value = "";
  captionInput.value = "";
  target.style.display = "none";
}

export function resizeTextarea(object) {
  object.style.height = "auto";
  object.style.height = object.scrollHeight + 16 + "px";
}

export function resizeTextareaEvent() {
  let txtarea = document.querySelectorAll(".textarea-input");

  for (let txt of txtarea) {
    txt.addEventListener("keydown", resizeTextarea(txt));
    txt.addEventListener("keyup", resizeTextarea(txt));
  }
}
// export function closeTodo() {
//   todoTitleInput.value = "";
//   todoCaptionInput.value = "";
//   closeModal(openTodoModal);
// }
//closeTodoContent.addEventListener('click', () => closeTodo());

// export function closeDoing() {
//   doingTitleInput.value = "";
//   doingCaptionInput.value = "";
//   closeModal(openDoingModal);
// }
//closeDoingContent.addEventListener('click', () => closeDoing());

// export function closeDone() {
//   doneTitleInput.value = "";
//   doneCaptionInput.value = "";
//   closeModal(openDoneModal);
// }
//closeDoneContent.addEventListener('click', () => closeDone());

//import {example, aaa} = 'aaaa.js';

/*
export function example(target){
    target.style.display="block";
    target.classList.add("show");
    todoTitleInput.value = '';
    todoCaptionInput.value = '';
}
*/
