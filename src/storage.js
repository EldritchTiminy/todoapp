import {taskLibrary} from "./tasks";
import {renderList, renderSubtasks} from "./taskrender";
import {exampleTasks} from "./examples";

function saveList () {
  const currentTaskList = taskLibrary.tasks;
  const currentSubtaskList = taskLibrary.subtasks;
  const stringifiedTasks = JSON.stringify(currentTaskList);
  const stringifiedSubtasks = JSON.stringify(currentSubtaskList);
  localStorage.setItem("taskList", stringifiedTasks);
  localStorage.setItem("subtaskList", stringifiedSubtasks);
  /* develblock:start */
  console.log("List Saved...");
  /* develblock:end */
};

function loadList () {
  const savedTaskList = localStorage.getItem("taskList");
  const savedSubtaskList = localStorage.getItem("subtaskList");
  const parsedTaskList = JSON.parse(savedTaskList);
  const parsedSubtaskList = JSON.parse(savedSubtaskList);
  taskLibrary.tasks = parsedTaskList;
  taskLibrary.subtasks = parsedSubtaskList;
};

function autoLoadList () {
  if (!localStorage.getItem("taskList")) {
    exampleTasks();
  } else {
    loadList();
    renderList(taskLibrary.tasks);
    renderSubtasks();
  };
  /* develblock:start */
  console.log("Task List Loaded...");
  /* develblock:end */
};

function clearList () {
  localStorage.setItem("taskList", []);
  localStorage.setItem("subtaskList", []);
  taskLibrary.tasks = [];
  taskLibrary.subtasks = [];
  /* develblock:start */
  console.log("List Cleared...")
  /* develblock:end */
  saveList();
};

export {saveList, loadList, autoLoadList, clearList};