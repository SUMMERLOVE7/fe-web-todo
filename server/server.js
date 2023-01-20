import { dataStorage } from "../src/store.js";

export async function getData() {
  console.log("AAAAAAAAAAA");
  await fetch("http://localhost:8000/columns", { method: "GET", headers: { "Content-type": "application/json" } })
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error : ", error));
}

export async function addData(index) {
  await fetch("http://localhost:8000/columns/" + dataStorage.columns[index].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[index]),
  })
    .then((response) => {
      console.log("😃" + response);
      return response.json();
    })
    .then((data) => {
      console.log("성공");
    })
    .catch((error) => console.error("Error : ", error));
}

export async function modData(columnIndex) {
  await fetch("http://localhost:8000/columns/" + dataStorage.columns[columnIndex].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[columnIndex]),
  })
    .then((response) => {
      console.log(response + "😇");
      return response.json();
    })
    .then((data) => {
      console.log("😋");
    })
    .catch((error) => console.error("Error : ", error));
}

export async function delData(colIndex) {
  await fetch("http://localhost:8000/columns/" + dataStorage.columns[colIndex].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[colIndex].cards),
  })
    .then((response) => {
      console.log(response + "😈");
      return response.json();
    })
    .then((data) => {
      console.log("❤️");
    })
    .catch((error) => console.error("Error : ", error));
}

// export async function postData() {
//   await fetch("http://localhost:8000/columns", { METHOD: "POST", Headers: { "Content-type": "application/json" } })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.error("Error : ", error));
// }
