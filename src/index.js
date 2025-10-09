import "./style.css";
import homePage from "./homepg";
import window from "./tasks";

// grab html elements
let subBtn = document.getElementById("addBtn");
let tInput = document.getElementById("taskTitle");

// event listeners
subBtn.addEventListener("click", () => {
  let newTask = createTask(getTitle(), getOrderNum());
  pushToLib(newTask);
  saveList();
  renderList(window.GLOBALS.taskLib);
});

tInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("addBtn").click();
  };
});

// app functions
function tabSwitch () {
  let content = document.getElementById("content");
  content.innerHTML = "";
};

function getTitle () {
  let tTitle = document.getElementById("taskTitle").value;
  clearTitle();
  return tTitle;
};

function clearTitle () {
  document.getElementById("taskTitle").value = "";
};

function getOrderNum () {
  return (window.GLOBALS.taskLib.length + 1);
};

function updateOrder (lib) {
  const libLength = lib.length;
  for (let i = 0; i < libLength; i++) {
    lib[i].order = (i + 1);
  };
};

function pushToLib (taskObject) {
  window.GLOBALS.taskLib.push(taskObject);
};

function renderTask (taskObject) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.indexNumber = (taskObject.order - 1);
  let taskList = document.getElementById("taskList");
  taskList.appendChild(taskDiv);

  let taskListOrder = document.createElement("p");
  taskListOrder.classList.add("listOrder");
  taskListOrder.textContent = `#${taskObject.order}`;
  taskDiv.appendChild(taskListOrder);

  let upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.textContent = "Move Up";
  upBtn.addEventListener("click", taskUp);
  taskDiv.appendChild(upBtn);

  let dnBtn = document.createElement("button");
  dnBtn.type = "button";
  dnBtn.textContent = "Move Down";
  dnBtn.addEventListener("click", taskDn);
  taskDiv.appendChild(dnBtn);

  let tTitle = document.createElement("p");
  tTitle.textContent = taskObject.title;
  tTitle.classList.add("primaryTask");
  taskDiv.appendChild(tTitle);

  let subTaskList = document.createElement("ul");
  subTaskList.classList.add("subTaskList");
  taskDiv.appendChild(subTaskList);

  if (taskObject.subTasks) {
    for (let task of taskObject.subTasks) {
      let currentSub = document.createElement("li");
      currentSub.classList.add("subTask");
      currentSub.textContent = task;
      subTaskList.appendChild(currentSub);
    };
  };

  let subTaskBtn = document.createElement("button");
  subTaskBtn.textContent = "Add Sub-task";
  subTaskBtn.addEventListener("click", subTaskForm);
  taskDiv.appendChild(subTaskBtn);

  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", removeTask);
  taskDiv.appendChild(delBtn);
};

function renderList (lib) {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const l = lib.length;
  for (let i = 0; i < l; i++) {
    renderTask(lib[i]);
  };
};

function taskUp (event) {
  let currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  if (currentIndex > 0) {
    let priorTask = window.GLOBALS.taskLib[currentIndex - 1];
    let currentTask = window.GLOBALS.taskLib[currentIndex];
    priorTask.order++;
    currentTask.order--;
    window.GLOBALS.taskLib[currentIndex - 1] = currentTask;
    window.GLOBALS.taskLib[currentIndex] = priorTask;
    renderList(window.GLOBALS.taskLib);
  };
};

function taskDn (event) {
  let currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  let nextIndex = currentIndex + 1;
  let libLen = window.GLOBALS.taskLib.length - 1;
  console.log(libLen);
  if (currentIndex < libLen) {
    let nextTask = window.GLOBALS.taskLib[nextIndex];
    let currentTask = window.GLOBALS.taskLib[currentIndex];
    nextTask.order--;
    currentTask.order++;
    window.GLOBALS.taskLib[currentIndex + 1] = currentTask;
    window.GLOBALS.taskLib[currentIndex] = nextTask;
    renderList(window.GLOBALS.taskLib);
  };
};

function removeTask (event) {
  const currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  window.GLOBALS.taskLib.splice(currentIndex, 1);
  updateOrder(window.GLOBALS.taskLib);
  saveList();
  renderList(window.GLOBALS.taskLib);
};

function subTaskForm (event) {
  let taskForm = document.createElement("form");
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.parentElement.querySelector(".submitBtn").click();
    };
  });
  let submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.textContent = "Add Sub-Task";
  submitBtn.classList.add("submitBtn");
  submitBtn.addEventListener("click", renderSubTask);
  taskForm.appendChild(textInput);
  taskForm.appendChild(submitBtn);
  event.target.parentElement.appendChild(taskForm);
};

function renderSubTask (e) {
  let inputField = e.target.parentElement.querySelector("input");
  let subTaskTitle = inputField.value;
  inputField.value = "";
  let subTaskList = e.target.parentElement.parentElement.querySelector(".subTaskList")
  let newSubTask = document.createElement("li");
  newSubTask.classList.add("subTask");
  newSubTask.textContent = subTaskTitle;
  subTaskList.appendChild(newSubTask);
  let currentIndex = Number(e.target.parentElement.parentElement.dataset.indexNumber);
  console.log(currentIndex);
  let storedSubTaskList = window.GLOBALS.taskLib[currentIndex].subTasks;
  console.log(storedSubTaskList);
  storedSubTaskList.push(subTaskTitle);
  saveList();
  e.target.parentElement.remove();
};

// temp functions
function testTasks () {
  let task1 = createTask("Wash the dishes", getOrderNum());
  pushToLib(task1);
  let task2 = createTask("Vacuum the livingroom", getOrderNum());
  pushToLib(task2);
  let task3 = createTask("Check the mail", getOrderNum());
  pushToLib(task3);
  renderList(window.GLOBALS.taskLib);
};
// testTasks();

// object constructors
function createTask (title, orderNum) {
  return {
    title: title,
    order: orderNum,
    subTasks: []
  };
};

// data storage functions
function saveList () {
  // temp storage value
  const currentList = window.GLOBALS.taskLib;
  // stringify list
  const stringified = JSON.stringify(currentList);
  // save to local storage
  localStorage.setItem("taskList", stringified);
  console.log("List Saved...");
};

function loadList () {
  // load from local storage
  const savedList = localStorage.getItem("taskList");
  // parse saved list
  const parsedList = JSON.parse(savedList);
  // overwrite current list
  window.GLOBALS.taskLib = parsedList;
};

// autoload storage
if (!localStorage.getItem("taskList")) {
  testTasks();
} else {
  loadList();
  renderList(window.GLOBALS.taskLib);
};