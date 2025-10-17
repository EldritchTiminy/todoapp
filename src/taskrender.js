import {taskLibrary} from "./tasks";
import {saveList} from "./storage";
import {taskUp, taskDn} from "./movetask";
import {clrInputVal, getInputVal} from "./formops";

function renderTask (taskObject) {
  let taskList = document.getElementById("taskList");
  let taskDiv = createTaskDiv(taskObject);
  taskList.appendChild(taskDiv);
  taskDiv.appendChild(createOrderLabel(taskObject));
  taskDiv.appendChild(createUpSortBtn());
  taskDiv.appendChild(createDownSortBtn());
  taskDiv.appendChild(createCompBtn());
  taskDiv.appendChild(createTaskText(taskObject));
  taskDiv.appendChild(createSubtaskList());
  taskDiv.appendChild(createSubTaskBtn());
  taskDiv.appendChild(createDelBtn());
};

function addSubtask (e) {
  let inputField = e.target.parentElement.querySelector("input")
  let subTaskTitle = getInputVal(inputField);
  clrInputVal(inputField);
  let parentIndex = Number(e.target.parentElement.parentElement.dataset.indexNumber);
  taskLibrary.addSubtask(subTaskTitle, parentIndex);
  saveList();
  renderSubtasks();
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
          let subtaskLi = document.createElement("li");
          subtaskLi.dataset.indexNumber = task.index;
          subtaskLi.classList.add("subtask");
          let subtaskSpan = document.createElement("span");
          subtaskSpan.textContent = task.text;
          let subtaskBtn = document.createElement("button");
          subtaskBtn.type = "button";
          subtaskBtn.textContent = "Delete";
          subtaskBtn.addEventListener("click", deleteSubtask);
          subtaskLi.appendChild(subtaskSpan);
          subtaskLi.appendChild(subtaskBtn);
          subtaskUl.appendChild(subtaskLi);
        };
      };
    };
  };
};

function deleteTask (event) {
  let targetIndex = Number(event.target.parentElement.dataset.indexNumber);
  removeTask(targetIndex);
};

function removeTask (index) {
  taskLibrary.tasks.splice(index, 1);
  for (let subtask of taskLibrary.subtasks) {
    if (subtask.parent === index) {
      taskLibrary.subtasks.splice(subtask.index, 1);
    };
  };
  taskLibrary.updateOrder();
  taskLibrary.updateSubOrder();
  saveList();
  renderList(taskLibrary.tasks);
  renderSubtasks();
};

function deleteSubtask (event) {
  let targetIndex = Number(event.target.parentElement.dataset.indexNumber);
  removeSubtask(targetIndex);
};

function removeSubtask (subtaskIndex) {
  taskLibrary.subtasks.splice(subtaskIndex, 1);
  taskLibrary.updateSubOrder();
  saveList();
  renderSubtasks();
};

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
  let cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("formCancelBtn");
  cancelBtn.addEventListener("click", cancelForm);
  taskForm.id = "taskForm";
  taskForm.appendChild(textInput);
  taskForm.appendChild(submitBtn);
  taskForm.appendChild(cancelBtn);
  e.target.parentElement.appendChild(taskForm);
  textInput.focus({focusVisible: true});
};

function cancelForm (e) {
  e.target.parentElement.remove();
};

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

function completeTask (event) {
  event.target.parentElement.classList.toggle("complete");
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
  delBtn.type = "button";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", deleteTask);
  return delBtn;
};

function createCompBtn () {
  let compBtn = document.createElement("button");
  compBtn.type = "button";
  compBtn.textContent = "Complete!";
  compBtn.addEventListener("click", completeTask);
  return compBtn;
};

export {renderTask, renderList, subTaskForm, renderSubtasks, addTask};