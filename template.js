import { InputData, BeforeUpdateItem, getId } from "./store.js";

const makeTodoSection = (items, status) => {
  const created_section = `
        <section class = "${status}">
            <div class = "todo-header">
                <div class ="todo-header-left">
                    <h2 class = "todo-column">${status} </h2>
                    <div class="list-count">${items.length}</div>
                </div>
                <div class="buttons">
                    <button class="add"><i class="fa-solid fa-plus"></i></button>
                    <button class="delete"><i class="fa-solid fa-x"></i></button>
                </div>
            </div> 
            <ul class = "todolist-item">
                ${items
                  .map((item) =>
                    makeListItemTemplate(
                      item.Title,
                      item.Contents.replace(/\r\n|\r|\n/g, "<br>")
                    )
                  )
                  .join("")}
            </ul>
        </section>`;
  return created_section;
};

const makeListItemTemplate = (title, contents) => {
  const data_id = getId();
  const created_item = `<li class="todolist-items" data-id =${data_id}>
            <div class="todolist-items-header">
                <h3 class = "todolist-items-title">${title}</h3>
            <button class="delete-lst"><i class="fa-solid fa-x" data-id =${data_id}></i></button>
        </div>
        <p class ="todolist-items-contents">${contents}</p>
    </li>`;
  return created_item;
};

const makeInputTemplate = (mode) => {
  const created_input = `<li class = 'input-items' , tabindex = -1>
        <form>
            <textarea class = 'input-title' type = 'text' placeholder = '제목을 입력하세요' maxlength = 500 name = 'title' 'onchange' = 'onChange()'>${
              InputData["title"] ? InputData["title"] : ""
            }</textarea>
            <textarea class = 'input-contents' type = 'text' placeholder = '내용을 입력하세요' maxlength = 500 name = 'contents' 'onchange' = onChange'>${
              InputData["contents"] ? InputData["contents"] : ""
            }</textarea>
            <div class = 'buttons'>
                <button type ='button' class = 'cancel-button'>취소</>
                <button type ='button' class = 'register-button' disabled>${mode}</>
            </div>
        </form>
    </li>`;
  return created_input;
};

const makeInputFormTemplate = () => {
  const created_input_form = `<form>
        <textarea class = 'input-title' type = 'text' placeholder = '제목을 입력하세요' maxlength = 500 name = 'title' 'onchange' = 'onChange()'>${
          BeforeUpdateItem.Title ? BeforeUpdateItem.Title : ""
        }</textarea>
        <textarea class = 'input-contents' type = 'text' placeholder = '내용을 입력하세요' maxlength = 500 name = 'contents' 'onchange' = onChange'>${
          BeforeUpdateItem.Contents ? BeforeUpdateItem.Contents : ""
        }</textarea>
        <div class = 'buttons'>
            <button type ='button' class = 'cancel-button'>취소</>
            <button type ='button' class = 'register-button' disabled>수정</>
        </div>
    </form>`;
  return created_input_form;
};

const makeNoticeTemplate = ({ mode, info }) => {
  const created_notice = `
    <li class = "notification-menu-items">
        <h3>@sam</h3>
        <p>${makeNoticeMessageTemplate(mode, info)}</p>
        <p class = "notification-menu-items-time">1분 전</p>
    </li>`;
  return created_notice;
};

const makeNoticeMessageTemplate = (mode, info) => {
  if (mode === "add") return makeAddMessage(info);

  if (mode === "delete") return makeDeleteMessage(info);

  if (mode === "update") return makeUpdateMessage(info);

  return makeMoveMessage(info);
};

const makeAddMessage = ({ Status, Title }) => {
  const created_add_message = `<span class="notice-keyword">${Title}</span>을 <span class="notice-keyword">${Status}</span>에 추가했습니다.`;
  return created_add_message;
};

const makeDeleteMessage = ({ Status, Title }) => {
  const created_delete_message = `<span class="notice-keyword">${Title}</span>을 <span class="notice-keyword">${Status}</span>에서 삭제했습니다.`;
  return created_delete_message;
};

const makeUpdateMessage = ({ Status, Title }) => {
  const created_update_message = `<span class="notice-keyword">${Status}</span>에서 <span class="notice-keyword">${Title}</span>을 변경하였습니다.`;
  return created_update_message;
};

const makeMoveMessage = ({ Title, BeforeStatus, MovedStatus }) => {
  const created_update_message = `<span class="notice-keyword">
    ${Title}</span>를 
    <span class="notice-keyword">${BeforeStatus}</span>에서 
    <span class="notice-keyword">${MovedStatus}</span>로 이동하었습니다.`;
  return created_update_message;
};

export {
  makeTodoSection,
  makeListItemTemplate,
  makeInputTemplate,
  makeInputFormTemplate,
  makeNoticeTemplate,
};
