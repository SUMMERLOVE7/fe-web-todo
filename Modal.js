import { Todos, ToBeDeleted, Notice } from "./store.js";
import { render } from "./render.js";

const modal = document.querySelector(".modal");
const modal_delete_btn = modal.querySelector(".cancel-button");
const modal_register_btn = modal.querySelector(".register-button");

//모달창에서 취소 버튼 누를시 모달 비활성화
modal_delete_btn.addEventListener("click", () => {
  modal.classList.toggle("act");
});

/**
 *  * 모달창에서 삭제버튼 누를 시 데이터 삭제
 * 1. 삭제할 데이터를 Todos(todolist 데이터)에서 삭제
 * 2. 모달 창 없앰
 * 3. 알림창에 알림 등록
 * 4. 리렌더링
 * */
modal_register_btn.addEventListener("click", () => {
  Todos.splice(
    Todos.findIndex(
      (e) =>
        e.Status === ToBeDeleted.Status &&
        e.Title === ToBeDeleted.Title &&
        e.Contents === ToBeDeleted.Contents
    ),
    1
  );
  modal.classList.toggle("act");

  Notice.add({
    mode: "delete",
    info: { Status: ToBeDeleted.Status, Title: ToBeDeleted.Title },
    time: new Date().getTime(),
  });
  Notice.render();

  render();
});

export { modal };
