import {renderList, createTask} from "./index";
import {pushToLib, getOrderNumber} from "./tasks";

function exampleTasks () {
  let task1 = createTask("Wash the dishes", getOrderNumber());
  pushToLib(task1);
  let task2 = createTask("Vacuum the livingroom", getOrderNumber());
  pushToLib(task2);
  let task3 = createTask("Check the mail", getOrderNumber());
  pushToLib(task3);
  renderList(taskLibrary.tasks);
};

export {exampleTasks};