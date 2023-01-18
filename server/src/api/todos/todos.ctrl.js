let todoid = 4;

const Todos = [
  {
    id: 1,
    Status: "todo",
    Title: "Git hub 공부하기",
    Contents: "add , commit , push",
  },
  {
    id: 2,
    Status: "todo",
    Title: "Git hub 블로그에 포스팅할 것",
    Contents: "* Git hub 공부내용\n* 모던 자바스크립트 1장 공부 내용",
  },
  {
    id: 3,
    Status: "doing",
    Title: "모던 자바스크립트 예제 실습",
    Contents: "input 태그",
  },
];

/**
TODO 추가:
POST /api/todos
{ Status, Title, Contents } 
 */
export function write(ctx) {
  const { Status, Title, Contents } = ctx.request.body;
  todoid++;
  const todo = { id: todoid, Status, Title, Contents };
  Todos.push(todo);
  ctx.body = post;
}

/**
TODO 조회:
GET /api/todos/:id
 */
export function list(ctx) {
  ctx.body = Todos;
}

/**
특정 포스트 조회
GET /api/todos/:id
 */
export function read(ctx) {
  const { id } = ctx.params;
  const todo = Todos.find((todo) => todo.id.toString() === id);
  if (!todo) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다.",
    };
    return;
  }
  ctx.body = todo;
}

/**
TODO 제거:
DElETE /api/todos/:id
 */
export function remove(ctx) {
  const { id } = ctx.params;
  const index = Todos.findIndex((todo) => todo.id.toString() === id);
  //todo 없으면 오류
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "해당 todolist가 존재하지 않습니다.",
    };
    return;
  }
  Todos.splice(index, 1);
  ctx.status = 204; // no content
}

/**
TODO 수정
PATCH /api/todos/:id
{ Status, Title, Contents }
*/
export function update(ctx) {
  const { id } = ctx.params;
  const index = Todos.findIndex((todo) => todo.id.toString() === id);
  //todo 없으면 오류
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "해당 todolist가 존재하지 않습니다.",
    };
    return;
  }
  Todos[index] = {
    ...Todos[index],
    ...ctx.request.body,
  };
  ctx.body = Todos[index];
}
