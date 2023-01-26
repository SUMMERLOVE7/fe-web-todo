import { dataStorage } from "../src/store.js";

const BASE_URL = "http://localhost:8000"

async function getData() {
  await fetch(`${BASE_URL}/columns`, { 
    method: "GET", headers: { "Content-type": "application/json" } 
  }).then((res) => res.json());
}

async function addData(index) {
  await fetch(`${BASE_URL}/columns/` + dataStorage.columns[index].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[index]),
  }).then((res) => res.json());
}

async function modData(columnIndex) {
  await fetch(`${BASE_URL}/columns` + dataStorage.columns[columnIndex].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[columnIndex]),
  }).then((res) => res.json());
}

async function delData(colIndex) {
  await fetch(`${BASE_URL}/columns/` + dataStorage.columns[colIndex].id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataStorage.columns[colIndex].cards),
  }).then((res) => res.json());
}

export { getData, addData, modData, delData }