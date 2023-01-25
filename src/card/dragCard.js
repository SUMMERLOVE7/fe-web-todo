// 카드 드래그 하는 부분
const columns = document.querySelectorAll(".list-container");
columns.forEach((column) => {
  new Sortable(column, {
    group: "shared",
    animation: 150,
    ghostClass: "blue-background-class",
  });
});
