/*
this script handles the functionality for the task form at the top of the page
the form itself is located in the HTML file template.html, it was not inserted with DOM manipulation

function overview:

- getTitle() - this function grabs the text input (#taskTitle, template.html, line 49), then retrieves its value via the getInputVal() function (formops.js, line 50), clears the input field with clrInputVal() (formops.js, line 46), and returns the value retrieved from the input field

- pushTask() - this function triggers the getTitle() function, then feeds the returned input value to the addTask() method of the taskLibrary object (tasks.js, line 12), then it checks if the autosave feature is set to "true", triggers saveList() (storage.js, line 7) if it is, then triggers renderList() (taskrender.js, line 178)

- addTaskButton() - this function grabs the submit button (#addBtn: template.html, line 50), and the text input (#taskTitle, template.html, line 49) and attaches event listeners to them to trigger the pushTask() function
*/

// imports
import taskLibrary from "./tasks";
import {getInputVal, clrInputVal} from "./formops";
import {saveList} from "./storage";
import {renderList} from "./taskrender";

// scripting
function getTitle () {
  let titleInput = document.getElementById("taskTitle"); // grabbing text input (template.html, line 49)
  let taskTitle = getInputVal(titleInput); // grabbing input value
  clrInputVal(titleInput); // clearing input after retrieval
  return taskTitle; // returning input value
};

function pushTask () {
  taskLibrary.addTask(getTitle()); // feeding retrieved input value to addTask method (tasks.js, line 12)
  if (taskLibrary.autoSave) { // check for autosave
    saveList(); // trigger safe if autosave is "true"
  };
  renderList(taskLibrary.tasks); // re-render list with new task
};

export function addTaskButton () {
  let subBtn = document.getElementById("addBtn"); // grabbing button (template.html, line 50)
  let taskTitle = document.getElementById("taskTitle"); // grabbing text input (template.html, line 49)
  subBtn.addEventListener("click", pushTask); // event listeners, trigger addTask
  taskTitle.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("addBtn").click();
    };
  });
};

// form pop up button
export function formTog () {
  let titleInput = document.getElementById("taskTitle");
  let addBtn = document.getElementById("addBtn");
  let canBtn = document.getElementById("canBtn");
  let addBtnTxt = document.getElementById("addBtnTxt");
  let formTog = document.getElementById("formTog");
  if (titleInput.style.display === "none") {
    titleInput.style.display = "inline";
    addBtn.style.display = "inline";
    canBtn.style.display = "inline";
    addBtnTxt.style.display = "none";
    animateBtn(parseInt(formTog.style.width), 40);
  } else {
    titleInput.style.display = "none";
    addBtn.style.display = "none";
    canBtn.style.display = "none";
    addBtnTxt.style.display = "inline";
    animateBtn(parseInt(formTog.style.width), 120);
  };
};

let timerVar = null;
export function animateBtn (currentP, newP) {
  console.log("currentP", currentP, typeof currentP);
  console.log("newP", newP, typeof newP);
  let elem = document.getElementById("formTog");
  let pos = currentP;
  clearInterval(timerVar);
  timerVar = setInterval(animFrame, 4);
  function animFrame () {
    if (pos === newP) {
      clearInterval(timerVar);
    } else {
      if (pos < newP) {
        pos++;
        elem.style.width = `${pos}px`;
      } else {
        pos--;
        elem.style.width = `${pos}px`;
      };
    };
  };
};