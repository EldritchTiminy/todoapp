import taskLibrary from "./tasks";
import {saveList} from "./storage";
import {taskUp, taskDn} from "./movetask";
import subTaskForm from "./addsubtaskform";
import plus from "../public/plus.svg";
import drag from "../public/drag.svg";
import trash from "../public/trash.svg";
import updateComplete from "./completionbar";

function renderTask (taskObject) {
  let taskList = document.getElementById("taskList");
  let taskDiv = createTaskDiv(taskObject);
  taskList.appendChild(taskDiv);
  let components = [
    createDragBars(),
    createTaskMainDiv(taskObject),
  ];
  for (let comp of components) {
    taskDiv.appendChild(comp);
  };
  let population = [
    createTaskHeader(taskObject),
    createTaskDesc(taskObject),
    createSubtaskList(),
    createCompBtn(taskObject),
  ];
  for (let content of population) {
    taskDiv.querySelector("div.taskCont").appendChild(content);
  };
  let buttons = [
    createSubtaskBtn(),
    createDelBtn(),
  ];
  for (let button of buttons) {
    taskDiv.querySelector("div.taskSide").appendChild(button);
  };
  renderSubtasks(taskObject);
};

function renderSubtasks (parentTaskObj) {
  if (parentTaskObj.subtasks != null) {
    let parentIndex = parentTaskObj.index;
    let taskList = document.getElementById("taskList");
    let parentTask = taskList.querySelector(`div.task[data-index-number="${parentIndex}"]`);
    console.log(parentTask);
    let parentUl = parentTask.querySelector(".stlist"); 
    parentUl.innerHTML = "";
    for (let subtask of parentTaskObj.subtasks) {
      let subtaskLi = createSubtask(subtask);
      parentUl.appendChild(subtaskLi);
    };
  };
};

function createSubtask (subtask) {
  let subtaskLi = document.createElement("li");
  subtaskLi.dataset.indexNumber = subtask.index;
  subtaskLi.classList.add("subtask");
  let subtaskSpan = document.createElement("span");
  subtaskSpan.textContent = subtask.text;
  subtaskLi.appendChild(subtaskSpan);
  let subtaskDelBtn = document.createElement("button");
  subtaskDelBtn.type = "button";
  subtaskDelBtn.textContent = "✕";
  subtaskDelBtn.addEventListener("click", deleteSubtask);
  let subtaskCompBtn = document.createElement("input");
  subtaskCompBtn.type = "checkbox";
  subtaskCompBtn.textContent = "✓";
  subtaskCompBtn.addEventListener("click", completeSubtask);
  subtaskLi.appendChild(subtaskCompBtn);
  subtaskLi.appendChild(subtaskSpan);
  subtaskLi.appendChild(subtaskDelBtn);
  return subtaskLi;
};

// event listener trigger function
function deleteTask (event) {
  let targetIndex = Number(event.target.parentElement.dataset.indexNumber);
  removeTask(targetIndex);
  updateComplete();
};

// function for removing tasks
function removeTask (index) {
  taskLibrary.tasks.splice(index, 1);
  taskLibrary.updateOrder();
  if (taskLibrary.autoSave) {
    saveList();
  };
  renderList(taskLibrary.tasks);
};

// event listener trigger function
function deleteSubtask (event) {
  let targetIndex = Number(event.target.parentElement.dataset.indexNumber);
  let parentIndex = Number(event.target.parentElement.parentElement.parentElement.parentElement.dataset.indexNumber);
  removeSubtask(parentIndex, targetIndex);
  updateComplete();
};

// function for removing subtasaks
function removeSubtask (parentIndex, subtaskIndex) {
  taskLibrary.tasks[parentIndex].subtasks.splice(subtaskIndex, 1);
  taskLibrary.tasks[parentIndex].updateSubOrder();
  if (taskLibrary.autoSave) {
    saveList();
  };
  renderSubtasks(taskLibrary.tasks[parentIndex]);
};

function renderList (lib) {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const l = lib.length;
  for (let i = 0; i < l; i++) {
    renderTask(lib[i]);
  };
};

