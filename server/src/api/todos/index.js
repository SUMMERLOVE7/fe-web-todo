import Router from "koa-router";
import { write, list, read, remove, update } from "./todos.ctrl.js";

const todos = new Router();

todos.get("/", list);
todos.post("/", write);
todos.get("/:id", read);
todos.delete("/:id", remove);
todos.put("/:id", update);

export { todos };
