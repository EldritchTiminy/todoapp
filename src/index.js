import "./style.css";
//import homePage from "./homepg";
import "./tasks";

// grab html elements
let subBtn = document.getElementById("addBtn");

// event listeners
subBtn.addEventListener("click", () => {
  let newTask = createTask(getTitle(), getOrderNum());
  pushToLib(newTask);
  console.log(window.GLOBALS.taskLib);
  renderList(window.GLOBALS.taskLib);
});

// app functions
function tabSwitch () {
  let content = document.getElementById("content");
  content.innerHTML = "";
};

function getTitle () {
  let tTitle = document.getElementById("taskTitle").value;
  console.log(tTitle);
  clearTitle();
  return tTitle;
};

function clearTitle () {
  document.getElementById("taskTitle").value = "";
};

function getOrderNum () {
  return (window.GLOBALS.taskLib.length + 1);
};

function pushToLib (taskObject) {
  window.GLOBALS.taskLib.push(taskObject);
  console.log(window.GLOBALS.taskLib);
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
  taskDiv.appendChild(tTitle);

  let subTaskList = document.createElement("ul");
  subTaskList.classList.add("subTaskList");
  taskDiv.appendChild(subTaskList);

  let subTaskBtn = document.createElement("button");
  subTaskBtn.textContent = "Add Sub-task";
  taskDiv.appendChild(subTaskBtn);

  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
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

function testTasks () {
  let task1 = createTask("Task #1", getOrderNum());
  pushToLib(task1);
  let task2 = createTask("Task #2", getOrderNum());
  pushToLib(task2);
  let task3 = createTask("Task #3", getOrderNum());
  pushToLib(task3);
  renderList(window.GLOBALS.taskLib);
};
testTasks();

// object constructors
function createTask (title, orderNum) {
  return {
    title: title,
    order: orderNum,
  };
};

// initialize
console.log("Index script running...");
//homePage();