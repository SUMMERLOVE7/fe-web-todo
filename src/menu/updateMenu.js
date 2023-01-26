import { ADD_ACTION, MODIFY_ACTION, DELETE_ACTION } from "../store.js";

function NoticeTemplate({ ActionType, columnName, cardTitle, time }) {
  return `
  <div class='menu-card'> 
  <div class='menu-emoji'>&#128526;</div> 
  <div class='one-menu-card'> 
    <div class = 'menu-person-name'> @Grace </div> 
    ${NoticeMessage({ ActionType, columnName, cardTitle })}
    <div class = 'menu-time'>${TimeMessage(time)}</div>
  </div>
  </div>`;
}
const TimeMessage = (time) => {
  const now_time = new Date().getTime();
  const diff_time = now_time - time;
  const diff_day = Math.round(diff_time / 1000 / 60 / 60 / 24);
  const diff_hour = Math.round(diff_time / 1000 / 60 / 60);
  const diff_min = Math.round(diff_time / 1000 / 60);

  let time_message = "";
  const initial_time_message = "방금 전";

  if (diff_day) time_message += diff_day + "일";
  if (diff_hour && !time_message) time_message += diff_hour + "시간 ";
  if (diff_min && !time_message) time_message += diff_min + "분 ";
  if (!time_message) return initial_time_message;
  time_message += "전";
  return time_message;
};

function NoticeMessage({ ActionType, columnName, cardTitle }) {
  if (ActionType === ADD_ACTION)
    return addCardMessage({ columnName, cardTitle });

  if (ActionType === MODIFY_ACTION)
    return modifyCardMessage({ columnName, cardTitle });

  if (ActionType === DELETE_ACTION)
    return deleteCardMessage({ columnName, cardTitle });
}

function addCardMessage({ columnName, cardTitle }) {
  const addActionMessage = `<div class = 'menu-caption'> ${columnName}에 ${cardTitle}이/가 추가되었습니다. </div>`;
  return addActionMessage;
}

function modifyCardMessage({ columnName, cardTitle }) {
  const modifyActionMessage = `<div class = 'menu-caption'> ${columnName}의 카드 제목이 ${cardTitle}(으)로 수정되었습니다. </div>`;
  return modifyActionMessage;
}

function deleteCardMessage({ columnName, cardTitle }) {
  const deleteActionMessage = `<div class = 'menu-caption'> ${columnName} 칼럼의 ${cardTitle} 카드가 삭제되었습니다. </div>`;
  return deleteActionMessage;
}

export function newCardHistory({ ActionType, columnName, cardTitle, time }) {
  const History = NoticeTemplate({
    ActionType,
    columnName,
    cardTitle,
    time,
  });

  return History;
}
