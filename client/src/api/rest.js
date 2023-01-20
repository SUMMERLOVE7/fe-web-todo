import { render } from "../render.js";
import { Todos } from "../store.js";

//get
export const getTodo = async () => {
  const response = await fetch("http://localhost:5500/api/todos");
  const data = await response.json();
  Todos.splice(0);
  data.forEach((element) => {
    Todos.push(element);
  });
  render();
};

//post
export const postTodo = async (obj) => {
  fetch("http://localhost:5500/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => console.log(res))
    .then(getTodo);
  // render();
};

//delete
export const deleteTodo = async (id) => {
  fetch("http://localhost:5500/api/todos/" + id, {
    method: "DELETE",
  }).then((res) => console.log(res));
  // getTodo();
  // render();
};

//put
export const UpdateTodo = async ({ obj, id }) => {
  fetch("http://localhost:5500/api/todos/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
    credentials: "omit",
  })
    .then((res) => console.log(res))
    .catch((error) => {
      console.error("실패:", error);
    });
};
