//let deleteContent = document.getElementsByClassName("x-content-button");
let deleteContent = document.querySelectorAll('.x-content-button');
console.log(deleteContent);

function deleteList(element){
    
    //let parentDiv = element.closest("div");
    //let grandParentSection = parentDiv.closest("section");
    //target.addEventListner('click', grandParentSection.style.display = 'none');
    let parentDiv = element.parentElement;
    let grandParentSection = parentDiv.parentElement;
    console.log(parentDiv);
    grandParentSection.style.display = 'none';
    console.log('1');
}

/*
deleteContent.forEach(element => {
    element.addEventListner('click', deleteList(element));
});
*/
for (let del of deleteContent){
    del.addEventListener('click', (e) => {
        e.preventDefault();
        deleteList(del);
    //del.onclick = function(){

    //}
});
}