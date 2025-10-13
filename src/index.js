import "./style.css";
import {taskLibrary} from "./tasks";
import {autoLoadList, clearList} from "./storage";
import {addTask, renderList} from "./taskrender";

autoLoadList();

let subBtn = document.getElementById("addBtn");
let tInput = document.getElementById("taskTitle");
let clrBtn = document.getElementById("clrList");

subBtn.addEventListener("click", addTask);

tInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("addBtn").click();
  };
});

clrBtn.addEventListener("click", () => {
  clearList();
  renderList(taskLibrary.tasks);
});