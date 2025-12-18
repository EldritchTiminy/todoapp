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
        if (subtask.complete || task.complete) {
          taskCompletion++;
        };
      };
    };
  };
  let taskCompPerc = Math.round(((taskCompletion) / (taskTotal)) * 100);
  return taskCompPerc;
};

export default function updateComplete () {
  let completion = document.getElementById("completePerc");
  let currentWidth = completion.style.width;
  let currentComp;
  if (currentWidth === "") {
    currentComp = 1;
  } else {
    currentComp = parseInt(currentWidth);
  };
  let completionPercentage = checkCompletion();
  if (completionPercentage > 10) {
    completion.textContent = `${completionPercentage}%`;
  } else {
    completion.textContent = "";
  };
  //completionBar.style.width = `${checkCompletion()}%`;
  myMove(currentComp, completionPercentage);
};

// completion bar animation
let timerVar = null;


function myMove (currentP, newP) {
  //console.log("currentP", currentP, typeof currentP);
  //console.log("newP", newP, typeof newP);
  let elem = document.getElementById("completePerc");
  let pos = currentP;
  //console.log("pos", pos, typeof pos);
  clearInterval(timerVar);
  timerVar = setInterval(animFrame, 8);
  function animFrame () {
    if (pos === newP) {
      clearInterval(timerVar);
    } else {
      if (pos < newP) {
        pos++;
        elem.style.width = `${pos}%`;
      } else {
        pos--;
        elem.style.width = `${pos}%`;
      };
    };
  };
};