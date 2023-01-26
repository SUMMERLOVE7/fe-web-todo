import { showPopup } from "../card/deleteContent.js";
import { openModal } from "../card/inputContent.js";
import { manageAddBtnEvent } from "../card/registerContent.js";
import { addEvent, multiSelector, pipe } from "../helper/commonFunction.js";
import { dataStorage } from "../store.js";
import { columnTemplate } from "../template/column.js";
import { deleteColumn } from "./ColumnDeletion.js";

const [columnPopup, cancelColBtn] = multiSelector([".columnPopup", ".undo-column-button"]);

// 칼럼 추가하는 모달창 초기화하는 함수
const closePopup = () => pipe(
  ($columnInput) => $columnInput.value = "",
  () => columnPopup.style.display = "none"
)(document.querySelector(".new-column-title"));

// 칼럼 이름 가져오는 함수
const getColumnName = () => pipe(
  (newColumnName) => newColumnName
)(document.querySelector(".new-column-title").value);

// 칼럼 등록하는 함수
const registerColumn = () => pipe(
  (columnRegisterBtn) => addEvent(columnRegisterBtn, [
    (event) => event.preventDefault(),
    () => addColumn(),
    () => closePopup()
  ])
)(document.querySelector(".confirm-column-button"));

// 칼럼 추가하기 위한 모달 띄우는 함수
const openColumnModal = () => pipe(
  (columnAddBtn) => addEvent(columnAddBtn, [() => showPopup(columnPopup)])
)(document.querySelector(".plus-column-button"));

// 칼럼 추가하고 dataStorage에 삽입하는 함수
function addColumn() {
  const columnContainer = document.querySelector(".column-container");
  const newDiv = document.createElement("div");
  const newColumnName = getColumnName();

  newDiv.classList.add("list-container");
  newDiv.setAttributeNode(newClass);
  newDiv.innerHTML = createColumnHTML(newColumnName);
  columnContainer.appendChild(newDiv);

  dataStorage.columns.push({ column: newColumnName, cards: [] });
  openModal(columnContainer);
  deleteColumn(columnContainer);
  manageAddBtnEvent(columnContainer);
}

// 새로운 칼럼 html 코드 생성하는 함수
const createColumnHTML = (columnTitle) => columnTemplate(columnTitle);

export { cancelColBtn, getColumnName, registerColumn, openColumnModal, addColumn, createColumnHTML }