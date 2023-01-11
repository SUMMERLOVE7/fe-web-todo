import { input_data, delete_data, todos_status, todos} from "./store.js";

//임시 id 나중에 UUID로 바꾸고 싶음
let id = 1;

const make_new_lst = (title, contents)=>{
    const item = 
    `<li class="todolist-items" data-id =${id} draggable="true">
            <div class="todolist-items-header">
                <h3>${title}</h3>
            <button class="delete-lst"><i class="fa-solid fa-x" data-id =${id++}></i></button>
        </div>
        <p>${contents}</p>
    </li>`
    return item;
}

const render = () =>{
    let todolist = document.querySelector('.todolist');

    todolist.innerHTML='';

    //status에 따라 section 생성
    todos_status.map(status => {
        const items = todos.filter(item=>item.Status===status);
        const parent_element = `
        <section class = "${status}">
            <div class = "todo-header">
                <h2>${status} </h2>
                <div class="list-count">${items.length}</div>
                <div class="buttons">
                    <button class="add"><i class="fa-solid fa-plus"></i></button>
                    <button class="delete"><i class="fa-solid fa-x"></i></button>
                </div>
            </div> 
            <ul class = "todolist-item">
                ${items.map(item => make_new_lst(item.Title,item.Contents)).join('')}
            </ul>
        </section>`
    todolist.insertAdjacentHTML('beforeend',parent_element);
    // todolist.innerHTML += parent_element;
    })
}

render();

//모달창 설정
//취소 버튼
const modal = document.querySelector('.modal');
const modal_delete_btn = modal.querySelector('.cancel-button');
const modal_register_btn = modal.querySelector('.register-button');

modal_delete_btn.addEventListener('click',(e)=>{
    modal.classList.toggle('act');
})

modal_register_btn.addEventListener('click',(e)=>{
    todos.splice(todos.findIndex(e => e.Status === delete_data.Status && e.Title === delete_data.Title && e.Contents === delete_data.Contents),1);
    modal.classList.toggle('act');
    render();
})

//add에서 input값 받는 함수
const onChange = (e)=>{
    input_data[e.target.name] = e.target.value;
    modifyRegisterButton();
}

const changeNotificationMode = ()=>{
    const notification_menu = document.querySelector('.notification-menu')
    notification_menu.classList.toggle('act');
}

//popupbar 메뉴 보이기와 숨기기
document.querySelector('.fa-bars').addEventListener('click',changeNotificationMode)
document.querySelector('.delete-notification-menu').addEventListener('click',changeNotificationMode);

const autoResizeTextarea = (e) => {
    e.target.style.height ='auto';
    e.target.style.height = `${e.target.scrollHeight}px`
};

const addInputEvent = ()=>{
    //input창 이벤트

    const input_title = document.querySelector('.input-title');
    const input_contents = document.querySelector('.input-contents');

    input_title.focus();
    input_title.addEventListener('change',onChange);
    input_contents.addEventListener('change',onChange);
    input_title.addEventListener('keydown',autoResizeTextarea,true);
    input_contents.addEventListener('keydown',autoResizeTextarea,true);
    modifyRegisterButton();
};

const checkBeforeUpdateItem = ()=>{
    return BeforeUpdateItem.Title && BeforeUpdateItem.Contents && BeforeUpdateItem.Status;
}

/**
 * if before data가 있으면 컨텐츠 변경하고
 *  html 바꿈
 * 그렇지 않으면 원래대로 맨위로 추가
 * 
 */
const addInputRegisterEvent = (e)=>{
    //등록버튼 이벤트
    document.querySelector('.input-items').querySelector('.register-button').addEventListener('mousedown',()=>{
        if(checkBeforeUpdateItem()){
            const index = todos.findIndex(e => e.Title === BeforeUpdateItem.Title && e.Contents === BeforeUpdateItem.Contents && e.Status === BeforeUpdateItem.Status);
            todos[index] = {...todos[index], 
                Title:input_data['title'],
                Contents:input_data['contents']}
            console.log(todos[index]);
            initializeToBeUpdatedItem();
            initializeInputData();
            render();
            return;
        }
        
        const input_status = document.querySelector('.input-items').closest('section').className;
        todos.unshift({
            Status:input_status,
            Title:input_data['title'],
            Contents:input_data['contents']});
        initializeToBeUpdatedItem();
        initializeInputData();
        document.querySelector('.input-items').remove();
        render();
    });
};

/**
 * if before data가 있으면
 *  html 바꿈
 * 그렇지 않으면 원래대로 제거
 */
const addInputFocusOutEvent = ()=>{
    //focusout 이벤트
    document.querySelector('.input-items').addEventListener("blur", ()=>{
        setTimeout(()=>{
            initializeToBeUpdatedItem();
            initializeInputData();
            const input_item = document.querySelector('.input-items');
            if(input_item)
            input_item.remove();
        },0)
    })
}

/**
 * if before data가 있으면
 *  html 바꿈
 * 그렇지 않으면 원래대로 제거
 */
const addInputCancelEvent = ()=>{
    //취소버튼 이벤트
    document.querySelector('.input-items').querySelector('.cancel-button').addEventListener('click',(e)=>{
        initializeToBeUpdatedItem();
        initializeInputData();
        document.querySelector('.input-items').remove();});
}

