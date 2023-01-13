import { modifyCardHistory } from "../menu/updateMenu.js";
import { findCardIndex } from "./deleteContent.js";
import { openModal } from "./inputContent.js";
import { addEvent, contentTodo, renderNewSection } from "./registerContent.js";

export function modifyModal(target) {
  let btnContainer = target.parentElement;
  let parentSection = btnContainer.parentElement;

  target.addEventListener("click", () => {
    let title = parentSection.querySelector(".list-title").innerText;
    let caption = parentSection.querySelector(".caption").innerText;
    // let title = parentSection.querySelector(".list-title").value;
    // let caption = parentSection.querySelector(".caption").value;
    console.log(title);
    console.log(caption);

    parentSection.innerHTML = `<section id="open-modal"> <div class='list-title-modal'>
      <input type='text' class='title-input' name='title-input' value="${title}"></input></div>
      <form><div class='caption-modal'><input type='text' class='caption-input' name='caption-input' value="${caption}">
      </input></div>
      <div class='modal-button'><button type='button' class='cancel-button'> 취소 </button>
      <button type='submit' class='modify-button'> 수정 </button></div></form></section>`;

    finishModification(parentSection);
  });
}

export function finishModification(target) {
  let modBtn = target.querySelector(".modify-button");

  console.log(modBtn);
  modBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let parent = target.closest(".todolist");
    let newtitle = parent.querySelector(".title-input").value;
    let newcaption = parent.querySelector(".caption-input").value;
    console.log(parent);
    console.log(newtitle);
    console.log(newcaption);

    target.innerHTML = renderNewSection(newtitle, newcaption);
    let container = target.closest("#list-container");

    addEvent(container);
    modifyCardHistory();
  });
}

// export function modifyEvent(target) {
//   target.addEventListener("click", (e) => {
//     modifyModal(target); //수정할 수 있도록 화면만 변경
//     let isTarget = target.closest(".todolist");
//     const p = target.parentElement;
//     let btnContainer = target.parentElement;

//     console.log(isTarget);
//     finishModification(isTarget);
//   });
// }

// export function finishModification(target) {
//   //let modBtn = target.querySelector(".modify-button");
//   // modBtn.addEventListener("click", (e) => {
//   //   e.preventDefault();
//   //   let parent = modBtn.closest("#open-modal");
//   //   let newtitle = parent.querySelector(".title-input").value;
//   //   let newcaption = parent.querySelector(".caption-input").value;
//   //   let section = modBtn.closest(".todolist");
//   //   section.innerHTML = renderNewSection(newtitle, newcaption);
//   //   debugger;});

//   let modBtn = target.querySelector(".modify-button");
//   console.log(modBtn);

//   target.addEventListener("click", (e) => {
//     e.preventDefault();
//     let parent = target.closest(".todolist");
//     let newtitle = parent.querySelector(".title-input").value;
//     let newcaption = parent.querySelector(".caption-input").value;
//     console.log(parent);
//     console.log(newtitle);
//     console.log(newcaption);
//   });
//   modifyCardHistory();
// }
