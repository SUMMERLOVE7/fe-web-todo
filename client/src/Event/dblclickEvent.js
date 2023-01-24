import { storeInputData, storeToBeUpdatedItem } from "../dataProcessing.js";
import { addInputEvent } from "./inputEvent.js";
import { render } from "../render.js";
import { makeInputFormTemplate } from "../template.js";
import { Todos, TodosStatus } from "../store.js";
import { autoResizeTextarea } from "../utils.js";

const updateListItem = (update_element) => {
  storeToBeUpdatedItem(update_element);
  storeInputData();
  update_element.className = "input-items";
  update_element.setAttribute("tabindex", "-1");
  update_element.innerHTML = makeInputFormTemplate();
  addInputEvent();
};

const updateColumn = (to_be_updated_column) => {
  const before_updated_title =
    to_be_updated_column.querySelector(".todo-column").innerText;
  to_be_updated_column.innerHTML = `
      <input class = "update-title" maxlength = 50 value = "${before_updated_title}"></input>
    `;
  const update_title = to_be_updated_column.querySelector(".update-title");
  update_title.addEventListener("keydown", autoResizeTextarea, true);
  update_title.addEventListener("focusout", () => {
    const updated_column = update_title.value;

    TodosStatus[TodosStatus.findIndex((e) => e === before_updated_title)] =
      updated_column;

    Todos.forEach((e) => {
      if (e.Status === before_updated_title) e.Status = updated_column;
    });
    render();
  });
};

const dblclickEvent = (body) => {
  body.addEventListener("dblclick", (e) => {
    const update_element = e.target.closest(".todolist-items");
    const to_be_updated_column = e.target.closest(".todo-header");
    if (!(update_element || to_be_updated_column)) return;

    //리스트 수정
    if (update_element) {
      updateListItem(update_element);
      return;
    }

    //컬럼 수정
    updateColumn(to_be_updated_column);
  });
};

export { dblclickEvent };
