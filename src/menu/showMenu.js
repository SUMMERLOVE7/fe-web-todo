export let menuBtn = document.querySelector(".menu-button");
let menuScreen = document.querySelector(".menu-screen");
export let closeMenuBtn = document.querySelector(".close-button");

export function showMenu() {
  menuScreen.style.display = "block";
  menuScreen.classList.add("show");
  menuBtn.style.display = "none";
}

export function closeMenu() {
  menuScreen.style.display = "none";
  menuBtn.style.display = "block";
}

// menuBtn.addEventListener("click", () => showMenu());
// closeMenuBtn.addEventListener("click", () => closeMenu());
