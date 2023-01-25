import Router from "koa-router";
import { todos } from "./todos/index.js";

const api = new Router();
api.use("/todos", todos.routes());

export { api };
