/*
this script handles the subtask form that is added and then removed when the add subtask button is pressed on a task

variable overview:

- SubTaskFormOpen - this variable is a boolean value that tracks whether or not a subtask form is currently open, allowing the script to prevent a user from opening the form more than once at a time.

function overview:

- addSubTask() - this function retrieves the information from the input field, adds a new subtask with that information, and removes the form.

- cancelForm() - this event handler closes the form without saving or processing its information and sets the subTaskFormOpen to false, so the user can open a new form later/elsewhere

- enterActivate() - this event handler allows the form to be submitted by pressing the "Enter" key

- subTaskForm() - this event handler builds the form for inputting information for a new subtask and attaches event handlers to the buttons and input fields.
*/

// imports
import {saveList} from "./storage";
import {getInputVal, clrInputVal} from "./formops";
import taskLibrary from "./tasks";
import {renderSubtasks} from "./taskrender";

// scripting
let subTaskFormOpen = false;

// this function retrieves the information input by the user, processes the information into a new subtask, then removes the form
function addSubtask (e) {
  let inputField = e.target.parentElement.querySelector("input"); // grabing the text input
  let subTaskTitle = getInputVal(inputField); // retrieving the value
  clrInputVal(inputField); // clearing the input
  let parentIndex = Number(e.target.parentElement.parentElement.parentElement.parentElement.dataset.indexNumber); // retrieving the parent tasks index
  let parentTask = taskLibrary.tasks[parentIndex]; // referencing the parent task
  parentTask.addSubTask(subTaskTitle); // add subtask to its parent
  if (taskLibrary.autoSave) { // check for autosave
    saveList();
  };
  renderSubtasks(parentTask); // re-render subtasks with new task.
  e.target.parentElement.remove(); // remove input form
  subTaskFormOpen = false; // toggle off boolean variable.
};

// this event handler removes the form and doesn't proces its information
function cancelForm (e) {
  e.target.parentElement.remove();
  subTaskFormOpen = false;
};

// event handler for pressing "Enter" to input the information
function enterActivate (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.parentElement.querySelector(".submitBtn").click();
  };
};

// this function builds the form for adding a new subtask
export default function subTaskForm (e) {
  if (subTaskFormOpen === false) {
    subTaskFormOpen = true;
    let taskForm = document.createElement("form");
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.addEventListener("keypress", enterActivate);
    let submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.textContent = "Add Sub-Task";
    submitBtn.classList.add("submitBtn");
    submitBtn.addEventListener("click", addSubtask);
    let cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("formCancelBtn");
    cancelBtn.addEventListener("click", cancelForm);
    taskForm.id = "taskForm";
    taskForm.appendChild(textInput);
    taskForm.appendChild(submitBtn);
    taskForm.appendChild(cancelBtn);
    let stListTarget = e.target.parentElement.parentElement.parentElement;
    stListTarget.querySelector(".taskCont").querySelector(".stlist").appendChild(taskForm);
    textInput.focus({focusVisible: true});
  };
};