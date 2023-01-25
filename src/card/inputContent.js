export function showModal(target) {
  target.style.display = "block";
  target.classList.add("show");
}

export function openModal(target) {
  const plusBtns = target.querySelectorAll(".plus-button");

  for (let plus of plusBtns) {
    plus.addEventListener("click", () => {
      const column = plus.closest(".list-container");
      const modal = column.querySelector(".open-modal");
      modal.style.width = "280px";
      showModal(modal);
    });
  }
}

export function closeModal(target) {
  const titleInput = target.querySelector(".title-input");
  const captionInput = target.querySelector(".caption-input");
  titleInput.value = "";
  captionInput.value = "";
  target.style.display = "none";
}

export function changeLineWithEnter(inputHeight, target) {
  target.innerHTML = target.textContent.replace(/(?:\n)/g, "<br>");
  target.style.height = inputHeight + 10 + "px";
}

export function resizeTextarea(object) {
  object.style.height = "auto";
  object.style.height = object.scrollHeight + "px";
}

export function resizeTextareaEvent(target) {
  let txtarea = target.querySelectorAll(".textarea-input");

  for (let txt of txtarea) {
    txt.style.height = txt.scrollHeight + 16 + "px";
    txt.addEventListener(
      "keydown",
      () => {
        resizeTextarea(txt);
      },
      true
    );
    txt.addEventListener(
      "keyup",
      () => {
        resizeTextarea(txt);
      },
      true
    );
  }
}
