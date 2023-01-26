import { newCardLogTemplate, updateCardLogTemplate, deleteCardLogTemplate } from "../template/menuLog.js";

const menuContainer = document.querySelector(".menu-content");

const getMenuLogNode = (templateHTML) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("menu-card");
  newDiv.innerHTML = templateHTML;

  return newDiv;
}

function newCardHistory(columnName, cardTitle) {
  const newDiv = getMenuLogNode(newCardLogTemplate(columnName, cardTitle));
  menuContainer.prepend(newDiv);
}

function modifyCardHistory(columnName, cardTitle) {
  const newDiv = getMenuLogNode(updateCardLogTemplate(columnName, cardTitle));
  menuContainer.prepend(newDiv);
}

function deleteCardHistory(columnName, cardTitle) {
  const newDiv = getMenuLogNode(deleteCardLogTemplate(columnName, cardTitle));
  menuContainer.prepend(newDiv);
}

export { newCardHistory, modifyCardHistory, deleteCardHistory }