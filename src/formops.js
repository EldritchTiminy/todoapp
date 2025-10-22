import {taskLibrary} from "./tasks";
import {addTask, renderList} from "./taskrender";
import {saveList, loadList, autoLoadList, clearList, autoSaveToggle} from "./storage";

function loadFormButtons () {
  addTaskButton();
  clearAllTasksButton();
  saveListButton();
  autoSaveButton();
};

function saveListButton () {
  let saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", saveList);
};

function addTaskButton () {
  let subBtn = document.getElementById("addBtn");
  let tInput = document.getElementById("taskTitle");
  subBtn.addEventListener("click", addTask);
  tInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("addBtn").click();
    };
  });
};

function clearAllTasksButton () {
  let clrBtn = document.getElementById("clrList");
  clrBtn.addEventListener("click", () => {
    clearList();
    renderList(taskLibrary.tasks);
  });
};

function clrInputVal (inputElement) {
  inputElement.value = "";
};

function getInputVal (inputElement) {
  return inputElement.value;
};

function autoSaveSetter () {
  let autoSaveSetting = taskLibrary.autoSave;
  if (autoSaveSetting) {
    document.getElementById("autoSaveBtn").textContent = "Autosave: on";
    document.getElementById("saveBtn").disabled = true;
  } else {
    document.getElementById("autoSaveBtn").textContent = "Autosave: off";
    document.getElementById("saveBtn").disabled = false;
  };
};

function autoSaveButton () {
  let aSaveBtn = document.getElementById("autoSaveBtn");
  aSaveBtn.addEventListener("click", () => {
    autoSaveToggle();
    autoSaveSetter();
  });
};

export {clrInputVal, getInputVal, loadFormButtons, autoSaveSetter};