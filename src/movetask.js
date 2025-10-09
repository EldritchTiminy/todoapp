import {renderList} from "./index";
import {taskLibrary} from "./tasks";

function taskUp (event) {
  let currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  if (currentIndex > 0) {
    let priorTask = taskLibrary.tasks[currentIndex - 1];
    let currentTask = taskLibrary.tasks[currentIndex];
    priorTask.order++;
    currentTask.order--;
    taskLibrary.tasks[currentIndex - 1] = currentTask;
    taskLibrary.tasks[currentIndex] = priorTask;
    renderList(taskLibrary.tasks);
  };
};

function taskDn (event) {
  let currentIndex = Number(event.target.parentElement.dataset.indexNumber);
  let nextIndex = currentIndex + 1;
  let libLen = taskLibrary.tasks.length - 1;
  console.log(libLen);
  if (currentIndex < libLen) {
    let nextTask = taskLibrary.tasks[nextIndex];
    let currentTask = taskLibrary.tasks[currentIndex];
    nextTask.order--;
    currentTask.order++;
    taskLibrary.tasks[currentIndex + 1] = currentTask;
    taskLibrary.tasks[currentIndex] = nextTask;
    renderList(taskLibrary.tasks);
  };
};

export {taskUp, taskDn};