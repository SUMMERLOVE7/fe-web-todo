let menuContainer = document.querySelector(".menu-content");
let emojiContainer = document.querySelector(".menu-emoji");
let menuCardTitle = document.querySelector(".menu-person-name");
let menuCaption = document.querySelector(".menu-caption");

export function updateHistory() {}

export function newCardHistory() {
  let newDiv = document.createElement("div");
  let newClass = document.createAttribute("class");
  newClass.value = "menu-card";
  newDiv.setAttributeNode(newClass);

  newDiv.innerHTML =
    "<div class='menu-card' style='display : flex; margin-top : 10px;'> <div class='menu-emoji' style='font-size : 40px; margin: 10px;'>&#128526;</div> <div class='one-menu-card'> <div class = 'menu-person-name' style='margin : 10px;'> @Grace </div> <div class = 'menu-caption' style = 'margin-left : 10px;'> 칼럼에 카드가 추가되었습니다. </div></div></div>";

  menuContainer.prepend(newDiv);
}

export function modifyCardHistory() {
  let newDiv = document.createElement("div");
  let newClass = document.createAttribute("class");
  newClass.value = "menu-card";
  newDiv.setAttributeNode(newClass);

  newDiv.innerHTML =
    "<div class='menu-card' style='display : flex; margin-top : 10px;'> <div class='menu-emoji' style='font-size : 40px; margin: 10px;'>&#128526;</div> <div class='one-menu-card'> <div class = 'menu-person-name' style='margin : 10px;'> @Grace </div> <div class = 'menu-caption' style = 'margin-left : 10px;'> 칼럼의 카드가 수정되었습니다. </div></div></div>";

  menuContainer.prepend(newDiv);
}

export function deleteCardHistory() {
  let newDiv = document.createElement("div");
  let newClass = document.createAttribute("class");
  newClass.value = "menu-card";
  newDiv.setAttributeNode(newClass);

  newDiv.innerHTML =
    "<div class='menu-card' style='display : flex; margin-top : 10px;'> <div class='menu-emoji' style='font-size : 40px; margin: 10px;'>&#128526;</div> <div class='one-menu-card'> <div class = 'menu-person-name' style='margin : 10px;'> @Grace </div> <div class = 'menu-caption' style = 'margin-left : 10px;'> 칼럼의 카드가 삭제되었습니다. </div></div></div>";

  menuContainer.prepend(newDiv);
}
