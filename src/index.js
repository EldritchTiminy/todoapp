import "./style.css";
import {taskLibrary, pushToLib, getOrderNumber, updateOrder} from "./tasks";
import {saveList, autoLoadList} from "./storage";
import {taskUp, taskDn} from "./movetask";
import {clrInputVal, getInputVal} from "./formops";

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

// app functions


// object constructors
function createTask (title, orderNum) {
  return {
    title: title,
    order: orderNum,
    subTasks: []
  };
};

export {createTask};