let taskLibrary = {
  tasks: [],
};

function pushToLib (taskObject) {
  taskLibrary.tasks.push(taskObject);
};

function getOrderNumber () {
  return (taskLibrary.tasks.length + 1);
};

function updateOrder (lib) {
  const libLength = lib.length;
  for (let i = 0; i < libLength; i++) {
    lib[i].order = (i + 1);
  };
};

function createTask (title, orderNum) {
  return {
    title: title,
    order: orderNum,
    subTasks: []
  };
};

function createSubTask (title, orderNum) {
  return {
    title: title,
    order: orderNum,
  };
};

export {taskLibrary, pushToLib, getOrderNumber, updateOrder, createTask, createSubTask};