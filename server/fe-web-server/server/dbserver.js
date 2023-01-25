const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json")); // ← 사용할 json 파일 지정
const middlewares = jsonServer.defaults();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use(router);

let port = 8000; // ← port 설정 부분 (변경 가능)
server.listen(port, () => {
  console.log(`JSON Server is running, port(${port})`);
});

// function getPostData() {
//   const xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성

//   xhr.open("GET", "http://localhost:8000/columns");
//   xhr.setRequestHeader("content-type", "application/json");
//   xhr.send();

//   // 서버로 부터 응답 받으면 실행
//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       const res = JSON.parse(xhr.response);
//       console.log(res);
//     } else {
//       console.log(xhr.status, xhr.statusText);
//     }
//   };
// }

// getPostData();

// fetch("http://localhost:8000/column/cards", { method: "GET", Headers: { "Content-Type": "application/json" } })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error : ", error));

// let newData = {
//   title: "놀기",
//   caption: ["하루종일 놀자"],
//   id: "4",
// };
