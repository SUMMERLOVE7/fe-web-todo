import { showPopup } from "../card/deleteContent.js";
import { openModal } from "../card/inputContent.js";
import { manageAddBtnEvent } from "../card/registerContent.js";
import { dataStorage } from "../store.js";
import { deleteColumn } from "./ColumnDeletion.js";

const columnPopup = document.querySelector(".columnPopup");
export const cancelColBtn = document.querySelector(".undo-column-button");

// 칼럼 추가하는 모달창 초기화하는 함수
function closePopup() {
  const columnInput = document.querySelector(".new-column-title");
  columnInput.value = "";
  columnPopup.style.display = "none";
}

// 칼럼 이름 가져오는 함수
export function getColumnName() {
  let newColumnName = document.querySelector(".new-column-title").value;
  return newColumnName;
}

// 칼럼 등록하는 함수
export function registerColumn() {
  const registerColBtn = document.querySelector(".confirm-column-button");
  registerColBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addColumn();
    closePopup();
  });
}

// 칼럼 추가하기 위한 모달 띄우는 함수
export function openColumnModal() {
  const plusColumnBtn = document.querySelector(".plus-column-button");

  plusColumnBtn.addEventListener("click", (e) => {
    showPopup(columnPopup);
  });
}

// 칼럼 추가하고 dataStorage에 삽입하는 함수
export function addColumn() {
  const columnContainer = document.querySelector(".column-container");

  let newDiv = document.createElement("div");
  let newClass = document.createAttribute("class");

  newClass.value = "list-container";
  newDiv.setAttributeNode(newClass);

  let newColumnName = getColumnName();
  newDiv.innerHTML = createColumnHTML(newColumnName);
  columnContainer.appendChild(newDiv);

  dataStorage.columns.push({ column: newColumnName, cards: [] });
  openModal(columnContainer);
  deleteColumn(columnContainer);
  manageAddBtnEvent(columnContainer);
}

// 새로운 칼럼 html 코드 생성하는 함수
export function createColumnHTML(columnTitle) {
  return `<div class="container-title">
    <h3 class="column-name">${columnTitle}</h3>
    <div class="count-container">
      <div class="count">0</div>
    </div>

    <div class="plus-x-button">
      <button class="plus-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M0.105709 7.53033L0.105709 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105709Z" fill="black" />
        </svg>
      </button>
      <button class="x-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z" fill="black" />
        </svg>
      </button>
    </div>
  </div>
  <div class="${columnTitle}-content">
    <div class="open-modal-content">
      <section class="hidden open-modal">
        <div class="list-title-modal">
          <textarea type="text" class="title-input textarea-input" placeholder="제목을 입력하세요." rows="1"></textarea>
        </div>
        <form>
          <div class="caption-modal">
            <textarea type="text" class="caption-input textarea-input" placeholder="내용을 입력하세요." rows="1"></textarea>
          </div>
          <div class="modal-button">
            <button type="button" class="cancel-button">취소</button>
            <button type="submit" class="add-button">등록</button>
          </div>
        </form>
      </section>
    </div>
  </div>`;
}
