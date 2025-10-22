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
  taskDiv.appendChild(createCompBtn(taskObject));
  taskDiv.appendChild(createTaskText(taskObject));
  taskDiv.appendChild(createSubtaskList());
  taskDiv.appendChild(createSubTaskBtn());
  taskDiv.appendChild(createDelBtn());
  renderSubtasks(taskObject);
};

function addSubtask (e) {
  let inputField = e.target.parentElement.querySelector("input")
  let subTaskTitle = getInputVal(inputField);
  clrInputVal(inputField);
  let parentIndex = Number(e.target.parentElement.parentElement.dataset.indexNumber);
  let parentTask = taskLibrary.tasks[parentIndex];
  parentTask.addSubTask(subTaskTitle);//taskLibrary.addSubtask(subTaskTitle, parentIndex);
  if (taskLibrary.autoSave) {
    saveList();
  };
  renderSubtasks(parentTask);
  e.target.parentElement.remove();
};

function renderSubtasks (parentTaskObj) {
  if (parentTaskObj.subtasks != null) {
    let parentIndex = parentTaskObj.index;
    let taskList = document.getElementById("taskList");
    let parentTask = taskList.querySelector(`div.task[data-index-number="${parentIndex}"]`);
    console.log(parentTask);
    let parentUl = parentTask.querySelector(".subtaskList"); 
    parentUl.innerHTML = "";
    for (let subtask of parentTaskObj.subtasks) {
      let subtaskLi = document.createElement("li");
      subtaskLi.dataset.indexNumber = subtask.index;
      subtaskLi.classList.add("subtask");
      let subtaskSpan = document.createElement("span");
      subtaskSpan.textContent = subtask.text;
      subtaskLi.appendChild(subtaskSpan);
      let subtaskDelBtn = document.createElement("button");
      subtaskDelBtn.type = "button";
      subtaskDelBtn.textContent = "Delete";
      subtaskDelBtn.addEventListener("click", deleteSubtask);
      let subtaskCompBtn = document.createElement("button");
      subtaskCompBtn.type = "button";
      subtaskCompBtn.textContent = "Complete";
      subtaskCompBtn.addEventListener("click", completeSubtask);
      subtaskLi.appendChild(subtaskSpan);
      subtaskLi.appendChild(subtaskDelBtn);
      subtaskLi.appendChild(subtaskCompBtn);
      parentUl.appendChild(subtaskLi);
    };
  };
};

/*function renderSubtasks (parentTaskObj) {
  let taskContainer = document.getElementById("taskList");
  let subtaskList = parentTaskObj.subtasks;
  let parents = taskContainer.querySelectorAll(".task");
  if (subtaskList != null) {
    for (let parent of parents) {
      let subtaskUl = parent.querySelector(".subtaskList");
      subtaskUl.innerHTML = "";
      for (let task of subtaskList) {
        //if (task.parent === Number(parent.dataset.indexNumber)) {
          let subtaskLi = document.createElement("li");
          //subtaskLi.dataset.indexNumber = task.index;
          subtaskLi.classList.add("subtask");
          let subtaskSpan = document.createElement("span");
          subtaskSpan.textContent = task.text;
          let subtaskBtn = document.createElement("button");
          subtaskBtn.type = "button";
          subtaskBtn.textContent = "Delete";
          subtaskBtn.addEventListener("click", deleteSubtask);
          let subtaskCompBtn = document.createElement("button");
          subtaskCompBtn.type = "button";
          subtaskCompBtn.textContent = "Complete";
          subtaskCompBtn.addEventListener("click", completeTask);
          subtaskLi.appendChild(subtaskSpan);
          subtaskLi.appendChild(subtaskCompBtn);
          subtaskLi.appendChild(subtaskBtn);
          subtaskUl.appendChild(subtaskLi);
        };
      };
    };
  };
//};*/

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
  if (taskLibrary.autoSave) {
    saveList();
  };
  renderList(taskLibrary.tasks);
};

function deleteSubtask (event) {
  let targetIndex = Number(event.target.parentElement.dataset.indexNumber);
  let parentIndex = Number(event.target.parentElement.parentElement.parentElement.dataset.indexNumber);
  removeSubtask(parentIndex, targetIndex);
};

function removeSubtask (parentIndex, subtaskIndex) {
  taskLibrary.tasks[parentIndex].subtasks.splice(subtaskIndex, 1);
  taskLibrary.tasks[parentIndex].updateSubOrder();
  if (taskLibrary.autoSave) {
    saveList();
  };
  renderSubtasks(taskLibrary.tasks[parentIndex]);
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
};

function getTitle () {
  let titleInput = document.getElementById("taskTitle");
  let taskTitle = getInputVal(titleInput);
  clrInputVal(titleInput);
  return taskTitle;
};

function addTask () {
  taskLibrary.addTask(getTitle());
  if (taskLibrary.autoSave) {
    saveList();
  };
  renderList(taskLibrary.tasks);
};

function completeTask (event) {
  let currentIndex = Number(event.target.parentElement.dataset.indexNumber);
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
  /*
  event.target.parentElement.classList.toggle("complete");
  if (event.target.parentElement.classList.contains("complete")) {
    event.target.textContent = "Un-Complete";
  } else {
    event.target.textContent = "Complete";
  };
  */
};

function completeSubtask (event) {
  let subtaskIndex = Number(event.target.parentElement.dataset.indexNumber);
  let parentTaskIndex = Number(event.target.parentElement.parentElement.parentElement.dataset.indexNumber);
  if (taskLibrary.tasks[parentTaskIndex].subtasks[subtaskIndex].complete != true) {
    taskLibrary.tasks[parentTaskIndex].subtasks[subtaskIndex].complete = true;
    event.target.textContent = "Un-Complete";
    event.target.parentElement.classList.add("complete");
  } else {
    taskLibrary.tasks[parentTaskIndex].subtasks[subtaskIndex].complete = false;
    event.target.textContent = "Complete";
    event.target.parentElement.classList.remove("complete");
  };
  if (taskLibrary.autoSave) {
    saveList();
  };
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

export {renderTask, renderList, subTaskForm, renderSubtasks, addTask};