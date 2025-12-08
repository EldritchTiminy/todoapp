import taskLibrary from "./tasks";
import {renderList} from "./taskrender";
import exampleTasks from "./examples";
import {autoSaveSetter} from "./formops";
import {serialize, deserialize} from "./serializer";

function saveList () {
  const currentTaskList = taskLibrary.tasks;
  const autoSaveSetting = taskLibrary.autoSave;
  const storageArray = [autoSaveSetting, currentTaskList];
  const stringifiedArray = serialize(storageArray);
  localStorage.setItem("todoproj", stringifiedArray);
  /* develblock:start */
  console.log("List Saved...");
  /* develblock:end */
};

function loadList () {
  const savedArray = localStorage.getItem("todoproj");
  const parsedArray = deserialize(savedArray);
  const parsedTaskList = parsedArray[1];
  const parsedAutoSave = parsedArray[0];
  taskLibrary.tasks = parsedTaskList;
  taskLibrary.autoSave = parsedAutoSave;
  autoSaveSetter();
  /* devblock:start */
  console.log(parsedTaskList);
  /* devblock:end */
};

function autoLoadList () {
  if (!localStorage.getItem("todoproj")) {
    exampleTasks();
  } else {
    loadList();
    renderList(taskLibrary.tasks);
  };
  /* develblock:start */
  console.log("Task List Loaded...");
  /* develblock:end */
};

function clearList () {
  localStorage.setItem("taskList", []);
  taskLibrary.tasks = [];
  saveList();
  /* develblock:start */
  console.log("List Cleared...")
  /* develblock:end */
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