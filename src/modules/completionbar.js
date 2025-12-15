import taskLibrary from "./tasks";

function checkCompletion () {
  let taskTotal = 0;
  let taskCompletion = 0;
  let currentTasks = taskLibrary.tasks;
  for (let task of currentTasks) {
    taskTotal++;
    if (task.complete) {
      taskCompletion++;
    };
    if (task.subtasks) {
      for (let subtask of task.subtasks) {
        taskTotal++;
        if (subtask.complete) {
          taskCompletion++;
        };
      };
    };
  };
  let taskCompPerc = Math.round(((taskCompletion) / (taskTotal)) * 100);
  return taskCompPerc;
};

export default function updateComplete () {
  let completionBar = document.getElementById("completePerc");
  completionBar.textContent = checkCompletion();
  completionBar.style.width = `${checkCompletion()}%`;
};