import taskLibrary from "./tasks";
import {addTask, renderList} from "./taskrender";
import {saveList, autoLoadList, clearList, autoSaveToggle, downloadBlob} from "./storage";
import toggleSettings from "./togglemenu";

function loadFormButtons () {
  /*addTaskButton();*/
  clearAllTasksButton();
  saveListButton();
  autoSaveButton();
  downloadButton();
  uploadButton();
  toggleSettingsButton();
};

function toggleSettingsButton () {
  let setBtn = document.getElementById("setBtn");
  setBtn.addEventListener("click", toggleSettings);
};

function saveListButton () {
  let saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", saveList);
};

/*function addTaskButton () {
  let subBtn = document.getElementById("addBtn");
  let tInput = document.getElementById("taskTitle");
  subBtn.addEventListener("click", addTask);
  tInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("addBtn").click();
    };
  });
};*/

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

function downloadButton () {
  let downloadBtn = document.getElementById("download");
  downloadBtn.addEventListener("click", (event) => {
    downloadBlob();
  });
};

function uploadButton() {
  const hiddenUpload = document.createElement("input");
  hiddenUpload.type = "file";
  hiddenUpload.accept = ".json";
  hiddenUpload.style.display = "none";
  document.body.appendChild(hiddenUpload);
  let uploadBtn = document.getElementById("upload");
  uploadBtn.addEventListener("click", () => {
    hiddenUpload.click();
  });
  hiddenUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target.result;
        localStorage.setItem("todoproj", jsonData);
        autoLoadList();
      } catch (err) {
        console.error("Invalid JSON file:", err);
        alert("That file isn't valid!");
      };
    };
    reader.readAsText(file);
  });
};

export {clrInputVal, getInputVal, loadFormButtons, autoSaveSetter};