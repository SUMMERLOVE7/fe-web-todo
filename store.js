const InputData = {
  title: "",
  contents: "",
};

const ToBeDeleted = {
  Status: null,
  Title: null,
  Contents: null,
};

const BeforeUpdateItem = {
  Status: null,
  Title: null,
  Contents: null,
};

const TodosStatus = ["todo", "doing", "done"];

const Todos = [
  {
    Status: "todo",
    Title: "Git hub 공부하기",
    Contents: "add , commit , push",
  },
  {
    Status: "todo",
    Title: "Git hub 블로그에 포스팅할 것",
    Contents: "* Git hub 공부내용\n* 모던 자바스크립트 1장 공부 내용",
  },
  {
    Status: "doing",
    Title: "모던 자바스크립트 예제 실습",
    Contents: "input 태그",
  },
];

class Notiification {
  constructor() {
    this.notices = [];
  }
  show() {
    this.notices.map((notice) => {
      console.log(notice);
    });
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
};
