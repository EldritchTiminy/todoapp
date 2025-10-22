import {taskLibrary} from "./tasks";
import {renderList, renderSubtasks} from "./taskrender";
import {exampleTasks} from "./examples";
import {autoSaveSetter} from "./formops";
import {serialize, revive, deserialize} from "./serializer";

function saveList () {
  const currentTaskList = taskLibrary.tasks;
  //const currentSubtaskList = taskLibrary.subtasks;
  const autoSaveSetting = taskLibrary.autoSave;
  const stringifiedTasks = serialize(currentTaskList); //JSON.stringify(currentTaskList);
  //const stringifiedSubtasks = JSON.stringify(currentSubtaskList);
  const stringifiedAutoSave = JSON.stringify(autoSaveSetting);
  localStorage.setItem("taskList", stringifiedTasks);
  //localStorage.setItem("subtaskList", stringifiedSubtasks);
  localStorage.setItem("autoSave", stringifiedAutoSave);
  /* develblock:start */
  console.log("List Saved...");
  /* develblock:end */
};

function loadList () {
  const savedTaskList = localStorage.getItem("taskList");
  //const savedSubtaskList = localStorage.getItem("subtaskList");
  const savedAutoSave = localStorage.getItem("autoSave");
  const parsedTaskList = deserialize(savedTaskList); //JSON.parse(savedTaskList);
  //const parsedSubtaskList = JSON.parse(savedSubtaskList);
  const parsedAutoSave = JSON.parse(savedAutoSave);
  taskLibrary.tasks = parsedTaskList;
  //taskLibrary.subtasks = parsedSubtaskList;
  taskLibrary.autoSave = parsedAutoSave;
  autoSaveSetter();
};

function autoLoadList () {
  if (!localStorage.getItem("taskList")) {
    exampleTasks();
  } else {
    loadList();
    renderList(taskLibrary.tasks);
    //renderSubtasks();
  };
  /* develblock:start */
  console.log("Task List Loaded...");
  /* develblock:end */
};

function clearList () {
  localStorage.setItem("taskList", []);
  //localStorage.setItem("subtaskList", []);
  taskLibrary.tasks = [];
  //taskLibrary.subtasks = [];
  /* develblock:start */
  console.log("List Cleared...")
  /* develblock:end */
  saveList();
};

function autoSaveToggle () {
  if (taskLibrary.autoSave) {
    taskLibrary.autoSave = false;
  } else {
    taskLibrary.autoSave = true;
  };
  const autoSaveSetting = taskLibrary.autoSave;
  const stringifiedAutoSave = JSON.stringify(autoSaveSetting);
  localStorage.setItem("autoSave", stringifiedAutoSave);
};

export {saveList, loadList, autoLoadList, clearList, autoSaveToggle};