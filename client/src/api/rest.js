import { render } from "../render.js";
import { Todos } from "../store.js";

//get
export const getTodo = () => {
  fetch("http://localhost:4000/api/todos")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        Todos.push(element);
      });
      render();
    });
};

//post

// //delete
// export const deleteTodo = () => {

// }

//patch
