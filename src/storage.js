import {taskLibrary} from "./tasks";
import {renderList, renderSubtasks} from "./taskrender";
import {exampleTasks} from "./examples";

// data storage functions
function saveList () {
  // temp storage value
  const currentTaskList = taskLibrary.tasks;
  const currentSubtaskList = taskLibrary.subtasks;
  // stringify list
  const stringifiedTasks = JSON.stringify(currentTaskList);
  const stringifiedSubtasks = JSON.stringify(currentSubtaskList);
  // save to local storage
  localStorage.setItem("taskList", stringifiedTasks);
  localStorage.setItem("subtaskList", stringifiedSubtasks);
  console.log("List Saved...");
};

function loadList () {
  // load from local storage
  const savedTaskList = localStorage.getItem("taskList");
  const savedSubtaskList = localStorage.getItem("subtaskList");
  // parse saved list
  const parsedTaskList = JSON.parse(savedTaskList);
  const parsedSubtaskList = JSON.parse(savedSubtaskList);
  // overwrite current list
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
};

export {saveList, loadList, autoLoadList};