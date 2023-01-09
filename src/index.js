//const manipulateModal = require('./inputContent.js');

//const openDo = manipulateModal.openDoModal

let todoCard = document.querySelectorAll('.todolist');

function hoverRed(target) {
    target.style.borderColor = "red";
    target.style.backgroundColor = "seashell";
}

function mouseOut(target){
    target.style.borderColor = "white";
    target.style.backgroundColor = "white";
}

for(let card of todoCard){
    card.addEventListener('mouseover', () =>{
        hoverRed(card);
    });
}

for(let card of todoCard){
    card.addEventListener('mouseout', () =>{
        mouseOut(card);
    })
}