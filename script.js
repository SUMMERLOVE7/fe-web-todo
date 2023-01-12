import {InputData, ToBeDeleted, TodosStatus, Todos, BeforeUpdateItem} from "./store.js";
import {makeTodoSection, makeInputTemplate, makeInputFormTemplate, makeNoticeTemplate} from "./template.js";
import {initializeToBeUpdatedItem, initializeInputData, storeToBeUpdatedItem, storeInputData, storeDeletedItem} from"./dataProcessing.js";

const render = () =>{
    let todolist = document.querySelector('.todolist');
    todolist.innerHTML='';
    //status에 따라 section 생성
    TodosStatus.map(status => {
        const items = Todos.filter(item=>item.Status===status);
        const created_section = makeTodoSection(items,status) 
        todolist.insertAdjacentHTML('beforeend', created_section);
    })
}

render();

//모달창 설정
const modal = document.querySelector('.modal');
const modal_delete_btn = modal.querySelector('.cancel-button');
const modal_register_btn = modal.querySelector('.register-button');

modal_delete_btn.addEventListener('click',()=>{
    modal.classList.toggle('act');
})

//삭제
modal_register_btn.addEventListener('click',()=>{
    Todos.splice(Todos.findIndex(e => e.Status === ToBeDeleted.Status && e.Title === ToBeDeleted.Title && e.Contents === ToBeDeleted.Contents),1);
    modal.classList.toggle('act');
    const NoticeUl = document.querySelector('.notification-menu').querySelector('ul');
    NoticeUl.insertAdjacentHTML('afterbegin',makeNoticeTemplate({
        mode : 'delete',
        info: {Status: ToBeDeleted.Status, Title:ToBeDeleted.Title}
    }));
    render();
})

//add에서 input값 받는 함수
const onChange = (e)=>{
    InputData[e.target.name] = e.target.value;
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
    const input_item = document.querySelector('.input-items');
    const cancel_btn = input_item.querySelector('.cancel-button');
    const register_btn = input_item.querySelector('.register-button');

    input_title.focus();
    input_title.addEventListener('change',onChange);
    input_title.addEventListener('keydown',autoResizeTextarea,true);

    input_contents.addEventListener('change',onChange);
    input_contents.addEventListener('keydown',autoResizeTextarea,true);

    cancel_btn.addEventListener('click', InputCancelEvent);
    register_btn.addEventListener('mousedown',addInputRegisterEvent);
    input_item.addEventListener("blur", addInputFocusOutEvent);

    modifyRegisterButton();
};

const checkBeforeUpdateItem = ()=>{
    return BeforeUpdateItem.Title && BeforeUpdateItem.Contents && BeforeUpdateItem.Status;
}

const addInputRegisterEvent = ()=>{
    const NoticeUl = document.querySelector('.notification-menu').querySelector('ul');
    //update모드
    if(checkBeforeUpdateItem()){
        const index = Todos.findIndex(e => e.Title === BeforeUpdateItem.Title && e.Contents === BeforeUpdateItem.Contents && e.Status === BeforeUpdateItem.Status);
        Todos[index] = {...Todos[index], 
            Title:InputData['title'],
            Contents:InputData['contents']};
        NoticeUl.insertAdjacentHTML('afterbegin',makeNoticeTemplate({
            mode : 'update',
            info: {Status: Todos[index].Status, Title:InputData['title']}
        }));
        initializeToBeUpdatedItem();
        initializeInputData();
        render();
        return;
    }
    //add 모드
    const input_status = document.querySelector('.input-items').closest('section').className;
    Todos.unshift({
        Status:input_status,
        Title:InputData['title'],
        Contents:InputData['contents']});
    NoticeUl.insertAdjacentHTML('afterbegin',makeNoticeTemplate({
        mode : 'add',
        info: {Status:input_status, Title:InputData['title']}
    }));
    initializeToBeUpdatedItem();
    initializeInputData();
    render();
};

const addInputFocusOutEvent = ()=>{
    //focusout 이벤트
    setTimeout(()=>{
        const input_item = document.querySelector('.input-items');
        if(input_item)
        input_item.remove();
        if(checkBeforeUpdateItem())
            render();
        initializeToBeUpdatedItem();
        initializeInputData();
    },0)
}

