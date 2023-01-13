import {InputData, ToBeDeleted, TodosStatus, Todos, BeforeUpdateItem} from "./store.js";
import {makeTodoSection, makeInputTemplate, makeInputFormTemplate, makeNoticeTemplate} from "./template.js";
import {initializeToBeUpdatedItem, initializeInputData, storeToBeUpdatedItem, storeInputData, storeDeletedItem} from"./dataProcessing.js";

/**
 * 전체 화면 렌더링하는 함수
 * 1. todolist 초기화
 * 2. status 마다 섹션 생성
 * 3. 생성한 섹션을 todolist안에 삽입
 */
const render = () =>{
    let todolist = document.querySelector('.todolist');
    todolist.innerHTML='';
    TodosStatus.map(status => {
        const items = Todos.filter(item=>item.Status===status);
        const created_section = makeTodoSection(items,status) 
        todolist.insertAdjacentHTML('beforeend', created_section);
    })
}

render();

const modal = document.querySelector('.modal');
const modal_delete_btn = modal.querySelector('.cancel-button');
const modal_register_btn = modal.querySelector('.register-button');

//모달창에서 취소 버튼 누를시 모달 비활성화
modal_delete_btn.addEventListener('click',()=>{
    modal.classList.toggle('act');
})

/** 
 *  * 모달창에서 삭제버튼 누를 시 데이터 삭제
 * 1. 삭제할 데이터를 Todos(todolist 데이터)에서 삭제
 * 2. 모달 창 없앰
 * 3. 알림창에 알림 등록
 * 4. 리렌더링
 * */
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

//add에서 input창에서 input값 받는 함수
const onChange = (e)=>{
    InputData[e.target.name] = e.target.value;
    modifyRegisterButtonMode();
}

/** 알림메뉴창 활성화, 비활성화 하는 함수 */
const changeNotificationMode = ()=>{
    const notification_menu = document.querySelector('.notification-menu')
    notification_menu.classList.toggle('act');
}

//popupbar 메뉴 보이기와 숨기기
document.querySelector('.fa-bars').addEventListener('click',changeNotificationMode)
document.querySelector('.delete-notification-menu').addEventListener('click',changeNotificationMode);

//add,update input창 높이 자동 조절하는 함수
const autoResizeTextarea = (e) => {
    e.target.style.height ='auto';
    e.target.style.height = `${e.target.scrollHeight}px`
};

/** 
 * add, update input창 이벤트 등록하는 함수
 * 1. input title로 포커스
 * 2. input title, input contents 높이 자동 조절
 * 3. 취소버튼 이벤트 등록
 * 4. 등록, 수정버튼 눌렀을 때 이벤트 등록
 * 5. 인풋 창에 blur(focusout) 이벤트 등록
*/
const addInputEvent = ()=>{
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

    modifyRegisterButtonMode();
};

const checkBeforeUpdateItem = ()=>{
    return BeforeUpdateItem.Title && BeforeUpdateItem.Contents && BeforeUpdateItem.Status;
}

/**
 * 1. update할 데이터가 있는지 체크
 * 
 * 2. update 모드
 * 2-1. update할 데이터 탐색
 * 2-2. 객체 복사 후 업데이트 할 title, contents 덮어씌움
 * 2-3. update 알림 등록
 * 
 * 3. add 모드
 * 3-1. Todos 배열 맨 앞에 데이터 삽입 (나중에 Todos 아이템에 이벤트 시간을 넣어 정렬할까 생각중...)
 * 3-2. add 알림 등록
 * 
 * 4. 데이터 초기화
 * 5. 리렌더링
*/
const addInputRegisterEvent = ()=>{
    const NoticeUl = document.querySelector('.notification-menu').querySelector('ul');
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

/** add, update 액션에서 input창 취소버튼 눌렀을 때 이벤트
 * 1. input창 제거
 * 2. 업데이트모드면 리렌더링
 * 3. input 데이터들 초기화
*/
const InputCancelEvent = ()=>{
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

const modifyRegisterButtonMode = () => {
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

const todolist = document.querySelector('.todolist');

//클릭 이벤트 한꺼번에 설정해 위임
todolist.addEventListener('click',(e)=>{
    // + 버튼 눌럿을때 add action
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
    // x 버튼 눌렀을 때 리스트 내용 삭제하고 삭제 모달창 활성화
    const id = e.target.dataset.id;
    if(e.target.dataset.id && e.target.tagName === 'I'){
        storeDeletedItem(id);
        modal.classList.toggle('act');
    }
})

todolist.ondragstart = function() {
    return false;
};

/** drag and drop 구현중인 함수
 * 1. mousedown 일어날때마다 타이머를 만들어서 일정 시간이 지난 후 드래그 이벤트 시작
 * 2. mousemove 이벤트로 잔상이 마우스 따라오게함
 * Todos : mouse over 시 리스트 삽입 및 이동되는 노드 제거
*/
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

// drag한 것이 todolist 로 올라왔을때 처리하려는 함수
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

// list-item 더블클릭이벤트
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
})