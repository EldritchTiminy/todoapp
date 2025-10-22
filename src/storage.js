import {taskLibrary} from "./tasks";
import {renderList, renderSubtasks} from "./taskrender";
import {exampleTasks} from "./examples";
import {autoSaveSetter} from "./formops";
import {serialize, revive, deserialize} from "./serializer";

function saveList () {
  const currentTaskList = taskLibrary.tasks;
  //const currentSubtaskList = taskLibrary.subtasks;
  const autoSaveSetting = taskLibrary.autoSave;
  const storageArray = [autoSaveSetting, currentTaskList];
  //const stringifiedTasks = serialize(currentTaskList); //JSON.stringify(currentTaskList);
  const stringifiedArray = serialize(storageArray);
    //const stringifiedSubtasks = JSON.stringify(currentSubtaskList);
    //const stringifiedAutoSave = JSON.stringify(autoSaveSetting);
  //localStorage.setItem("taskList", stringifiedTasks);
  localStorage.setItem("todoproj", stringifiedArray);
    //localStorage.setItem("subtaskList", stringifiedSubtasks);
    //localStorage.setItem("autoSave", stringifiedAutoSave);
  /* develblock:start */
  console.log("List Saved...");
  //console.log(currentTaskList);
  //console.log(stringifiedTasks);
  /* develblock:end */
};

function loadList () {
  //const savedTaskList = localStorage.getItem("taskList");
  const savedArray = localStorage.getItem("todoproj");
    //const savedSubtaskList = localStorage.getItem("subtaskList");
    //const savedAutoSave = localStorage.getItem("autoSave");
  //const parsedTaskList = deserialize(savedTaskList); //JSON.parse(savedTaskList);
  const parsedArray = deserialize(savedArray);
  const parsedTaskList = parsedArray[1];
    //const parsedSubtaskList = JSON.parse(savedSubtaskList);
  const parsedAutoSave = parsedArray[0];//JSON.parse(savedAutoSave);
  taskLibrary.tasks = parsedTaskList;
    //taskLibrary.subtasks = parsedSubtaskList;
  taskLibrary.autoSave = parsedAutoSave;
  autoSaveSetter();
  /* devblock:start */
  //console.log(savedTaskList);
  console.log(parsedTaskList);
  /* devblock:end */
};

function autoLoadList () {
  if (!localStorage.getItem("todoproj")) {
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
    saveList();
  } else {
    taskLibrary.autoSave = true;
    saveList();
  };
};

function downloadBlob () {
  let list = localStorage.getItem("todoproj");
  const blob = new Blob([list], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "todolist.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export {saveList, loadList, autoLoadList, clearList, autoSaveToggle, downloadBlob};