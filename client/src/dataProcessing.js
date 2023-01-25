import {
  BeforeUpdateItem,
  InputData,
  ToBeDeleted,
  BeforeMovedItem,
} from "./store.js";

const initializeToBeUpdatedItem = () => {
  BeforeUpdateItem.Id = null;
  BeforeUpdateItem.Status = "";
  BeforeUpdateItem.Title = "";
  BeforeUpdateItem.Contents = "";
};

const initializeInputData = () => {
  InputData["title"] = "";
  InputData["contents"] = "";
};

const initializeBothData = () => {
  initializeToBeUpdatedItem();
  initializeInputData();
};

const initializeBeforeMovedItem = () => {
  BeforeMovedItem.Id = null;
  BeforeMovedItem.Status = null;
};

const storeToBeUpdatedItem = (update_element) => {
  BeforeUpdateItem.Id = update_element.dataset.id;
  BeforeUpdateItem.Status = update_element.closest("section").className;
  BeforeUpdateItem.Title = update_element.querySelector(
    ".todolist-items-title"
  ).innerText;
  BeforeUpdateItem.Contents = update_element.querySelector(
    ".todolist-items-contents"
  ).innerText;
};

const storeTobeMovedItem = ({ id, status }) => {
  BeforeMovedItem.Id = id;
  BeforeMovedItem.Status = status;
};

const storeInputData = () => {
  InputData["title"] = BeforeUpdateItem.Title;
  InputData["contents"] = BeforeUpdateItem.Contents;
};

const storeDeletedItem = (id) => {
  const toBedeleted = document.querySelector(
    `.todolist-items[data-id = "${id}"]`
  );
  ToBeDeleted.Id = id;
  ToBeDeleted.Status = toBedeleted.closest("section").className;
  ToBeDeleted.Title = toBedeleted.querySelector("h3").innerText;
  ToBeDeleted.Contents = toBedeleted.querySelector("p").innerText;
};

export {
  initializeToBeUpdatedItem,
  initializeInputData,
  storeToBeUpdatedItem,
  storeInputData,
  storeDeletedItem,
  initializeBothData,
  storeTobeMovedItem,
  initializeBeforeMovedItem,
};