const make_new_input = (mode)=>{
    const newInput =
    `<li class = 'input-items' , tabindex = -1>
        <form>
            <textarea class = 'input-title' type = 'text' placeholder = '제목을 입력하세요' maxlength = 500 name = 'title' 'onchange' = 'onChange()'>${input_data['title']? input_data['title'] : ''}</textarea>
            <textarea class = 'input-contents' type = 'text' placeholder = '내용을 입력하세요' maxlength = 500 name = 'contents' 'onchange' = onChange'>${input_data['contents'] ? input_data['contents']  : ''}</textarea>
            <div class = 'buttons'>
                <button type ='button' class = 'cancel-button'>취소</>
                <button type ='button' class = 'register-button' disabled>${mode}</>
            </div>
        </form>
    </li>`
    return newInput;
}

const checkInputStatus = () => {
    return input_data['title'] && input_data['contents'];
}

const modifyRegisterButton = () => {
    const register_button = document.querySelector('.register-button');
    const input_items = document.querySelector('.input-items');
    if(checkInputStatus(register_button)){
        register_button.disabled = false;
        input_items.style.opacity = 1;
        return;
    }
    register_button.disabled = true;
    input_items.style.opacity = 0.4;
}

//이벤트 한꺼번에 설정해 위임
const todolist = document.querySelector('.todolist');
todolist.addEventListener('click',(e)=>{
    //add 이벤트
    if(e.target.classList[1] === "fa-plus"){
        const input_items = document.querySelector('.input-items');
        if(input_items){
            input_items.remove();
            return;
        }
        const section = e.target.closest('section').querySelector('ul');
        const input_new_element = make_new_input('등록');
        section.insertAdjacentHTML('afterbegin',input_new_element);

        addInputEvent();
        addInputCancelEvent();
        addInputRegisterEvent(e);
        addInputFocusOutEvent();
        return;
    }

    //delete 이벤트
    const id = e.target.dataset.id;
    if(e.target.dataset.id && e.target.tagName === 'I'){
        storeDeletedItem(id);
        modal.classList.toggle('act');
    }
})

const BeforeUpdateItem = {
    Status : null,
    Title : null,
    Contents: null
}

/**
     * dbclick 이벤트
     * 1. 리스트 아이템 클릭하면 인풋창으로 변경 -> 이전 값들 BeforeUpdate, input_data에 저장
     * 2. 취소 누르면 수정 취소
     * 3. 등록 누르면 반영 => 배열에 이전 값들을 갖고 있는 객체 뒤져서 있는지 확인
     * 4. 
     */
todolist.addEventListener('dblclick',(e)=>{
    console.log(e.target);
    const update_element = e.target.closest('.todolist-items');
    if(!update_element)
        return;
    console.log('update_element',update_element);
    storeToBeUpdatedItem(update_element);
    storeInputData();
    console.log('Before data',BeforeUpdateItem);

    update_element.className = 'input-items';
    // update_element.setattribute('tabindex', -1);

    update_element.innerHTML = 
    `<form>
        <textarea class = 'input-title' type = 'text' placeholder = '제목을 입력하세요' maxlength = 500 name = 'title' 'onchange' = 'onChange()'>${BeforeUpdateItem.Title ? BeforeUpdateItem.Title : ''}</textarea>
        <textarea class = 'input-contents' type = 'text' placeholder = '내용을 입력하세요' maxlength = 500 name = 'contents' 'onchange' = onChange'>${BeforeUpdateItem.Contents ? BeforeUpdateItem.Contents : ''}</textarea>
        <div class = 'buttons'>
            <button type ='button' class = 'cancel-button'>취소</>
            <button type ='button' class = 'register-button' disabled>수정</>
        </div>
    </form>
    `;

    addInputEvent();
    addInputCancelEvent();
    addInputRegisterEvent(e);
    addInputFocusOutEvent();
    modifyRegisterButton();

    // initializeToBeUpdatedItem();
    // initializeInputData();
})

const initializeToBeUpdatedItem = () =>{
    BeforeUpdateItem.Status = null;
    BeforeUpdateItem.Title = null;
    BeforeUpdateItem.Contents = null;
}

const initializeInputData = () => {
    input_data['title'] ='';
    input_data['contents'] = '';
}

const storeToBeUpdatedItem = (update_element)=>{
    BeforeUpdateItem.Status = update_element.closest('section').className;
    BeforeUpdateItem.Title = update_element.querySelector('h3').innerText;
    BeforeUpdateItem.Contents = update_element.querySelector('p').innerText;
}

const storeInputData = ()=>{
    input_data['title'] = BeforeUpdateItem.Title;
    input_data['contents'] = BeforeUpdateItem.Contents;
}

const storeDeletedItem = (id)=>{
    const toBedeleted = document.querySelector(`.todolist-items[data-id = "${id}"]`);
    delete_data.Status = toBedeleted.closest('section').className;
    delete_data.Title = toBedeleted.querySelector('h3').innerText;
    delete_data.Contents = toBedeleted.querySelector('p').innerText;
}