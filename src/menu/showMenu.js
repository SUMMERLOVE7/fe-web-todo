export let menuBtn = document.querySelector(".menu-button");
let menuScreen = document.querySelector(".menu-screen");
export let closeMenuBtn = document.querySelector(".close-button");

// 알림창 보여주는 함수
export function showMenu() {
  menuScreen.style.display = "block";
  menuScreen.classList.add("show");
  menuBtn.style.display = "none";
}

// 알림창 닫는 함수
export function closeMenu() {
  menuScreen.style.display = "none";
  menuBtn.style.display = "block";
}
