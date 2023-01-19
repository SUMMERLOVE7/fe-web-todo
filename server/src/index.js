import Koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import { api } from "./api/index.js";
import cors from "koa-cors";

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());
app.use(bodyparser());

// CORS 옵션
let corsOptions = {
  origin: true,
};

// CORS 허용
app.proxy = true; // true 일때 proxy 헤더들을 신뢰함
app.use(cors(corsOptions));
app.use(router.routes()).use(router.allowedMethods());

app.listen(5500, () => {
  console.log("Listening to port 5500");
});
