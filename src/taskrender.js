import {taskLibrary} from "./tasks";
import {saveList} from "./storage";
import {taskUp, taskDn} from "./movetask";
import {clrInputVal, getInputVal} from "./formops";


function renderTask (taskObject) {
  // grab task list element
  let taskList = document.getElementById("taskList");
  // create task body container
  let taskDiv = createTaskDiv(taskObject);
  taskList.appendChild(taskDiv);
  // add task label
  taskDiv.appendChild(createOrderLabel(taskObject));
  // add up-sorting button
  taskDiv.appendChild(createUpSortBtn());
  // add down-sorting button
  taskDiv.appendChild(createDownSortBtn());
  // add task text
  taskDiv.appendChild(createTaskText(taskObject));
  // add subtask list
  taskDiv.appendChild(createSubtaskList());
  // add subtask button
  taskDiv.appendChild(createSubTaskBtn());
  // add delete button
  taskDiv.appendChild(createDelBtn());
  // populating subtask list from library
  let currentTaskInd = taskObject.index;
};

function addSubtask (e) {
  // getting sub-task title input
  let inputField = e.target.parentElement.querySelector("input")
  let subTaskTitle = getInputVal(inputField);
  console.log(subTaskTitle);
  clrInputVal(inputField);

  // adding task to subtask library
  let parentIndex = Number(e.target.parentElement.parentElement.dataset.indexNumber);
  console.log(parentIndex);
  taskLibrary.addSubtask(subTaskTitle, parentIndex);
  saveList();

  renderSubtasks();

  // delete form after input
  e.target.parentElement.remove();
};

function renderSubtasks () {
  let taskContainer = document.getElementById("taskList");
  let subtaskList = taskLibrary.subtasks;
  let parents = taskContainer.querySelectorAll(".task");

  if (subtaskList != null) {
    for (let parent of parents) {
      let subtaskUl = parent.querySelector(".subtaskList");
      subtaskUl.innerHTML = "";
      for (let task of subtaskList) {
        if (task.parent === Number(parent.dataset.indexNumber)) {
          console.log(task.parent);
          console.log(task.text);
          let subtaskLi = document.createElement("li");
          subtaskLi.classList.add("subtask");
          let subtaskSpan = document.createElement("span");
          subtaskSpan.textContent = task.text;
          let subtaskBtn = document.createElement("button");
          subtaskBtn.type = "button";
          subtaskBtn.textContent = "Delete";
          subtaskLi.appendChild(subtaskSpan);
          subtaskLi.appendChild(subtaskBtn);
          subtaskUl.appendChild(subtaskLi);
        };
      };
    };
  };
};

// function for deleting a task
// should remove the task from the task library
// should remove all of the task's subtasks
// re-render everything

// function for deleting a subtask
// should remove the subtask from the task library
// re-render subtasks
















// Creates a pop up form to create a subtask when triggered.
function subTaskForm (e) {
  let taskForm = document.createElement("form");
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.addEventListener("keypress", enterActivate);
  let submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.textContent = "Add Sub-Task";
  submitBtn.classList.add("submitBtn");
  submitBtn.addEventListener("click", addSubtask);
  taskForm.appendChild(textInput);
  taskForm.appendChild(submitBtn);
  e.target.parentElement.appendChild(taskForm);
};


// enter key functionality for form
function enterActivate (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.parentElement.querySelector(".submitBtn").click();
  };
};











function renderList (lib) {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const l = lib.length;
  for (let i = 0; i < l; i++) {
    renderTask(lib[i]);
  };
  renderSubtasks();
};

function getTitle () {
  let titleInput = document.getElementById("taskTitle");
  let taskTitle = getInputVal(titleInput);
  clrInputVal(titleInput);
  return taskTitle;
};

function addTask () {
  taskLibrary.addTask(getTitle());
  saveList();
  renderList(taskLibrary.tasks);
};

function removeTask (event) {
  const currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  taskLibrary.tasks.splice(currentIndex, 1);
  //updateOrder(taskLibrary.tasks);
  taskLibrary.updateOrder();
  saveList();
  renderList(taskLibrary.tasks);
};




// builder functions for creating and returning task sub elements.
function createTaskDiv (taskObject) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.indexNumber = (taskObject.index);
  return taskDiv;
};

function createOrderLabel(taskObject) {
  let taskListOrder = document.createElement("p");
  taskListOrder.classList.add("listOrder");
  taskListOrder.textContent = `#${taskObject.index + 1}`;
  return taskListOrder;
};

function createUpSortBtn () {
  let upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.textContent = "Move Up";
  upBtn.addEventListener("click", taskUp);
  return upBtn;
};

function createDownSortBtn () {
  let dnBtn = document.createElement("button");
  dnBtn.type = "button";
  dnBtn.textContent = "Move Down";
  dnBtn.addEventListener("click", taskDn);
  return dnBtn;
};

function createTaskText (taskObject) {
  let tTitle = document.createElement("p");
  tTitle.textContent = taskObject.text;
  tTitle.classList.add("primaryTask");
  return tTitle;
};

function createSubtaskList () {
  let subTaskList = document.createElement("ul");
  subTaskList.classList.add("subtaskList");
  return subTaskList;
};

function createSubTaskBtn () {
  let subTaskBtn = document.createElement("button");
  subTaskBtn.textContent = "Add Sub-task";
  subTaskBtn.addEventListener("click", subTaskForm);
  return subTaskBtn;
};

function createDelBtn () {
  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", removeTask);
  return delBtn;
};

export {renderTask, renderList, subTaskForm, renderSubtasks, addTask};