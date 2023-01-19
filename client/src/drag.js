import {
  storeTobeMovedItem,
  initializeBeforeMovedItem,
} from "./dataProcessing.js";
import { BeforeMovedItem } from "./store.js";
import { UpdateTodo } from "./api/rest.js";
document.body.ondragstart = function () {
  return false;
};

const checkDropable = (e, copy_item) => {
  copy_item.hidden = true;
  let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  copy_item.hidden = false;
  if (!elemBelow) return;
  return elemBelow;
};

const getShift = (e, origin_item) => {
  const shiftX = e.clientX - origin_item.getBoundingClientRect().left;
  const shiftY = e.clientY - origin_item.getBoundingClientRect().top;
  return { shiftX, shiftY };
};

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".todolist-items")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

const dragStart = (origin_item, copy_item) => {
  const draggingId = origin_item.dataset.id;
  const BeforeMovedStatus = origin_item?.closest("section")?.className;
  storeTobeMovedItem({ id: draggingId, status: BeforeMovedStatus });
  console.log("id", draggingId, "status", BeforeMovedStatus);

  origin_item.classList.toggle("dragged");
  document.body.append(copy_item);
  copy_item.classList.toggle("dragging");
};

export const doDragEvent = (e, origin_item) => {
  const { shiftX, shiftY } = getShift(e, origin_item);
  const copy_item = origin_item.cloneNode(true);
  dragStart(origin_item, copy_item);

  document.addEventListener("mousemove", onMouseMove);
  document.onmouseup = dragEnd;

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
    const todolist_section = checkDropable(e, copy_item)?.closest("section");
    if (!todolist_section) return;
    const todolist_ul = todolist_section.querySelector("ul");
    const afterElement = getDragAfterElement(todolist_section, e.clientY);
    if (afterElement === origin_item) return;
    if (!afterElement) todolist_ul.appendChild(origin_item);
    todolist_ul.insertBefore(origin_item, afterElement);
  }

  function dragEnd() {
    document.removeEventListener("mousemove", onMouseMove);
    copy_item.remove();
    origin_item.classList.toggle("dragged");
    if (origin_item?.closest("section")?.className === BeforeMovedItem.Status)
      return;
    UpdateTodo({
      obj: { Status: origin_item?.closest("section")?.className },
      id: BeforeMovedItem.Id,
    });
    initializeBeforeMovedItem();
  }

  function moveAt(pageX, pageY) {
    copy_item.style.left = pageX - shiftX + "px";
    copy_item.style.top = pageY - shiftY + "px";
  }
};
