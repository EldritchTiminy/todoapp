import {taskLibrary} from "./tasks";
import {renderList} from "./index";
import {exampleTasks} from "./examples";

// data storage functions
function saveList () {
  // temp storage value
  const currentList = taskLibrary.tasks;
  // stringify list
  const stringified = JSON.stringify(currentList);
  // save to local storage
  localStorage.setItem("taskList", stringified);
  console.log("List Saved...");
};

function loadList () {
  // load from local storage
  const savedList = localStorage.getItem("taskList");
  // parse saved list
  const parsedList = JSON.parse(savedList);
  // overwrite current list
  taskLibrary.tasks = parsedList;
};

function autoLoadList () {
  if (!localStorage.getItem("taskList")) {
    exampleTasks();
  } else {
    loadList();
    renderList(taskLibrary.tasks);
  };
};

export {saveList, loadList, autoLoadList};