import "./style.css";
import {taskLibrary} from "./tasks";
import {autoLoadList, clearList} from "./storage";
import {addTask, renderList} from "./taskrender";

autoLoadList();

// grab html elements
let subBtn = document.getElementById("addBtn");
let tInput = document.getElementById("taskTitle");
let clrBtn = document.getElementById("clrList");

// event listeners
subBtn.addEventListener("click", addTask);

tInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("addBtn").click();
  };
});

/* develblock:start */
/* develblock:end */

clrBtn.addEventListener("click", () => {
  clearList();
  renderList(taskLibrary.tasks);
});