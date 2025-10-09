function renderTask (taskObject) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.indexNumber = (taskObject.order - 1);
  let taskList = document.getElementById("taskList");
  taskList.appendChild(taskDiv);

  let taskListOrder = document.createElement("p");
  taskListOrder.classList.add("listOrder");
  taskListOrder.textContent = `#${taskObject.order}`;
  taskDiv.appendChild(taskListOrder);

  let upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.textContent = "Move Up";
  upBtn.addEventListener("click", taskUp);
  taskDiv.appendChild(upBtn);

  let dnBtn = document.createElement("button");
  dnBtn.type = "button";
  dnBtn.textContent = "Move Down";
  dnBtn.addEventListener("click", taskDn);
  taskDiv.appendChild(dnBtn);

  let tTitle = document.createElement("p");
  tTitle.textContent = taskObject.title;
  tTitle.classList.add("primaryTask");
  taskDiv.appendChild(tTitle);

  let subTaskList = document.createElement("ul");
  subTaskList.classList.add("subTaskList");
  taskDiv.appendChild(subTaskList);

  if (taskObject.subTasks) {
    for (let task of taskObject.subTasks) {
      let currentSub = document.createElement("li");
      let subTaskText = document.createElement("span");
      let delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.type = "button";
      delBtn.addEventListener("click", (e) => {
        let currentIndex = Number(e.target.parentElement.parenElement.dataset.indexNumber);
        //taskLibrary.tasks[currentIndex].subTasks;
        e.target.parentElement.remove();
      });
      currentSub.classList.add("subTask");
      subTaskText.textContent = task;
      currentSub.appendChild(subTaskText);
      currentSub.appendChild(delBtn);
      subTaskList.appendChild(currentSub);
    };
  };

  let subTaskBtn = document.createElement("button");
  subTaskBtn.textContent = "Add Sub-task";
  subTaskBtn.addEventListener("click", subTaskForm);
  taskDiv.appendChild(subTaskBtn);

  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", removeTask);
  taskDiv.appendChild(delBtn);
};

function renderList (lib) {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const l = lib.length;
  for (let i = 0; i < l; i++) {
    renderTask(lib[i]);
  };
};

export {renderTask, renderList};