//add,update input창 높이 자동 조절하는 함수
const autoResizeTextarea = (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
};

export { autoResizeTextarea };
