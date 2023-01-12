import {ToBeDeleted, Todos} from "./store.js";

const modal = document.querySelector('.modal');
const modal_delete_btn = modal.querySelector('.cancel-button');
const modal_register_btn = modal.querySelector('.register-button');

modal_delete_btn.addEventListener('click',(e)=>{
    modal.classList.toggle('act');
})

modal_register_btn.addEventListener('click',(e)=>{
    Todos.splice(Todos.findIndex(e => e.Status === ToBeDeleted.Status && e.Title === ToBeDeleted.Title && e.Contents === ToBeDeleted.Contents),1);
    modal.classList.toggle('act');
    render();
})

export {modal};