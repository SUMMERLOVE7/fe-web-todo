import {InputData, BeforeUpdateItem, getId, increaseId} from "./store.js";

//임시 id 나중에 UUID로 바꾸고 싶음
// let id = 1;

const makeTodoSection = (items, status)=>{
    const created_section =`
        <section class = "${status}">
            <div class = "todo-header">
                <div class ="todo-header-left">
                    <h2>${status} </h2>
                    <div class="list-count">${items.length}</div>
                </div>
                <div class="buttons">
                    <button class="add"><i class="fa-solid fa-plus"></i></button>
                    <button class="delete"><i class="fa-solid fa-x"></i></button>
                </div>
            </div> 
            <ul class = "todolist-item">
                ${items.map(item => makeListItemTemplate(item.Title,item.Contents)).join('')}
            </ul>
        </section>`;
        increaseId();
    return created_section;
}

const makeListItemTemplate=(title,contents)=>{
    const created_item =
    `<li class="todolist-items" data-id =${getId()}>
            <div class="todolist-items-header">
                <h3>${title}</h3>
            <button class="delete-lst"><i class="fa-solid fa-x" data-id =${getId()}></i></button>
        </div>
        <p>${contents}</p>
    </li>`;
    // increaseId();
    return created_item;
}

const makeInputTemplate=(mode)=>{
    const created_input = 
    `<li class = 'input-items' , tabindex = -1>
        <form>
            <textarea class = 'input-title' type = 'text' placeholder = '제목을 입력하세요' maxlength = 500 name = 'title' 'onchange' = 'onChange()'>${InputData['title']? InputData['title'] : ''}</textarea>
            <textarea class = 'input-contents' type = 'text' placeholder = '내용을 입력하세요' maxlength = 500 name = 'contents' 'onchange' = onChange'>${InputData['contents'] ? InputData['contents']  : ''}</textarea>
            <div class = 'buttons'>
                <button type ='button' class = 'cancel-button'>취소</>
                <button type ='button' class = 'register-button' disabled>${mode}</>
            </div>
        </form>
    </li>`
    return created_input;
}

const makeInputFormTemplate=()=>{
    const created_input_form = `<form>
        <textarea class = 'input-title' type = 'text' placeholder = '제목을 입력하세요' maxlength = 500 name = 'title' 'onchange' = 'onChange()'>${BeforeUpdateItem.Title ? BeforeUpdateItem.Title : ''}</textarea>
        <textarea class = 'input-contents' type = 'text' placeholder = '내용을 입력하세요' maxlength = 500 name = 'contents' 'onchange' = onChange'>${BeforeUpdateItem.Contents ? BeforeUpdateItem.Contents : ''}</textarea>
        <div class = 'buttons'>
            <button type ='button' class = 'cancel-button'>취소</>
            <button type ='button' class = 'register-button' disabled>수정</>
        </div>
    </form>` 
    return created_input_form;
}

export {makeTodoSection, makeListItemTemplate, makeInputTemplate, makeInputFormTemplate};