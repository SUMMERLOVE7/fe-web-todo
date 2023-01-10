//let deleteContent = document.getElementsByClassName("x-content-button");
let deleteContent = document.querySelectorAll(".x-content-button");

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
    deleteList(del);
  });
}

export function manageContent(target) {
  target.addEventListener("mouseover", (e) => {
    hoverRed(target);
  });
  target.addEventListener("mouseout", (e) => {
    mouseOut(target);
  });
  target.addEventListener("click", (e) => {
    e.preventDefault();
    deleteList(target);
  });
}
