export const dataStorage = {
  columns: [
    {
      id: "01",
      column: "해야할 일",
      cards: [
        {
          title: "Github 공부하기",
          caption: ["add, commit, push"],
          id: "1",
        },
        {
          title: "블로그에 포스팅할 것",
          caption: ["Github 공부내용", "모던자바스크립트 1장 공부내용"],
          id: "2",
        },
      ],
    },
    {
      id: "02",
      column: "하고 있는 일",
      cards: [
        {
          title: "HTML/CSS 공부하기",
          caption: ["input 태그 실습"],
          id: "3",
        },
      ],
    },
    {
      id: "03",
      column: "완료한 일",
      cards: [],
    },
  ],
};

//let ID = 0;

// export function idGenerator() {
//   ID += 1;
//   return ID;
// }
//export default todo_list;
