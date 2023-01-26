NodeList.prototype.forEach = Array.prototype.forEach;

const columns = document.querySelectorAll(".list-container");
columns.forEach((column) => new Sortable(column, {
  group: "shared",
  animation: 150,
  ghostClass: "blue-background-class",
}));
