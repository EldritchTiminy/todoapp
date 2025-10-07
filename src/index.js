import "./style.css";
//import homePage from "./homepg";
import taskLib from "./tasks";

// grab html elements
let subBtn = document.getElementById("addBtn");

// event listeners
subBtn.addEventListener("click", () => {
  let newTask = createTask(getTitle(), getOrderNum());
  pushToLib(newTask);
  console.log(taskLib);
  renderList(taskLib);
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
  return (taskLib.length + 1);
};

function pushToLib (taskObject) {
  taskLib.push(taskObject);
  console.log(taskLib);
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
  upBtn.textContent = "Move Up";
  upBtn.addEventListener("click", taskUp);
  taskDiv.appendChild(upBtn);

  let dnBtn = document.createElement("button");
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
  let currentIndex = event.target.parentElement.dataset.indexNumber;
  if (currentIndex > 0) {
    let upperTask = taskLib[currentIndex - 1];
    let currentTask = taskLib[currentIndex];
    upperTask.order += 1;
    currentTask.order -= 1;
    taskLib[currentIndex - 1] = taskLib[currentIndex];
    taskLib[currentIndex] = upperTask;
    renderList(taskLib);
  };
};

function taskDn (event) {
  let currentIndex = event.target.parentElement.dataset.indexNumber;
  if (currentIndex < (taskLib.length - 1)) {
    let nextIndex = currentIndex + 1;
    let nextTask = taskLib[nextIndex];
    let currentTask = taskLib[currentIndex];
    console.log(nextTask);
    nextTask.order -= 1;
    currentTask.order += 1;
    taskLib[currentIndex + 1] = currentTask;
    taskLib[currentIndex] = nextTask;
    renderList(taskLib);
  };
};

function testTasks () {
  let task1 = createTask("Task #1", getOrderNum());
  pushToLib(task1);
  let task2 = createTask("Task #2", getOrderNum());
  pushToLib(task2);
  let task3 = createTask("Task #3", getOrderNum());
  pushToLib(task3);
  renderList(taskLib);
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