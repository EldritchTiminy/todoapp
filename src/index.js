import "./style.css";
import {taskLibrary} from "./tasks";
import {autoLoadList} from "./storage";
import {addTask} from "./taskrender";

autoLoadList();

// grab html elements
let subBtn = document.getElementById("addBtn");
let tInput = document.getElementById("taskTitle");

// event listeners
subBtn.addEventListener("click", addTask);

tInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("addBtn").click();
  };
});