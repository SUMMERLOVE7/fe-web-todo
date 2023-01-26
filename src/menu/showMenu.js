import { multiSelector } from "../helper/commonFunction.js";

const [menuBtn, menuScreen, closeMenuBtn] = 
  multiSelector([".menu-button", ".menu-screen", ".close-button"]);

// 알림창 보여주는 함수
function showMenu() {
  menuScreen.style.display = "block";
  menuBtn.style.display = "none";
  menuScreen.classList.add("show");
}

// 알림창 닫는 함수
function closeMenu() {
  menuScreen.style.display = "none";
  menuBtn.style.display = "block";
}

export { menuBtn, closeMenuBtn, showMenu, closeMenu }