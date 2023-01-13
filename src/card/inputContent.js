let addTodoContent = document.querySelector("#plus-todo-button");
let closeTodoContent = document.querySelector("#x-todo-button");
export let todoTitleInput = document.querySelector(".todo-title-input");
export let todoCaptionInput = document.querySelector(".todo-caption-input");
export let openTodoModal = document.querySelector("#open-modal-todo");

let addDoingContent = document.querySelector("#plus-doing-button");
export let doingTitleInput = document.querySelector(".doing-title-input");
export let doingCaptionInput = document.querySelector(".doing-caption-input");
export let openDoingModal = document.querySelector("#open-modal-doing");
let closeDoingContent = document.querySelector("#x-doing-button");

let addDoneContent = document.querySelector("#plus-done-button");
export let doneTitleInput = document.querySelector(".done-title-input");
export let doneCaptionInput = document.querySelector(".done-caption-input");
export let openDoneModal = document.querySelector("#open-modal-done");
let closeDoneContent = document.querySelector("#x-done-button");

export function openModal(target) {
  target.style.display = "block";
  target.classList.add("show");
}

export function createModal(target) {
  let container = target.closest("#list-container");
  let modal = container.querySelector("open-modal-content");
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

addTodoContent.addEventListener("click", () => openModal(openTodoModal));
addDoingContent.addEventListener("click", () => openModal(openDoingModal));
addDoneContent.addEventListener("click", () => openModal(openDoneModal));

export function closeModal(target) {
  target.style.display = "none";
}

export function closeTodo() {
  todoTitleInput.value = "";
  todoCaptionInput.value = "";
  closeModal(openTodoModal);
}
//closeTodoContent.addEventListener('click', () => closeTodo());

export function closeDoing() {
  doingTitleInput.value = "";
  doingCaptionInput.value = "";
  closeModal(openDoingModal);
}
//closeDoingContent.addEventListener('click', () => closeDoing());

export function closeDone() {
  doneTitleInput.value = "";
  doneCaptionInput.value = "";
  closeModal(openDoneModal);
}
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
//example(openTodoModal)
//example(openDoingModal)
