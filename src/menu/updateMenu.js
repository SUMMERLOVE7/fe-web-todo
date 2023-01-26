let menuContainer = document.querySelector(".menu-content");

const [ADD_ACTION, MODIFY_ACTION, DELETE_ACTION] = ["add", "modify", "delete"];

function NoticeTemplate({ ActionType, columnName, cardTitle }) {
  return `<div class='menu-card'> 
  <div class='menu-emoji'>&#128526;</div> 
  <div class='one-menu-card'> 
    <div class = 'menu-person-name'> @Grace </div> 
    ${NoticeMessage({ ActionType, columnName, cardTitle })}
    <div>1분전<div>
  </div>
</div>`;
}

function NoticeMessage({ ActionType, columnName, cardTitle }) {
  if (ActionType === ADD_ACTION)
    return addCardMessage({ columnName, cardTitle });

  if (ActionType === MODIFY_ACTION)
    return modifyCardMessage({ columnName, cardTitle });

  if (ActionType === DELETE_ACTION)
    return deleteCardMessage({ columnName, cardTitle });
}

function addCardMessage({ columnName, cardTitle }) {
  const addActionMessage = `<div class = 'menu-caption'> ${columnName}에 ${cardTitle}이/가 추가되었습니다. </div>`;
  return addActionMessage;
}

function modifyCardMessage({ columnName, cardTitle }) {
  const modifyActionMessage = `<div class = 'menu-caption'> ${columnName}의 카드 제목이 ${cardTitle}(으)로 수정되었습니다. </div>`;
  return modifyActionMessage;
}

function deleteCardMessage({ columnName, cardTitle }) {
  const deleteActionMessage = `<div class = 'menu-caption'> ${columnName} 칼럼의 ${cardTitle} 카드가 삭제되었습니다. </div>`;
  return deleteActionMessage;
}

export function newCardHistory({ ActionType, columnName, cardTitle }) {
  let newDiv = document.createElement("div");
  let newClass = document.createAttribute("class");
  newClass.value = "menu-card";
  newDiv.setAttributeNode(newClass);

  newDiv.innerHTML = NoticeTemplate({ ActionType, columnName, cardTitle });

  menuContainer.prepend(newDiv);
}

export function modifyCardHistory(columnName, cardTitle) {
  let newDiv = document.createElement("div");
  let newClass = document.createAttribute("class");
  newClass.value = "menu-card";
  newDiv.setAttributeNode(newClass);

  newDiv.innerHTML = `<div class='menu-card'> 
    <div class='menu-emoji'>&#128526;</div> 
    <div class='one-menu-card'> 
      <div class = 'menu-person-name'> @Grace </div> 
      <div class = 'menu-caption'> ${columnName}의 카드 제목이 ${cardTitle}(으)로 수정되었습니다. </div>
    </div>
  </div>`;

  menuContainer.prepend(newDiv);
}

export function deleteCardHistory(columnName, cardTitle) {
  let newDiv = document.createElement("div");
  let newClass = document.createAttribute("class");
  newClass.value = "menu-card";
  newDiv.setAttributeNode(newClass);

  newDiv.innerHTML = `<div class='menu-card'> 
    <div class='menu-emoji'>&#128526;</div> 
    <div class='one-menu-card'> 
      <div class = 'menu-person-name'> @Grace </div> 
      <div class = 'menu-caption'> ${columnName} 칼럼의 ${cardTitle} 카드가 삭제되었습니다. </div>
    </div>
  </div>`;

  menuContainer.prepend(newDiv);
}
