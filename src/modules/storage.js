/*
this script handles the functionality for storing the users tasks in local storage, retrieving stored tasks, and downloading a list to the user's device

function overview:
- saveList() - grabs the current list of tasks from the taskLibrary object (tasks.js, line 2), the current autoSave boolean (tasks.js, line 48), puts them in an array together, stringifies the array with serialize() (serializer.js, line 1), and then saves the stringified array to localStorage

- loadList () - retrieves the array stored in localStorage, parses it with deserialize() (serializer, line 37), splits the array into its two parts, then saves the list and autosave boolean to local taskLibrary

- autoLoadList() - checks if there is a saved list from a previous visit in localStorage, loads a few example tasks with exampleTasks() (examples.js, line 10) if there isn't a saved list

- clearList() - sets the current task list to an empty array and saves it

- autoSaveToggle() - checks current state of the autoSave boolean (tasks.js, line 48) and toggles it

- downloadBlob() - grabs the current task list, saves it to a new Blob, then uses DOM manipulation to save it to the user's device.
*/

//imports
import taskLibrary from "./tasks";
import {renderList} from "./taskrender";
import exampleTasks from "./examples";
import {autoSaveSetter} from "./formops";
import {serialize, deserialize} from "./serializer";

// scripting
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

// exports
export {
  saveList,
  loadList,
  autoLoadList,
  clearList,
  autoSaveToggle,
  downloadBlob
};