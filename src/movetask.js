import {renderList} from "./taskrender";
import {taskLibrary} from "./tasks";
import {saveList} from "./storage";

function taskUp (event) {
  let currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  if (currentIndex > 0) {
    let priorTask = taskLibrary.tasks[currentIndex - 1];
    let currentTask = taskLibrary.tasks[currentIndex];
    priorTask.index++;
    currentTask.index--;
    taskLibrary.tasks[currentIndex - 1] = currentTask;
    taskLibrary.tasks[currentIndex] = priorTask;
    taskLibrary.updateOrder();
    if (taskLibrary.autoSave) {
      saveList();
    };
    renderList(taskLibrary.tasks);
  };
};

function taskDn (event) {
  let currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  let nextIndex = currentIndex + 1;
  let libLen = taskLibrary.tasks.length - 1;
  if (currentIndex < libLen) {
    let nextTask = taskLibrary.tasks[nextIndex];
    let currentTask = taskLibrary.tasks[currentIndex];
    nextTask.index--;
    currentTask.index++;
    taskLibrary.tasks[currentIndex + 1] = currentTask;
    taskLibrary.tasks[currentIndex] = nextTask;
    if (taskLibrary.autoSave) {
      saveList();
    };
    renderList(taskLibrary.tasks);
  };
};

export {taskUp, taskDn};