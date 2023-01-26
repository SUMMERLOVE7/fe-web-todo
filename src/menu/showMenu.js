import { changeCSS, multiSelector } from "../helper/commonFunction.js";

const [menuBtn, menuScreen, closeMenuBtn] = 
  multiSelector([".menu-button", ".menu-screen", ".close-button"]);

// 알림창 보여주는 함수
function showMenu() {
  changeCSS(menuScreen, "display", "block");
  changeCSS(menuBtn, "display", "none");
  menuScreen.classList.add("show");
}

// 알림창 닫는 함수
function closeMenu() {
  changeCSS(menuScreen, "display", "none");
  changeCSS(menuBtn, "display", "block");
}

export { menuBtn, closeMenuBtn, showMenu, closeMenu }