import { modalEvent } from "./src/Modal.js";
import { dragEvent } from "./src/drag.js";
import { getTodo } from "./src/api/rest.js";
import { dblclickEvent } from "./src/Event/dblclickEvent.js";
import { clickEvent } from "./src/Event/clickEvent.js";
import { popupbarEvent } from "./src/Event/popupbarEvent.js";

const init = () => {
  const body = document.body;

  modalEvent();
  popupbarEvent();
  clickEvent(body);
  dragEvent(body);
  dblclickEvent(body);
  getTodo();
};

init();