function completeTask (event) {
  let currentIndex = Number(event.target.parentElement.parentElement.parentElement.dataset.indexNumber);
  if (taskLibrary.tasks[currentIndex].complete != true) {
    taskLibrary.tasks[currentIndex].complete = true;
    event.target.textContent = "Un-Complete";
    event.target.parentElement.classList.add("complete");
  } else {
    taskLibrary.tasks[currentIndex].complete = false;
    event.target.textContent = "Complete";
    event.target.parentElement.classList.remove("complete");
  };
  if (taskLibrary.autoSave) {
    saveList();
  };
  updateComplete();
};

function completeSubtask (event) {
  let subtaskIndex = Number(event.target.parentElement.dataset.indexNumber);
  let parentTaskIndex = Number(event.target.parentElement.parentElement.parentElement.parentElement.dataset.indexNumber);
  if (taskLibrary.tasks[parentTaskIndex].subtasks[subtaskIndex].complete != true) {
    taskLibrary.tasks[parentTaskIndex].subtasks[subtaskIndex].complete = true;
    event.target.style.color = "var(--clr-success-a0)"
    event.target.parentElement.classList.add("complete");
  } else {
    taskLibrary.tasks[parentTaskIndex].subtasks[subtaskIndex].complete = false;
    event.target.style.color = "";
    event.target.parentElement.classList.remove("complete");
  };
  if (taskLibrary.autoSave) {
    saveList();
  };
  updateComplete();
};

// Page Element Builder Functions
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

function createTaskDesc (taskObject) {
  let tTitle = document.createElement("p");
  tTitle.textContent = "description..."; //taskObject.text;
  tTitle.classList.add("primaryTask");
  return tTitle;
};

function createSubtaskList () {
  let subTaskList = document.createElement("ul");
  subTaskList.classList.add("stlist");
  return subTaskList;
};

function createSubtaskBtn () {
  let subTaskBtn = document.createElement("div");
  subTaskBtn.classList.add("addSTDiv");
  let subTaskIcon = document.createElement("img");
  subTaskIcon.src = plus;
  subTaskIcon.style.zIndex = 1;
  subTaskIcon.classList.add("addBtn");
  let subTaskCover = document.createElement("div");
  subTaskCover.classList.add("stCover");
  subTaskBtn.appendChild(subTaskCover);
  subTaskBtn.appendChild(subTaskIcon);
  subTaskCover.addEventListener("click", subTaskForm);
  return subTaskBtn;
};

function createDelBtn () {
  let delBtn = document.createElement("div");
  delBtn.classList.add("deleteDiv");
  let deleteIcon = document.createElement("img");
  deleteIcon.src = trash;
  deleteIcon.classList.add("deleteBtn");
  delBtn.appendChild(deleteIcon);
  delBtn.addEventListener("click", deleteTask);
  return delBtn;
};

function createCompBtn (taskObject) {
  let compBtn = document.createElement("button");
  compBtn.type = "button";
  if (taskObject.complete != true) {
    compBtn.textContent = "Complete";
  } else {
    compBtn.textContent = "Un-Complete";
  };
  compBtn.addEventListener("click", completeTask);
  return compBtn;
};

function createDragBars () {
  let dragDiv = document.createElement("div");
  dragDiv.classList.add("dragIcon");
  let dragImg = document.createElement("img");
  dragImg.src = drag;
  dragImg.classList.add("dragBars");
  dragDiv.appendChild(dragImg);
  return dragDiv;
};

function createTaskMainDiv (taskObject) {
  let taskMain = document.createElement("div");
  taskMain.classList.add("taskMain");
  taskMain.dataset.indexNumber = (taskObject.index);
  let taskCont = document.createElement("div");
  taskCont.classList.add("taskCont");
  let taskSide = document.createElement("div");
  taskSide.classList.add("taskSide");
  taskMain.appendChild(taskCont);
  taskMain.appendChild(taskSide);
  return taskMain;
};

function createTaskHeader (taskObject) {
  let taskHeader = document.createElement("header");
  taskHeader.textContent = taskObject.text;
  return taskHeader;
};

export {renderTask, renderList, subTaskForm, renderSubtasks};