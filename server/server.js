import { dataStorage } from "../src/store.js";

const BASE_URL = "http://localhost:8000"

export async function getData() {
  await fetch(`${BASE_URL}/columns`, { 
    method: "GET", headers: { "Content-type": "application/json" } 
  }).then((response) => response.json());
}

export async function addData(index) {
  await fetch(`${BASE_URL}/columns/` + dataStorage.columns[index].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[index]),
  })
    .then((response) => response.json());
}

export async function modData(columnIndex) {
  await fetch(`${BASE_URL}/columns` + dataStorage.columns[columnIndex].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[columnIndex]),
  })
    .then((response) => response.json());
}

export async function delData(colIndex) {
  await fetch(`${BASE_URL}/columns/` + dataStorage.columns[colIndex].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[colIndex].cards),
  }).then((response) => response.json());
}

// export async function postData() {
//   await fetch("http://localhost:8000/columns", { METHOD: "POST", Headers: { "Content-type": "application/json" } })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.error("Error : ", error));
// }