const InputCancelEvent = ()=>{
    //취소버튼 이벤트
    document.querySelector('.input-items').querySelector('.cancel-button').addEventListener('click',()=>{
        document.querySelector('.input-items').remove();
        if(checkBeforeUpdateItem())
            render();
        initializeToBeUpdatedItem();
        initializeInputData();
    });
}

const makeNewInput = (mode)=>{
    return makeInputTemplate(mode);
}

const checkInputStatus = () => {
    return InputData['title'] && InputData['contents'];
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

//클릭 이벤트 한꺼번에 설정해 위임
const todolist = document.querySelector('.todolist');
todolist.addEventListener('click',(e)=>{
    //add 이벤트
    if(e.target.classList[1] === "fa-plus"){
        const input_items = document.querySelector('.input-items');
        if(input_items){
            input_items.remove();
            return;
        }
        const to_be_added_ul = e.target.closest('section').querySelector('ul');
        const input_new_element = makeNewInput('등록');
        to_be_added_ul.insertAdjacentHTML('afterbegin',input_new_element);
        addInputEvent();
        return;
    }

    //delete 이벤트
    const id = e.target.dataset.id;
    if(e.target.dataset.id && e.target.tagName === 'I'){
        storeDeletedItem(id);
        modal.classList.toggle('act');
    }
})

todolist.ondragstart = function() {
    return false;
};

todolist.addEventListener('mousedown',(e)=>{
    const origin_item = e.target.closest('.todolist-items');
    if(!origin_item)
        return;
    let isClick = 1;
    const timer = setTimeout(()=>{
        if(!isClick)
            return;
        isClick = 0;
        let shiftX = e.clientX - origin_item.getBoundingClientRect().left;
        let shiftY = e.clientY - origin_item.getBoundingClientRect().top;

        const copy_item = origin_item.cloneNode(true);
        origin_item.style.opacity=0.4;
        origin_item.style.border = '1px solid dodgerblue';
        copy_item.style.position = 'absolute';
        copy_item.style.zIndex = 1;
        copy_item.classList.toggle('dragging');

        document.body.append(copy_item);

        function moveAt(pageX, pageY) {
            copy_item.style.left = pageX - shiftX + 'px';
            copy_item.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) {moveAt(e.pageX, e.pageY);}
        moveAt(e.pageX, e.pageY);

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function(e) {
            document.removeEventListener('mousemove', onMouseMove);
            // document.onmouseup = null;

            // document.removeChild(copy_item);
            // copy_item.remove();
            origin_item.style.opacity=1;
            origin_item.style.border = 'none';
        };
    },150)
        
    document.onmouseup = function(e) {
        clearTimeout(timer);
        isClick = 0;
    };
})

function getDragAfterElement(container, x) {
    const draggableElements = [
        ...container.querySelectorAll(".todolist-items"),
    ];
    return draggableElements.reduce(
    (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.top - box.height / 2;
        // console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    },
    { offset: Number.NEGATIVE_INFINITY },
    ).element;
}

const sections = document.querySelectorAll('section:not(.notification-menu)');
Array.from(sections).map(section => {
    section.addEventListener('mouseover',e=>{
        const draggable = document.querySelector(".dragging");
        if(!draggable)
            return;

        const afterElement = getDragAfterElement(section, e.clientX);
        console.log('afterElement', afterElement);
        document.querySelector('body').removeChild(draggable);
        section.appendChild(draggable);
        draggable.classList.toggle('dragging');
        draggable.style.position= 'static';
        draggable.style.zIndex = 0;

        console.log('draggable',draggable);
    })
})

// 더블클릭이벤트 위임
todolist.addEventListener('dblclick',(e)=>{
    const update_element = e.target.closest('.todolist-items');
    if(!update_element)
        return;
    storeToBeUpdatedItem(update_element);
    storeInputData();
    update_element.className = 'input-items';
    update_element.setAttribute('tabindex', "-1");
    update_element.innerHTML = makeInputFormTemplate();
    addInputEvent();
    modifyRegisterButton();
})