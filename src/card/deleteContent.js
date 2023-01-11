//let deleteContent = document.getElementsByClassName("x-content-button");
let deleteContent = document.querySelectorAll(".x-content-button");
let deletePopup = document.querySelector(".delPopup");
let deletePopupBtn = document.querySelector(".del-popup");
let cancelDelBtn = document.querySelector(".undo-popup");

function hoverRed(target) {
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.borderColor = "red";
  grandParentSection.style.backgroundColor = "seashell";
}

function mouseOut(target) {
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.borderColor = "white";
  grandParentSection.style.backgroundColor = "white";
}

function deleteList(element) {
  //let parentDiv = element.closest("div");
  //let grandParentSection = parentDiv.closest("section");
  //target.addEventListner('click', grandParentSection.style.display = 'none');
  let parentDiv = element.parentElement;
  let grandParentSection = parentDiv.parentElement;
  grandParentSection.style.display = "none";
}

for (let del of deleteContent) {
  del.addEventListener("mouseover", (e) => {
    hoverRed(del);
  });
  del.addEventListener("mouseout", (e) => {
    mouseOut(del);
  });
  del.addEventListener("click", (e) => {
    e.preventDefault();
    showDelPopup();
    rmDelPopup(del);
    //deleteList(del);
  });
}

// export function manageContent(target) {
//   target.addEventListener("mouseover", (e) => {
//     hoverRed(target);
//   });
//   target.addEventListener("mouseout", (e) => {
//     mouseOut(target);
//   });
//   // target.addEventListener("click", (e) => {
//   //   e.preventDefault();
//   //   deleteList(target);
//   // });
// }

export function manageContent(target, todo_list) {
  target.addEventListener("mouseover", (e) => {
    hoverRed(target);
  });
  target.addEventListener("mouseout", (e) => {
    mouseOut(target);
  });
  target.addEventListener("click", (e) => {
    e.preventDefault();
    showDelPopup();
    delArray(target, todo_list);
    rmDelPopup(target);
  });
}

function showDelPopup() {
  deletePopup.style.display = "block";
  deletePopup.classList.add("show");
}

function rmDelPopup(target) {
  deletePopupBtn.addEventListener("click", () => {
    deleteList(target);
    deletePopup.style.display = "none";
  });
}

cancelDelBtn.addEventListener("click", () => {
  deletePopup.style.display = "none";
});

function delArray(target, todo_list) {
  console.log(todo_list);
  debugger;
  let parentDiv = target.parentElement;
  let grandParentSection = parentDiv.parentElement; //card
  let ggrandParentDiv = grandParentSection.parentElement; //column
  const cards = [...ggrandParentDiv.querySelectorAll(".todolist")];
  const card = grandParentSection;
  const idx = cards.findIndex((ele) => ele === card);
  let title = parentDiv.querySelector(".list-title").innerText;
  let caption = grandParentSection.querySelector(".caption").innerText;
  if (ggrandParentDiv.classList.contains("havetodo-container")) {
    // const index = todo_list.findIndex((ele) => ele.id === id);
    todo_list.splice(idx, 1);
  }
}

//1 === 1 true
// [] === [] false
//{} === {} false
