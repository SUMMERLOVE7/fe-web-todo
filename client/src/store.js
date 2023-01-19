import { makeNoticeTemplate } from "./template.js";

const InputData = {
  title: "",
  contents: "",
};

const ToBeDeleted = {
  Id: null,
  Status: null,
  Title: null,
  Contents: null,
};

const BeforeUpdateItem = {
  Id: null,
  Status: null,
  Title: null,
  Contents: null,
};

const BeforeMovedItem = {
  Id: null,
  Status: null,
};

const TodosStatus = ["todo", "doing", "done"];

const Todos = [];

class Notiification {
  constructor() {
    this.notices = [];
  }
  render() {
    const notice_ul = document.querySelector(".notification-menu ul");
    notice_ul.innerHTML =
      `${this.notices.map((notice) => makeNoticeTemplate(notice)).join("")}` ||
      `<h2>알림이 없습니다.<h2>`;
  }
  add(info) {
    this.notices.unshift(info);
  }
}

let getId;
{
  let Id = 1;
  getId = () => {
    return Id++;
  };
}

const Notice = new Notiification();

export {
  InputData,
  ToBeDeleted,
  TodosStatus,
  Todos,
  BeforeUpdateItem,
  Notice,
  getId,
  BeforeMovedItem,
};
