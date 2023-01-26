import { addEvent, pipe } from "../helper/commonFunction.js";

// 모달창 띄우는 함수
function showModal(target) {
  target.style.display = "block";
  target.classList.add("show");
}

// + 버튼 클릭시 카드 추가 모달 띄우는 함수
const openModal = (target) => pipe(
  (plusBtns) => plusBtns.forEach((plus) => addEvent(plus, [() => {
    const column = plus.closest(".list-container");
    const modal = column.querySelector(".open-modal");
    modal.style.width = "280px";
    showModal(modal);
}]))
)(target.querySelectorAll(".plus-button"));

// 취소 버튼을 클릭하거나 카드 등록 후 모달창 초기화하는 부분
const closeModal = (target) => pipe(
  ([titleInput, captionInput]) => { 
    titleInput.value = "";
    captionInput.value = ""; },
  () => target.style.display = "none"
)([target.querySelector(".title-input"), target.querySelector(".caption-input")]);

// 사용자의 입력값을 받아 엔터키가 존재하면 줄바꿈을 하도록 하는 함수
function changeLineWithEnter(inputHeight, target) {
  target.innerHTML = target.textContent.replace(/(?:\n)/g, "<br>");
  target.style.height = inputHeight + 10 + "px";
}

// 사용자의 입력값에 해당하는 높이값으로 설정하는 함수
function resizeTextarea(object) {
  object.style.height = "auto";
  object.style.height = object.scrollHeight + "px";
}

// 사용자가 엔터를 입력하거나 지우면 그에 따라 줄바꿈 이벤트를 할당하는 함수
const resizeTextareaEvent = (target) => pipe(
  ($txtArea) => $txtArea.forEach((txt) => {
    txt.style.height = txt.scrollHeight + 16 + "px";
    addEvent(txt, [() => resizeTextarea(txt)], "keydown");
    addEvent(txt, [() => resizeTextarea(txt)], "keyup");
  })
)(target.querySelectorAll(".textarea-input"));

export { showModal, openModal, closeModal, changeLineWithEnter, resizeTextarea, resizeTextareaEvent }