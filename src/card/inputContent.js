// 모달창 띄우는 함수
export function showModal(target) {
  target.style.display = "block";
  target.classList.add("show");
}

// + 버튼 클릭시 카드 추가 모달 띄우는 함수
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

// 취소 버튼을 클릭하거나 카드 등록 후 모달창 초기화하는 부분
export function closeModal(target) {
  const titleInput = target.querySelector(".title-input");
  const captionInput = target.querySelector(".caption-input");
  titleInput.value = "";
  captionInput.value = "";
  target.style.display = "none";
}

// 사용자의 입력값을 받아 엔터키가 존재하면 줄바꿈을 하도록 하는 함수
export function changeLineWithEnter(inputHeight, target) {
  target.innerHTML = target.textContent.replace(/(?:\n)/g, "<br>");
  target.style.height = inputHeight + 10 + "px";
}

// 사용자의 입력값에 해당하는 높이값으로 설정하는 함수
export function resizeTextarea(object) {
  object.style.height = "auto";
  object.style.height = object.scrollHeight + "px";
}

// 사용자가 엔터를 입력하거나 지우면 그에 따라 줄바꿈 이벤트를 할당하는 함수
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
