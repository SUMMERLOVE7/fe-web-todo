import { BeforeUpdateItem, InputData, ToBeDeleted } from "./store.js";

const initializeToBeUpdatedItem = () => {
  BeforeUpdateItem.Status = "";
  BeforeUpdateItem.Title = "";
  BeforeUpdateItem.Contents = "";
};

const initializeInputData = () => {
  InputData["title"] = "";
  InputData["contents"] = "";
};

const storeToBeUpdatedItem = (update_element) => {
  BeforeUpdateItem.Status = update_element.closest("section").className;
  BeforeUpdateItem.Title = update_element.querySelector("h3").innerText;
  BeforeUpdateItem.Contents = update_element.querySelector("p").innerText;
};

const storeInputData = () => {
  InputData["title"] = BeforeUpdateItem.Title;
  InputData["contents"] = BeforeUpdateItem.Contents;
};

const storeDeletedItem = (id) => {
  const toBedeleted = document.querySelector(
    `.todolist-items[data-id = "${id}"]`
  );
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
};
